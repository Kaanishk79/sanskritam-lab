import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getAuthState, onAuthChange, updateAccountMeta } from "../services/auth";
import { schoolsApi } from "../services/schools";
const RoleContext = createContext(null);
const ROLE_KEY = "sanskritlab-view-role";
const GUEST_KEY = "sanskritlab-guest";
const PENDING_TEACHER_KEY = "sanskritlab-pending-teacher";
function RoleProvider({ children }) {
  const [user, setUser] = useState(() => getAuthState().user);
  const [role, setRoleState] = useState("learner");
  const [guest, setGuest] = useState(() => !getAuthState().user && localStorage.getItem(GUEST_KEY) === "1");
  const [school, setSchool] = useState(null);
  const [schoolLoading, setSchoolLoading] = useState(false);
  const sessionUserRef = useRef(user);
  useEffect(() => {
    const unsub = onAuthChange((s) => {
      setUser(s.user);
      sessionUserRef.current = s.user;
      if (s.user) setGuest(false);
    });
    return unsub;
  }, []);
  const isInstitution = user?.accountType === "institution";
  const canSwitch = isInstitution;
  useEffect(() => {
    const stored = localStorage.getItem(ROLE_KEY);
    if (isInstitution) {
      setRoleState(stored && ["institution", "teacher", "student"].includes(stored) ? stored : "institution");
    } else if (user?.accountType === "teacher" || user?.accountType === "student") {
      setRoleState(user.accountType);
    } else {
      setRoleState("learner");
    }
  }, [user?.id, isInstitution]);
  const loadSchool = async (u) => {
    if (!u) {
      setSchool(null);
      return;
    }
    if (u.accountType !== "institution" && u.accountType !== "teacher" && u.accountType !== "student") {
      setSchool(null);
      return;
    }
    setSchoolLoading(true);
    try {
      if (u.accountType === "teacher") {
        const pendingRaw = localStorage.getItem(PENDING_TEACHER_KEY);
        if (pendingRaw) {
          try {
            const pending = JSON.parse(pendingRaw);
            await schoolsApi.teacherRegister(pending.school_id, {
              name: u.displayName,
              auth_username: pending.username || u.username
            });
            await updateAccountMeta({
              school_id: pending.school_id,
              ...pending.username ? { username: pending.username } : {}
            });
            localStorage.removeItem(PENDING_TEACHER_KEY);
          } catch (e) {
            console.error("Pending teacher link failed", e);
          }
        }
      }
      let detail = null;
      if (u.accountType === "teacher" || u.accountType === "student") {
        if (u.schoolId) {
          detail = await schoolsApi.get(u.schoolId);
        }
      } else if (u.accountType === "institution") {
        if (u.schoolId) {
          detail = await schoolsApi.get(u.schoolId);
        } else if (u.email) {
          const found = await schoolsApi.findMy(u.email);
          if (found) {
            detail = await schoolsApi.get(found.id);
            try {
              await updateAccountMeta({ school_id: found.id });
            } catch {
            }
          } else {
            const pendingRaw = localStorage.getItem("sanskritlab-pending-school");
            if (pendingRaw) {
              try {
                const pending = JSON.parse(pendingRaw);
                const created = await schoolsApi.create(pending);
                localStorage.removeItem("sanskritlab-pending-school");
                await updateAccountMeta({ school_id: created.id });
                detail = await schoolsApi.get(created.id);
              } catch (e) {
                console.error("Pending school creation failed", e);
              }
            }
          }
        }
      }
      setSchool(detail);
    } catch {
      setSchool(null);
    } finally {
      setSchoolLoading(false);
    }
  };
  useEffect(() => {
    void loadSchool(user);
  }, [user?.id, user?.schoolId]);
  const refreshSchool = async () => {
    if (sessionUserRef.current) await loadSchool(sessionUserRef.current);
  };
  const setRole = (r) => {
    if (!canSwitch) return;
    setRoleState(r);
    localStorage.setItem(ROLE_KEY, r);
  };
  const beginGuest = () => {
    localStorage.setItem(GUEST_KEY, "1");
    setGuest(true);
  };
  const endGuest = () => {
    localStorage.removeItem(GUEST_KEY);
    setGuest(false);
  };
  return <RoleContext.Provider value={{ user, role, setRole, canSwitch, school, schoolLoading, refreshSchool, guest, beginGuest, endGuest }}>
      {children}
    </RoleContext.Provider>;
}
function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}
export {
  RoleProvider,
  useRole
};
