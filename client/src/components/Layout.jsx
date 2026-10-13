import { useState, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Home,
  Search,
  Sparkles,
  BookOpen,
  Sun,
  Moon,
  TreePine,
  Smile,
  Landmark,
  FileText,
  Layers,
  Activity,
  School,
  GraduationCap,
  ClipboardCheck,
  Bot,
  Mic,
  Puzzle,
  Stethoscope,
  Compass,
  Calendar,
  MessageSquareQuote,
  Network,
  Gamepad2,
  Swords,
  Palette,
  Layers2,
  BookMarked,
  Languages,
  Volume2,
  Sprout,
  Trophy,
  Keyboard,
  Menu,
  X,
  User,
  Globe,
  ExternalLink
} from "lucide-react";
import { OmIcon, PalmLeafIcon, TempleIcon, ShlokaIcon } from "./icons";
import { useTheme } from "../context/ThemeContext";
import { useKeyboard } from "../context/KeyboardContext";
import { useLanguage } from "../context/LanguageContext";
import { useRole } from "../context/RoleContext";
import { signOut } from "../services/auth";
const navSections = [
  {
    title: "Dashboard",
    links: [
      { to: "/", icon: <Home size={18} />, label: "Overview" }
    ]
  },
  {
    title: "Discover",
    links: [
      { to: "/search", icon: <Search size={18} />, label: "Sanskrit Search" },
      { to: "/explore", icon: <Sparkles size={18} />, label: "Explore Mode" },
      { to: "/dictionary", icon: <BookOpen size={18} />, label: "Dictionary" },
      { to: "/daily", icon: <Sun size={18} />, label: "Daily Sanskrit" }
    ]
  },
  {
    title: "NCERT Curriculum",
    links: [
      { to: "/research/ncert", icon: <BookMarked size={18} />, label: "NCERT Library" },
      { to: "/ncert/papers", icon: <FileText size={18} />, label: "Sample Papers (Sets 1-3)" }
    ]
  },
  {
    title: "Learning",
    links: [
      { to: "/learning/tree", icon: <TreePine size={18} />, label: "Learning Path" },
      
      { to: "/learning/curriculum", icon: <GraduationCap size={18} />, label: "Curriculum Builder" }
    ]
  },
  {
    title: "Research Suite",
    links: [
      { to: "/research/corpus", icon: <PalmLeafIcon size={18} />, label: "Corpus & Search" },
      { to: "/research/ocr", icon: <FileText size={18} />, label: "Manuscript OCR" },
      
    ]
  },
  {
    title: "Visualization",
    links: [
      { to: "/visualization/3d", icon: <Layers size={18} />, label: "3D Viewer" },
      { to: "/visualization/grammar", icon: <Network size={18} />, label: "Grammar Maps" },
      { to: "/visualization/timeline", icon: <Activity size={18} />, label: "Timeline" }
    ]
  },
  {
    title: "Teaching",
    links: [
      { to: "/teaching/school", icon: <School size={18} />, label: "Institution HQ" },
      { to: "/teaching/dashboard", icon: <GraduationCap size={18} />, label: "Teacher Dashboard" },
      { to: "/teaching/workspace", icon: <User size={18} />, label: "Student Workspace" },
      { to: "/teaching/assessment", icon: <ClipboardCheck size={18} />, label: "Assessment" }
    ]
  },
  {
    title: "AI Tools",
    links: [
      
      { to: "/tools/sentence", icon: <Puzzle size={18} />, label: "Sentence Builder" },
      { to: "/tools/fix", icon: <Stethoscope size={18} />, label: "Fix My Sanskrit" },
      { to: "/tools/story", icon: <BookOpen size={18} />, label: "Story Generator" },
      { to: "/tools/realworld", icon: <Globe size={18} />, label: "Sanskrit \u2192 Real World" },
      { to: "/tools/calendar", icon: <Calendar size={18} />, label: "Culture Calendar" },
      { to: "/tools/whosaid", icon: <MessageSquareQuote size={18} />, label: "Who Said It?" },
      { to: "/tools/etymology", icon: <Sprout size={18} />, label: "Etymology Tree" },
      { to: "/tools/concepts", icon: <Compass size={18} />, label: "Concept Explorer" },
      { to: "/tools/games", icon: <Gamepad2 size={18} />, label: "Learn Through Games" },
      { to: "/tools/debate", icon: <Swords size={18} />, label: "Debate Mode" },
      { to: "/tools/studio", icon: <Palette size={18} />, label: "Creative Studio" },
      { to: "/tools/flashcards", icon: <Layers2 size={18} />, label: "Flashcards (SRS)" },
      { to: "/tools/bookshelf", icon: <BookMarked size={18} />, label: "Bookshelf" },
      { to: "/tools/transliterate", icon: <Languages size={18} />, label: "Transliteration" },
      { to: "/tools/sandhi", icon: <Volume2 size={18} />, label: "Sandhi Tool" },
      { to: "/tools/dhatu", icon: <Sprout size={18} />, label: "Dh\u0101tu Explorer" },
      { to: "/tools/shloka", icon: <ShlokaIcon size={18} />, label: "संस्कृत श्लोकाः (Shlokas)" },
      { to: "/tools/jeopardy", icon: <Trophy size={18} />, label: "Sanskrit Jeopardy" }
    ]
  },
  {
    title: "Exam Practice",
    links: [
      { to: "/viva/simulator", icon: <Mic size={18} />, label: "Viva Simulator" },
      { to: "/viva/lab", icon: <Languages size={18} />, label: "Language Lab", schoolOnly: true },
      { to: "/viva/analytics", icon: <Activity size={18} />, label: "Analytics" }
    ]
  }
];
function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const { keyboardVisible, toggleKeyboard } = useKeyboard();
  const { t, lang, toggle: toggleLang } = useLanguage();
  const { user, role, setRole, canSwitch, guest, endGuest } = useRole();
  const kbDummyRef = useRef(null);
  const ROLE_OPTIONS = [
    { value: "institution", icon: <School size={15} />, label: "School" },
    { value: "teacher", icon: <GraduationCap size={15} />, label: "Teacher" },
    { value: "student", icon: <User size={15} />, label: "Student" }
  ];
  const handleSignOut = () => {
    endGuest();
    signOut();
    navigate("/");
  };
  return <div className="app-layout">
      <div className={`sidebar-overlay${sidebarOpen ? " visible" : ""}`} onClick={() => setSidebarOpen(false)} />

      <nav className={`sidebar${sidebarOpen ? " open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-logo" style={{ overflow: "hidden", padding: 0, background: "none" }}>
              <img src="/favicon.svg" alt="SanskritLab Logo" style={{ width: "100%", height: "100%", borderRadius: "inherit" }} />
            </div>
            <div className="sidebar-brand-text">
              <h1>संस्कृतम्</h1>
              <div className="subtitle">SanskritLab</div>
            </div>
          </div>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)} aria-label={t("Close")}><X size={18} /></button>
        </div>
        {navSections.map((section) => <div className="nav-section" key={section.title}>
            <div className="nav-section-title">{t(section.title)}</div>
            {section.links.filter((l) => !("schoolOnly" in l) || l.schoolOnly !== true || user?.accountType === "institution").map((link) => <NavLink
    key={link.to}
    to={link.to}
    end={link.to === "/"}
    className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
    onClick={() => setSidebarOpen(false)}
  >
                <span className="nav-icon">{link.icon}</span>
                {t(link.label)}
              </NavLink>)}
          </div>)}
        <div className="sidebar-footer">
          <span>{t("Theme")}</span>
          <button className="theme-btn" onClick={toggle}>{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}</button>
        </div>
      </nav>

      <div className="main-wrapper">
        {
    /* Vedantu-style top orange navbar */
  }
        <div className="top-nav">
          <div className="top-nav-left">
            <button className="top-nav-hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
            <div className="top-nav-logo" onClick={() => navigate("/")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
              <img
                src="/favicon.svg"
                alt="SanskritLab Logo"
                style={{ width: 28, height: 28, borderRadius: 7, boxShadow: "0 2px 8px rgba(0,0,0,0.22)", flexShrink: 0 }}
              />
              <span>संस्कृतम् <strong>Lab</strong></span>
            </div>
            <div className="top-nav-links">
              <a onClick={() => navigate("/learning/tree")}>{t("Learn")}</a>
              <a onClick={() => navigate("/research/ncert")}>{t("NCERT")}</a>
              <a onClick={() => navigate("/research/corpus")}>{t("Research")}</a>
              <a onClick={() => navigate("/visualization/3d")}>{t("Visualize")}</a>
              <a onClick={() => navigate("/teaching/dashboard")}>{t("Teach")}</a>
              <a onClick={() => navigate("/viva/simulator")}>{t("Practice")}</a>
            </div>
          </div>
          <div className="top-nav-right">
            <button
              className="theme-btn"
              onClick={toggle}
              title={theme === "dark" ? (t("Switch to light mode") || "Light mode") : (t("Switch to dark mode") || "Dark mode")}
              aria-label={t("Toggle theme")}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              className={`btn btn-sm ${lang === "hi" ? "btn-primary" : "btn-outline"}`}
              style={{ marginLeft: 8 }}
              onClick={toggleLang}
              title={t("Language / \u092D\u093E\u0937\u093E")}
            >
              {lang === "hi" ? "EN" : "\u0939\u093F"}
            </button>
            <button
              className={`btn btn-sm ${keyboardVisible ? "btn-primary" : "btn-outline"}`}
              style={{ marginLeft: 8, display: "inline-flex", alignItems: "center", gap: 6 }}
              onClick={() => toggleKeyboard(kbDummyRef)}
              title={t("Devanagari Keyboard")}
            >
              <Keyboard size={15} /> <span>देव</span>
            </button>
            <button className="btn btn-sm btn-outline" style={{ marginLeft: 8, display: "inline-flex", alignItems: "center", gap: 6 }} onClick={() => navigate("/tools/tutor")}>
              <Bot size={15} /> <span>{t("Tutor")}</span>
            </button>
            {canSwitch && <div className="role-switcher" style={{ marginLeft: 8, display: "inline-flex", background: "rgba(255,140,0,0.12)", border: "1px solid rgba(255,140,0,0.4)", borderRadius: 8, padding: 2 }}>
                {ROLE_OPTIONS.map((o) => <button
    key={o.value}
    className={`btn btn-sm ${role === o.value ? "btn-primary" : ""}`}
    style={{ border: "none", padding: "4px 10px", borderRadius: 6, display: "inline-flex", alignItems: "center", gap: 4 }}
    onClick={() => setRole(o.value)}
    title={t("View as") + ": " + t(o.label)}
  >
                    {o.icon} <span>{t(o.label)}</span>
                  </button>)}
              </div>}
          </div>
        </div>

        {
    /* Mobile header */
  }
        <header className="mobile-header">
          <button className="hamburger" onClick={() => setSidebarOpen(true)} aria-label={t("Open navigation")}>
            <span /><span /><span />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
            <img src="/favicon.svg" alt="SanskritLab Logo" style={{ width: 24, height: 24, borderRadius: 6, flexShrink: 0 }} />
            <span className="mobile-title">संस्कृतम्</span>
          </div>
          <button className="theme-btn" onClick={toggle} aria-label={t("Toggle theme")}>{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}</button>
        </header>

        <main className="main-content">
          <Outlet />
        </main>
        <textarea ref={kbDummyRef} style={{ position: "absolute", left: -9999, top: -9999, width: 1, height: 1 }} readOnly />

        {
    /* Footer */
  }
        <footer className="footer">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>SanskritLab</h4>
              <a onClick={() => navigate("/learning/tree")}>{t("Learning Path")}</a>
              <a onClick={() => navigate("/research/corpus")}>{t("Corpus & Search")}</a>
              <a onClick={() => navigate("/teaching/assessment")}>{t("Assessment")}</a>
              <a onClick={() => navigate("/viva/simulator")}>{t("Viva Practice")}</a>
            </div>
            <div className="footer-col">
              <h4>{t("For Teachers")}</h4>
              <a onClick={() => navigate("/teaching/dashboard")}>{t("Teacher Dashboard")}</a>
              <a onClick={() => navigate("/learning/curriculum")}>{t("Curriculum Builder")}</a>
              <a onClick={() => navigate("/teaching/workspace")}>{t("Student Workspace")}</a>
              <a onClick={() => navigate("/viva/analytics")}>{t("Analytics")}</a>
            </div>
            <div className="footer-col">
              <h4>{t("Research")}</h4>
              <a onClick={() => navigate("/research/ocr")}>{t("Manuscript OCR")}</a>
              
              <a onClick={() => navigate("/visualization/timeline")}>{t("Timeline")}</a>
            </div>
            <div className="footer-col">
              <h4>{t("Affiliations & Links")}</h4>
              <a href="https://sainikschoolambikapur.org.in" target="_blank" rel="noopener noreferrer">
                Sainik School Ambikapur ↗
              </a>
              <a href="https://www.youtube.com/@sourabhjain32" target="_blank" rel="noopener noreferrer">
                Sanskrit Online Pathshala ↗
              </a>
              
            </div>
          </div>

          {/* Hyperlinks for Sainik School Ambikapur & Sanskrit Online Pathshala */}
          <div
            className="footer-institutional-links"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
              margin: "16px auto 24px",
              maxWidth: 720
            }}
          >
            <a
              href="https://sainikschoolambikapur.org.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 18px",
                borderRadius: 50,
                background: "var(--vt-orange-light)",
                color: "var(--vt-orange-dark)",
                border: "1px solid rgba(255, 106, 0, 0.3)",
                fontSize: 13.5,
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.2s"
              }}
            >
              <ExternalLink size={15} />
              <span>Sainik School Ambikapur</span>
            </a>
            <a
              href="https://www.youtube.com/@sourabhjain32"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 18px",
                borderRadius: 50,
                background: "rgba(220, 38, 38, 0.08)",
                color: "#dc2626",
                border: "1px solid rgba(220, 38, 38, 0.3)",
                fontSize: 13.5,
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.2s"
              }}
            >
              <ExternalLink size={15} />
              <span>Sanskrit Online Pathshala</span>
            </a>
          </div>

          <div className="footer-bottom">
            <span>{t("© 2026 SanskritLab. Open source.")}</span>
            <span>{t("Made with ❤️ for Sanskrit")}</span>
          </div>
        </footer>
      </div>
    </div>;
}
export {
  Layout as default
};
