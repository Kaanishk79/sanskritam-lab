import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  BarChart3,
  FlaskConical,
  FileText,
  MessageSquare,
  BookOpen
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useRole } from "../../context/RoleContext";
import { supabase } from "../../services/supabase";
import { getAuthState } from "../../services/auth";
function TeacherDashboardPage() {
  const { t } = useLanguage();
  const { user, role, school, canSwitch, setRole } = useRole();
  const navigate = useNavigate();
  const live = role === "teacher" || role === "institution";
  const allSections = school ? school.classes.flatMap((c) => (c.sections || []).map((sec) => ({ ...sec, className: c.name }))) : [];
  const activeStudents = school ? school.classes.flatMap((c) => (c.sections || []).flatMap((sec) => sec.students || [])).filter((st) => st.is_active) : [];
  const classes = school ? school.classes.filter((c) => c.is_active) : [];
  const [liveStats, setLiveStats] = useState(null);
  useEffect(() => {
    let live2 = true;
    const user2 = getAuthState().user;
    if (!user2) return;
    Promise.all([
      supabase.from("user_progress").select("streak"),
      supabase.from("assessment_attempts").select("id")
    ]).then(([progressRes, attemptsRes]) => {
      if (!live2) return;
      const rows = progressRes.data ?? [];
      const attempts = attemptsRes.data?.length ?? 0;
      setLiveStats({
        learners: rows.length,
        avgStreak: rows.length > 0 ? Math.round(rows.reduce((s, r) => s + (r.streak ?? 0), 0) / rows.length) : 0,
        attempts
      });
    }).catch(() => void 0);
    return () => {
      live2 = false;
    };
  }, []);
  const liveCard = liveStats && <div className="card" style={{ marginTop: 16 }}>
      <h3 style={{ marginTop: 0, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
        <BarChart3 size={18} /> <span>{t("Live data")}</span>
      </h3>
      <div className="analytics-grid" style={{ marginBottom: 0 }}>
        <div className="stat-card">
          <div className="stat-value">{liveStats.learners}</div>
          <div className="stat-label">{t("Total Learners")}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{liveStats.avgStreak}</div>
          <div className="stat-label">{t("Avg. Streak")}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{liveStats.attempts}</div>
          <div className="stat-label">{t("Attempts Submitted")}</div>
        </div>
      </div>
    </div>;
  if (live && school && user?.accountType !== "student") {
    return <div className="page-container">
        <div className="page-header">
          <h2>{t("Teacher Dashboard")} — {school.name}</h2>
          <p>{t("Live roster from your institution. Switch views from the top bar.")}</p>
        </div>

        <div className="analytics-grid">
          <div className="stat-card">
            <div className="stat-value">{activeStudents.length}</div>
            <div className="stat-label">{t("Students")}</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{school.teacher_count}</div>
            <div className="stat-label">{t("Teachers")}</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{classes.length}</div>
            <div className="stat-label">{t("Active Classes")}</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{allSections.length}</div>
            <div className="stat-label">{t("Sections")}</div>
          </div>
        </div>

        {liveCard}

        <div className="grid-2">
          <div className="card">
            <h3 style={{ marginBottom: 16 }}>{t("My Classes")}</h3>
            <div className="text-list">
              {classes.map((c) => <div className="text-item" key={c.id}>
                  <div>
                    <div className="text-title">{c.name}</div>
                    <div className="text-meta">
                      {(c.sections || []).filter((s) => s.is_active).map((s) => `${s.name} (${s.student_count})`).join(" \xB7 ") || t("No sections yet")}
                    </div>
                  </div>
                </div>)}
              {!classes.length && <p style={{ color: "var(--vt-muted)" }}>{t("No classes yet \u2014 add them in Institution HQ.")}</p>}
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: 16 }}>{t("Class Teachers")}</h3>
            <div className="text-list">
              {school.teachers.filter((tc) => tc.status !== "inactive").map((tc) => <div className="text-item" key={tc.id}>
                  <div>
                    <div className="text-title">{tc.name}</div>
                    <div className="text-meta">
                      {Array.isArray(tc.subjects) ? tc.subjects.join(", ") : tc.subjects || tc.designation || t("Teacher")} · {tc.teacher_code}
                    </div>
                  </div>
                </div>)}
              {!school.teachers.length && <p style={{ color: "var(--vt-muted)" }}>{t("No teachers yet \u2014 add them in Institution HQ.")}</p>}
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 24 }}>
          <h3 style={{ marginBottom: 16 }}>{t("Student Roll")}</h3>
          <div className="text-list">
            {activeStudents.slice(0, 30).map((st) => <div className="text-item" key={st.id}>
                <div>
                  <div className="text-title">{st.name} <span style={{ color: "var(--vt-muted)", fontSize: 12 }}>· {t("Roll")} {st.roll_no || "\u2014"}</span></div>
                  <div className="text-meta">
                    {classes.find((c) => c.id === st.class_id)?.name || "\u2014"} — {allSections.find((x) => x.id === st.section_id)?.name || "\u2014"}
                  </div>
                </div>
              </div>)}
            {!activeStudents.length && <p style={{ color: "var(--vt-muted)" }}>{t("No students yet \u2014 add them in Institution HQ.")}</p>}
          </div>
          {canSwitch && role !== "teacher" && <button className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => setRole("teacher")}>{t("Switch to Teacher View")}</button>}
        </div>
      </div>;
  }
  if (live && !school && user) {
    return <div className="card" style={{ padding: 32, textAlign: "center", maxWidth: 480, margin: "40px auto" }}>
        <div style={{ display: "inline-flex", justifyContent: "center", marginBottom: 12 }}>
          <GraduationCap size={44} color="var(--vt-orange)" />
        </div>
        <h3>{t("Teacher Dashboard")}</h3>
        <p>{t("No school linked to this account yet.")}</p>
        {canSwitch ? <button className="btn btn-primary" onClick={() => navigate("/teaching/school")}>{t("Go to Institution HQ")}</button> : <button className="btn btn-primary" onClick={() => navigate("/auth/signup")}>{t("Create Institution Account")}</button>}
      </div>;
  }
  return <div className="page-container">
      <div className="page-header">
        <h2>{t("Teacher Dashboard")}</h2>
        <p>{t("Create custom lesson plans, design interactive exercises, and annotate manuscripts for classes")}</p>
      </div>

      <div className="card" style={{ padding: 12, marginBottom: 16, borderColor: "rgba(255,140,0,0.4)", background: "rgba(255,140,0,0.05)" }}>
        <span style={{ fontSize: 13, color: "#ffb26b", display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <FlaskConical size={14} />
          <span>{t("Preview \u2014 sample data below. Create a teacher account and connect your school to see your real students here.")}</span>
          <button className="btn btn-sm btn-primary" style={{ marginLeft: 8 }} onClick={() => navigate("/auth/signup")}>{t("Create Teacher Account")}</button>
        </span>
      </div>

      <div className="analytics-grid">
        <div className="stat-card">
          <div className="stat-value">24</div>
          <div className="stat-label">{t("Students")}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">8</div>
          <div className="stat-label">{t("Lesson Plans")}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">92%</div>
          <div className="stat-label">{t("Avg. Score")}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">3</div>
          <div className="stat-label">{t("Active Classes")}</div>
        </div>
      </div>

      {liveCard}

      <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>{t("Upcoming Lessons")}</h3>
          <div className="text-list">
            <div className="text-item">
              <div>
                <div className="text-title">{t("Sandhi Rules \u2014 Class 5")}</div>
                <div className="text-meta">{t("Tomorrow 10:00 AM \xB7 12 students")}</div>
              </div>
            </div>
            <div className="text-item">
              <div>
                <div className="text-title">{t("Bhagavad G\u012Bt\u0101 2.47")}</div>
                <div className="text-meta">{t("Wed 2:00 PM \xB7 15 students")}</div>
              </div>
            </div>
            <div className="text-item">
              <div>
                <div className="text-title">{t("Noun Declensions")}</div>
                <div className="text-meta">{t("Fri 11:00 AM \xB7 10 students")}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 16 }}>{t("Recent Activity")}</h3>
          <div style={{ color: "var(--vt-muted)", fontSize: 14, lineHeight: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><FileText size={14} /> <span>{t("Ravi submitted declension exercise \u2014 85%")}</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><FileText size={14} /> <span>{t("Priya submitted sandhi quiz \u2014 92%")}</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><MessageSquare size={14} /> <span>{t("Ananya asked about compound splitting")}</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><BookOpen size={14} /> <span>{t("Class 5 completed \u1E5Agveda 1.1")}</span></div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <h3 style={{ marginBottom: 16 }}>{t("Create Lesson Plan")}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input placeholder={t("Lesson title...")} />
          <textarea
    placeholder={t("Lesson content, objectives, and exercises...")}
    style={{ minHeight: 120, resize: "vertical", background: "rgba(255,255,255,0.03)", color: "var(--vt-text)", border: "1px solid var(--vt-border)", borderRadius: 6, padding: 12 }}
  />
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn btn-primary">{t("Save Lesson")}</button>
            <button className="btn btn-secondary">{t("Assign to Class")}</button>
          </div>
        </div>
      </div>
    </div>;
}
export {
  TeacherDashboardPage as default
};
