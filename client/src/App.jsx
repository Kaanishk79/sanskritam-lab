import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import SchoolOnly from "./components/SchoolOnly";
import PageLoader from "./components/PageLoader";
import ScrollToTop from "./components/ScrollToTop";
import { KeyboardProvider } from "./context/KeyboardContext";
import "./App.css";

// Immediate load for core dashboard
import Dashboard from "./pages/dashboard/index";

// Lazy-loaded routes for code-splitting & massive bundle size reduction
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const CorpusPage = lazy(() => import("./pages/research/CorpusPage"));
const OCRPage = lazy(() => import("./pages/research/OCRPage"));
const AnnotationPage = lazy(() => import("./pages/research/AnnotationPage"));
const NCERTResearchPage = lazy(() => import("./pages/research/NCERTResearchPage"));
const Viewer3DPage = lazy(() => import("./pages/visualization/Viewer3DPage"));
const GrammarMapsPage = lazy(() => import("./pages/visualization/GrammarMapsPage"));
const TimelinePage = lazy(() => import("./pages/visualization/TimelinePage"));
const TeacherDashboardPage = lazy(() => import("./pages/teaching/TeacherDashboardPage"));
const StudentWorkspacePage = lazy(() => import("./pages/teaching/StudentWorkspacePage"));
const InstitutionDashboardPage = lazy(() => import("./pages/teaching/InstitutionDashboardPage"));
const AssessmentPage = lazy(() => import("./pages/teaching/AssessmentPage"));
const SamplePapersPage = lazy(() => import("./pages/teaching/SamplePapersPage"));
const VivaSimulatorPage = lazy(() => import("./pages/viva/VivaSimulatorPage"));
const LanguageLabPage = lazy(() => import("./pages/viva/LanguageLabPage"));
const AnalyticsPage = lazy(() => import("./pages/viva/AnalyticsPage"));
const SkillTreePage = lazy(() => import("./pages/learning/SkillTreePage"));
const LessonPage = lazy(() => import("./pages/learning/LessonPage"));
const ChildModePage = lazy(() => import("./pages/learning/ChildModePage"));
const ResearchWorkspacePage = lazy(() => import("./pages/learning/ResearchWorkspacePage"));
const CurriculumBuilderPage = lazy(() => import("./pages/learning/CurriculumBuilderPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/auth/SignupPage"));
const RolePickPage = lazy(() => import("./pages/auth/RolePickPage"));
const VoiceModePage = lazy(() => import("./pages/tools/VoiceModePage"));
const SentenceBuilderPage = lazy(() => import("./pages/tools/SentenceBuilderPage"));
const FixMySanskritPage = lazy(() => import("./pages/tools/FixMySanskritPage"));
const StoryGeneratorPage = lazy(() => import("./pages/tools/StoryGeneratorPage"));
const RealWorldPage = lazy(() => import("./pages/tools/RealWorldPage"));
const CultureCalendarPage = lazy(() => import("./pages/tools/CultureCalendarPage"));
const WhoSaidItPage = lazy(() => import("./pages/tools/WhoSaidItPage"));
const EtymologyTreePage = lazy(() => import("./pages/tools/EtymologyTreePage"));
const ConceptExplorerPage = lazy(() => import("./pages/tools/ConceptExplorerPage"));
const GamesPage = lazy(() => import("./pages/tools/GamesPage"));
const DebatePage = lazy(() => import("./pages/tools/DebatePage"));
const CreativeStudioPage = lazy(() => import("./pages/tools/CreativeStudioPage"));
const FlashcardPage = lazy(() => import("./pages/tools/FlashcardPage"));
const BookshelfPage = lazy(() => import("./pages/tools/BookshelfPage"));
const SearchPage = lazy(() => import("./pages/tools/SearchPage"));
const ExplorePage = lazy(() => import("./pages/tools/ExplorePage"));
const DictionaryPage = lazy(() => import("./pages/tools/DictionaryPage"));
const DailyPage = lazy(() => import("./pages/tools/DailyPage"));
const TransliteratePage = lazy(() => import("./pages/tools/TransliteratePage"));
const SandhiToolPage = lazy(() => import("./pages/tools/SandhiToolPage"));
const DhatuPage = lazy(() => import("./pages/tools/DhatuPage"));
const ShlokaPage = lazy(() => import("./pages/tools/ShlokaPage"));
const JeopardyHomePage = lazy(() => import("./pages/tools/JeopardyHomePage"));
const JeopardyPlayPage = lazy(() => import("./pages/tools/JeopardyPlayPage"));
const JeopardyTestPage = lazy(() => import("./pages/tools/JeopardyTestPage"));
const JeopardyPrepPage = lazy(() => import("./pages/tools/JeopardyPrepPage"));
const JeopardyNewsPage = lazy(() => import("./pages/tools/JeopardyNewsPage"));
const JeopardyBuilderPage = lazy(() => import("./pages/tools/JeopardyBuilderPage"));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <KeyboardProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="research/corpus" element={<CorpusPage />} />
              <Route path="research/ocr" element={<OCRPage />} />
              <Route path="research/annotate" element={<AnnotationPage />} />
              <Route path="research/ncert" element={<NCERTResearchPage />} />
              <Route path="ncert" element={<NCERTResearchPage />} />
              <Route path="ncert/papers" element={<SamplePapersPage />} />
              <Route path="visualization/3d" element={<Viewer3DPage />} />
              <Route path="visualization/grammar" element={<GrammarMapsPage />} />
              <Route path="visualization/timeline" element={<TimelinePage />} />
              <Route path="teaching/dashboard" element={<TeacherDashboardPage />} />
              <Route path="teaching/workspace" element={<StudentWorkspacePage />} />
              <Route path="teaching/school" element={<InstitutionDashboardPage />} />
              <Route path="teaching/assessment" element={<AssessmentPage />} />
              <Route path="teaching/papers" element={<SamplePapersPage />} />
              <Route path="viva/simulator" element={<VivaSimulatorPage />} />
              <Route path="viva/lab" element={<LanguageLabPage />} />
              <Route path="viva/analytics" element={<AnalyticsPage />} />
              <Route path="learning/tree" element={<SkillTreePage />} />
              <Route path="learning/lesson/:lessonId" element={<LessonPage />} />
              <Route path="learning/child" element={<ChildModePage />} />
              <Route path="learning/research" element={<ResearchWorkspacePage />} />
              <Route path="learning/curriculum" element={<CurriculumBuilderPage />} />
              <Route path="tools/tutor" element={<Navigate to="/tools/voice" replace />} />
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
              <Route path="tools/shlokas" element={<ShlokaPage />} />
              <Route path="shloka" element={<Navigate to="/tools/shloka" replace />} />
              <Route path="shlokas" element={<Navigate to="/tools/shloka" replace />} />
              <Route path="tools/jeopardy" element={<JeopardyHomePage />} />
              <Route path="tools/jeopardy/play" element={<JeopardyPlayPage />} />
              <Route path="tools/jeopardy/test" element={<JeopardyTestPage />} />
              <Route path="tools/jeopardy/prep" element={<JeopardyPrepPage />} />
              <Route path="tools/jeopardy/news" element={<JeopardyNewsPage />} />
              <Route path="tools/jeopardy/builder" element={<SchoolOnly><JeopardyBuilderPage /></SchoolOnly>} />
              <Route path="auth" element={<Navigate to="/" replace />} />
              <Route path="auth/login" element={<Navigate to="/" replace />} />
              <Route path="auth/signup" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </KeyboardProvider>
    </BrowserRouter>
  );
}
