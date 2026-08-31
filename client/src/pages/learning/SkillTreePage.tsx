import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Target, Folder, BookOpen, BookMarked, CheckCircle2, Circle, Feather } from 'lucide-react'
import { useProgress } from '../../hooks/useProgress'
import { tracks } from '../../data/tracks'
import { classLevels, getGovClassFor } from '../../data/classes'
import { books, bookHi } from '../../data/books'
import { lessons, lessonHi } from '../../data/lessons'
import type { GovClassId, ClassInfo } from '../../types/curriculum'
import { useLanguage } from '../../context/LanguageContext'
import { DynamicIcon } from '../../components/icons'

export default function SkillTreePage() {
  const { progress, switchTrack } = useProgress()
  const navigate = useNavigate()
  const { t } = useLanguage()

  const recommendedClass = getGovClassFor(progress.xp, progress.completedLessons.length)
  const currentClass = progress.currentGovClass as GovClassId || recommendedClass
  const currentClassInfo = classLevels.find((c) => c.id === currentClass)!

  const [expandedClass, setExpandedClass] = useState<string | null>(currentClass)

  return (
    <div className="page-container learning-path">
      <div className="page-header">
        <h2>{t('Learning Path — Government Sanskrit Curriculum')}</h2>
        <p>{t('Follow the NCERT → UGC syllabus from Class 1 to PhD')}</p>
      </div>

      <div className="stats-bar">
        <div className="stat">
          <span className="stat-value">{progress.xp}</span>
          <span className="stat-label">{t('Total XP')}</span>
        </div>
        <div className="stat">
          <span className="stat-value">{progress.streak}</span>
          <span className="stat-label">{t('Day Streak')}</span>
        </div>
        <div className="stat">
          <span className="stat-value">{progress.completedLessons.length}</span>
          <span className="stat-label">{t('Lessons Done')}</span>
        </div>
        <div className="stat">
          <span className="stat-value">{Object.values(progress.skills).filter((s) => s.completed).length}</span>
          <span className="stat-label">{t('Skills Mastered')}</span>
        </div>
        <div className="stat">
          <span className="stat-value">{currentClassInfo.label}</span>
          <span className="stat-label">{t('Current Class')}</span>
        </div>
      </div>

      {/* Class Progression */}
      <div className="class-progression">
        <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Target size={18} /> <span>{t('Class Progression')}</span>
        </h3>
        <div className="class-scroll">
          {classLevels.map((cl) => {
            const isCurrent = cl.id === currentClass
            const isPast = classLevels.findIndex((c) => c.id === cl.id) < classLevels.findIndex((c) => c.id === currentClass)
            const isRecommended = cl.id === recommendedClass
            return (
              <div
                key={cl.id}
                className={`class-step ${isCurrent ? 'current' : ''} ${isPast ? 'completed' : ''} ${isRecommended && !isCurrent ? 'recommended' : ''}`}
                onClick={() => setExpandedClass(cl.id === expandedClass ? null : cl.id)}
                style={{ borderColor: cl.color }}
              >
                <span className="class-step-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <DynamicIcon name={cl.icon} size={20} />
                </span>
                <span className="class-step-label">{cl.shortLabel}</span>
                {isCurrent && <span className="class-step-badge">{t('You are here')}</span>}
                {isRecommended && !isCurrent && <span className="class-step-badge recommended">{t('Recommended')}</span>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Expanded Class Detail */}
      {expandedClass && (
        <ClassDetail
          classInfo={classLevels.find((c) => c.id === expandedClass)!}
          books={books.filter((b) => {
            const ci = classLevels.find((c) => c.id === expandedClass)!
            return b.govClassMin <= ci.govClassMin && b.govClassMax >= ci.govClassMin
          }).sort((a, b) => a.sortOrder - b.sortOrder)}
          lessons={lessons.filter((l) => l.govClassId === expandedClass)}
          completedLessons={progress.completedLessons}
          onNavigate={navigate}
        />
      )}

      {/* Track Filter Strip */}
      <div className="track-strip">
        <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Folder size={18} /> <span>{t('Filter by Track')}</span>
        </h3>
        <div className="track-buttons">
          {tracks.map((tr) => (
            <button
              key={tr.id}
              className={`btn btn-sm ${progress.currentTrack === tr.id ? 'btn-primary' : 'btn-secondary'}`}
              style={progress.currentTrack === tr.id ? { backgroundColor: tr.color, borderColor: tr.color } : {}}
              onClick={() => switchTrack(tr.id)}
            >
              <DynamicIcon name={tr.icon} size={15} /> <span>{t(tr.label)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function ClassDetail({ classInfo, books: classBooks, lessons: classLessons, completedLessons, onNavigate }: {
  classInfo: ClassInfo
  books: typeof books
  lessons: typeof lessons
  completedLessons: string[]
  onNavigate: (path: string) => void
}) {
  const { t, lang } = useLanguage()
  const ncertBook = classInfo.ncertBookId ? books.find((b) => b.id === classInfo.ncertBookId) : null

  return (
    <div className="class-detail" style={{ borderColor: classInfo.color }}>
      <div className="class-detail-header" style={{ borderLeftColor: classInfo.color }}>
        <span className="class-detail-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <DynamicIcon name={classInfo.icon} size={24} />
        </span>
        <div>
          <h3>{classInfo.label}</h3>
          <p className="class-detail-desc">{classInfo.description}</p>
          <span className="class-detail-badge" style={{ backgroundColor: classInfo.color }}>
            {classInfo.track === 'child' ? t('Class 1-5') :
             classInfo.track === 'teen' ? t('Class 6-10') :
             classInfo.track === 'undergrad' ? t('Class 11 – BA') :
             classInfo.track === 'graduate' ? t('MA – MPhil') : t('PhD')}
          </span>
        </div>
      </div>

      {/* NCERT / Govt Book */}
      {ncertBook && (
        <div className="class-section">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <BookOpen size={16} /> <span>{t('Prescribed Textbook')}</span>
          </h4>
          <div className="class-book-card" onClick={() => onNavigate('/tools/bookshelf')}>
            <span className="class-book-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <DynamicIcon name={ncertBook.coverIcon} size={24} />
            </span>
            <div>
              <div className="class-book-title">{ncertBook.title}</div>
              <div className="class-book-sanskrit">{ncertBook.titleSanskrit}</div>
              <div className="class-book-author">{lang === 'hi' ? bookHi[ncertBook.id]?.authorHi ?? ncertBook.author : ncertBook.author}{ncertBook.publisher ? ` · ${lang === 'hi' ? bookHi[ncertBook.id]?.publisherHi ?? ncertBook.publisher : ncertBook.publisher}` : ''}</div>
              <div className="class-book-chapters">{ncertBook.totalChapters}{t(' chapters')}</div>
            </div>
          </div>
        </div>
      )}

      {/* Reference Books */}
      {classBooks.filter((b) => b.id !== classInfo.ncertBookId).length > 0 && (
        <div className="class-section">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <BookMarked size={16} /> <span>{t('Reference Books at this Level')}</span>
          </h4>
          <div className="class-ref-books">
            {classBooks.filter((b) => b.id !== classInfo.ncertBookId).slice(0, 5).map((b) => (
              <div key={b.id} className="class-ref-card" onClick={() => onNavigate('/tools/bookshelf')}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <DynamicIcon name={b.coverIcon} size={18} />
                </span>
                <div>
                  <div className="class-ref-title">{b.title}</div>
                  <div className="class-ref-author">{lang === 'hi' ? bookHi[b.id]?.authorHi ?? b.author : b.author ?? ''}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lessons */}
      <div className="class-section">
        <h4 style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Feather size={16} /> <span>{t('Available Lessons')} ({classLessons.length})</span>
        </h4>
        {classLessons.length > 0 ? (
          <div className="class-lesson-list">
            {classLessons.map((lesson) => {
              const done = completedLessons.includes(lesson.id)
              return (
                <div
                  key={lesson.id}
                  className={`class-lesson-card ${done ? 'completed' : ''}`}
                  onClick={() => onNavigate(`/learning/lesson/${lesson.id}`)}
                >
                  <span className="lesson-status" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    {done ? <CheckCircle2 size={16} color="var(--vt-green)" /> : <Circle size={16} opacity={0.4} />}
                  </span>
                  <div className="lesson-info">
                    <div className="lesson-title">{lesson.title}</div>
                    <div className="lesson-subtitle">{lang === 'hi' && lessonHi[lesson.id]?.subtitleHi ? lessonHi[lesson.id].subtitleHi : lesson.subtitle}</div>
                  </div>
                  <span className="lesson-duration">{lang === 'hi' && lessonHi[lesson.id]?.durationHi ? lessonHi[lesson.id].durationHi : lesson.duration}</span>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="empty-state">
            <p>{t('No lessons available for this class level yet.')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
