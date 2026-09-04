import { useEffect, useState } from "react";
import {
  BookOpen,
  FileText,
  Users,
  BookMarked,
  BarChart3,
  GraduationCap
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useRole } from "../../context/RoleContext";
import { supabase } from "../../services/supabase";
import { getAuthState } from "../../services/auth";
function StudentWorkspacePage() {
  const { t } = useLanguage();
  const { role, school, canSwitch, setRole } = useRole();
  const [activeTool, setActiveTool] = useState("text");
  const [liveStats, setLiveStats] = useState(null);
  const isEnrolled = role === "student" && !!school;
  const sampleClass = school?.classes?.[0];
  const sampleSection = sampleClass?.sections?.[0];
  const sampleStudent = sampleSection?.students?.[0];
  const classmates = (sampleSection?.students || []).filter((s) => s.id !== sampleStudent?.id);
  useEffect(() => {
    let live = true;
    const user = getAuthState().user;
    if (!user) return;
    Promise.all([
      supabase.from("user_progress").select("xp, streak, lessons_completed, daily_completed").eq("user_id", user.id).maybeSingle(),
      supabase.from("assessment_attempts").select("score, max_score").eq("user_id", user.id),
      supabase.from("lab_assignment_attempts").select("id").eq("student_id", user.id)
    ]).then(([progressRes, attemptsRes, labRes]) => {
      if (!live) return;
      const p = progressRes.data;
      const attempts = attemptsRes.data ?? [];
      const labAttempts = labRes.data?.length ?? 0;
      const avgScore = attempts.length > 0 ? Math.round(attempts.reduce((s, a) => s + (a.max_score ? a.score / a.max_score * 100 : 0), 0) / attempts.length) : 0;
      setLiveStats({
        xp: p?.xp ?? 0,
        streak: p?.streak ?? 0,
        attempts: attempts.length,
        avgScore,
        labAttempts
      });
    }).catch(() => void 0);
    return () => {
      live = false;
    };
  }, []);
  if (isEnrolled && sampleStudent) {
    return <div className="page-container">
        <div className="page-header">
          <h2>{t("Student Workspace")} — {school?.name}</h2>
          <p>{t("Enrolled in")} <strong>{sampleClass?.name || t("Class")}</strong> · {t("Section")} <strong>{sampleSection?.name || "A"}</strong> · {t("Roll")} <strong>{sampleStudent.roll_no || "\u2014"}</strong></p>
        </div>

        <div className="analytics-grid">
          <div className="stat-card">
            <div className="stat-value">{sampleClass?.name || "\u2014"}</div>
            <div className="stat-label">{t("My Class")}</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{sampleSection?.name || "\u2014"}</div>
            <div className="stat-label">{t("My Section")}</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{classmates.length + 1}</div>
            <div className="stat-label">{t("Classmates in Section")}</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">3</div>
            <div className="stat-label">{t("Pending Exercises")}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          {[
      { key: "text", label: t("Current Text"), icon: BookOpen },
      { key: "exercises", label: t("Exercises"), icon: FileText },
      { key: "classmates", label: t("My Classmates"), icon: Users }
    ].map((tool) => {
      const Icon = tool.icon;
      return <button
        key={tool.key}
        className={`btn ${activeTool === tool.key ? "btn-primary" : "btn-secondary"}`}
        onClick={() => setActiveTool(tool.key)}
        style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
      >
                <Icon size={14} />
                <span>{tool.label}</span>
              </button>;
    })}
        </div>

        {activeTool === "text" && <div className="card">
            <div style={{ fontSize: 12, color: "var(--vt-muted)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
              {t("Current Assignment \u2014 Bhagavad G\u012Bt\u0101 2.47 \xB7")} {sampleClass?.name || t("Class")} — {sampleSection?.name || "A"}
            </div>
            <div style={{ fontSize: 28, lineHeight: 1.8, fontFamily: "'Noto Sans Devanagari', serif", color: "var(--vt-text)", marginBottom: 16 }}>
              मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥
            </div>
            <div style={{ color: "var(--vt-muted)" }}>
              <p><strong>{t("Word-by-word:")}</strong> {t("m\u0101 \u2014 not, phale\u1E63u \u2014 in fruits, kad\u0101cana \u2014 ever")}</p>
              <p><strong>{t("Translation:")}</strong> {t("Never be motivated by the fruits of action, nor be attached to inaction.")}</p>
            </div>
          </div>}

        {activeTool === "exercises" && <div className="card">
            <h3 style={{ marginBottom: 16 }}>{t("Pending Exercises")}</h3>
            <div className="text-list">
              <div className="text-item">
                <div className="text-title">{t("Declension Drill \u2014 \u0930\u093E\u092E")}</div>
                <div className="text-meta">{t("Due tomorrow \xB7 8/10 correct")}</div>
              </div>
              <div className="text-item">
                <div className="text-title">{t("Sandhi Practice \u2014 Unit 3")}</div>
                <div className="text-meta">{t("Due Fri \xB7 Not started")}</div>
              </div>
              <div className="text-item">
                <div className="text-title">{t("Vocabulary Quiz \u2014 Week 4")}</div>
                <div className="text-meta">{t("Completed \xB7 95%")}</div>
              </div>
            </div>
          </div>}

        {activeTool === "classmates" && <div className="card">
            <h3 style={{ marginBottom: 16 }}>{t("My Classmates")} — {sampleSection?.name} ({classmates.length + 1})</h3>
            <div className="text-list">
              {[sampleStudent, ...classmates].map((st) => <div className="text-item" key={st.id}>
                  <div>
                    <div className="text-title">{st.name}{st.id === sampleStudent.id ? " (" + t("you \u2014 preview") + ")" : ""}</div>
                    <div className="text-meta">{t("Roll")} {st.roll_no || "\u2014"}{st.father_name ? " \xB7 " + st.father_name : ""}</div>
                  </div>
                </div>)}
              {!classmates.length && <p style={{ color: "var(--vt-muted)" }}>{t("Only you in this section so far.")}</p>}
            </div>
          </div>}
      </div>;
  }
  if (canSwitch && school) {
    return <div className="card" style={{ padding: 32, textAlign: "center", maxWidth: 520, margin: "40px auto" }}>
        <div style={{ display: "inline-flex", justifyContent: "center", marginBottom: 12 }}>
          <GraduationCap size={44} color="var(--vt-orange)" />
        </div>
        <h3>{t("Student Workspace")}</h3>
        <p>{t("As an institution you can preview the student experience for your enrolled students.")}</p>
        <button className="btn btn-primary" onClick={() => setRole("student")}>{t("Enter Student View")}</button>
      </div>;
  }
  return <div className="page-container">
      <div className="page-header">
        <h2>{t("Student Workspace")}</h2>
        <p>{t("Guided learning area with interactive texts, visualization tools, and collaboration")}</p>
      </div>

      <div className="analytics-grid">
        <div className="stat-card">
          <div className="stat-value">156</div>
          <div className="stat-label">{t("Verses Read")}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">34</div>
          <div className="stat-label">{t("Exercises Done")}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">88%</div>
          <div className="stat-label">{t("Accuracy")}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">5</div>
          <div className="stat-label">{t("Day Streak")}</div>
        </div>
      </div>

      {liveStats && <div className="card" style={{ marginTop: 16 }}>
          <h3 style={{ marginTop: 0, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <BarChart3 size={18} /> <span>{t("Live data")}</span>
          </h3>
          <div className="analytics-grid" style={{ marginBottom: 0 }}>
            <div className="stat-card">
              <div className="stat-value">{liveStats.streak}</div>
              <div className="stat-label">{t("Day Streak")}</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{liveStats.xp}</div>
              <div className="stat-label">{t("XP")}</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{liveStats.attempts}</div>
              <div className="stat-label">{t("Attempts")}</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{liveStats.avgScore}%</div>
              <div className="stat-label">{t("Avg Score")}</div>
            </div>
          </div>
          {liveStats.labAttempts > 0 && <p style={{ color: "var(--vt-muted)", fontSize: 13, marginTop: 12 }}>
              {t("Lab practice")}: {liveStats.labAttempts} {t("attempts")}
            </p>}
        </div>}

      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {[
    { key: "text", label: t("Current Text"), icon: BookOpen },
    { key: "exercises", label: t("Exercises"), icon: FileText },
    { key: "notes", label: t("My Notes"), icon: BookMarked }
  ].map((item) => {
    const Icon = item.icon;
    return <button
      key={item.key}
      className={`btn ${activeTool === item.key ? "btn-primary" : "btn-secondary"}`}
      onClick={() => setActiveTool(item.key)}
      style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
    >
              <Icon size={14} />
              <span>{item.label}</span>
            </button>;
  })}
      </div>

      {activeTool === "text" && <div className="card">
          <div style={{ fontSize: 12, color: "var(--vt-muted)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
            {t("Current Assignment \u2014 Bhagavad G\u012Bt\u0101 2.47")}
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.8, fontFamily: "'Noto Sans Devanagari', serif", color: "var(--vt-text)", marginBottom: 16 }}>
            मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥
          </div>
          <div style={{ color: "var(--vt-muted)" }}>
            <p><strong>{t("Word-by-word:")}</strong> {t("m\u0101 \u2014 not, phale\u1E63u \u2014 in fruits, kad\u0101cana \u2014 ever")}</p>
            <p><strong>{t("Translation:")}</strong> {t("Never be motivated by the fruits of action, nor be attached to inaction.")}</p>
          </div>
        </div>}

      {activeTool === "exercises" && <div className="card">
          <h3 style={{ marginBottom: 16 }}>{t("Pending Exercises")}</h3>
          <div className="text-list">
            <div className="text-item">
              <div className="text-title">{t("Declension Drill \u2014 \u0930\u093E\u092E")}</div>
              <div className="text-meta">{t("Due tomorrow \xB7 8/10 correct")}</div>
            </div>
            <div className="text-item">
              <div className="text-title">{t("Sandhi Practice \u2014 Unit 3")}</div>
              <div className="text-meta">{t("Due Fri \xB7 Not started")}</div>
            </div>
            <div className="text-item">
              <div className="text-title">{t("Vocabulary Quiz \u2014 Week 4")}</div>
              <div className="text-meta">{t("Completed \xB7 95%")}</div>
            </div>
          </div>
        </div>}

      {activeTool === "notes" && <div className="card">
          <textarea
    placeholder={t("Write your notes here...")}
    style={{ width: "100%", minHeight: 200, background: "rgba(255,255,255,0.03)", color: "var(--vt-text)", border: "1px solid var(--vt-border)", borderRadius: 6, padding: 12, resize: "vertical" }}
  />
        </div>}
    </div>;
}
export {
  StudentWorkspacePage as default
};
