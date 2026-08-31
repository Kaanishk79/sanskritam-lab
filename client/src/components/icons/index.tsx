import React from 'react'
import {
  BookOpen, Sparkles, Languages, Sun, Moon, Volume2, Search,
  GraduationCap, School, Activity, Bot, Mic, Puzzle, Stethoscope,
  Compass, Calendar, MessageSquareQuote, Network, Gamepad2, Swords,
  Palette, Layers2, BookMarked, Sprout, Trophy, Check, X, User,
  Users, Flame, Play, Plus, Save, Send, Eye, Scissors, Link as LinkIcon,
  Feather
} from 'lucide-react'

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  className?: string
}

export const OmIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
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
)

export const PalmLeafIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
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
)

export const TempleIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
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
)

export const ShlokaIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
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
)

interface DynamicIconProps {
  name: string
  size?: number | string
  className?: string
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, size = 18, className = '' }) => {
  const clean = (name || '').toLowerCase().trim()

  switch (clean) {
    case 'om':
    case 'ॐ':
      return <OmIcon size={size} className={className} />
    case 'palm':
    case 'manuscript':
    case 'palmleaf':
    case '📜':
      return <PalmLeafIcon size={size} className={className} />
    case 'temple':
    case '🏛️':
    case '🏛':
      return <TempleIcon size={size} className={className} />
    case 'shloka':
    case '🪔':
      return <ShlokaIcon size={size} className={className} />
    case 'book':
    case 'books':
    case '📖':
    case '📚':
    case '📘':
      return <BookOpen size={size} className={className} />
    case 'alphabet':
    case 'transliterate':
    case '🔤':
      return <Languages size={size} className={className} />
    case 'vocab':
    case 'words':
      return <BookMarked size={size} className={className} />
    case 'syntax':
    case 'sentence':
    case 'puzzle':
    case '🧩':
      return <Puzzle size={size} className={className} />
    case 'conjugation':
    case 'audio':
    case 'speaker':
    case 'sound':
    case '🔊':
    case '📢':
      return <Volume2 size={size} className={className} />
    case 'declensions':
    case 'stats':
    case 'chart':
    case 'analytics':
    case '📊':
    case '📈':
      return <Activity size={size} className={className} />
    case 'sandhi':
    case 'cut':
    case 'scissors':
    case '✂️':
      return <Scissors size={size} className={className} />
    case 'link':
    case 'compounds':
    case 'samasa':
    case '🔗':
    case '🖇️':
      return <LinkIcon size={size} className={className} />
    case 'grammar':
    case 'rules':
    case '📐':
      return <Network size={size} className={className} />
    case 'philosophy':
    case 'brain':
    case 'mind':
    case '🧠':
      return <Compass size={size} className={className} />
    case 'paleography':
    case 'search':
    case 'magnifier':
    case '🔍':
    case '🔎':
      return <Search size={size} className={className} />
    case 'check':
    case 'done':
    case 'success':
    case '✅':
    case '✓':
      return <Check size={size} className={className} />
    case 'cross':
    case 'close':
    case 'cancel':
    case 'error':
    case '❌':
    case '✕':
    case '✗':
      return <X size={size} className={className} />
    case 'play':
    case 'start':
    case '▶':
    case '▶️':
      return <Play size={size} className={className} />
    case 'plus':
    case 'add':
    case '➕':
      return <Plus size={size} className={className} />
    case 'save':
    case 'disk':
    case '💾':
      return <Save size={size} className={className} />
    case 'send':
    case 'submit':
    case 'upload':
    case '📤':
      return <Send size={size} className={className} />
    case 'eye':
    case 'view':
    case 'preview':
    case '👁️':
    case '👁':
      return <Eye size={size} className={className} />
    case 'school':
    case 'institution':
    case '🏫':
      return <School size={size} className={className} />
    case 'teacher':
    case 'guru':
    case '👨‍🏫':
    case '👩‍🏫':
      return <GraduationCap size={size} className={className} />
    case 'student':
    case 'user':
    case '🧑‍🎓':
    case '👤':
      return <User size={size} className={className} />
    case 'users':
    case 'roster':
    case 'team':
      return <Users size={size} className={className} />
    case 'flame':
    case 'fire':
    case 'streak':
    case '🔥':
      return <Flame size={size} className={className} />
    case 'sparkles':
    case 'magic':
    case 'ai':
    case '✨':
      return <Sparkles size={size} className={className} />
    case 'trophy':
    case 'award':
    case 'badge':
    case '🏆':
    case '🎖️':
    case '🥇':
      return <Trophy size={size} className={className} />
    case 'sun':
    case 'morning':
    case 'daily':
    case '🌅':
    case '☀️':
      return <Sun size={size} className={className} />
    case 'moon':
    case 'dark':
    case '🌙':
      return <Moon size={size} className={className} />
    case 'mic':
    case 'voice':
    case 'viva':
    case '🎙️':
    case '🎤':
      return <Mic size={size} className={className} />
    case 'bot':
    case 'tutor':
    case 'robot':
    case '🤖':
      return <Bot size={size} className={className} />
    case 'health':
    case 'stethoscope':
    case 'fix':
    case '🩺':
      return <Stethoscope size={size} className={className} />
    case 'calendar':
    case 'festival':
    case '📅':
      return <Calendar size={size} className={className} />
    case 'quote':
    case 'speech':
    case 'speaker-quote':
    case '🗣️':
      return <MessageSquareQuote size={size} className={className} />
    case 'game':
    case 'games':
    case 'joystick':
    case '🎮':
      return <Gamepad2 size={size} className={className} />
    case 'sword':
    case 'debate':
    case '⚔️':
      return <Swords size={size} className={className} />
    case 'palette':
    case 'studio':
    case 'creative':
    case '🎨':
      return <Palette size={size} className={className} />
    case 'cards':
    case 'flashcards':
    case 'decks':
    case '📇':
      return <Layers2 size={size} className={className} />
    case 'plant':
    case 'sprout':
    case 'dhatu':
    case 'seed':
    case '🌱':
      return <Sprout size={size} className={className} />
    case 'feather':
    case 'write':
    case 'pen':
    case '✍️':
    case '📝':
      return <Feather size={size} className={className} />
    default:
      return <Sparkles size={size} className={className} />
  }
}
