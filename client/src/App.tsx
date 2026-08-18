import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import SchoolOnly from './components/SchoolOnly'
import { KeyboardProvider } from './context/KeyboardContext'
import './App.css'
import Dashboard from './pages/dashboard/index'
import CorpusPage from './pages/research/CorpusPage'
import OCRPage from './pages/research/OCRPage'
import AnnotationPage from './pages/research/AnnotationPage'
import NCERTResearchPage from './pages/research/NCERTResearchPage'
import Viewer3DPage from './pages/visualization/Viewer3DPage'
import GrammarMapsPage from './pages/visualization/GrammarMapsPage'
import TimelinePage from './pages/visualization/TimelinePage'
import TeacherDashboardPage from './pages/teaching/TeacherDashboardPage'
import StudentWorkspacePage from './pages/teaching/StudentWorkspacePage'
import InstitutionDashboardPage from './pages/teaching/InstitutionDashboardPage'
import AssessmentPage from './pages/teaching/AssessmentPage'
import VivaSimulatorPage from './pages/viva/VivaSimulatorPage'
import LanguageLabPage from './pages/viva/LanguageLabPage'
import AnalyticsPage from './pages/viva/AnalyticsPage'
import SkillTreePage from './pages/learning/SkillTreePage'
import LessonPage from './pages/learning/LessonPage'
import ChildModePage from './pages/learning/ChildModePage'
import ResearchWorkspacePage from './pages/learning/ResearchWorkspacePage'
import CurriculumBuilderPage from './pages/learning/CurriculumBuilderPage'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import RolePickPage from './pages/auth/RolePickPage'
import AITutorPage from './pages/tools/AITutorPage'
import VoiceModePage from './pages/tools/VoiceModePage'
import SentenceBuilderPage from './pages/tools/SentenceBuilderPage'
import FixMySanskritPage from './pages/tools/FixMySanskritPage'
import StoryGeneratorPage from './pages/tools/StoryGeneratorPage'
import RealWorldPage from './pages/tools/RealWorldPage'
import CultureCalendarPage from './pages/tools/CultureCalendarPage'
import WhoSaidItPage from './pages/tools/WhoSaidItPage'
import EtymologyTreePage from './pages/tools/EtymologyTreePage'
import ConceptExplorerPage from './pages/tools/ConceptExplorerPage'
import GamesPage from './pages/tools/GamesPage'
import DebatePage from './pages/tools/DebatePage'
import CreativeStudioPage from './pages/tools/CreativeStudioPage'
import FlashcardPage from './pages/tools/FlashcardPage'
import BookshelfPage from './pages/tools/BookshelfPage'
import SearchPage from './pages/tools/SearchPage'
import ExplorePage from './pages/tools/ExplorePage'
import DictionaryPage from './pages/tools/DictionaryPage'
import DailyPage from './pages/tools/DailyPage'
import TransliteratePage from './pages/tools/TransliteratePage'
import SandhiToolPage from './pages/tools/SandhiToolPage'
import DhatuPage from './pages/tools/DhatuPage'
import ShlokaPage from './pages/tools/ShlokaPage'
import JeopardyHomePage from './pages/tools/JeopardyHomePage'
import JeopardyPlayPage from './pages/tools/JeopardyPlayPage'
import JeopardyTestPage from './pages/tools/JeopardyTestPage'
import JeopardyPrepPage from './pages/tools/JeopardyPrepPage'
import JeopardyNewsPage from './pages/tools/JeopardyNewsPage'
import JeopardyBuilderPage from './pages/tools/JeopardyBuilderPage'

export default function App() {
  return (
    <BrowserRouter>
      <KeyboardProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="research/corpus" element={<CorpusPage />} />
          <Route path="research/ocr" element={<OCRPage />} />
          <Route path="research/annotate" element={<AnnotationPage />} />
          <Route path="research/ncert" element={<NCERTResearchPage />} />
          <Route path="visualization/3d" element={<Viewer3DPage />} />
          <Route path="visualization/grammar" element={<GrammarMapsPage />} />
          <Route path="visualization/timeline" element={<TimelinePage />} />
          <Route path="teaching/dashboard" element={<TeacherDashboardPage />} />
          <Route path="teaching/workspace" element={<StudentWorkspacePage />} />
          <Route path="teaching/school" element={<InstitutionDashboardPage />} />
          <Route path="teaching/assessment" element={<AssessmentPage />} />
          <Route path="viva/simulator" element={<VivaSimulatorPage />} />
          <Route path="viva/lab" element={<LanguageLabPage />} />
          <Route path="viva/analytics" element={<AnalyticsPage />} />
          <Route path="learning/tree" element={<SkillTreePage />} />
          <Route path="learning/lesson/:lessonId" element={<LessonPage />} />
          <Route path="learning/child" element={<ChildModePage />} />
          <Route path="learning/research" element={<ResearchWorkspacePage />} />
          <Route path="learning/curriculum" element={<CurriculumBuilderPage />} />
          <Route path="tools/tutor" element={<AITutorPage />} />
          <Route path="tools/voice" element={<VoiceModePage />} />
          <Route path="tools/sentence" element={<SentenceBuilderPage />} />
          <Route path="tools/fix" element={<FixMySanskritPage />} />
          <Route path="tools/story" element={<StoryGeneratorPage />} />
          <Route path="tools/realworld" element={<RealWorldPage />} />
          <Route path="tools/calendar" element={<CultureCalendarPage />} />
          <Route path="tools/whosaid" element={<WhoSaidItPage />} />
          <Route path="tools/etymology" element={<EtymologyTreePage />} />
          <Route path="tools/concepts" element={<ConceptExplorerPage />} />
          <Route path="tools/games" element={<GamesPage />} />
          <Route path="tools/debate" element={<DebatePage />} />
          <Route path="tools/studio" element={<CreativeStudioPage />} />
          <Route path="tools/flashcards" element={<FlashcardPage />} />
          <Route path="tools/bookshelf" element={<BookshelfPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="explore/:word" element={<ExplorePage />} />
          <Route path="dictionary" element={<DictionaryPage />} />
          <Route path="daily" element={<DailyPage />} />
          <Route path="tools/transliterate" element={<TransliteratePage />} />
          <Route path="tools/sandhi" element={<SandhiToolPage />} />
          <Route path="tools/dhatu" element={<DhatuPage />} />
          <Route path="tools/shloka" element={<ShlokaPage />} />
          <Route path="tools/jeopardy" element={<JeopardyHomePage />} />
          <Route path="tools/jeopardy/play" element={<JeopardyPlayPage />} />
          <Route path="tools/jeopardy/test" element={<JeopardyTestPage />} />
          <Route path="tools/jeopardy/prep" element={<JeopardyPrepPage />} />
          <Route path="tools/jeopardy/news" element={<JeopardyNewsPage />} />
          <Route path="tools/jeopardy/builder" element={<SchoolOnly><JeopardyBuilderPage /></SchoolOnly>} />
          <Route path="auth" element={<RolePickPage />} />
          <Route path="auth/login" element={<LoginPage />} />
          <Route path="auth/signup" element={<SignupPage />} />
        </Route>
      </Routes>
      </KeyboardProvider>
    </BrowserRouter>
  )
}