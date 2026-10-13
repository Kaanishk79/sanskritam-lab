import { useEffect, useState, useMemo } from "react";
import {
  Tag,
  Share2,
  Download,
  Copy,
  Plus,
  GitBranch,
  BookOpen,
  Sparkles,
  CheckCircle2,
  FileCode,
  Layers,
  ArrowRight,
  Info,
  HelpCircle
} from "lucide-react";
import { supabase } from "../../services/supabase";
import { useLanguage } from "../../context/LanguageContext";
import { toIAST } from "../../services/sanskrit";

// Classical Corpus texts with pre-tokenized grammatical data for critical edition analysis
const CORPUS_TEXTS = [
  {
    id: "rv_1_1_1",
    title: "Ṛgveda Saṁhitā 1.1.1",
    titleHi: "ऋग्वेद संहिता १.१.१",
    source: "Śākala Recension",
    content: "अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् । होतारं रत्नधातमम् ॥",
    tokens: [
      {
        id: "t1",
        surface: "अग्निम्",
        iast: "agnim",
        type: "subanta",
        lemma: "अग्नि",
        linga: "पुंलिङ्ग",
        vibhakti: "द्वितीया",
        vacana: "एकवचन",
        karaka: "कर्म (Karma)",
        head: "t2",
        sandhi: "अग्निम् + ईळे -> अग्निमीळे",
        gloss: "fire.ACC.SG"
      },
      {
        id: "t2",
        surface: "ईळे",
        iast: "īḷe",
        type: "tinanta",
        lemma: "ईड् (ईड् स्तुतौ)",
        gana: "अदादि (२)",
        lakara: "लट् (Present)",
        purusha: "उत्तमपुरुष",
        vacana: "एकवचन",
        karaka: "क्रिया (Kriyā)",
        head: null,
        sandhi: "आत्मनेपद रूपम्",
        gloss: "praise.PRES.1SG.MID"
      },
      {
        id: "t3",
        surface: "पुरोहितम्",
        iast: "purohitam",
        type: "subanta",
        lemma: "पुरोहित",
        linga: "पुंलिङ्ग",
        vibhakti: "द्वितीया",
        vacana: "एकवचन",
        karaka: "विशेषण (Attribute of अग्नि)",
        head: "t1",
        sandhi: "पुरस् + हितम्",
        gloss: "domestic-priest.ACC.SG"
      },
      {
        id: "t4",
        surface: "यज्ञस्य",
        iast: "yajñasya",
        type: "subanta",
        lemma: "यज्ञ",
        linga: "पुंलिङ्ग",
        vibhakti: "षष्ठी",
        vacana: "एकवचन",
        karaka: "सम्बन्ध (Relation)",
        head: "t5",
        sandhi: "षष्ठी विभक्ति",
        gloss: "sacrifice.GEN.SG"
      },
      {
        id: "t5",
        surface: "देवम्",
        iast: "devam",
        type: "subanta",
        lemma: "देव",
        linga: "पुंलिङ्ग",
        vibhakti: "द्वितीया",
        vacana: "एकवचन",
        karaka: "विशेषण (Attribute of अग्नि)",
        head: "t1",
        sandhi: "देव + अम्",
        gloss: "god.ACC.SG"
      },
      {
        id: "t6",
        surface: "ऋत्विजम्",
        iast: "ṛtvijam",
        type: "subanta",
        lemma: "ऋत्विज्",
        linga: "पुंलिङ्ग",
        vibhakti: "द्वितीया",
        vacana: "एकवचन",
        karaka: "विशेषण (Attribute of अग्नि)",
        head: "t1",
        sandhi: "ऋतु + यज् + क्विन्",
        gloss: "sacrificer-priest.ACC.SG"
      },
      {
        id: "t7",
        surface: "होतारम्",
        iast: "hotāram",
        type: "subanta",
        lemma: "होतृ",
        linga: "पुंलिङ्ग",
        vibhakti: "द्वितीया",
        vacana: "एकवचन",
        karaka: "विशेषण (Attribute of अग्नि)",
        head: "t1",
        sandhi: "हु + तृच्",
        gloss: "invoking-priest.ACC.SG"
      },
      {
        id: "t8",
        surface: "रत्नधातमम्",
        iast: "ratnadhātamam",
        type: "subanta",
        lemma: "रत्नधातम",
        linga: "पुंलिङ्ग",
        vibhakti: "द्वितीया",
        vacana: "एकवचन",
        karaka: "विशेषण (Attribute of अग्नि)",
        head: "t1",
        sandhi: "रत्न + धा + तमप् (अतिशायने तमप् ५.३.५५)",
        gloss: "wealth-bestowing-most.ACC.SG"
      }
    ],
    anvaya: "अहं यज्ञस्य पुरोहितं देवम् ऋत्विजं होतारं रत्नधातमम् अग्निम् ईळे ।",
    translation: "I praise Agni, the domestic priest, the divine minister of the sacrifice, the invoker, bestower of extraordinary treasures.",
    commentary: "सायणभाष्यम्: अग्निमीळे — अग्निनामकं देवं स्तौमि। पुरोहितम् — यज्ञस्य पुरस्ताद्धितं मुख्यम्। देवम् — दानादिगुणयुक्तम्। ऋत्विजम् — ऋतुषु ऋतुषु यष्टारम्।"
  },
  {
    id: "gita_2_47",
    title: "Bhagavad Gītā 2.47",
    titleHi: "श्रीमद्भगवद्गीता २.४७",
    source: "Karmayoga Adhyāya",
    content: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
    tokens: [
      { id: "g1", surface: "कर्मणि", iast: "karmaṇi", type: "subanta", lemma: "कर्मन्", linga: "नपुंसकलिङ्ग", vibhakti: "सप्तमी", vacana: "एकवचन", karaka: "अधिकरण (Locus)", head: "g3", sandhi: "सप्तमी विभक्ति", gloss: "action.LOC.SG" },
      { id: "g2", surface: "एव", iast: "eva", type: "avyaya", lemma: "एव", linga: "अव्यय", vibhakti: "-", vacana: "-", karaka: "क्रियाविशेषण", head: "g1", sandhi: "कर्मणि + एव = कर्मण्येव (यण् सन्धि)", gloss: "only.ADV" },
      { id: "g3", surface: "अधिकारः", iast: "adhikāraḥ", type: "subanta", lemma: "अधिकार", linga: "पुंलिङ्ग", vibhakti: "प्रथमा", vacana: "एकवचन", karaka: "कर्ता (Agent)", head: "g4", sandhi: "अधिकारः + ते", gloss: "right.NOM.SG" },
      { id: "g4", surface: "ते", iast: "te", type: "subanta", lemma: "युष्मद्", linga: "सर्वनाम", vibhakti: "षष्ठी", vacana: "एकवचन", karaka: "सम्बन्ध", head: "g3", sandhi: "आदेश रूपम्", gloss: "your.GEN.SG" },
      { id: "g5", surface: "मा", iast: "mā", type: "avyaya", lemma: "मा", linga: "अव्यय", vibhakti: "-", vacana: "-", karaka: "निषेध (Prohibition)", head: "g3", sandhi: "माङ् अव्ययम्", gloss: "not.NEG" },
      { id: "g6", surface: "फलेषु", iast: "phaleṣu", type: "subanta", lemma: "फल", linga: "नपुंसकलिङ्ग", vibhakti: "सप्तमी", vacana: "बहुवचन", karaka: "अधिकरण", head: "g3", sandhi: "सप्तमी बहुवचन", gloss: "fruits.LOC.PL" },
      { id: "g7", surface: "कदाचन", iast: "kadācana", type: "avyaya", lemma: "कदाचन", linga: "अव्यय", vibhakti: "-", vacana: "-", karaka: "क्रियाविशेषण", head: "g3", sandhi: "अव्ययम्", gloss: "ever.ADV" }
    ],
    anvaya: "कर्मणि एव ते अधिकारः (अस्तु), फलेषु कदाचन मा (अस्तु) ।",
    translation: "Your entitlement is only to performing sacred duty, never to its fruits.",
    commentary: "शङ्करभाष्यम्: कर्मण्येव युद्धादौ अधिकारो न ज्ञाननिष्ठायाम्। मा फलेषु कदाचन कर्मफलतृष्णा मा भूत्।"
  }
];

const VIBHAKTI_OPTIONS = [
  "प्रथमा (Nominative)",
  "द्वितीया (Accusative)",
  "तृतीया (Instrumental)",
  "चतुर्थी (Dative)",
  "पञ्चमी (Ablative)",
  "षष्ठी (Genitive)",
  "सप्तमी (Locative)",
  "सम्बोधन (Vocative)"
];

const KARAKA_OPTIONS = [
  "कर्ता (Kartā / Agent)",
  "कर्म (Karma / Object)",
  "करण (Karaṇa / Instrument)",
  "सम्प्रदान (Sampradāna / Recipient)",
  "अपादान (Apādāna / Ablation)",
  "अधिकरण (Adhikaraṇa / Locus)",
  "विशेषण (Viśeṣaṇa / Attribute)",
  "सम्बन्ध (Sambandha / Genitive relation)",
  "क्रिया (Kriyā / Governing Verb)"
];

export default function AnnotationPage() {
  const { t } = useLanguage();

  const [selectedTextId, setSelectedTextId] = useState(CORPUS_TEXTS[0].id);
  const [activeTab, setActiveTab] = useState("interlinear"); // 'interlinear' | 'syntax_tree' | 'anvaya' | 'apparatus'
  const [tokens, setTokens] = useState(CORPUS_TEXTS[0].tokens);
  const [selectedTokenId, setSelectedTokenId] = useState(CORPUS_TEXTS[0].tokens[0].id);

  const [customCommentary, setCustomCommentary] = useState(CORPUS_TEXTS[0].commentary);
  const [customTranslation, setCustomTranslation] = useState(CORPUS_TEXTS[0].translation);
  const [notice, setNotice] = useState("");

  const currentText = useMemo(() => {
    return CORPUS_TEXTS.find((c) => c.id === selectedTextId) || CORPUS_TEXTS[0];
  }, [selectedTextId]);

  useEffect(() => {
    setTokens(currentText.tokens);
    setSelectedTokenId(currentText.tokens[0]?.id || null);
    setCustomCommentary(currentText.commentary);
    setCustomTranslation(currentText.translation);
  }, [currentText]);

  const activeToken = useMemo(() => {
    return tokens.find((t) => t.id === selectedTokenId) || tokens[0];
  }, [tokens, selectedTokenId]);

  // Update a property on active token
  const handleUpdateToken = (field, val) => {
    setTokens((prev) =>
      prev.map((tok) => (tok.id === selectedTokenId ? { ...tok, [field]: val } : tok))
    );
  };

  // Export to standard TEI-XML
  const exportTEIXML = () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<TEI xmlns="http://www.tei-c.org/ns/1.0">
  <teiHeader>
    <fileDesc>
      <titleStmt>
        <title>${currentText.title}</title>
        <respStmt>
          <resp>Interlinear &amp; Kāraka Treebank Annotation</resp>
          <name>SanskritLab Critical Edition Studio</name>
        </respStmt>
      </titleStmt>
      <publicationStmt>
        <p>SanskritLab Open Sanskrit Treebank</p>
      </publicationStmt>
      <sourceDesc>
        <p>${currentText.source}</p>
      </sourceDesc>
    </fileDesc>
  </teiHeader>
  <text>
    <body>
      <entry>
        <form>${currentText.content}</form>
        <interlinear>
          ${tokens
            .map(
              (tok) =>
                `<w lemma="${tok.lemma}" type="${tok.type}" pos="${tok.vibhakti || tok.lakara}" karaka="${tok.karaka}" gloss="${tok.gloss}">${tok.surface}</w>`
            )
            .join("\n          ")}
        </interlinear>
        <anvaya>${currentText.anvaya}</anvaya>
        <translation xml:lang="en">${customTranslation}</translation>
        <commentary xml:lang="sa">${customCommentary}</commentary>
      </entry>
    </body>
  </text>
</TEI>`;

    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentText.id}-tei-edition.xml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-container" style={{ maxWidth: 1280, margin: "0 auto", paddingBottom: 60 }}>
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: 24 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--vt-orange)", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
          <Layers size={16} />
          <span>Classical Treebank &amp; Critical Edition Studio</span>
        </div>
        <h2 style={{ fontSize: 30, margin: "4px 0 8px" }}>{t("Multi-Tier Sanskrit Annotation Studio")}</h2>
        <p style={{ color: "var(--vt-muted)", maxWidth: 820 }}>
          {t("Segment continuous shlokas into padas, tag Subanta/Tiṅanta morphology, construct visual Kāraka dependency syntax trees, and export peer-reviewed TEI-XML editions.")}
        </p>
      </div>

      {/* Text Selection Header Card */}
      <div className="card" style={{ padding: 18, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--vt-text)" }}>
              {t("Select Classical Text:")}
            </span>
            <select
              value={selectedTextId}
              onChange={(e) => setSelectedTextId(e.target.value)}
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                background: "var(--vt-bg)",
                border: "1px solid var(--vt-border)",
                color: "var(--vt-text)",
                fontSize: 14,
                fontWeight: 600
              }}
            >
              {CORPUS_TEXTS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} — {c.source}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              className="btn btn-secondary"
              onClick={exportTEIXML}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13 }}
            >
              <FileCode size={14} />
              <span>{t("Export TEI-XML")}</span>
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                const json = JSON.stringify({ text: currentText, tokens }, null, 2);
                const blob = new Blob([json], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${currentText.id}-treebank.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13 }}
            >
              <Download size={14} />
              <span>{t("Export JSON")}</span>
            </button>
          </div>
        </div>

        {/* Master Shloka Display */}
        <div
          style={{
            marginTop: 16,
            padding: "16px 20px",
            background: "var(--vt-bg)",
            borderRadius: 8,
            border: "1px solid var(--vt-border)",
            fontSize: 24,
            lineHeight: 1.8,
            fontFamily: "'Noto Sans Devanagari', 'Noto Serif Devanagari', serif",
            color: "var(--vt-text)",
            textAlign: "center"
          }}
        >
          {currentText.content}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, borderBottom: "1px solid var(--vt-border)", paddingBottom: 10 }}>
        {[
          { id: "interlinear", label: "Pada-cheda & Morpho-Tagger", icon: Tag },
          { id: "syntax_tree", label: "Kāraka Dependency Graph", icon: GitBranch },
          { id: "anvaya", label: "Anvaya Prose Order", icon: ArrowRight },
          { id: "apparatus", label: "Scholarly Commentary & Translation", icon: BookOpen }
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

      {/* Tab 1: Interlinear & Morpho-Tagger */}
      {activeTab === "interlinear" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 20, alignItems: "start" }}>
          {/* Left: Tokenized Shloka Tiles */}
          <div className="card" style={{ padding: 18 }}>
            <h3 style={{ fontSize: 16, marginTop: 0, marginBottom: 14 }}>
              {t("Tokenized Padas (पदच्छेद)")} — {t("Click any word to tag morphology:")}
            </h3>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
              {tokens.map((tok) => {
                const isSelected = selectedTokenId === tok.id;
                return (
                  <div
                    key={tok.id}
                    onClick={() => setSelectedTokenId(tok.id)}
                    style={{
                      padding: "12px 16px",
                      borderRadius: 8,
                      cursor: "pointer",
                      border: isSelected ? "2px solid var(--vt-orange)" : "1px solid var(--vt-border)",
                      background: isSelected ? "rgba(230, 81, 0, 0.12)" : "var(--vt-bg)",
                      transition: "all 0.15s ease",
                      textAlign: "center"
                    }}
                  >
                    <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Noto Sans Devanagari', serif", color: "var(--vt-text)" }}>
                      {tok.surface}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--vt-muted)", marginTop: 2 }}>{tok.iast}</div>
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "2px 6px",
                        borderRadius: 4,
                        background: tok.type === "tinanta" ? "rgba(231, 76, 60, 0.15)" : "rgba(52, 152, 219, 0.15)",
                        color: tok.type === "tinanta" ? "#e74c3c" : "#2980b9"
                      }}
                    >
                      {tok.karaka.split(" ")[0]}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Leipzig Interlinear Gloss Strip */}
            <div style={{ marginTop: 10, padding: 14, background: "var(--vt-bg)", borderRadius: 8, border: "1px solid var(--vt-border)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--vt-muted)", textTransform: "uppercase", marginBottom: 6 }}>
                {t("Leipzig Interlinear Gloss Line")}
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 13, color: "var(--vt-orange)", wordBreak: "break-all" }}>
                {tokens.map((t) => t.gloss).join("  ·  ")}
              </div>
            </div>
          </div>

          {/* Right: Detailed Morphological & Grammatical Inspector */}
          {activeToken && (
            <div className="card" style={{ padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--vt-orange)", textTransform: "uppercase" }}>
                    {activeToken.type.toUpperCase()} INSPECTOR
                  </span>
                  <h3 style={{ margin: "2px 0 0", fontSize: 22, fontFamily: "'Noto Sans Devanagari', serif" }}>
                    {activeToken.surface}
                  </h3>
                </div>
                <span style={{ fontSize: 13, color: "var(--vt-muted)" }}>{activeToken.iast}</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, color: "var(--vt-muted)", marginBottom: 4 }}>
                    {t("Prātipadika / Dhātu (Base Root)")}
                  </label>
                  <input
                    value={activeToken.lemma}
                    onChange={(e) => handleUpdateToken("lemma", e.target.value)}
                    style={{ width: "100%", padding: "6px 10px", borderRadius: 6, background: "var(--vt-bg)", border: "1px solid var(--vt-border)", color: "var(--vt-text)" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, color: "var(--vt-muted)", marginBottom: 4 }}>
                    {t("Word Class")}
                  </label>
                  <select
                    value={activeToken.type}
                    onChange={(e) => handleUpdateToken("type", e.target.value)}
                    style={{ width: "100%", padding: "6px 10px", borderRadius: 6, background: "var(--vt-bg)", border: "1px solid var(--vt-border)", color: "var(--vt-text)" }}
                  >
                    <option value="subanta">सुबन्त (Noun / Adjective)</option>
                    <option value="tinanta">तिङन्त (Conjugated Verb)</option>
                    <option value="avyaya">अव्यय (Indeclinable)</option>
                    <option value="kridanta">कृदन्त (Verbal Participle)</option>
                  </select>
                </div>

                {activeToken.type === "subanta" && (
                  <>
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "var(--vt-muted)", marginBottom: 4 }}>
                        {t("Vibhakti (Case)")}
                      </label>
                      <select
                        value={activeToken.vibhakti}
                        onChange={(e) => handleUpdateToken("vibhakti", e.target.value)}
                        style={{ width: "100%", padding: "6px 10px", borderRadius: 6, background: "var(--vt-bg)", border: "1px solid var(--vt-border)", color: "var(--vt-text)" }}
                      >
                        {VIBHAKTI_OPTIONS.map((v) => (
                          <option key={v} value={v.split(" ")[0]}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "var(--vt-muted)", marginBottom: 4 }}>
                        {t("Vacana (Number)")}
                      </label>
                      <select
                        value={activeToken.vacana}
                        onChange={(e) => handleUpdateToken("vacana", e.target.value)}
                        style={{ width: "100%", padding: "6px 10px", borderRadius: 6, background: "var(--vt-bg)", border: "1px solid var(--vt-border)", color: "var(--vt-text)" }}
                      >
                        <option value="एकवचन">एकवचन (Singular)</option>
                        <option value="द्विवचन">द्विवचन (Dual)</option>
                        <option value="बहुवचन">बहुवचन (Plural)</option>
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label style={{ display: "block", fontSize: 12, color: "var(--vt-muted)", marginBottom: 4 }}>
                    {t("Kāraka / Syntactic Role")}
                  </label>
                  <select
                    value={activeToken.karaka}
                    onChange={(e) => handleUpdateToken("karaka", e.target.value)}
                    style={{ width: "100%", padding: "6px 10px", borderRadius: 6, background: "var(--vt-bg)", border: "1px solid var(--vt-border)", color: "var(--vt-text)" }}
                  >
                    {KARAKA_OPTIONS.map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, color: "var(--vt-muted)", marginBottom: 4 }}>
                    {t("Leipzig Gloss Notation")}
                  </label>
                  <input
                    value={activeToken.gloss}
                    onChange={(e) => handleUpdateToken("gloss", e.target.value)}
                    style={{ width: "100%", padding: "6px 10px", borderRadius: 6, background: "var(--vt-bg)", border: "1px solid var(--vt-border)", color: "var(--vt-text)" }}
                  />
                </div>
              </div>

              {/* Sandhi Split Explanation */}
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", fontSize: 12, color: "var(--vt-muted)", marginBottom: 4 }}>
                  {t("Sandhi Dissolution & Pāṇinian Rule")}
                </label>
                <input
                  value={activeToken.sandhi}
                  onChange={(e) => handleUpdateToken("sandhi", e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 6, background: "var(--vt-bg)", border: "1px solid var(--vt-border)", color: "var(--vt-text)" }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Visual Kāraka Dependency Graph */}
      {activeTab === "syntax_tree" && (
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 18 }}>{t("Kāraka Dependency Syntax Tree")}</h3>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--vt-muted)" }}>
                {t("Traditional Paninian dependency tree: Governing verb (Kriyā) acts as the root node to which kārakas attach.")}
              </p>
            </div>
          </div>

          {/* SVG Dependency Arcs */}
          <div style={{ background: "var(--vt-bg)", borderRadius: 10, padding: "20px 10px", border: "1px solid var(--vt-border)", overflowX: "auto" }}>
            <svg width="900" height="240" style={{ display: "block", margin: "0 auto" }}>
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--vt-orange)" />
                </marker>
              </defs>

              {/* Tokens plotted horizontally */}
              {tokens.map((tok, i) => {
                const x = 70 + i * 95;
                const isSelected = selectedTokenId === tok.id;
                return (
                  <g key={tok.id} onClick={() => setSelectedTokenId(tok.id)} style={{ cursor: "pointer" }}>
                    <rect
                      x={x - 40}
                      y="160"
                      width="80"
                      height="46"
                      rx="6"
                      fill={isSelected ? "rgba(230, 81, 0, 0.2)" : "rgba(255, 255, 255, 0.05)"}
                      stroke={isSelected ? "var(--vt-orange)" : "var(--vt-border)"}
                      strokeWidth={isSelected ? "2" : "1"}
                    />
                    <text
                      x={x}
                      y="182"
                      textAnchor="middle"
                      fill="var(--vt-text)"
                      fontSize="14"
                      fontWeight="bold"
                      fontFamily="'Noto Sans Devanagari', serif"
                    >
                      {tok.surface}
                    </text>
                    <text x={x} y="198" textAnchor="middle" fill="var(--vt-muted)" fontSize="10">
                      {tok.karaka.split(" ")[0]}
                    </text>
                  </g>
                );
              })}

              {/* Dependency Arcs connecting modifiers to head */}
              {tokens.map((tok, i) => {
                if (!tok.head) return null;
                const headIdx = tokens.findIndex((t) => t.id === tok.head);
                if (headIdx === -1) return null;

                const startX = 70 + i * 95;
                const endX = 70 + headIdx * 95;
                const midX = (startX + endX) / 2;
                const arcHeight = 160 - Math.min(100, Math.abs(headIdx - i) * 35);

                return (
                  <g key={`arc-${tok.id}`}>
                    <path
                      d={`M ${startX} 160 Q ${midX} ${arcHeight} ${endX} 155`}
                      fill="none"
                      stroke="var(--vt-orange)"
                      strokeWidth="1.5"
                      strokeDasharray={tok.karaka.includes("विशेषण") ? "4,4" : "none"}
                      markerEnd="url(#arrow)"
                    />
                    <text
                      x={midX}
                      y={arcHeight + 10}
                      textAnchor="middle"
                      fill="var(--vt-orange)"
                      fontSize="11"
                      fontWeight="600"
                    >
                      {tok.karaka.split(" ")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {/* Tab 3: Anvaya Prose Reconstructor */}
      {activeTab === "anvaya" && (
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ margin: "0 0 8px", fontSize: 18 }}>{t("Anvaya (अन्वय) — Prose Reordering")}</h3>
          <p style={{ margin: "0 0 16px", color: "var(--vt-muted)", fontSize: 13 }}>
            {t("Transform poetic meter into canonical grammatical order (Agent → Object → Verb).")}
          </p>

          <div
            style={{
              padding: 18,
              background: "var(--vt-bg)",
              borderRadius: 8,
              border: "1px solid var(--vt-border)",
              fontSize: 20,
              lineHeight: 1.8,
              fontFamily: "'Noto Sans Devanagari', serif",
              color: "var(--vt-text)"
            }}
          >
            {currentText.anvaya}
          </div>
        </div>
      )}

      {/* Tab 4: Scholarly Commentary & Translation Apparatus */}
      {activeTab === "apparatus" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div className="card" style={{ padding: 18 }}>
            <h3 style={{ margin: "0 0 12px", fontSize: 16 }}>{t("Classical Commentary (संस्कृत व्याख्या / भाष्यम्)")}</h3>
            <textarea
              value={customCommentary}
              onChange={(e) => setCustomCommentary(e.target.value)}
              rows={8}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 8,
                background: "var(--vt-bg)",
                border: "1px solid var(--vt-border)",
                color: "var(--vt-text)",
                fontFamily: "'Noto Sans Devanagari', serif",
                fontSize: 15,
                lineHeight: 1.7,
                resize: "vertical"
              }}
            />
          </div>

          <div className="card" style={{ padding: 18 }}>
            <h3 style={{ margin: "0 0 12px", fontSize: 16 }}>{t("Scholarly English / Hindi Translation")}</h3>
            <textarea
              value={customTranslation}
              onChange={(e) => setCustomTranslation(e.target.value)}
              rows={8}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 8,
                background: "var(--vt-bg)",
                border: "1px solid var(--vt-border)",
                color: "var(--vt-text)",
                fontSize: 15,
                lineHeight: 1.7,
                resize: "vertical"
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
