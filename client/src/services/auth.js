import { supabase, auth as supabaseAuth } from "./supabase";
import { userStore } from "./localStore";

function toAuthUser(u) {
  if (!u) return null;
  const meta = u.user_metadata || u.meta || {};
  return {
    id: u.id,
    email: u.email || "",
    displayName: meta.display_name || u.displayName || u.email?.split("@")[0] || "Learner",
    avatarUrl: meta.avatar_url || u.avatarUrl || null,
    accountType: meta.account_type || u.accountType || "learner",
    schoolId: meta.school_id || u.schoolId || null,
    username: meta.username || meta.auth_username || u.username || null
  };
}

// Check local cache for immediate synchronous restore on page load
const cachedUser = userStore.getSession();
let state = {
  user: cachedUser ? toAuthUser(cachedUser) : null,
  isLoading: true,
  error: null
};

let subscribers = [];

function notify() {
  const current = getAuthState();
  subscribers.forEach((cb) => {
    try {
      cb(current);
    } catch (e) {
      console.error("[auth] subscriber callback error:", e);
    }
  });
}

export function getAuthState() {
  return { ...state };
}

// Bug #1 Fix: Asynchronously initialize auth state from Supabase session
async function initSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (!error && data?.session?.user) {
      const authUser = toAuthUser(data.session.user);
      state = { user: authUser, isLoading: false, error: null };
      userStore.setSession(authUser);
    } else {
      // Fall back to cached local session if offline
      const cached = userStore.getSession();
      state = { user: cached ? toAuthUser(cached) : null, isLoading: false, error: null };
    }
  } catch (e) {
    console.warn("[auth] Failed to retrieve session from Supabase:", e);
    const cached = userStore.getSession();
    state = { user: cached ? toAuthUser(cached) : null, isLoading: false, error: null };
  }
  notify();
}

// Kick off session resolution immediately
void initSession();

export function onAuthChange(cb) {
  subscribers.push(cb);
  cb(getAuthState());

  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      const authUser = toAuthUser(session.user);
      state = { user: authUser, isLoading: false, error: null };
      userStore.setSession(authUser);
    } else {
      state = { user: null, isLoading: false, error: null };
      userStore.setSession(null);
    }
    notify();
  });

  return () => {
    subscribers = subscribers.filter((c) => c !== cb);
    data?.subscription?.unsubscribe();
  };
}

export async function signIn(email, password) {
  state = { ...state, isLoading: true, error: null };
  if (!email || !password) {
    const msg = "Email and password required";
    state = { ...state, isLoading: false, error: msg };
    throw new Error(msg);
  }

  try {
    const { data, error } = await supabaseAuth.signIn(email, password);
    if (error) throw error;
    if (data?.user) {
      const authUser = toAuthUser(data.user);
      state = { user: authUser, isLoading: false, error: null };
      userStore.setSession(authUser);
      notify();
      return authUser;
    }
  } catch (err) {
    // If Supabase is unreachable or placeholder, try local store fallback
    const localUser = userStore.getByEmail(email);
    if (localUser) {
      const authUser = toAuthUser(localUser);
      state = { user: authUser, isLoading: false, error: null };
      userStore.setSession(authUser);
      notify();
      return authUser;
    }
    state = { ...state, isLoading: false, error: err.message };
    throw err;
  }
}

export async function signUp(email, password, displayName, opts = {}) {
  state = { ...state, isLoading: true, error: null };
  if (!email || !password || !displayName) {
    const msg = "All fields required";
    state = { ...state, isLoading: false, error: msg };
    throw new Error(msg);
  }
  if (password.length < 6) {
    const msg = "Password must be at least 6 characters";
    state = { ...state, isLoading: false, error: msg };
    throw new Error(msg);
  }

  const meta = {
    display_name: displayName,
    account_type: opts.accountType || "learner",
    school_id: opts.schoolId || null,
    username: opts.username ? opts.username.toLowerCase().trim() : null
  };

  try {
    const { data, error } = await supabaseAuth.signUp(email, password, meta);
    if (error) throw error;
    const user = data?.user ?? null;
    const authUser = user ? toAuthUser(user) : null;

    if (authUser) {
      userStore.save(authUser);
      // Only set active session if session returned (e.g. email confirmation disabled)
      if (data?.session) {
        userStore.setSession(authUser);
        state = { user: authUser, isLoading: false, error: null };
      } else {
        state = { user: null, isLoading: false, error: null };
      }
      notify();
      return { user: authUser, session: data?.session || null };
    }
  } catch (err) {
    console.warn("[auth] Remote signup failed, saving to localStore fallback:", err.message);
    const localUser = {
      id: "local-" + Date.now(),
      email,
      displayName,
      accountType: opts.accountType || "learner",
      schoolId: opts.schoolId || null,
      username: opts.username || null,
      created_at: new Date().toISOString()
    };
    userStore.save(localUser);
    const authUser = toAuthUser(localUser);
    userStore.setSession(authUser);
    state = { user: authUser, isLoading: false, error: null };
    notify();
    return { user: authUser, session: { access_token: "local-session" } };
  }
}

export function signOut() {
  void supabaseAuth.signOut();
  userStore.setSession(null);
  state = { user: null, isLoading: false, error: null };
  notify();
}

export async function updateAccountMeta(data) {
  try {
    const { data: res, error } = await supabaseAuth.updateUser({ data });
    if (!error && res?.user) {
      const authUser = toAuthUser(res.user);
      state = { user: authUser, isLoading: false, error: null };
      userStore.setSession(authUser);
      notify();
      return authUser;
    }
  } catch (e) {
    console.warn("[auth] Remote updateUser failed, updating local:", e);
  }

  const current = state.user || userStore.getSession();
  if (current) {
    const updated = {
      ...current,
      displayName: data.display_name || data.name || current.displayName,
      accountType: data.account_type || current.accountType,
      schoolId: data.school_id !== undefined ? data.school_id : current.schoolId,
      username: data.username || data.teacher_username || current.username
    };
    userStore.save(updated);
    userStore.setSession(updated);
    state = { user: toAuthUser(updated), isLoading: false, error: null };
    notify();
    return state.user;
  }
  return null;
}

export async function resendConfirmation(email) {
  const { error } = await supabase.auth.resend({ type: "signup", email });
  if (error) throw new Error(error.message);
}
