import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Download,
  Save,
  Eye,
  EyeOff,
  Check,
  Sparkles,
  GitBranch,
  BookOpen,
  Award,
  Layers,
  FileCode,
  CheckCircle2,
  ListPlus,
  HelpCircle,
  Copy
} from "lucide-react";
import { lessons, lessonHi } from "../../data/lessons";
import { useLanguage } from "../../context/LanguageContext";
import { toIAST } from "../../services/sanskrit";

// Grammatical Concept Dependency Graph Nodes (DAG)
const CONCEPT_DAG = [
  { id: "varna", label: "Varṇamālā", desc: "Svaras & Vyañjanas, articulatory phonetics", level: 0, prereq: [] },
  { id: "sandhi", label: "Sandhi Rules", desc: "Svara, Vyañjana, and Visarga transformations", level: 1, prereq: ["varna"] },
  { id: "shabdarupa", label: "Śabdarūpa", desc: "7 Vibhaktis, masculine/feminine/neuter noun stems", level: 2, prereq: ["varna"] },
  { id: "dhaturupa", label: "Dhāturūpa", desc: "10 Gaṇas, Laṭ/Loṭ/Laṅ/Vidhirliṅ verb conjugations", level: 2, prereq: ["varna"] },
  { id: "karaka", label: "Kāraka & Vibhakti", desc: "Agent, Object, Instrument & case syntax relations", level: 3, prereq: ["shabdarupa", "dhaturupa"] },
  { id: "samasa", label: "Samāsa", desc: "Tatpuruṣa, Karmadhāraya, Bahuvrīhi, Dvandva compounds", level: 4, prereq: ["sandhi", "karaka"] },
  { id: "kridanta", label: "Kṛdanta & Taddhita", desc: "Ktavatu, Lyap, Tumun verbal participles & affixes", level: 5, prereq: ["dhaturupa", "karaka"] },
  { id: "chandas", label: "Chandaḥ & Kāvya", desc: "Anuṣṭubh, Upajāti, Indravajrā poetic metres", level: 6, prereq: ["varna", "samasa"] }
];

// Curated Syllabus Framework Presets
const CURRICULUM_PRESETS = [
  {
    id: "ncert_middle",
    title: "CBSE / NCERT Classes 6–8 (Ruchirā Series)",
    titleHi: "सीबीएसई / एनसीईआरटी कक्षा ६-८ (रुचिरा)",
    target: "Middle School (Classes 6–8)",
    modules: [
      { name: "Unit 1: Śabdaparicayaḥ (शब्दपरिचयः १-३)", concepts: ["varna", "shabdarupa"], outcome: "Recognize a-kārānta and ā-kārānta nouns in nominative singular/plural" },
      { name: "Unit 2: Kriyāpadāni (क्रियापदानि)", concepts: ["dhaturupa"], outcome: "Conjugate present tense (Laṭ Lakāra) for basic roots (paṭh, gam, likh)" },
      { name: "Unit 3: Subhāṣitāni & Sandhi (सुभाषितानि)", concepts: ["sandhi", "karaka"], outcome: "Memorize didactic shlokas and identify Akasa-savarṇa Dīrgha Sandhi" }
    ]
  },
  {
    id: "ncert_high",
    title: "CBSE / NCERT Classes 9–10 (Śemuṣī Series)",
    titleHi: "सीबीएसई / एनसीईआरटी कक्षा ९-१० (शेमुषी)",
    target: "Secondary (Classes 9–10)",
    modules: [
      { name: "Unit 1: Bhāratīvasantagītiḥ (भारतीवसन्तगीतिः)", concepts: ["sandhi", "chandas"], outcome: "Appreciate lyrical cadence and parse Guṇa and Vṛddhi Sandhi" },
      { name: "Unit 2: Svarṇa-kākaḥ & Samāsa (स्वर्णकाकः)", concepts: ["samasa", "kridanta"], outcome: "Analyze Dvigu and Karmadhāraya compounds in narrative prose" },
      { name: "Unit 3: Sūktayaḥ & Kāraka (सूक्तयः)", concepts: ["karaka"], outcome: "Apply Upapada Vibhakti rules (saha, vinā, namas)" }
    ]
  },
  {
    id: "samskrita_bharati",
    title: "Samskrita Bharati 4-Tier Sequence",
    titleHi: "संस्कृतभारती चतुर्स्तरीय पाठ्यक्रमः",
    target: "Immersion & Spoken Sanskrit",
    modules: [
      { name: "Level 1: Praveśa (प्रवेशः)", concepts: ["varna", "shabdarupa", "dhaturupa"], outcome: "Fluency in spoken conversational patterns and common vocabulary" },
      { name: "Level 2: Paricaya (परिचयः)", concepts: ["sandhi", "karaka"], outcome: "Reading Hitopadeśa stories with grammatical comprehension" },
      { name: "Level 3: Śikṣā (शिक्षा)", concepts: ["samasa", "kridanta"], outcome: "Composing classical sentences with participles (Ktvā, Tumun)" },
      { name: "Level 4: Kovida (कोविदः)", concepts: ["chandas"], outcome: "Critical reading of Kālidāsa’s Raghuvaṁśa and philosophical prose" }
    ]
  }
];

// Sample Shlokas for one-click Drill Auto-Synthesizer
const SAMPLE_SHLOKAS = [
  {
    verse: "विद्या ददाति विनयं विनयाद् याति पात्रताम् । पात्रत्वाद् धनमाप्नोति धनाद् धर्मं ततः सुखम् ॥",
    title: "Hitopadeśa — Vidyā Prabhāvaḥ",
    drills: {
      vocab: [
        { word: "विद्या (vidyā)", meaning: "True knowledge, wisdom", root: "विद् (to know)" },
        { word: "विनयम् (vinayam)", meaning: "Humility, discipline", root: "नी (to lead)" },
        { word: "पात्रताम् (pātratām)", meaning: "Worthiness, competence", root: "पात्र + तल्" },
        { word: "सुखम् (sukham)", meaning: "Enduring joy, contentment", root: "सु + ख" }
      ],
      grammar: [
        { q: "What is the lakāra and puruṣa of 'ददाति'?", a: "लट् लकार (Present), प्रथम पुरुष, एकवचन from root दा (डुदाञ्)" },
        { q: "Identify the case (vibhakti) of 'विनयात्' and its kāraka role:", a: "पञ्चमी विभक्ति (Ablative), अपादान कारक (Source of worthiness)" }
      ],
      sandhi: [
        { orig: "पात्रत्वात् + धनम्", result: "पात्रत्वाद्धनम् (जश्त्व सन्धि)" },
        { orig: "धनात् + धर्मम्", result: "धनाद्धर्मम् (जश्त्व सन्धि)" }
      ]
    }
  },
  {
    verse: "उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः । न हि सुप्तस्य सिंहस्य प्रविशन्ति मुखे मृगाः ॥",
    title: "Pañcatantra — Udyama Mahattvam",
    drills: {
      vocab: [
        { word: "उद्यमेन (udyamena)", meaning: "Through diligent effort / labor", root: "उत् + यम्" },
        { word: "मनोरथैः (manorathaiḥ)", meaning: "By mere wishes or daydreams", root: "मनस् + रथ" },
        { word: "सुप्तस्य (suptasya)", meaning: "Of the sleeping (participle)", root: "स्वप् + क्त" }
      ],
      grammar: [
        { q: "What is the case of 'उद्यमेन' and 'मनोरथैः'?", a: "तृतीया विभक्ति (Instrumental: singular and plural)" },
        { q: "Parse the verb 'प्रविशन्ति':", a: "लट् लकार, प्रथम पुरुष, बहुवचन from prefix प्र + root विश्" }
      ],
      sandhi: [
        { orig: "मनः + रथैः", result: "मनोरथैः (उत्व विसर्ग सन्धि)" }
      ]
    }
  }
];

export default function CurriculumBuilderPage() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const hi = lang === "hi";

  const [activeTab, setActiveTab] = useState("dag"); // 'dag' | 'synthesizer' | 'frameworks' | 'custom'
  const [selectedDagNode, setSelectedDagNode] = useState(CONCEPT_DAG[1]);

  // Drill Synthesizer states
  const [selectedShlokaIdx, setSelectedShlokaIdx] = useState(0);
  const activeShloka = SAMPLE_SHLOKAS[selectedShlokaIdx];

  // Custom lesson designer states
  const [selectedLevel, setSelectedLevel] = useState(2);
  const [customTitle, setCustomTitle] = useState("");
  const [customContent, setCustomContent] = useState("");
  const [bloomOutcome, setBloomOutcome] = useState("Prayoga (Apply)");
  const [saveMessage, setSaveMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const filtered = lessons.filter((l) => l.level === selectedLevel);

  // Export as SCORM 1.2 Package (XML manifest + Lesson HTML)
  const handleExportScorm = () => {
    const title = customTitle || activeShloka.title;
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="SanskritLab_Lesson_${Date.now()}" version="1.2"
          xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
          xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="org_1">
    <organization identifier="org_1">
      <title>${title}</title>
      <item identifier="item_1" identifierref="res_1">
        <title>${title} — Interactive Unit</title>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="res_1" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html"/>
    </resource>
  </resources>
</manifest>`;

    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `imsmanifest-${title.replace(/\s+/g, "_")}.xml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export Anki TSV Flashcards
  const handleExportAnki = () => {
    const tsvContent = activeShloka.drills.vocab
      .map((v) => `${v.word}\t${v.meaning} (Root: ${v.root})\t${activeShloka.title}`)
      .join("\n");

    const blob = new Blob([tsvContent], { type: "text/tab-separated-values" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `anki-${activeShloka.title.replace(/\s+/g, "_")}.tsv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveCustom = () => {
    if (!customTitle.trim()) return;
    try {
      const stored = localStorage.getItem("sanskritlab_custom_curriculum");
      const list = stored ? JSON.parse(stored) : [];
      list.push({
        id: "custom-" + Date.now(),
        title: customTitle,
        content: customContent,
        level: selectedLevel,
        bloomOutcome,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("sanskritlab_custom_curriculum", JSON.stringify(list));
      setSaveMessage(t("Saved to custom curriculum!"));
      setTimeout(() => setSaveMessage(""), 3000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: 1280, margin: "0 auto", paddingBottom: 60 }}>
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: 20 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--vt-orange)", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
          <Sparkles size={16} />
          <span>Pedagogical Studio &amp; Syllabus Architect</span>
        </div>
        <h2 style={{ fontSize: 30, margin: "4px 0 8px" }}>{t("Curriculum Builder & Pedagogical Studio")}</h2>
        <p style={{ color: "var(--vt-muted)", maxWidth: 840 }}>
          {t("Design curriculum sequences with visual prerequisite DAG graphs, auto-generate drills from classical shlokas, align with CBSE/NCERT frameworks, and export to SCORM 1.2 or Anki.")}
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, borderBottom: "1px solid var(--vt-border)", paddingBottom: 10 }}>
        {[
          { id: "dag", label: "Prerequisite Knowledge Graph (DAG)", icon: GitBranch },
          { id: "synthesizer", label: "Shloka Drill Synthesizer", icon: Sparkles },
          { id: "frameworks", label: "Curriculum Framework Presets", icon: BookOpen },
          { id: "custom", label: "Custom Lesson Designer", icon: ListPlus }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`btn ${active ? "btn-primary" : "btn-secondary"}`}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, padding: "8px 16px" }}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={14} />
              <span>{t(tab.label)}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Prerequisite Knowledge Graph (DAG) */}
      {activeTab === "dag" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 20, alignItems: "start" }}>
          <div className="card" style={{ padding: 18 }}>
            <h3 style={{ margin: "0 0 10px", fontSize: 17 }}>
              {t("Grammatical Milestone Dependency Tree")}
            </h3>
            <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--vt-muted)" }}>
              {t("Pāṇinian learning sequence: arrows represent prerequisite concepts required before advanced synthesis.")}
            </p>

            {/* SVG Visual DAG */}
            <div style={{ background: "var(--vt-bg)", borderRadius: 10, padding: "20px 10px", border: "1px solid var(--vt-border)", overflowX: "auto" }}>
              <svg width="680" height="340" style={{ display: "block", margin: "0 auto" }}>
                <defs>
                  <marker id="dagArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--vt-orange)" />
                  </marker>
                </defs>

                {/* Edges */}
                <line x1="80" y1="50" x2="220" y2="50" stroke="var(--vt-orange)" strokeWidth="1.5" markerEnd="url(#dagArrow)" />
                <line x1="80" y1="50" x2="220" y2="130" stroke="var(--vt-orange)" strokeWidth="1.5" markerEnd="url(#dagArrow)" />
                <line x1="80" y1="50" x2="220" y2="210" stroke="var(--vt-orange)" strokeWidth="1.5" markerEnd="url(#dagArrow)" />
                <line x1="280" y1="130" x2="380" y2="170" stroke="var(--vt-orange)" strokeWidth="1.5" markerEnd="url(#dagArrow)" />
                <line x1="280" y1="210" x2="380" y2="170" stroke="var(--vt-orange)" strokeWidth="1.5" markerEnd="url(#dagArrow)" />
                <line x1="440" y1="170" x2="520" y2="90" stroke="var(--vt-orange)" strokeWidth="1.5" markerEnd="url(#dagArrow)" />
                <line x1="440" y1="170" x2="520" y2="210" stroke="var(--vt-orange)" strokeWidth="1.5" markerEnd="url(#dagArrow)" />
                <line x1="580" y1="90" x2="620" y2="150" stroke="var(--vt-orange)" strokeWidth="1.5" markerEnd="url(#dagArrow)" />

                {/* Nodes */}
                {[
                  { node: CONCEPT_DAG[0], x: 30, y: 30 },
                  { node: CONCEPT_DAG[1], x: 220, y: 30 },
                  { node: CONCEPT_DAG[2], x: 220, y: 110 },
                  { node: CONCEPT_DAG[3], x: 220, y: 190 },
                  { node: CONCEPT_DAG[4], x: 380, y: 150 },
                  { node: CONCEPT_DAG[5], x: 520, y: 70 },
                  { node: CONCEPT_DAG[6], x: 520, y: 190 },
                  { node: CONCEPT_DAG[7], x: 570, y: 270 }
                ].map(({ node, x, y }) => {
                  const isSelected = selectedDagNode.id === node.id;
                  return (
                    <g key={node.id} onClick={() => setSelectedDagNode(node)} style={{ cursor: "pointer" }}>
                      <rect
                        x={x}
                        y={y}
                        width="110"
                        height="42"
                        rx="8"
                        fill={isSelected ? "rgba(230, 81, 0, 0.25)" : "rgba(255, 255, 255, 0.05)"}
                        stroke={isSelected ? "var(--vt-orange)" : "var(--vt-border)"}
                        strokeWidth={isSelected ? "2" : "1"}
                      />
                      <text x={x + 55} y={y + 22} textAnchor="middle" fill="var(--vt-text)" fontSize="12" fontWeight="bold">
                        {node.label}
                      </text>
                      <text x={x + 55} y={y + 35} textAnchor="middle" fill="var(--vt-muted)" fontSize="9">
                        Level {node.level}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Right: Selected Node Details & Recommended Lessons */}
          <div className="card" style={{ padding: 18 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--vt-orange)", textTransform: "uppercase" }}>
              CONCEPT INSPECTOR
            </span>
            <h3 style={{ margin: "4px 0 8px", fontSize: 22 }}>{selectedDagNode.label}</h3>
            <p style={{ margin: "0 0 14px", fontSize: 14, color: "var(--vt-text-light)", lineHeight: 1.6 }}>
              {selectedDagNode.desc}
            </p>

            <div style={{ marginBottom: 14, padding: 12, background: "var(--vt-bg)", borderRadius: 6, border: "1px solid var(--vt-border)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--vt-muted)", marginBottom: 4 }}>
                {t("Prerequisite Knowledge:")}
              </div>
              <div style={{ fontSize: 13, color: "var(--vt-orange)" }}>
                {selectedDagNode.prereq.length === 0
                  ? t("None — Entry Level Foundation")
                  : selectedDagNode.prereq.map((p) => CONCEPT_DAG.find((c) => c.id === p)?.label).join(", ")}
              </div>
            </div>

            <h4 style={{ margin: "0 0 10px", fontSize: 14 }}>{t("Built-in Modules Teaching This Concept:")}</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {lessons
                .filter((l) => l.level === selectedDagNode.level)
                .slice(0, 3)
                .map((l) => (
                  <div
                    key={l.id}
                    onClick={() => navigate(`/learning/lesson/${l.id}`)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 6,
                      background: "var(--vt-bg)",
                      border: "1px solid var(--vt-border)",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{l.title}</div>
                      <div style={{ fontSize: 11, color: "var(--vt-muted)" }}>{l.track} · {l.duration}</div>
                    </div>
                    <span style={{ fontSize: 12, color: "var(--vt-orange)", fontWeight: 700 }}>→</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Shloka Drill Synthesizer */}
      {activeTab === "synthesizer" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h3 style={{ margin: 0, fontSize: 17 }}>{t("Source Shloka & Passage")}</h3>
              <select
                value={selectedShlokaIdx}
                onChange={(e) => setSelectedShlokaIdx(parseInt(e.target.value))}
                style={{ padding: "6px 10px", borderRadius: 6, background: "var(--vt-bg)", border: "1px solid var(--vt-border)", color: "var(--vt-text)" }}
              >
                {SAMPLE_SHLOKAS.map((s, idx) => (
                  <option key={idx} value={idx}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{
                padding: 16,
                background: "var(--vt-bg)",
                borderRadius: 8,
                border: "1px solid var(--vt-border)",
                fontSize: 19,
                lineHeight: 1.8,
                fontFamily: "'Noto Sans Devanagari', serif",
                color: "var(--vt-text)",
                marginBottom: 16
              }}
            >
              {activeShloka.verse}
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                className="btn btn-primary"
                onClick={handleExportAnki}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13 }}
              >
                <Download size={14} />
                <span>{t("Export Anki Flashcard Deck")}</span>
              </button>

              <button
                className="btn btn-secondary"
                onClick={handleExportScorm}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13 }}
              >
                <FileCode size={14} />
                <span>{t("Export SCORM 1.2 Package")}</span>
              </button>
            </div>
          </div>

          {/* Extracted Drills Preview */}
          <div className="card" style={{ padding: 18 }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 17, display: "flex", alignItems: "center", gap: 6 }}>
              <Sparkles size={16} color="var(--vt-orange)" />
              <span>{t("Auto-Generated Exercises & Drills")}</span>
            </h3>

            {/* Vocabulary Flashcards */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--vt-muted)", textTransform: "uppercase", marginBottom: 6 }}>
                {t("1. Vocabulary Deck")} ({activeShloka.drills.vocab.length})
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {activeShloka.drills.vocab.map((v, i) => (
                  <div key={i} style={{ padding: "6px 10px", background: "var(--vt-bg)", borderRadius: 6, fontSize: 13 }}>
                    <strong>{v.word}</strong>: {v.meaning} <span style={{ color: "var(--vt-muted)", fontSize: 11 }}>({v.root})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Grammar Identification */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--vt-muted)", textTransform: "uppercase", marginBottom: 6 }}>
                {t("2. Grammar & Vibhakti Challenges")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {activeShloka.drills.grammar.map((g, i) => (
                  <div key={i} style={{ padding: "6px 10px", background: "var(--vt-bg)", borderRadius: 6, fontSize: 13 }}>
                    <div style={{ fontWeight: 600 }}>{g.q}</div>
                    <div style={{ color: "var(--vt-orange)", fontSize: 12, marginTop: 2 }}>{g.a}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sandhi Dissolution Drills */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--vt-muted)", textTransform: "uppercase", marginBottom: 6 }}>
                {t("3. Sandhi Splitting & Joining Drills")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {activeShloka.drills.sandhi.map((s, i) => (
                  <div key={i} style={{ padding: "6px 10px", background: "var(--vt-bg)", borderRadius: 6, fontSize: 13 }}>
                    <span>{s.orig} ➔ </span>
                    <strong style={{ color: "var(--vt-green)" }}>{s.result}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Curriculum Framework Presets */}
      {activeTab === "frameworks" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 16 }}>
          {CURRICULUM_PRESETS.map((p) => (
            <div key={p.id} className="card" style={{ padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: "rgba(230, 81, 0, 0.1)", color: "var(--vt-orange)" }}>
                  {p.target}
                </span>
                <h3 style={{ margin: "8px 0 12px", fontSize: 18 }}>{p.title}</h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {p.modules.map((m, idx) => (
                    <div key={idx} style={{ padding: 10, background: "var(--vt-bg)", borderRadius: 6, border: "1px solid var(--vt-border)" }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{m.name}</div>
                      <div style={{ fontSize: 12, color: "var(--vt-text-light)", marginTop: 4 }}>
                        {m.outcome}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                <button
                  className="btn btn-secondary"
                  onClick={handleExportScorm}
                  style={{ width: "100%", fontSize: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                >
                  <FileCode size={13} />
                  <span>{t("Export Framework SCORM")}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: Custom Lesson Designer */}
      {activeTab === "custom" && (
        <div className="grid-2" style={{ alignItems: "start" }}>
          <div className="card">
            <h3 style={{ marginBottom: 16 }}>{t("Browse Existing Content by Level")}</h3>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              {[0, 1, 2, 3, 4, 5, 6].map((lvl) => (
                <button
                  key={lvl}
                  className={`btn ${selectedLevel === lvl ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => setSelectedLevel(lvl)}
                >
                  {t("Level")} {lvl}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filtered.map((l) => (
                <div
                  key={l.id}
                  className="text-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/learning/lesson/${l.id}`)}
                >
                  <div>
                    <div className="text-title">{l.title}</div>
                    <div className="text-meta">
                      {l.track} · {lang === "hi" && lessonHi[l.id]?.durationHi ? lessonHi[l.id].durationHi : l.duration} · {l.quiz.length} {t("questions")}
                    </div>
                  </div>
                  <span style={{ fontSize: 12, color: "var(--vt-muted)" }}>
                    {l.content.sections.length} {t("sections")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: 16 }}>{t("Create Pedagogical Lesson Unit")}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input
                placeholder={t("Lesson title (e.g. Dīrgha Sandhi Rules)...")}
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                style={{ padding: 10, borderRadius: 6, background: "var(--vt-bg)", border: "1px solid var(--vt-border)", color: "var(--vt-text)" }}
              />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, color: "var(--vt-muted)", marginBottom: 4 }}>
                    {t("Difficulty Tier")}
                  </label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(Number(e.target.value))}
                    style={{ width: "100%", padding: 8, borderRadius: 6, background: "var(--vt-bg)", border: "1px solid var(--vt-border)", color: "var(--vt-text)" }}
                  >
                    {[0, 1, 2, 3, 4, 5, 6].map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {t("Level")} {lvl}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, color: "var(--vt-muted)", marginBottom: 4 }}>
                    {t("Bloom's Cognitive Outcome")}
                  </label>
                  <select
                    value={bloomOutcome}
                    onChange={(e) => setBloomOutcome(e.target.value)}
                    style={{ width: "100%", padding: 8, borderRadius: 6, background: "var(--vt-bg)", border: "1px solid var(--vt-border)", color: "var(--vt-text)" }}
                  >
                    <option value="Smaraṇa (Recall)">Smaraṇa (Recall / Knowledge)</option>
                    <option value="Avagamana (Comprehend)">Avagamana (Comprehend)</option>
                    <option value="Prayoga (Apply)">Prayoga (Apply to new verses)</option>
                    <option value="Viśleṣaṇa (Analyze)">Viśleṣaṇa (Grammatical Analysis)</option>
                  </select>
                </div>
              </div>

              <textarea
                placeholder={t("Lesson content (supports Devanāgarī, markdown, rule sūtras)...")}
                value={customContent}
                onChange={(e) => setCustomContent(e.target.value)}
                style={{
                  minHeight: 180,
                  resize: "vertical",
                  background: "var(--vt-bg)",
                  color: "var(--vt-text)",
                  border: "1px solid var(--vt-border)",
                  borderRadius: 6,
                  padding: 12,
                  fontFamily: "'Noto Sans Devanagari', sans-serif"
                }}
              />

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <button
                  className="btn btn-primary"
                  onClick={handleSaveCustom}
                  disabled={!customTitle.trim()}
                  style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                >
                  <Save size={14} />
                  <span>{t("Save to Library")}</span>
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleExportScorm}
                  disabled={!customTitle.trim()}
                  style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                >
                  <FileCode size={14} />
                  <span>{t("Export SCORM Package")}</span>
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowPreview(!showPreview)}
                  style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                >
                  {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{showPreview ? t("Hide Preview") : t("Preview")}</span>
                </button>
                {saveMessage && (
                  <span style={{ color: "var(--vt-green)", fontSize: 13, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <Check size={14} />
                    <span>{saveMessage}</span>
                  </span>
                )}
              </div>

              {showPreview && (
                <div style={{ marginTop: 14, padding: 14, background: "var(--vt-bg)", borderRadius: 8, border: "1px solid var(--vt-border)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: "var(--vt-orange)", fontWeight: 600 }}>
                      Level {selectedLevel} · {bloomOutcome}
                    </span>
                    <span style={{ fontSize: 11, color: "var(--vt-muted)" }}>Preview</span>
                  </div>
                  <h4 style={{ margin: "0 0 6px", fontSize: 17 }}>{customTitle || t("Untitled Lesson")}</h4>
                  <div style={{ fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap", color: "var(--vt-text-light)" }}>
                    {customContent || t("No content entered yet.")}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
