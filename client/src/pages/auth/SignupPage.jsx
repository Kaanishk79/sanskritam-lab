import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  User,
  School,
  GraduationCap,
  BookOpen,
  Mail,
  Check,
  Clock,
  Link2
} from "lucide-react";
import { signUp, getAuthState, onAuthChange, updateAccountMeta, resendConfirmation } from "../../services/auth";
import { supabase } from "../../services/supabase";
import { schoolsApi } from "../../services/schools";
import { useLanguage } from "../../context/LanguageContext";
const PENDING_SCHOOL_KEY = "sanskritlab-pending-school";
const PENDING_TEACHER_KEY = "sanskritlab-pending-teacher";
function ResendConfirmation({ email }) {
  const { t } = useLanguage();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const resend = async () => {
    setBusy(true);
    setErr("");
    try {
      await resendConfirmation(email);
      setDone(true);
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };
  return <span>
      <button className="btn btn-secondary" disabled={busy} onClick={resend} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        {busy ? <Clock size={13} /> : done ? <><Check size={13} color="#2ecc71" /> <span>{t("Sent!")}</span></> : <><Mail size={13} /> <span>{t("Resend email")}</span></>}
      </button>
      {err && <span style={{ color: "#e55", fontSize: 12, marginLeft: 8 }}>{err}</span>}
    </span>;
}
const ACCOUNT_TYPES = [
  { value: "learner", icon: User, label: "Learner", desc: "Self-study Sanskrit at your own pace" },
  { value: "institution", icon: School, label: "Institution", desc: "Manage a school \u2014 also preview teacher & student views" },
  { value: "teacher", icon: GraduationCap, label: "Teacher", desc: "Run classes, rosters, and assessments" },
  { value: "student", icon: BookOpen, label: "Student", desc: "Follow lessons and track progress" }
];
function SignupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState(() => {
    const preset = searchParams.get("type");
    return preset === "institution" || preset === "teacher" || preset === "student" ? preset : "learner";
  });
  const [schoolName, setSchoolName] = useState("");
  const [schoolCity, setSchoolCity] = useState("");
  const [schoolState, setSchoolState] = useState("");
  const [schoolType, setSchoolType] = useState("");
  const [teacherUsername, setTeacherUsername] = useState("");
  const [schoolQuery, setSchoolQuery] = useState("");
  const [schoolResults, setSchoolResults] = useState([]);
  const [schoolSearching, setSchoolSearching] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  useEffect(() => {
    const unsub = onAuthChange((s) => {
      if (s.user) navigate("/");
    });
    return unsub;
  }, [navigate]);
  useEffect(() => {
    setSelectedSchool(null);
    setSchoolResults([]);
  }, [accountType]);
  useEffect(() => {
    if (accountType !== "teacher") return;
    const q = schoolQuery.trim();
    if (q.length < 2) {
      setSchoolResults([]);
      return;
    }
    let live = true;
    setSchoolSearching(true);
    const timer = setTimeout(() => {
      schoolsApi.list({ q }).then((r) => {
        if (live) setSchoolResults(r.data.slice(0, 6));
      }).catch(() => void 0).finally(() => {
        if (live) setSchoolSearching(false);
      });
    }, 400);
    return () => {
      live = false;
      clearTimeout(timer);
    };
  }, [schoolQuery, accountType]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (accountType === "institution" && !schoolName.trim()) {
      setError(t("Please provide a school name"));
      return;
    }
    setLoading(true);
    try {
      const meta = {
        name,
        account_type: accountType
      };
      if (accountType === "institution") {
        meta.institution_name = schoolName;
        meta.institution_city = schoolCity;
        meta.institution_state = schoolState;
        meta.institution_type = schoolType;
      }
      if (accountType === "teacher") {
        if (teacherUsername.trim()) meta.teacher_username = teacherUsername.trim().toLowerCase();
        if (selectedSchool) meta.school_id = selectedSchool.id;
      }
      const user2 = await signUp(email, password, name, {
        accountType,
        schoolId: selectedSchool?.id,
        username: teacherUsername.trim() || void 0
      });
      if (accountType === "institution" && schoolName.trim()) {
        try {
          localStorage.setItem(
            PENDING_SCHOOL_KEY,
            JSON.stringify({ name: schoolName, city: schoolCity, state: schoolState, school_type: schoolType, email })
          );
        } catch {
        }
      }
      if (accountType === "teacher" && (teacherUsername.trim() || selectedSchool)) {
        try {
          localStorage.setItem(
            PENDING_TEACHER_KEY,
            JSON.stringify({
              email,
              name,
              auth_username: teacherUsername.trim() || void 0,
              school_id: selectedSchool?.id
            })
          );
        } catch {
        }
      }
      if (accountType === "institution" && schoolName.trim()) {
        try {
          await schoolsApi.create({
            name: schoolName,
            city: schoolCity,
            state: schoolState,
            school_type: schoolType || "Senior Secondary School"
          });
          localStorage.removeItem(PENDING_SCHOOL_KEY);
        } catch {
        }
      }
      if (accountType === "teacher" && (teacherUsername.trim() || selectedSchool)) {
        try {
          await updateAccountMeta({
            account_type: "teacher",
            teacher_username: teacherUsername.trim() || void 0,
            school_id: selectedSchool?.id
          });
          if (selectedSchool && user2) {
            await supabase.from("teachers").insert({
              school_id: selectedSchool.id,
              name,
              email,
              auth_username: teacherUsername.trim() || null,
              user_id: user2.id,
              status: "active"
            });
          }
          localStorage.removeItem(PENDING_TEACHER_KEY);
        } catch {
        }
      }
      navigate("/");
    } catch (err) {
      if (err.message?.toLowerCase().includes("confirm")) {
        setNeedsConfirmation(true);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const user = getAuthState().user;
  return <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: 520 }}>
        <div className="auth-brand">
          <span className="auth-om">ॐ</span>
          <h2>{t("Create Account")}</h2>
          <p>{t("Join SanskritLab \u2014 free forever")}</p>
        </div>

        {needsConfirmation ? <div className="card" style={{ textAlign: "center", padding: 32 }}>
            <div style={{ display: "inline-flex", justifyContent: "center", marginBottom: 12 }}>
              <Mail size={44} color="var(--vt-orange)" />
            </div>
            <h3 style={{ marginBottom: 12 }}>{t("Check your email")}</h3>
            <p style={{ color: "var(--vt-muted)", marginBottom: 16 }}>
              {t("We sent a confirmation link to ")}<strong>{email}</strong>.<br />
              {t("After you confirm and sign in, your school")} <strong>{selectedSchool?.name || schoolName}</strong> {t("will be linked to your account automatically.")}
            </p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button className="btn btn-primary" onClick={() => navigate("/auth/login")}>{t("Go to Sign In")}</button>
              <ResendConfirmation email={email} />
            </div>
          </div> : user ? <div className="card" style={{ textAlign: "center", padding: 32 }}>
            <p style={{ color: "#4caf50", marginBottom: 16 }}>{t("You are signed in as ")}{user.email}</p>
            <button className="btn btn-primary" onClick={() => navigate("/")}>{t("Go to Dashboard")}</button>
          </div> : <form onSubmit={handleSubmit}>
            {error && <div className="auth-error">{error}</div>}

            <div className="form-group">
              <label>{t("I am a...")}</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {ACCOUNT_TYPES.map((a) => {
    const Icon = a.icon;
    return <button
      type="button"
      key={a.value}
      onClick={() => setAccountType(a.value)}
      title={t(a.desc)}
      className={`btn btn-sm ${accountType === a.value ? "btn-primary" : "btn-secondary"}`}
      style={{ padding: "6px 12px", display: "inline-flex", alignItems: "center", gap: 6 }}
    >
                      <Icon size={14} />
                      <span>{t(a.label)}</span>
                    </button>;
  })}
              </div>
            </div>

            {accountType === "institution" && <div className="card" style={{ padding: 16, marginBottom: 12, background: "rgba(255,140,0,0.06)", border: "1px solid rgba(255,140,0,0.35)" }}>
                <div className="form-group">
                  <label>{t("School Name")} *</label>
                  <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} placeholder={t("e.g. Sarada Vidyalaya")} required />
                </div>
                <div className="form-group">
                  <label>{t("City")}</label>
                  <input type="text" value={schoolCity} onChange={(e) => setSchoolCity(e.target.value)} placeholder={t("e.g. Chennai")} />
                </div>
                <div className="form-group">
                  <label>{t("State")}</label>
                  <input type="text" value={schoolState} onChange={(e) => setSchoolState(e.target.value)} placeholder={t("e.g. Tamil Nadu")} />
                </div>
                <div className="form-group">
                  <label>{t("School Type")}</label>
                  <select value={schoolType} onChange={(e) => setSchoolType(e.target.value)}>
                    <option value="">{t("Select...")}</option>
                    <option>{t("Primary School")}</option>
                    <option>{t("Middle School")}</option>
                    <option>{t("Secondary School")}</option>
                    <option>{t("Senior Secondary School")}</option>
                  </select>
                </div>
                <p style={{ fontSize: 12, color: "var(--vt-muted)", margin: 0, display: "flex", alignItems: "center", gap: 6 }}>
                  <School size={14} />
                  <span>{t("Your school is registered instantly. As an institution you can switch between School, Teacher and Student views.")}</span>
                </p>
              </div>}

            {accountType === "teacher" && <div className="card" style={{ padding: 16, marginBottom: 12, background: "rgba(255,140,0,0.06)", border: "1px solid rgba(255,140,0,0.35)" }}>
                <div className="form-group">
                  <label>{t("Your Username")}</label>
                  <input
    type="text"
    value={teacherUsername}
    onChange={(e) => setTeacherUsername(e.target.value)}
    placeholder={t("e.g. acharya.ram")}
  />
                  <p style={{ fontSize: 12, color: "var(--vt-muted)", margin: "4px 0 0", display: "flex", alignItems: "center", gap: 6 }}>
                    <User size={13} />
                    <span>{t("Sign in with this username \u2014 it is created by you, along with your password above.")}</span>
                  </p>
                </div>
                <div className="form-group">
                  <label>{t("Connect a School")}</label>
                  {selectedSchool ? <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ flex: 1, background: "rgba(255,140,0,0.1)", border: "1px solid rgba(255,140,0,0.4)", borderRadius: 6, padding: "8px 10px", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <School size={14} />
                        <span>{selectedSchool.name}</span>
                        {selectedSchool.short_code ? <span style={{ fontFamily: "monospace", color: "var(--vt-orange)", marginLeft: 8 }}>{selectedSchool.short_code}</span> : null}
                      </span>
                      <button type="button" className="btn btn-sm btn-secondary" onClick={() => {
    setSelectedSchool(null);
    setSchoolQuery("");
  }}>
                        {t("Change")}
                      </button>
                    </div> : <>
                      <input
    type="text"
    value={schoolQuery}
    onChange={(e) => setSchoolQuery(e.target.value)}
    placeholder={t("Search school name or code...")}
  />
                      {schoolSearching && <p style={{ fontSize: 12, color: "var(--vt-muted)", margin: "4px 0 0" }}>{t("Searching...")}</p>}
                      {!schoolSearching && !!schoolResults.length && <div className="text-list" style={{ marginTop: 6, maxHeight: 180, overflow: "auto" }}>
                          {schoolResults.map((sc) => <div
    className="text-item"
    key={sc.id}
    style={{ cursor: "pointer" }}
    onClick={() => {
      setSelectedSchool(sc);
      setSchoolQuery("");
    }}
  >
                              <div className="text-title">{sc.name}</div>
                              <div className="text-meta">
                                {[sc.short_code, sc.city, sc.state].filter(Boolean).join(" \xB7 ")}
                              </div>
                            </div>)}
                        </div>}
                      {!schoolSearching && schoolQuery.trim().length >= 2 && !schoolResults.length && <p style={{ fontSize: 12, color: "#e55", margin: "4px 0 0" }}>{t("No school found \u2014 check the spelling or the school code.")}</p>}
                    </>}
                  <p style={{ fontSize: 12, color: "var(--vt-muted)", margin: "4px 0 0", display: "flex", alignItems: "center", gap: 6 }}>
                    <Link2 size={13} />
                    <span>{t("Your students join the same school with its code, and appear in your real Teacher Dashboard roster.")}</span>
                  </p>
                </div>
                <p style={{ fontSize: 12, color: "var(--vt-muted)", margin: 0, display: "flex", alignItems: "center", gap: 6 }}>
                  <GraduationCap size={14} />
                  <span>{t("Teacher accounts can be linked now or later \u2014 the dashboard always shows your real school data, never demo numbers.")}</span>
                </p>
              </div>}

            <div className="form-group">
              <label>{t("Full Name")}</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("Your name")} required />
            </div>
            <div className="form-group">
              <label>{t("Email")}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required />
            </div>
            <div className="form-group">
              <label>{t("Password")}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("At least 8 characters")} required minLength={8} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={loading}>
              {loading ? t("Creating account...") : t("Create Account")}
            </button>
          </form>}

        <div className="auth-footer">
          {t("Already have an account? ")}<a onClick={() => navigate("/auth/login")}>{t("Sign in")}</a>
        </div>
      </div>
    </div>;
}
export {
  PENDING_SCHOOL_KEY,
  PENDING_TEACHER_KEY,
  SignupPage as default
};
