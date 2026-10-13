import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  School,
  Users,
  GraduationCap,
  Search,
  Plus,
  X,
  BookOpen,
  Clock
} from "lucide-react";
import { useRole } from "../../context/RoleContext";
import { schoolsApi } from "../../services/schools";
import { useLanguage } from "../../context/LanguageContext";
function InstitutionDashboardPage() {
  const { user, school, schoolLoading, refreshSchool } = useRole();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [className, setClassName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [sectionForClass, setSectionForClass] = useState("");
  const [busy, setBusy] = useState("");
  const [notice, setNotice] = useState("");
  const [newStudent, setNewStudent] = useState({});
  const [newTeacher, setNewTeacher] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [claiming, setClaiming] = useState("");
  const [registering, setRegistering] = useState(false);
  const [newSchool, setNewSchool] = useState({ name: "", city: "", state: "", school_type: "Senior Secondary School" });
  const doSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const res = await schoolsApi.list({ q: searchQuery });
      setSearchResults(res.data);
    } catch (e) {
      setNotice("Error: " + e.message);
    } finally {
      setSearching(false);
    }
  };
  const doClaim = async (schoolId) => {
    setClaiming(schoolId);
    setNotice("");
    try {
      await schoolsApi.claim(schoolId);
      await refreshSchool();
      setNotice(t("School claimed \u2014 welcome to your Institution HQ!"));
    } catch (e) {
      setNotice("Error: " + e.message);
    } finally {
      setClaiming("");
    }
  };
  const doRegister = async () => {
    if (!newSchool.name.trim()) return;
    setRegistering(true);
    setNotice("");
    try {
      await schoolsApi.create(newSchool);
      await refreshSchool();
      setNotice(t("School registered \u2014 welcome to your Institution HQ!"));
    } catch (e) {
      setNotice("Error: " + e.message);
    } finally {
      setRegistering(false);
    }
  };
  const run = async (key, fn) => {
    setBusy(key);
    setNotice("");
    try {
      await fn();
      await refreshSchool();
      setNotice(t("Saved"));
    } catch (e) {
      setNotice("Error: " + e.message);
    } finally {
      setBusy("");
    }
  };
  if (schoolLoading && !school) {
    return <div className="card" style={{ padding: 32, textAlign: "center" }}>{t("Loading your school...")}</div>;
  }
  if (!school) {
    return <div className="page-container" style={{ maxWidth: 720, margin: "0 auto" }}>
        <div className="page-header">
          <h2>{t("Institution HQ")}</h2>
          <p>{t("No school is linked to your account yet. Claim your school from the directory or register a new one.")}</p>
          {notice && <p style={{ color: "#4caf50", fontWeight: 600 }}>{notice}</p>}
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <Search size={18} /> <span>{t("Find & claim your school")}</span>
          </h3>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <input
      style={{ flex: 1 }}
      placeholder={t("Search school name, city, or short code\u2026")}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && doSearch()}
    />
            <button className="btn btn-primary btn-sm" disabled={searching || !searchQuery.trim()} onClick={doSearch} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              {searching ? <Clock size={13} /> : <Search size={13} />}
              <span>{t("Search")}</span>
            </button>
          </div>
          <div className="text-list">
            {searchResults.map((s2) => <div className="text-item" key={s2.id}>
                <div style={{ flex: 1 }}>
                  <div className="text-title">{s2.name}</div>
                  <div className="text-meta">
                    {s2.city || ""}{s2.city && s2.state ? ", " : ""}{s2.state || ""} · {s2.school_type || t("School")} · {s2.board || ""} · {t("Code")}: {s2.short_code || "\u2014"}
                  </div>
                  {s2.owner_id && <div className="text-meta" style={{ color: "#e55" }}>{t("Already claimed by another account")}</div>}
                </div>
                <button
      className="btn btn-sm btn-primary"
      disabled={claiming === s2.id || !!s2.owner_id}
      onClick={() => doClaim(s2.id)}
    >
                  {claiming === s2.id ? "..." : t("Claim")}
                </button>
              </div>)}
            {!searchResults.length && <p style={{ color: "var(--vt-muted)" }}>{t("Search the CBSE school directory \u2014 your school may already be listed.")}</p>}
          </div>
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <h3 style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <Plus size={18} /> <span>{t("Register a new school")}</span>
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <input style={{ gridColumn: "1 / -1" }} placeholder={t("School name *")} value={newSchool.name} onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })} />
            <input placeholder={t("City")} value={newSchool.city} onChange={(e) => setNewSchool({ ...newSchool, city: e.target.value })} />
            <input placeholder={t("State")} value={newSchool.state} onChange={(e) => setNewSchool({ ...newSchool, state: e.target.value })} />
            <select style={{ gridColumn: "1 / -1" }} value={newSchool.school_type} onChange={(e) => setNewSchool({ ...newSchool, school_type: e.target.value })}>
              {["Primary School", "Middle School", "Secondary School", "Senior Secondary School", "Other"].map((x) => <option key={x} value={x}>{x}</option>)}
            </select>
          </div>
          <button className="btn btn-primary btn-sm" style={{ marginTop: 12 }} disabled={registering || !newSchool.name.trim()} onClick={doRegister}>
            {registering ? "..." : t("Register School")}
          </button>
        </div>
      </div>;
  }
  const s = school;
  const allSections = s.classes.flatMap((c) => (c.sections || []).map((sec) => ({ ...sec, className: c.name })));
  const classOptions = s.classes.filter((c) => c.is_active);
  const sectionOptions = allSections.filter((x) => x.is_active && (!newStudent.class_id || x.class_id === newStudent.class_id));
  const activeStudents = s.classes.flatMap((c) => (c.sections || []).flatMap((sec) => sec.students || [])).filter((st) => st.is_active);
  return <div className="page-container">
      <div className="page-header">
        <h2>{t("Institution HQ")} — {s.name}</h2>
        <p>{s.city || ""}{s.city && s.state ? ", " : ""}{s.state || ""} · {s.school_type || t("School")} · {s.board || t("CBSE")} · {t("Short code")}: {s.short_code || "\u2014"}</p>
        {notice && <p style={{ color: "#4caf50", fontWeight: 600 }}>{notice}</p>}
      </div>

      <div className="analytics-grid">
        <div className="stat-card">
          <div className="stat-value">{s.student_count}</div>
          <div className="stat-label">{t("Active Students")}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{s.teacher_count}</div>
          <div className="stat-label">{t("Teachers")}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{s.classes.length}</div>
          <div className="stat-label">{t("Classes")}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{allSections.length}</div>
          <div className="stat-label">{t("Sections")}</div>
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: 16 }}>
        <div className="card">
          <h3 style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <BookOpen size={18} /> <span>{t("Classes & Sections")}</span>
          </h3>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <input
    style={{ flex: 1 }}
    placeholder={t("New class e.g. Class 6")}
    value={className}
    onChange={(e) => setClassName(e.target.value)}
  />
            <button
    className="btn btn-primary btn-sm"
    disabled={busy === "class" || !className.trim()}
    onClick={() => run("class", () => schoolsApi.createClass(s.id, className).then(() => setClassName("")))}
  >
              {t("Add")}
            </button>
          </div>
          {s.classes.filter((c) => c.is_active).map((c) => <div key={c.id} style={{ borderBottom: "1px solid var(--vt-border)", padding: "10px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <strong style={{ flex: 1 }}>{c.name}</strong>
                <button className="btn btn-sm btn-outline" disabled={busy === "section"} onClick={() => setSectionForClass(c.id)}>
                  {t("Add Section")}
                </button>
                <button className="btn btn-sm btn-outline" style={{ color: "#e55" }} disabled={busy === "delClass"} onClick={() => run("delClass", () => schoolsApi.deactivateClass(s.id, c.id))}>
                  <X size={12} />
                </button>
              </div>
              {sectionForClass === c.id && <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <input
    style={{ flex: 1 }}
    placeholder={t("Section e.g. A")}
    value={sectionName}
    onChange={(e) => setSectionName(e.target.value)}
  />
                  <button
    className="btn btn-sm btn-primary"
    disabled={!sectionName.trim()}
    onClick={() => {
      const name = sectionName;
      setSectionName("");
      setSectionForClass("");
      void run("section", () => schoolsApi.createSection(s.id, c.id, name));
    }}
  >
                    {t("Add")}
                  </button>
                </div>}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                {(c.sections || []).filter((sec) => sec.is_active).map((sec) => <span key={sec.id} className="tag" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    {sec.name} · {sec.student_count}
                    <button
    className="btn btn-sm"
    style={{ padding: "0 4px", color: "#e55", background: "transparent", border: "none", cursor: "pointer" }}
    disabled={busy === "delSection"}
    onClick={() => run("delSection", () => schoolsApi.deactivateSection(s.id, c.id, sec.id))}
  >
                      <X size={11} />
                    </button>
                  </span>)}
                {!(c.sections || []).length && <span style={{ color: "var(--vt-muted)", fontSize: 13 }}>{t("No sections yet")}</span>}
              </div>
            </div>)}
          {!s.classes.filter((c) => c.is_active).length && <p style={{ color: "var(--vt-muted)" }}>{t("No classes yet \u2014 add your first class above.")}</p>}
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <GraduationCap size={18} /> <span>{t("Teachers")}</span>
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
            <input placeholder={t("Name")} value={newTeacher.name || ""} onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })} />
            <input placeholder={t("Email")} value={newTeacher.email || ""} onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })} />
            <input placeholder={t("Username")} value={newTeacher.auth_username || ""} onChange={(e) => setNewTeacher({ ...newTeacher, auth_username: e.target.value })} />
            <input placeholder={t("Subject")} value={(Array.isArray(newTeacher.subjects) ? newTeacher.subjects[0] : newTeacher.subjects) || ""} onChange={(e) => setNewTeacher({ ...newTeacher, subjects: e.target.value ? [e.target.value] : [] })} />
            <input placeholder={t("Designation")} value={newTeacher.designation || ""} onChange={(e) => setNewTeacher({ ...newTeacher, designation: e.target.value })} />
          </div>
          <button
    className="btn btn-primary btn-sm"
    style={{ marginBottom: 16 }}
    disabled={busy === "teacher" || !newTeacher.name}
    onClick={() => {
      const body = { ...newTeacher, designation: newTeacher.designation || t("Teacher") };
      setNewTeacher({});
      void run("teacher", () => schoolsApi.createTeacher(s.id, body));
    }}
  >
            {t("Add Teacher")}
          </button>
          <div className="text-list">
            {s.teachers.filter((tc) => tc.status !== "inactive").map((tc) => <div className="text-item" key={tc.id}>
                <div style={{ flex: 1 }}>
                  <div className="text-title">{tc.name} <span style={{ color: "var(--vt-orange)", fontFamily: "monospace", fontSize: 12 }}>{tc.teacher_code}</span></div>
                  <div className="text-meta">
                    {Array.isArray(tc.subjects) ? tc.subjects.join(", ") : tc.subjects || ""} · {tc.designation || t("Teacher")}
                    {tc.email ? " \xB7 " + tc.email : ""}
                    {tc.auth_username ? ` \xB7 @${tc.auth_username}` : ""}
                  </div>
                </div>
                <button className="btn btn-sm" style={{ color: "#e55", background: "transparent", border: "none", cursor: "pointer" }} disabled={busy === "delTeacher"} onClick={() => run("delTeacher", () => schoolsApi.deactivateTeacher(s.id, tc.id))}>
                  {t("Remove")}
                </button>
              </div>)}
            {!s.teachers.length && <p style={{ color: "var(--vt-muted)" }}>{t("No teachers yet")}</p>}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <Users size={18} /> <span>{t("Students")} ({activeStudents.length})</span>
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8, marginBottom: 12 }}>
          <input placeholder={t("Student name")} value={newStudent.name || ""} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
          <select value={newStudent.class_id || ""} onChange={(e) => setNewStudent({ ...newStudent, class_id: e.target.value || null, section_id: null })}>
            <option value="">{t("Class...")}</option>
            {classOptions.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select value={newStudent.section_id || ""} onChange={(e) => setNewStudent({ ...newStudent, section_id: e.target.value || null })}>
            <option value="">{t("Section (auto roll)...")}</option>
            {sectionOptions.map((x) => <option key={x.id} value={x.id}>{x.className} — {x.name}</option>)}
          </select>
          <input placeholder={t("Roll no (optional)")} value={newStudent.roll_no || ""} onChange={(e) => setNewStudent({ ...newStudent, roll_no: e.target.value })} />
        </div>
        <button
    className="btn btn-primary btn-sm"
    style={{ marginBottom: 16 }}
    disabled={busy === "student" || !newStudent.name || !newStudent.class_id && !newStudent.section_id}
    onClick={() => {
      const body = { ...newStudent };
      setNewStudent({});
      void run("student", () => schoolsApi.createStudent(s.id, body));
    }}
  >
          {t("Add Student")}
        </button>
        <div className="text-list">
          {activeStudents.map((st) => <div className="text-item" key={st.id}>
              <div style={{ flex: 1 }}>
                <div className="text-title">{st.name} <span style={{ color: "var(--vt-muted)", fontSize: 12 }}>· {t("Roll")} {st.roll_no || "\u2014"}</span></div>
                <div className="text-meta">
                  {classOptions.find((c) => c.id === st.class_id)?.name || "\u2014"}
                  {" \u2014 "}{allSections.find((x) => x.id === st.section_id)?.name || "\u2014"}
                  {st.father_name ? " \xB7 " + st.father_name : ""}
                </div>
              </div>
              <button className="btn btn-sm" style={{ color: "#e55", background: "transparent", border: "none", cursor: "pointer" }} disabled={busy === "delStudent"} onClick={() => run("delStudent", () => schoolsApi.deactivateStudent(s.id, st.id))}>
                {t("Remove")}
              </button>
            </div>)}
          {!activeStudents.length && <p style={{ color: "var(--vt-muted)" }}>{t("No students yet \u2014 add a class and a section first.")}</p>}
        </div>
      </div>
    </div>;
}
export {
  InstitutionDashboardPage as default
};
