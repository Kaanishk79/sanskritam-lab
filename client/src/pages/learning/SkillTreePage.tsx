import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../hooks/useProgress'
import { tracks } from '../../data/tracks'
import { classLevels, getGovClassFor } from '../../data/classes'
import { books, bookHi } from '../../data/books'
import { lessons, lessonHi } from '../../data/lessons'
import type { GovClassId, ClassInfo } from '../../types/curriculum'
import { useLanguage } from '../../context/LanguageContext'

export default function SkillTreePage() {
  const { progress, switchTrack } = useProgress()
  const navigate = useNavigate()
  const { t } = useLanguage()

  const recommendedClass = getGovClassFor(progress.xp, progress.completedLessons.length)
  const currentClass = progress.currentGovClass as GovClassId || recommendedClass
  const currentClassInfo = classLevels.find((c) => c.id === currentClass)!

  const [expandedClass, setExpandedClass] = useState<string | null>(currentClass)

  return (
    <div className="learning-path">
      <div className="page-header">
        <h2>📖 {t('Learning Path — Government Sanskrit Curriculum')}</h2>
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
        <h3 className="section-title">🎯 {t('Class Progression')}</h3>
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
                <span className="class-step-icon">{cl.icon}</span>
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
        <h3 className="section-title">📂 {t('Filter by Track')}</h3>
        <div className="track-buttons">
          {tracks.map((t) => (
            <button
              key={t.id}
              className={`btn btn-sm ${progress.currentTrack === t.id ? 'btn-primary' : 'btn-secondary'}`}
              style={progress.currentTrack === t.id ? { backgroundColor: t.color, borderColor: t.color } : {}}
              onClick={() => switchTrack(t.id)}
            >
              {t.icon} {t.label}
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
        <span className="class-detail-icon">{classInfo.icon}</span>
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
          <h4>📖 {t('Prescribed Textbook')}</h4>
          <div className="class-book-card" onClick={() => onNavigate('/tools/bookshelf')}>
            <span className="class-book-icon">{ncertBook.coverIcon}</span>
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
          <h4>📚 {t('Reference Books at this Level')}</h4>
          <div className="class-ref-books">
            {classBooks.filter((b) => b.id !== classInfo.ncertBookId).slice(0, 5).map((b) => (
              <div key={b.id} className="class-ref-card" onClick={() => onNavigate('/tools/bookshelf')}>
                <span>{b.coverIcon}</span>
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
        <h4>📝 {t('Available Lessons')} ({classLessons.length})</h4>
        {classLessons.length > 0 ? (
          <div className="class-lesson-list">
            {classLessons.map((lesson) => {
              const done = completedLessons.includes(lesson.id)
              const score = done ? 100 : 0
              return (
                <div
                  key={lesson.id}
                  className={`class-lesson-card ${done ? 'completed' : ''}`}
                  onClick={() => onNavigate(`/learning/lesson/${lesson.id}`)}
                >
                  <span className="lesson-status">{done ? '✅' : '○'}</span>
                  <div className="lesson-info">
                    <div className="lesson-title">{lesson.title}</div>
                    <div className="lesson-subtitle">{lang === 'hi' && lessonHi[lesson.id]?.subtitleHi ? lessonHi[lesson.id].subtitleHi : lesson.subtitle}</div>
                  </div>
                  <span className="lesson-duration">{lang === 'hi' && lessonHi[lesson.id]?.durationHi ? lessonHi[lesson.id].durationHi : lesson.duration}</span>
                  {done && <span className="lesson-score">{score}%</span>}
                </div>
              )
            })}
          </div>
        ) : (
          <p className="empty-state">{t('No lessons available yet for this class. Check the prescribed textbook above.')}</p>
        )}
      </div>
    </div>
  )
}
