import { useNavigate } from "react-router-dom";
import { Lock, School } from "lucide-react";
import { useRole } from "../context/RoleContext";
import { useLanguage } from "../context/LanguageContext";

function SchoolOnly({ children }) {
  const navigate = useNavigate();
  const { user, guest } = useRole();
  const { t } = useLanguage();

  if (user?.accountType === "institution") return <>{children}</>;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <Lock size={40} color="var(--vt-orange)" />
          </div>
          <h2>{t("School feature")}</h2>
          <p>{t("The Language Lab is available only to institution / school accounts.")}</p>
        </div>

        <div className="card" style={{ textAlign: "center", padding: 28 }}>
          <p style={{ color: "var(--vt-text-light)", fontSize: 13.5, lineHeight: 1.7, marginBottom: 18 }}>
            {t("Sign in with a school account — or register your school for free — to unlock the Pronunciation Lab with speech recognition, recordings, and teacher feedback.")}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {guest && (
              <button className="btn btn-primary" onClick={() => navigate("/auth/login")}>
                {t("Sign In")}
              </button>
            )}
            <button className="btn btn-primary" onClick={() => navigate("/auth/signup?type=institution")} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <School size={16} /> <span>{t("Register School")}</span>
            </button>
            {!guest && (
              <button className="btn btn-secondary" onClick={() => navigate("/auth/login")}>
                {t("Sign In")}
              </button>
            )}
            <button className="btn btn-outline" onClick={() => navigate("/")}>
              {t("Go to Dashboard")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SchoolOnly as default };
