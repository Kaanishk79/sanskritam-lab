import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { getAuthState, onAuthChange, updateAccountMeta } from '../services/auth'
import type { AuthUser } from '../services/auth'
import { schoolsApi } from '../services/schools'
import type { SchoolDetail } from '../services/schools'

export type ViewRole = 'institution' | 'teacher' | 'student'

interface RoleContextValue {
  user: AuthUser | null
  role: ViewRole | 'learner'
  setRole: (r: ViewRole) => void
  canSwitch: boolean
  school: SchoolDetail | null
  schoolLoading: boolean
  refreshSchool: () => Promise<void>
  guest: boolean
  beginGuest: () => void
  endGuest: () => void
}

const RoleContext = createContext<RoleContextValue | null>(null)

const ROLE_KEY = 'sanskritlab-view-role'
const GUEST_KEY = 'sanskritlab-guest'

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getAuthState().user)
  const [role, setRoleState] = useState<ViewRole | 'learner'>('learner')
  const [guest, setGuest] = useState<boolean>(() => !getAuthState().user && localStorage.getItem(GUEST_KEY) === '1')
  const [school, setSchool] = useState<SchoolDetail | null>(null)
  const [schoolLoading, setSchoolLoading] = useState(false)
  const sessionUserRef = useRef<AuthUser | null>(user)

  useEffect(() => {
    const unsub = onAuthChange((s) => {
      setUser(s.user)
      sessionUserRef.current = s.user
      if (s.user) setGuest(false)
    })
    return unsub
  }, [])

  const isInstitution = user?.accountType === 'institution'
  const canSwitch = isInstitution

  useEffect(() => {
    const stored = localStorage.getItem(ROLE_KEY) as ViewRole | null
    if (isInstitution) {
      setRoleState(stored && ['institution', 'teacher', 'student'].includes(stored) ? stored : 'institution')
    } else if (user?.accountType === 'teacher' || user?.accountType === 'student') {
      setRoleState(user.accountType as ViewRole)
    } else {
      setRoleState('learner')
    }
  }, [user?.id, isInstitution])

  const loadSchool = async (u: AuthUser | null) => {
    if (!u) {
      setSchool(null)
      return
    }
    if (u.accountType !== 'institution') {
      setSchool(null)
      return
    }
    setSchoolLoading(true)
    try {
      let detail: SchoolDetail | null = null
      if (u.schoolId) {
        detail = await schoolsApi.get(u.schoolId)
      } else if (u.email) {
        const found = await schoolsApi.findMy(u.email)
        if (found) {
          detail = await schoolsApi.get(found.id)
          try {
            await updateAccountMeta({ school_id: found.id })
          } catch {
            /* non-fatal */
          }
        } else {
          const pendingRaw = localStorage.getItem('sanskritlab-pending-school')
          if (pendingRaw) {
            try {
              const pending = JSON.parse(pendingRaw)
              const created = await schoolsApi.create(pending)
              localStorage.removeItem('sanskritlab-pending-school')
              await updateAccountMeta({ school_id: created.id })
              detail = await schoolsApi.get(created.id)
            } catch (e) {
              console.error('Pending school creation failed', e)
            }
          }
        }
      }
      setSchool(detail)
    } catch {
      setSchool(null)
    } finally {
      setSchoolLoading(false)
    }
  }

  useEffect(() => {
    void loadSchool(user)
  }, [user?.id, user?.schoolId])

  const refreshSchool = async () => {
    if (sessionUserRef.current) await loadSchool(sessionUserRef.current)
  }

  const setRole = (r: ViewRole) => {
    if (!canSwitch) return
    setRoleState(r)
    localStorage.setItem(ROLE_KEY, r)
  }

  const beginGuest = () => {
    localStorage.setItem(GUEST_KEY, '1')
    setGuest(true)
  }

  const endGuest = () => {
    localStorage.removeItem(GUEST_KEY)
    setGuest(false)
  }

  return (
    <RoleContext.Provider value={{ user, role, setRole, canSwitch, school, schoolLoading, refreshSchool, guest, beginGuest, endGuest }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole(): RoleContextValue {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error('useRole must be used within RoleProvider')
  return ctx
}
