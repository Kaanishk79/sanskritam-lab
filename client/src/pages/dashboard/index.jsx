import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  BookMarked,
  Award,
  Search,
  BookOpen,
  Scroll,
  Layers,
  GraduationCap,
  Bot,
  Mic,
  Compass
} from "lucide-react";
import institutionHeroImg from "../../assets/image-aspera.jpg";
import { tracks } from "../../data/tracks";
import { DynamicIcon } from "../../components/icons";
import { useLanguage } from "../../context/LanguageContext";
import { useRole } from "../../context/RoleContext";
import ExplorePanel from "../../components/ExplorePanel";

// Complete directory of all program sections available across SanskritLab
const allProgramSections = [
  // ─── RESEARCH & DIGITIZATION ───
  {
    category: "research",
    categoryLabel: "Research & Digitization",
    categoryLabelHi: "अनुसन्धानम् एवं डिजिटलीकरणम्",
    icon: "manuscript",
    title: "Manuscript Digitization (OCR)",
    desc: "Convert scanned Devanāgarī & Grantha manuscripts into searchable Unicode with native neural OCR.",
    link: "/research/ocr"
  },
  {
    category: "research",
    categoryLabel: "Research & Digitization",
    categoryLabelHi: "अनुसन्धानम् एवं डिजिटलीकरणम्",
    icon: "temple",
    title: "Smart Corpus & Semantic Search",
    title: "NCERT Sanskrit Library",
    desc: "Complete Class 6–12 textbooks (Deepakam, Shemushi, Bhaswati, Shashwati) with digitized reader.",
    link: "/research/ncert"
  },
  {
    category: "research",
    categoryLabel: "Research & Digitization",
    categoryLabelHi: "अनुसन्धानम् एवं डिजिटलीकरणम्",
    icon: "feather",
    title: "NCERT Board Sample Papers",
    desc: "Class 10 & 12 board sample question papers with marking schemes, answer keys, and PDF view.",
    link: "/ncert/papers"
  },

  // ─── 3D VISUALIZATION & HISTORY ───
  {
    category: "visualization",
    categoryLabel: "3D & Visualization",
    categoryLabelHi: "त्रिआयामी दृश्यीकरणम्",
    icon: "palette",
    title: "3D Manuscript Viewer",
    desc: "Interactive 3D palm-leaf and birch-bark manuscript inspection with digitized transcription overlays.",
    link: "/visualization/3d"
  },
  {
    category: "visualization",
    categoryLabel: "3D & Visualization",
    categoryLabelHi: "त्रिआयामी दृश्यीकरणम्",
    icon: "grammar",
    title: "Grammar & Philosophy Maps",
    desc: "Pāṇini's Aṣṭādhyāyī rules as branching trees; Nyāya, Vedānta, and Mīmāṃsā networks visualized.",
    link: "/visualization/grammar"
  },
  {
    category: "visualization",
    categoryLabel: "3D & Visualization",
    categoryLabelHi: "त्रिआयामी दृश्यीकरणम्",
    icon: "chart",
    title: "Evolutionary Timeline",
    desc: "Interactive chronological journey mapping Vedic, Epic, Classical, and Modern Sanskrit evolution.",
    link: "/visualization/timeline"
  },

  // ─── TEACHING & ACADEMICS ───
  {
    category: "teaching",
    categoryLabel: "Teaching & Academics",
    categoryLabelHi: "शिक्षणम् एवं संस्था",
    icon: "teacher",
    title: "Institution HQ",
    desc: "Institutional dashboard for school administration, student roster management, and institutional analytics.",
    link: "/teaching/school"
  },
  {
    category: "teaching",
    categoryLabel: "Teaching & Academics",
    categoryLabelHi: "शिक्षणम् एवं संस्था",
    icon: "teacher",
    title: "Teacher Dashboard",
    desc: "Lesson builder, classroom assignments, student tracking, and manuscript annotation modules.",
    link: "/teaching/dashboard"
  },
  {
    category: "teaching",
    categoryLabel: "Teaching & Academics",
    categoryLabelHi: "शिक्षणम् एवं संस्था",
    icon: "student",
    title: "Student Workspace",
    desc: "Guided learning workbench with interactive texts, assigned drills, and collaborative tools.",
    link: "/teaching/workspace"
  },
  {
    category: "teaching",
    categoryLabel: "Teaching & Academics",
    categoryLabelHi: "शिक्षणम् एवं संस्था",
    icon: "feather",
    title: "Assessment Engine",
    desc: "Auto-generated diagnostic quizzes for noun declensions (vibhakti), verb conjugations, and sandhi.",
    link: "/teaching/assessment"
  },

  // ─── ADAPTIVE LEARNING ───
  {
    category: "learning",
    categoryLabel: "Adaptive Learning",
    categoryLabelHi: "अनुकूली शिक्षणम्",
    icon: "plant",
    title: "Learning Path (Skill Tree)",
    desc: "Structured curriculum from beginner to advanced with XP, streaks, quizzes, and unlocking milestones.",
    link: "/learning/tree"
  },
  {
    category: "learning",
    categoryLabel: "Adaptive Learning",
    categoryLabelHi: "अनुकूली शिक्षणम्",
    icon: "teacher",
    title: "Curriculum Builder",
    desc: "Design custom instructional syllabi, export PDF lesson plans, and structure graded benchmarks.",
    link: "/learning/curriculum"
  },

  // ─── AI TOOLS & LINGUISTIC SUITE ───
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "search",
    title: "Sanskrit Search",
    desc: "Search words, lessons, texts, and topics in Devanagari or English with live smart suggestions.",
    link: "/search"
  },
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "sparkles",
    title: "Explore Mode",
    desc: "Inspect any Sanskrit word to reveal morphological roots, vibhakti, pronunciation, and textual citations.",
    link: "/explore"
  },
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "book",
    title: "Monier-Williams Sanskrit Dictionary",
    desc: "Comprehensive Sanskrit-English lexicon with Devanagari, IAST, etymological roots, and examples.",
    link: "/dictionary"
  },
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "sun",
    title: "Daily Sanskrit",
    desc: "Word, phrase, and proverb of the day along with a 5-minute cultural immersion challenge.",
    link: "/daily"
  },
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "mic",
    title: "Voice Mode",
    desc: "Speak naturally in Sanskrit or Hindi — receive instant auditory pronunciation analysis and spoken reply.",
    link: "/tools/voice"
  },
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "puzzle",
    title: "Sentence Builder",
    desc: "Interactive tile-based puzzle to construct grammatically sound Sanskrit sentences through play.",
    link: "/tools/sentence"
  },
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "health",
    title: "Fix My Sanskrit",
    desc: "Paste any composition for instant grammar validation: sandhi splitting, concord, and punctuation repair.",
    link: "/tools/fix"
  },
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "book",
    title: "Story Generator",
    desc: "Generate whimsical or historical Sanskrit stories with parallel translations and audio narration.",
    link: "/tools/story"
  },
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "globe",
    title: "Sanskrit → Real World",
    desc: "Explore how ancient Sanskrit concepts — karma, yoga, zero, guru, mantra — shape the modern world.",
    link: "/tools/realworld"
  },
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "calendar",
    title: "Culture Calendar",
    desc: "Track traditional panchang tithis, six seasons (ṛtus), and cultural festivals on a synchronized calendar.",
    link: "/tools/calendar"
  },
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "quote",
    title: "Who Said It?",
    desc: "Attribution quiz: match immortal Sanskrit shlokas and dialogues to their canonical authors.",
    link: "/tools/whosaid"
  },
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "plant",
    title: "Etymology Tree",
    desc: "Trace single verbal roots (dhātus) branching into hundreds of words across grammar and linguistics.",
    link: "/tools/etymology"
  },
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "search",
    title: "Concept Explorer",
    desc: "Plain-language deep-dives into core philosophical concepts, darśanas, and grammatical sutras.",
    link: "/tools/concepts"
  },
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "game",
    title: "Learn Through Games",
    desc: "Interactive word match, Devanagari number blitz, and Sandhi chase to keep language skills sharp.",
    link: "/tools/games"
  },
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "sword",
    title: "Vāda (Debate Mode)",
    desc: "Classical philosophical disputation mode: formulate Sanskrit arguments and counter-theses.",
    link: "/tools/debate"
  },
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "palette",
    title: "Creative Studio",
    desc: "Compose metered poetry: choose poetic meters (chandas), verify syllables, and hear the cadence.",
    link: "/tools/studio"
  },
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "cards",
    title: "SRS Flashcards",
    desc: "Scientifically optimized spaced-repetition flashcards for vocabulary, noun tables, and roots.",
    link: "/tools/flashcards"
  },
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "book",
    title: "Digital Bookshelf",
    desc: "Classical Sanskrit library spanning Rāmāyaṇa, Mahābhārata, Kālidāsa, Pañcatantra, and Hitopadeśa.",
    link: "/tools/bookshelf"
  },
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "alphabet",
    title: "Transliteration Engine",
    desc: "Live bidirectional conversion between Devanagari, IAST, Harvard-Kyoto, and ITRANS.",
    link: "/tools/transliterate"
  },
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "audio",
    title: "Sandhi Tool",
    desc: "Join and split Sanskrit words with exact rule-by-rule Pāṇinian explanations for Guṇa, Vṛddhi, Yaṇ, and Visarga.",
    link: "/tools/sandhi"
  },
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "plant",
    title: "Dhātu Explorer",
    desc: "Comprehensive catalogue of Sanskrit verb roots with gaṇa, pada, artha, and present tense conjugations.",
    link: "/tools/dhatu"
  },
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "shloka",
    title: "संस्कृत श्लोकाः (Shloka Explorer)",
    desc: "70+ canonical verses across 10 sacred scriptures (Gita, Upanishads, Ramayana, Hitopadesha, etc.) with word breakdown, Hindi/English meanings, and audio recitation.",
    link: "/tools/shloka"
  },
  {
    category: "tools",
    categoryLabel: "AI & Linguistic Tools",
    categoryLabelHi: "कृत्रिमबुद्धिः भाषासाधनानि च",
    icon: "trophy",
    title: "Sanskrit Jeopardy Hub",
    desc: "Exciting classroom Jeopardy game with board builder, test simulator, and category questions.",
    link: "/tools/jeopardy"
  },

  // ─── VIVA & EXAM PRACTICE ───
  {
    category: "viva",
    categoryLabel: "Viva & Exam Practice",
    categoryLabelHi: "मौखिकपरीक्षा एवं मूल्यांकनम्",
    icon: "mic",
    title: "AI Viva Simulator",
    desc: "Realistic oral viva practice with AI speech evaluation, question variations, and instant feedback.",
    link: "/viva/simulator"
  },
  {
    category: "viva",
    categoryLabel: "Viva & Exam Practice",
    categoryLabelHi: "मौखिकपरीक्षा एवं मूल्यांकनम्",
    icon: "alphabet",
    title: "Language Lab",
    desc: "Phonetic pronunciation laboratory for institutional labs and rigorous recitation training.",
    link: "/viva/lab"
  },
  {
    category: "viva",
    categoryLabel: "Viva & Exam Practice",
    categoryLabelHi: "मौखिकपरीक्षा एवं मूल्यांकनम्",
    icon: "analytics",
    title: "Performance Analytics Engine",
    desc: "Track proficiency metrics, identify pronunciation or grammar gaps, and receive tailored study plans.",
    link: "/viva/analytics"
  }
];

const programIconMap = {
  "/research/ocr": "/sanskritlab-icons/1_Research_and_Digitization/card-ocr.png",
  "/research/corpus": "/sanskritlab-icons/1_Research_and_Digitization/card-corpus.png",
  "/research/annotate": "/sanskritlab-icons/1_Research_and_Digitization/card-annotate.png",
  "/research/ncert": "/sanskritlab-icons/1_Research_and_Digitization/card-ncert-lib.png",
  "/ncert/papers": "/sanskritlab-icons/1_Research_and_Digitization/card-ncert-papers.png",

  "/visualization/3d": "/sanskritlab-icons/2_3D_and_Visualization/card-3d-viewer.png",
  "/visualization/grammar": "/sanskritlab-icons/2_3D_and_Visualization/card-grammar-maps.png",
  "/visualization/timeline": "/sanskritlab-icons/2_3D_and_Visualization/card-timeline.png",

  "/teaching/school": "/sanskritlab-icons/3_Teaching_and_Academics/card-school-hq.png",
  "/teaching/dashboard": "/sanskritlab-icons/3_Teaching_and_Academics/card-teacher-dash.png",
  "/teaching/workspace": "/sanskritlab-icons/3_Teaching_and_Academics/card-student-space.png",
  "/teaching/assessment": "/sanskritlab-icons/3_Teaching_and_Academics/card-assessment.png",

  "/learning/tree": "/sanskritlab-icons/4_Learning_and_Adaptive_Modules/card-skill-tree.png",
  "/learning/child": "/sanskritlab-icons/4_Learning_and_Adaptive_Modules/card-child-mode.png",
  "/learning/research": "/sanskritlab-icons/4_Learning_and_Adaptive_Modules/card-phd-space.png",
  "/learning/curriculum": "/sanskritlab-icons/4_Learning_and_Adaptive_Modules/card-curriculum.png",

  "/search": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-search.png",
  "/explore": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-explore.png",
  "/dictionary": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-dictionary.png",
  "/daily": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-daily.png",
  "/tools/tutor": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-ai-tutor.png",
  "/tools/voice": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-voice.png",
  "/tools/sentence": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-sentence.png",
  "/tools/fix": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-fix.png",
  "/tools/story": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-story.png",
  "/tools/realworld": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-realworld.png",
  "/tools/calendar": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-calendar.png",
  "/tools/whosaid": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-whosaid.png",
  "/tools/etymology": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-etymology.png",
  "/tools/concepts": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-concepts.png",
  "/tools/games": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-games.png",
  "/tools/debate": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-debate.png",
  "/tools/studio": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-studio.png",
  "/tools/flashcards": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-flashcards.png",
  "/tools/bookshelf": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-bookshelf.png",
  "/tools/transliterate": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-transliterate.png",
  "/tools/sandhi": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-sandhi.png",
  "/tools/dhatu": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-dhatu.png",
  "/tools/shloka": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-shloka.png",
  "/tools/jeopardy": "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-jeopardy.png",

  "/viva/simulator": "/sanskritlab-icons/6_Viva_and_Exam_Practice/card-viva-sim.png",
  "/viva/lab": "/sanskritlab-icons/6_Viva_and_Exam_Practice/card-viva-sim.png",
  "/viva/analytics": "/sanskritlab-icons/6_Viva_and_Exam_Practice/card-analytics.png",
};

const filterCategoryIcons = {
  research: "/sanskritlab-icons/1_Research_and_Digitization/card-corpus.png",
  visualization: "/sanskritlab-icons/2_3D_and_Visualization/card-3d-viewer.png",
  teaching: "/sanskritlab-icons/3_Teaching_and_Academics/card-school-hq.png",
  learning: "/sanskritlab-icons/4_Learning_and_Adaptive_Modules/card-skill-tree.png",
  tools: "/sanskritlab-icons/5_AI_and_Linguistic_Tools/card-ai-tutor.png",
  viva: "/sanskritlab-icons/6_Viva_and_Exam_Practice/card-viva-sim.png",
};

const trackIconMap = {
  child: "/sanskritlab-icons/4_Learning_and_Adaptive_Modules/card-child-mode.png",
  teen: "/sanskritlab-icons/1_Research_and_Digitization/card-ncert-lib.png",
  undergrad: "/sanskritlab-icons/3_Teaching_and_Academics/card-teacher-dash.png",
  graduate: "/sanskritlab-icons/1_Research_and_Digitization/card-corpus.png",
  phd: "/sanskritlab-icons/4_Learning_and_Adaptive_Modules/card-phd-space.png",
};

const programFilterCategories = [
  { id: "all", label: "All Programs", labelHi: "सर्वाणि साधनानि" },
  { id: "research", label: "Research & OCR", labelHi: "अनुसन्धानम्" },
  { id: "visualization", label: "3D & Maps", labelHi: "दृश्यीकरणम्" },
  { id: "teaching", label: "Teaching & School", labelHi: "शिक्षणम्" },
  { id: "learning", label: "Learning Paths", labelHi: "शिक्षणमार्गाः" },
  { id: "tools", label: "AI & Linguistics", labelHi: "भाषासाधनानि" },
  { id: "viva", label: "Viva & Practice", labelHi: "मौखिकपरीक्षा" }
];

function Dashboard() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const { guest } = useRole();
  const hi = lang === "hi";

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");
  const [exploreWord, setExploreWord] = useState(null);

  // Filter program sections based on category and search query
  const filteredPrograms = useMemo(() => {
    return allProgramSections.filter((item) => {
      const matchCategory =
        activeFilter === "all" || item.category === activeFilter;
      if (!matchCategory) return false;

      if (!searchFilter.trim()) return true;
      const q = searchFilter.toLowerCase().trim();
      return (
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q)
      );
    });
  }, [activeFilter, searchFilter]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ─── 1. HERO SECTION — INSTITUTIONAL ILLUSTRATION (FULL SCREEN WIDTH) ─── */}
      <section className="institutional-hero">
        <img
          src={institutionHeroImg}
          alt="SanskritLab Institutional Illustration"
          className="institutional-hero-bg"
          loading="eager"
        />
        <div className="institutional-hero-overlay">
          <div className="institutional-hero-content">
            <div className="institutional-badge">
              <Sparkles size={14} />
              <span>
                {hi
                  ? "संस्कृतम् — राष्ट्रिय अनुसन्धान एवं शिक्षण प्रतिष्ठानम्"
                  : "संस्कृतम् — SanskritLab · Academic & Research Sanctuary"}
              </span>
            </div>

            <h1>
              {hi ? "प्राचीन ज्ञानस्य " : "Bridging "}
              <span className="highlight">
                {hi ? "आधुनिक विज्ञानं च" : "Ancient Wisdom"}
              </span>
              <br />
              {hi ? "संयोजनम्" : "with Modern Technology"}
            </h1>

            <p className="hero-tagline">
              {hi
                ? "पाण्डुलिपि डिजिटलीकरणम्, ३डी दृश्यीकरणम्, कृत्रिमबुद्धि-साधनानि एवं सस्वर श्लोकपाठशाला — बालकेभ्यः अनुसन्धानछात्रेभ्यश्च।"
                : "A sanctuary for manuscript preservation, interactive 3D visualization, neural linguistics, and traditional shloka recitation — from playful beginnings to doctoral critical editions."}
            </p>

            <div className="institutional-hero-actions">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/tools/shloka")}
              >
                <Scroll size={16} />
                <span>{hi ? "श्लोक श्रवणम्" : "Listen to Shlokas"}</span>
              </button>

              <button
                className="btn btn-outline"
                onClick={() => scrollToSection("programs")}
              >
                <Compass size={16} />
                <span>{hi ? "सर्वाणि साधनानि" : "Explore All Sections"}</span>
              </button>

              <button
                className="btn btn-outline"
                onClick={() => navigate("/research/ncert")}
              >
                <BookMarked size={16} />
                <span>{hi ? "NCERT पाठ्यक्रमः" : "NCERT Curriculum"}</span>
              </button>

              <button
                className="btn btn-outline"
                onClick={() => navigate("/learning/tree")}
              >
                <GraduationCap size={16} />
                <span>{hi ? "शिक्षण मार्गः" : "Learning Path"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. ALL PROGRAM CONTENTS ORGANIZED & CENTRALIZED DIRECTLY BELOW HERO ─── */}
      <section className="programs-section" id="programs">
        <div className="section-header" style={{ textAlign: "center", maxWidth: 840, margin: "0 auto 32px" }}>
          <div className="shloka-header-badge" style={{ background: "rgba(63, 81, 181, 0.1)", color: "var(--vt-blue)", borderColor: "rgba(63, 81, 181, 0.25)" }}>
            <Compass size={14} />
            <span>{hi ? "संस्कृतम् सर्वाणि कार्यक्षेत्राणि" : "Complete Program Directory"}</span>
          </div>
          <h2>{hi ? "कार्यक्षेत्राणि एवं भाषासाधनानि" : "All Program Suites & Learning Tools"}</h2>
          <p style={{ margin: "0 auto" }}>
            {hi
              ? "अनुसन्धानम्, पाण्डुलिपि-डिजिटलीकरणम्, ३डी दृश्यीकरणम्, कक्षाशिक्षणम्, भाषासाधनानि एवं मौखिकपरीक्षा — सर्वं एकत्र सुसङ्गतम्।"
              : "Discover and launch every workspace, research tool, and interactive module in SanskritLab from one centralized directory."}
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="programs-filter-bar">
          <div className="programs-tabs">
            {programFilterCategories.map((tab) => {
              const active = activeFilter === tab.id;
              const tabIcon = filterCategoryIcons[tab.id];
              return (
                <button
                  key={tab.id}
                  className={`programs-tab-btn ${active ? "active" : ""}`}
                  onClick={() => setActiveFilter(tab.id)}
                >
                  {tabIcon && (
                    <img
                      src={tabIcon}
                      alt={tab.label}
                      className="tab-icon-img"
                    />
                  )}
                  <span>{hi ? tab.labelHi : tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="programs-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder={hi ? "साधनं खोजें..." : "Search all tools & features..."}
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>
        </div>

        {/* Responsive Grid of Cards for Every Program Section */}
        {filteredPrograms.length === 0 ? (
          <div className="programs-empty-state">
            <BookOpen size={32} />
            <h4>{t("No program section matches your search")}</h4>
            <p>{t("Clear your filter to view all available suites.")}</p>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => {
                setActiveFilter("all");
                setSearchFilter("");
              }}
              style={{ marginTop: 8 }}
            >
              {t("View All Sections")}
            </button>
          </div>
        ) : (
          <div className="card-grid">
            {filteredPrograms.map((p) => {
              const iconImg = programIconMap[p.link];
              return (
                <div
                  key={p.title}
                  className="vt-card"
                  onClick={() => navigate(p.link)}
                >
                  <div className="card-icon">
                    {iconImg ? (
                      <img
                        src={iconImg}
                        alt={p.title}
                        className="card-icon-img"
                      />
                    ) : (
                      <DynamicIcon name={p.icon} size={28} />
                    )}
                  </div>
                  <h3>{t(p.title)}</h3>
                  <p>{t(p.desc)}</p>
                  <span
                    className="card-link"
                    style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
                  >
                    {t("Open Section")} <ArrowRight size={14} />
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ─── NCERT CURRICULUM BANNER ─── */}
      <section className="section" style={{ paddingTop: 12, paddingBottom: 16 }}>
        <div
          className="ncert-hero-banner"
          onClick={() => navigate("/research/ncert")}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 16,
            padding: "28px 32px",
            borderRadius: 14,
            background: "linear-gradient(135deg, #10b981 0%, #0284c7 100%)",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(16, 185, 129, 0.25)",
            maxWidth: 1000,
            margin: "0 auto"
          }}
        >
          <BookMarked size={44} />
          <div>
            <h3 style={{ margin: 0, fontSize: 22, color: "#fff", textAlign: "center" }}>
              {t("NCERT Sanskrit Curriculum")}
            </h3>
            <p style={{ margin: "6px auto 0", opacity: 0.95, fontSize: 14, maxWidth: 600, textAlign: "center" }}>
              {t(
                "Class 6–12 textbooks (Deepakam, Shemushi, Bhaswati & Shashwati) with digitized reader and board sample papers."
              )}
            </p>
          </div>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255, 255, 255, 0.2)",
              padding: "8px 20px",
              borderRadius: 50
            }}
          >
            {t("Browse Library")} <ArrowRight size={16} />
          </span>
        </div>
      </section>

      {/* ─── ACADEMIC STATS BAR ─── */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-value">3,000+</div>
          <div className="stat-label">{t("Years of Texts")}</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">12+</div>
          <div className="stat-label">{t("Curated Lessons")}</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">5</div>
          <div className="stat-label">{t("Adaptive Tracks")}</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">10,000+</div>
          <div className="stat-label">{t("Verses & Lexicon")}</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">35+</div>
          <div className="stat-label">{t("Scholarly Tools")}</div>
        </div>
      </div>

      {/* ─── LEARNING TRACKS ─── */}
      <section className="section" style={{ paddingTop: 16 }}>
        <div className="section-header">
          <h2>{t("Choose Your Learning Path")}</h2>
          <p>
            {t(
              "From young beginners to doctoral researchers — a tailored track for every stage"
            )}
          </p>
        </div>
        <div className="track-row">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="track-card"
              onClick={() => navigate("/learning/tree")}
            >
              <span
                className="track-icon"
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  width: "100%",
                  color: track.color
                }}
              >
                <DynamicIcon name={track.icon} size={32} />
              </span>
              <h3>{t(track.label)}</h3>
              <div className="track-desc">{t(track.description)}</div>
              <div className="track-age">{t(track.classRange)}</div>
            </div>
          ))}
          {tracks.map((track) => {
            const trackImg = trackIconMap[track.id];
            return (
              <div
                key={track.id}
                className="track-card"
                onClick={() => navigate("/learning/tree")}
              >
                <span className="track-icon">
                  {trackImg ? (
                    <img
                      src={trackImg}
                      alt={track.label}
                      className="track-icon-img"
                    />
                  ) : (
                    <DynamicIcon name={track.icon} size={32} />
                  )}
                </span>
                <h3>{t(track.label)}</h3>
                <div className="track-desc">{t(track.description)}</div>
                <div className="track-age">{t(track.classRange)}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── CALL TO ACTION BAR (PROMOTIONAL 100% FREE TEXT REMOVED) ─── */}
      <div className="cta-bar">
        <h2>{t("Ready to Begin Your Sanskrit Journey?")}</h2>
        <p>
          {t(
            "Join thousands of learners, teachers, and researchers discovering 3,000 years of Sanskrit wisdom through cutting-edge technology."
          )}
        </p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/learning/tree")}
        >
          {t("Start Learning Now")} <ArrowRight size={16} />
        </button>
      </div>

      {/* EXPLORE PANEL MODAL ON WORD CLICK */}
      {exploreWord && (
        <ExplorePanel
          word={exploreWord}
          onClose={() => setExploreWord(null)}
        />
      )}
    </>
  );
}

export default Dashboard;
