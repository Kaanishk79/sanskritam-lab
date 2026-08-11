import { supabase, auth as supabaseAuth } from './supabase'
import type { Session, User } from '@supabase/supabase-js'

export interface AuthUser {
  id: string
  email: string
  displayName: string
  avatarUrl?: string
  accountType: string
  schoolId?: string | null
}

export interface AuthState {
  user: AuthUser | null
  isLoading: boolean
  error: string | null
}

let state: AuthState = { user: null, isLoading: false, error: null }

function toAuthUser(u: User): AuthUser {
  const meta = u.user_metadata ?? {}
  return {
    id: u.id,
    email: u.email ?? '',
    displayName: (meta.display_name as string) ?? u.email?.split('@')[0] ?? 'Learner',
    avatarUrl: (u.user_metadata?.avatar_url as string) || meta.avatar_url as string | undefined,
    accountType: (meta.account_type as string) || 'learner',
    schoolId: (meta.school_id as string) || null,
  }
}

function fromSession(): AuthState {
  const session = supabase.auth.getSession() as unknown as { data?: { session?: Session | null } } | null
  const user = session?.data?.session?.user ?? null
  return {
    user: user ? toAuthUser(user) : null,
    isLoading: false,
    error: null,
  }
}

export function getAuthState(): AuthState {
  return { ...state, ...(state.user ? {} : fromSession()) }
}

export function onAuthChange(cb: (state: AuthState) => void): () => void {
  const emit = () => cb(getAuthState())
  emit()
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    state = {
      user: session ? toAuthUser(session.user) : null,
      isLoading: false,
      error: null,
    }
    cb(getAuthState())
  })
  return () => data?.subscription.unsubscribe()
}

export async function signIn(email: string, password: string): Promise<AuthUser> {
  state = { ...state, isLoading: true, error: null }

  if (!email || !password) {
    const msg = 'Email and password required'
    state = { ...state, isLoading: false, error: msg }
    throw new Error(msg)
  }

  const { data, error } = await supabaseAuth.signIn(email, password)
  if (error) {
    state = { ...state, isLoading: false, error: error.message }
    throw new Error(error.message)
  }
  const user = data.user ? toAuthUser(data.user) : null
  state = { user, isLoading: false, error: null }
  if (!user) throw new Error('Sign in failed')
  return user
}

export async function signUp(
  email: string,
  password: string,
  displayName: string,
  opts: { accountType?: string; schoolId?: string } = {},
): Promise<AuthUser> {
  state = { ...state, isLoading: true, error: null }

  if (!email || !password || !displayName) {
    const msg = 'All fields required'
    state = { ...state, isLoading: false, error: msg }
    throw new Error(msg)
  }

  if (password.length < 8) {
    const msg = 'Password must be at least 8 characters'
    state = { ...state, isLoading: false, error: msg }
    throw new Error(msg)
  }

  const meta: Record<string, unknown> = { display_name: displayName }
  if (opts.accountType) meta.account_type = opts.accountType
  if (opts.schoolId) meta.school_id = opts.schoolId

  const { data, error } = await supabaseAuth.signUp(email, password, meta)

  if (error) {
    state = { ...state, isLoading: false, error: error.message }
    throw new Error(error.message)
  }

  // Session may be null until email confirmation is completed.
  const user = data.user ?? null
  state = { user: user ? toAuthUser(user) : null, isLoading: false, error: null }
  if (!user) throw new Error('Check your inbox to confirm your email')
  return toAuthUser(user)
}

export function signOut(): void {
  void supabaseAuth.signOut()
  state = { user: null, isLoading: false, error: null }
}

export async function updateAccountMeta(data: Record<string, unknown>): Promise<AuthUser> {
  const { data: res, error } = await supabaseAuth.updateUser({ data })
  if (error) throw new Error(error.message)
  const user = res.user ? toAuthUser(res.user) : null
  if (user) state = { user, isLoading: false, error: null }
  if (!user) throw new Error('Failed to update profile')
  return user
}