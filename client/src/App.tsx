import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import './App.css'
import Dashboard from './pages/dashboard/index'
import CorpusPage from './pages/research/CorpusPage'
import OCRPage from './pages/research/OCRPage'
import AnnotationPage from './pages/research/AnnotationPage'
import Viewer3DPage from './pages/visualization/Viewer3DPage'
import GrammarMapsPage from './pages/visualization/GrammarMapsPage'
import TimelinePage from './pages/visualization/TimelinePage'
import TeacherDashboardPage from './pages/teaching/TeacherDashboardPage'
import StudentWorkspacePage from './pages/teaching/StudentWorkspacePage'
import AssessmentPage from './pages/teaching/AssessmentPage'
import VivaSimulatorPage from './pages/viva/VivaSimulatorPage'
import AnalyticsPage from './pages/viva/AnalyticsPage'
import SkillTreePage from './pages/learning/SkillTreePage'
import LessonPage from './pages/learning/LessonPage'
import ChildModePage from './pages/learning/ChildModePage'
import ResearchWorkspacePage from './pages/learning/ResearchWorkspacePage'
import CurriculumBuilderPage from './pages/learning/CurriculumBuilderPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="research/corpus" element={<CorpusPage />} />
          <Route path="research/ocr" element={<OCRPage />} />
          <Route path="research/annotate" element={<AnnotationPage />} />
          <Route path="visualization/3d" element={<Viewer3DPage />} />
          <Route path="visualization/grammar" element={<GrammarMapsPage />} />
          <Route path="visualization/timeline" element={<TimelinePage />} />
          <Route path="teaching/dashboard" element={<TeacherDashboardPage />} />
          <Route path="teaching/workspace" element={<StudentWorkspacePage />} />
          <Route path="teaching/assessment" element={<AssessmentPage />} />
          <Route path="viva/simulator" element={<VivaSimulatorPage />} />
          <Route path="viva/analytics" element={<AnalyticsPage />} />
          <Route path="learning/tree" element={<SkillTreePage />} />
          <Route path="learning/lesson/:lessonId" element={<LessonPage />} />
          <Route path="learning/child" element={<ChildModePage />} />
          <Route path="learning/research" element={<ResearchWorkspacePage />} />
          <Route path="learning/curriculum" element={<CurriculumBuilderPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}