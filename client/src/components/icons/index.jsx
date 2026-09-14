import {
  BookOpen,
  Sparkles,
  Languages,
  Sun,
  Moon,
  Volume2,
  Search,
  GraduationCap,
  School,
  Activity,
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
  Sprout,
  Trophy,
  Check,
  X,
  User,
  Users,
  Flame,
  Play,
  Plus,
  Save,
  Send,
  Eye,
  Scissors,
  Link as LinkIcon,
  Feather,
  Pencil,
  Brain,
  FileText,
  Scroll,
  MessageSquare,
  Box,
  Settings,
  RotateCcw,
  Lightbulb,
  Lock,
  Clock,
  Shield,
  Crown,
  TreePine,
} from "lucide-react";

const OmIcon = ({ size = 20, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 4c2.5 0 4 1.5 4 3.5 0 1.8-1.2 2.8-2.5 3.3 2 .6 3.5 2.2 3.5 4.2 0 3-2.5 5-6 5-3.5 0-5.5-2.2-5.5-4.5 0-1.8 1.2-3.2 3-3.8-1.2-.6-2-1.8-2-3.2C6.5 6 8.5 4 12 4z" />
    <path d="M16 11c2.5 0 4.5-1.5 4.5-3.5" />
    <circle cx="18" cy="4" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const PalmLeafIcon = ({ size = 20, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M2 12c4-8 16-8 20 0-4 8-16 8-20 0z" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="7" y1="9" x2="9" y2="12" />
    <line x1="12" y1="8" x2="13" y2="12" />
    <line x1="17" y1="9" x2="17" y2="12" />
    <line x1="7" y1="15" x2="9" y2="12" />
    <line x1="12" y1="16" x2="13" y2="12" />
    <line x1="17" y1="15" x2="17" y2="12" />
  </svg>
);

const TempleIcon = ({ size = 20, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 2l3 5H9l3-5z" />
    <path d="M4 11h16v2H4z" />
    <path d="M6 13v7" />
    <path d="M10 13v7" />
    <path d="M14 13v7" />
    <path d="M18 13v7" />
    <path d="M3 20h18v2H3z" />
    <path d="M7 7h10v4H7z" />
  </svg>
);

const ShlokaIcon = ({ size = 20, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M8 7h8" />
    <path d="M8 11h6" />
    <circle cx="12" cy="15" r="1" fill="currentColor" />
  </svg>
);

const DynamicIcon = ({ name, size = 18, className = "" }) => {
  const clean = (name || "").toLowerCase().trim();
  switch (clean) {
    case "om":
    case "\u0950":
      return <OmIcon size={size} className={className} />;
    case "palm":
    case "manuscript":
    case "palmleaf":
    case "\u{1F4DC}":
      return <PalmLeafIcon size={size} className={className} />;
    case "scroll":
    case "text":
    case "treatise":
    case "manuscripts":
      return <Scroll size={size} className={className} />;
    case "temple":
    case "\u{1F3DB}\uFE0F":
    case "\u{1F3DB}":
      return <TempleIcon size={size} className={className} />;
    case "shloka":
    case "verse":
    case "\u{1FA94}":
      return <ShlokaIcon size={size} className={className} />;
    case "book":
    case "books":
    case "textbook":
    case "\u{1F4D6}":
    case "\u{1F4DA}":
    case "\u{1F4D8}":
    case "\u{1F4D5}":
    case "\u{1F4D7}":
    case "\u{1F4D9}":
      return <BookOpen size={size} className={className} />;
    case "alphabet":
    case "transliterate":
    case "letters":
    case "script":
    case "\u{1F524}":
      return <Languages size={size} className={className} />;
    case "vocab":
    case "words":
      return <BookMarked size={size} className={className} />;
    case "syntax":
    case "sentence":
    case "puzzle":
    case "\u{1F9E9}":
      return <Puzzle size={size} className={className} />;
    case "conjugation":
    case "audio":
    case "speaker":
    case "sound":
    case "pronounce":
    case "\u{1F50A}":
    case "\u{1F4E2}":
      return <Volume2 size={size} className={className} />;
    case "declensions":
    case "stats":
    case "chart":
    case "analytics":
    case "\u{1F4CA}":
    case "\u{1F4C8}":
      return <Activity size={size} className={className} />;
    case "sandhi":
    case "cut":
    case "scissors":
    case "\u2702\uFE0F":
      return <Scissors size={size} className={className} />;
    case "link":
    case "compounds":
    case "samasa":
    case "\u{1F517}":
    case "\u{1F587}\uFE0F":
      return <LinkIcon size={size} className={className} />;
    case "grammar":
    case "rules":
    case "\u{1F4D0}":
    case "\u{1F4CF}":
      return <Network size={size} className={className} />;
    case "philosophy":
    case "compass":
      return <Compass size={size} className={className} />;
    case "brain":
    case "mind":
    case "mindmap":
    case "concepts":
    case "\u{1F9E0}":
      return <Brain size={size} className={className} />;
    case "paleography":
    case "search":
    case "magnifier":
    case "explore":
    case "\u{1F50D}":
    case "\u{1F50E}":
      return <Search size={size} className={className} />;
    case "check":
    case "done":
    case "success":
    case "\u2705":
    case "\u2713":
      return <Check size={size} className={className} />;
    case "cross":
    case "close":
    case "cancel":
    case "error":
    case "\u274C":
    case "\u2715":
    case "\u2717":
      return <X size={size} className={className} />;
    case "play":
    case "start":
    case "\u25B6":
    case "\u25B6\uFE0F":
      return <Play size={size} className={className} />;
    case "plus":
    case "add":
    case "\u2795":
      return <Plus size={size} className={className} />;
    case "save":
    case "disk":
    case "\u{1F4BE}":
      return <Save size={size} className={className} />;
    case "send":
    case "submit":
    case "upload":
    case "\u{1F4E4}":
      return <Send size={size} className={className} />;
    case "eye":
    case "view":
    case "preview":
    case "\u{1F441}\uFE0F":
    case "\u{1F441}":
      return <Eye size={size} className={className} />;
    case "school":
    case "institution":
    case "\u{1F3EB}":
      return <School size={size} className={className} />;
    case "teacher":
    case "guru":
    case "\u{1F468}\u200D\u{1F3EB}":
    case "\u{1F469}\u200D\u{1F3EB}":
      return <GraduationCap size={size} className={className} />;
    case "student":
    case "user":
    case "\u{1F9D1}\u200D\u{1F393}":
    case "\u{1F464}":
    case "\u{1F393}":
      return <User size={size} className={className} />;
    case "users":
    case "roster":
    case "team":
      return <Users size={size} className={className} />;
    case "flame":
    case "fire":
    case "streak":
    case "\u{1F525}":
      return <Flame size={size} className={className} />;
    case "sparkles":
    case "magic":
    case "ai":
    case "\u2728":
      return <Sparkles size={size} className={className} />;
    case "trophy":
    case "award":
    case "badge":
    case "\u{1F3C6}":
    case "\u{1F396}\uFE0F":
    case "\u{1F947}":
      return <Trophy size={size} className={className} />;
    case "sun":
    case "morning":
    case "daily":
    case "\u{1F305}":
    case "\u2600\uFE0F":
      return <Sun size={size} className={className} />;
    case "moon":
    case "dark":
    case "\u{1F319}":
      return <Moon size={size} className={className} />;
    case "mic":
    case "voice":
    case "viva":
    case "\u{1F399}\uFE0F":
    case "\u{1F3A4}":
      return <Mic size={size} className={className} />;
    case "bot":
    case "tutor":
    case "robot":
    case "\u{1F916}":
      return <Bot size={size} className={className} />;
    case "health":
    case "stethoscope":
    case "fix":
    case "\u{1FA7A}":
      return <Stethoscope size={size} className={className} />;
    case "calendar":
    case "festival":
    case "\u{1F4C5}":
      return <Calendar size={size} className={className} />;
    case "quote":
    case "speech":
    case "speaker-quote":
    case "\u{1F5E3}\uFE0F":
      return <MessageSquareQuote size={size} className={className} />;
    case "game":
    case "games":
    case "joystick":
    case "\u{1F3AE}":
      return <Gamepad2 size={size} className={className} />;
    case "sword":
    case "swords":
    case "debate":
    case "\u2694\uFE0F":
      return <Swords size={size} className={className} />;
    case "palette":
    case "studio":
    case "creative":
    case "theater":
    case "drama":
    case "\u{1F3AD}":
    case "\u{1F3A8}":
      return <Palette size={size} className={className} />;
    case "cards":
    case "flashcards":
    case "decks":
    case "\u{1F4C7}":
      return <Layers2 size={size} className={className} />;
    case "plant":
    case "sprout":
    case "dhatu":
    case "seed":
    case "\u{1F331}":
      return <Sprout size={size} className={className} />;
    case "feather":
    case "pen":
    case "\u270D\uFE0F":
      return <Feather size={size} className={className} />;
    case "pencil":
    case "write":
    case "solve":
    case "\u270F\uFE0F":
    case "\u270F":
    case "\u{1F4DD}":
      return <Pencil size={size} className={className} />;
    case "file":
    case "document":
    case "pdf":
    case "\u{1F4C4}":
    case "\u{1F4D1}":
      return <FileText size={size} className={className} />;
    case "chat":
    case "dialogue":
    case "comments":
    case "\u{1F4AC}":
      return <MessageSquare size={size} className={className} />;
    case "box":
    case "3d":
    case "cube":
    case "\u{1F9CA}":
      return <Box size={size} className={className} />;
    case "settings":
    case "customize":
    case "\u2699\uFE0F":
    case "\u2699":
      return <Settings size={size} className={className} />;
    case "reset":
    case "reload":
    case "\u21BA":
      return <RotateCcw size={size} className={className} />;
    case "lightbulb":
    case "tip":
    case "idea":
    case "\u{1F4A1}":
      return <Lightbulb size={size} className={className} />;
    case "lock":
    case "secure":
    case "private":
    case "\u{1F512}":
      return <Lock size={size} className={className} />;
    case "clock":
    case "time":
    case "waiting":
    case "\u23F3":
    case "\u{1F558}":
      return <Clock size={size} className={className} />;
    case "shield":
    case "armor":
    case "\u{1F6E1}\uFE0F":
    case "\u{1F6E1}":
      return <Shield size={size} className={className} />;
    case "crown":
    case "king":
    case "royal":
    case "\u{1F451}":
      return <Crown size={size} className={className} />;
    case "tree":
    case "forest":
    case "\u{1F333}":
      return <TreePine size={size} className={className} />;
    default:
      return <Sparkles size={size} className={className} />;
  }
};

export {
  DynamicIcon,
  OmIcon,
  PalmLeafIcon,
  ShlokaIcon,
  TempleIcon,
};
