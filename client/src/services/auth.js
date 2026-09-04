import { supabase, auth as supabaseAuth } from "./supabase";
let state = { user: null, isLoading: false, error: null };
function toAuthUser(u) {
  const meta = u.user_metadata ?? {};
  return {
    id: u.id,
    email: u.email ?? "",
    displayName: meta.display_name ?? u.email?.split("@")[0] ?? "Learner",
    avatarUrl: u.user_metadata?.avatar_url || meta.avatar_url,
    accountType: meta.account_type || "learner",
    schoolId: meta.school_id || null,
    username: meta.username || meta.auth_username || null
  };
}
function fromSession() {
  const session = supabase.auth.getSession();
  const user = session?.data?.session?.user ?? null;
  return {
    user: user ? toAuthUser(user) : null,
    isLoading: false,
    error: null
  };
}
function getAuthState() {
  return { ...state, ...state.user ? {} : fromSession() };
}
function onAuthChange(cb) {
  const emit = () => cb(getAuthState());
  emit();
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    state = {
      user: session ? toAuthUser(session.user) : null,
      isLoading: false,
      error: null
    };
    cb(getAuthState());
  });
  return () => data?.subscription.unsubscribe();
}
async function signIn(email, password) {
  state = { ...state, isLoading: true, error: null };
  if (!email || !password) {
    const msg = "Email and password required";
    state = { ...state, isLoading: false, error: msg };
    throw new Error(msg);
  }
  const { data, error } = await supabaseAuth.signIn(email, password);
  if (error) {
    state = { ...state, isLoading: false, error: error.message };
    throw new Error(error.message);
  }
  const user = data.user ? toAuthUser(data.user) : null;
  state = { user, isLoading: false, error: null };
  if (!user) throw new Error("Sign in failed");
  return user;
}
async function signUp(email, password, displayName, opts = {}) {
  state = { ...state, isLoading: true, error: null };
  if (!email || !password || !displayName) {
    const msg = "All fields required";
    state = { ...state, isLoading: false, error: msg };
    throw new Error(msg);
  }
  if (password.length < 8) {
    const msg = "Password must be at least 8 characters";
    state = { ...state, isLoading: false, error: msg };
    throw new Error(msg);
  }
  const meta = { display_name: displayName };
  if (opts.accountType) meta.account_type = opts.accountType;
  if (opts.schoolId) meta.school_id = opts.schoolId;
  if (opts.username) meta.username = opts.username.toLowerCase().trim();
  const { data, error } = await supabaseAuth.signUp(email, password, meta);
  if (error) {
    state = { ...state, isLoading: false, error: error.message };
    throw new Error(error.message);
  }
  const user = data.user ?? null;
  state = { user: user ? toAuthUser(user) : null, isLoading: false, error: null };
  if (!user) throw new Error("Check your inbox to confirm your email");
  return toAuthUser(user);
}
function signOut() {
  void supabaseAuth.signOut();
  state = { user: null, isLoading: false, error: null };
}
async function updateAccountMeta(data) {
  const { data: res, error } = await supabaseAuth.updateUser({ data });
  if (error) throw new Error(error.message);
  const user = res.user ? toAuthUser(res.user) : null;
  if (user) state = { user, isLoading: false, error: null };
  if (!user) throw new Error("Failed to update profile");
  return user;
}
async function resendConfirmation(email) {
  const { error } = await supabase.auth.resend({ type: "signup", email });
  if (error) throw new Error(error.message);
}
export {
  getAuthState,
  onAuthChange,
  resendConfirmation,
  signIn,
  signOut,
  signUp,
  updateAccountMeta
};
