import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { JeopardyCategory, JeopardyClue, FinalJeopardyClue } from '../../data/jeopardy'
import { loadCustomQuizzes, persistCustomQuizzes, makeCustomQuizId, validateQuiz, type CustomQuiz } from '../../services/customQuizzes'
import { useLanguage } from '../../context/LanguageContext'
import JeopardyHeader from '../../components/jeopardy/JeopardyHeader'
import '../tools/jeopardy.css'

const VALUES = [200, 400, 600, 800, 1000]
const ICON_CHOICES = ['📚', '🧠', '✍️', '📜', '🕉️', '🎭', '🔤', '🔢', '🏛️', '🧘', '⚔️', '🔥', '📐', '🧩', '🎵', '🌺']

const emptyClue = (i: number): JeopardyClue => ({ id: '', value: VALUES[i] ?? 0, clue: '', answer: '' })

const emptyCategory = (): JeopardyCategory => ({
  id: '',
  name: '',
  nameSanskrit: '',
  icon: '📚',
  clues: [0, 1, 2, 3, 4].map(emptyClue),
})

const emptyDraft = (): CustomQuiz => ({
  id: makeCustomQuizId(),
  name: '',
  nameSanskrit: '',
  icon: '📚',
  description: '',
  categories: [emptyCategory(), emptyCategory(), emptyCategory()],
  createdAt: Date.now(),
})

export default function JeopardyBuilderPage() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [quizzes, setQuizzes] = useState<CustomQuiz[]>(loadCustomQuizzes)
  const [draft, setDraft] = useState<CustomQuiz | null>(null)
  const [showFinal, setShowFinal] = useState(false)
  const [finalCat, setFinalCat] = useState('')
  const [finalCatSa, setFinalCatSa] = useState('')
  const [finalClue, setFinalClue] = useState('')
  const [finalAnswer, setFinalAnswer] = useState('')
  const [error, setError] = useState<string | null>(null)

  const startNew = () => {
    setDraft(emptyDraft())
    setShowFinal(false)
    setFinalCat('')
    setFinalCatSa('')
    setFinalClue('')
    setFinalAnswer('')
    setError(null)
  }

  const editQuiz = (q: CustomQuiz) => {
    setDraft(JSON.parse(JSON.stringify(q)))
    setShowFinal(!!q.final)
    setFinalCat(q.final?.category ?? '')
    setFinalCatSa(q.final?.categorySanskrit ?? '')
    setFinalClue(q.final?.clue ?? '')
    setFinalAnswer(q.final?.answer ?? '')
    setError(null)
  }

  const save = () => {
    if (!draft) return
    const final: FinalJeopardyClue | undefined = showFinal && finalCat.trim() && finalClue.trim() && finalAnswer.trim()
      ? { category: finalCat.trim(), categorySanskrit: finalCatSa.trim(), clue: finalClue.trim(), answer: finalAnswer.trim() }
      : undefined
    const quiz: CustomQuiz = { ...draft, final, categories: draft.categories.filter((c) => c.clues.some((k) => k.clue.trim())) }
    const err = validateQuiz(quiz)
    if (err === 'name') { setError(t('Quiz name is required')); return }
    if (err === 'categories-min') { setError(t('Add at least 3 categories')); return }
    if (err === 'category-name') { setError(t('Every category needs a name')); return }
    if (err === 'clues-min') { setError(t('Every category needs at least 3 clues')); return }
    if (err === 'clue-empty') { setError(t('Clue and answer must not be empty')); return }
    const exists = quizzes.some((q) => q.id === quiz.id)
    const next = exists ? quizzes.map((q) => (q.id === quiz.id ? quiz : q)) : [...quizzes, quiz]
    persistCustomQuizzes(next)
    setQuizzes(next)
    setDraft(null)
  }

  const remove = (id: string) => {
    const next = quizzes.filter((q) => q.id !== id)
    persistCustomQuizzes(next)
    setQuizzes(next)
  }

  const updateDraft = (patch: Partial<CustomQuiz>) => setDraft((d) => (d ? { ...d, ...patch } : d))

  const updateCategory = (i: number, patch: Partial<JeopardyCategory>) => {
    if (!draft) return
    setDraft({
      ...draft,
      categories: draft.categories.map((c, ci) => (ci === i ? { ...c, ...patch } : c)),
    })
  }

  const updateClue = (ci: number, ki: number, patch: Partial<JeopardyClue>) => {
    if (!draft) return
    setDraft({
      ...draft,
      categories: draft.categories.map((c, i) =>
        i === ci ? { ...c, clues: c.clues.map((k, j) => (j === ki ? { ...k, ...patch, id: (c.name ? c.name : 'cat' + ci) + '-' + k.value } : k)) } : c,
      ),
    })
  }

  const addCategory = () => {
    if (!draft) return
    if (draft.categories.length >= 6) return
    setDraft({ ...draft, categories: [...draft.categories, emptyCategory()] })
  }

  const removeCategory = (i: number) => {
    if (!draft) return
    if (draft.categories.length <= 3) return
    setDraft({ ...draft, categories: draft.categories.filter((_, ci) => ci !== i) })
  }

  const playQuiz = (q: CustomQuiz) => {
    sessionStorage.setItem('sanskrit-jeopardy-selected', q.id)
    navigate('/tools/jeopardy/play')
  }

  return (
    <div>
      <JeopardyHeader />
      <div className="page-header">
        <h2>{t('✏️ Quiz Builder')}</h2>
        <p>{t('Create your own Jeopardy boards — custom categories and clues, saved on your device')}</p>
      </div>

      {!draft ? (
        <div className="j-builder-list">
          {quizzes.length === 0 && (
            <div className="j-builder-empty">
              <p>{t('No custom quizzes yet — create your first board!')}</p>
            </div>
          )}
          <div className="j-builder-cards">
            {quizzes.map((q) => (
              <div className="j-builder-card" key={q.id}>
                <div className="j-builder-card-icon">{q.icon}</div>
                <div className="j-builder-card-body">
                  <h3>{q.name}</h3>
                  {q.nameSanskrit && <div className="j-builder-card-sa">{q.nameSanskrit}</div>}
                  <p>{q.description}</p>
                  <div className="j-builder-card-meta">
                    {q.categories.length} {t('categories')} · {q.categories.reduce((s, c) => s + c.clues.length, 0)} {t('clues')}
                    {q.final && ` · ${t('Final Jeopardy!')}`}
                  </div>
                </div>
                <div className="j-builder-card-actions">
                  <button className="btn btn-sm btn-primary" onClick={() => playQuiz(q)}>{t('▶ Play')}</button>
                  <button className="btn btn-sm btn-secondary" onClick={() => editQuiz(q)}>{t('✏️ Edit')}</button>
                  <button className="btn btn-sm btn-danger" onClick={() => remove(q.id)}>{t('🗑 Delete')}</button>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-primary btn-lg" onClick={startNew}>+ {t('Create New Quiz')}</button>
        </div>
      ) : (
        <div className="j-builder-editor">
          <div className="j-builder-section">
            <h3>{t('1. Quiz Details')}</h3>
            <div className="j-builder-grid">
              <label>
                {t('Quiz name')}
                <input value={draft.name} onChange={(e) => updateDraft({ name: e.target.value })} placeholder={t('e.g. My Sanskrit Quiz')} />
              </label>
              <label>
                {t('Quiz name (Sanskrit)')}
                <input value={draft.nameSanskrit} onChange={(e) => updateDraft({ nameSanskrit: e.target.value })} placeholder="मम प्रश्नावली" />
              </label>
            </div>
            <div className="j-builder-grid">
              <label>
                {t('Description')}
                <input value={draft.description} onChange={(e) => updateDraft({ description: e.target.value })} placeholder={t('Optional — what is this quiz about?')} />
              </label>
              <label>
                {t('Icon')}
                <div className="j-builder-icons">
                  {ICON_CHOICES.map((ic) => (
                    <button
                      key={ic}
                      type="button"
                      className={`j-builder-icon${draft.icon === ic ? ' active' : ''}`}
                      onClick={() => updateDraft({ icon: ic })}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
              </label>
            </div>
          </div>

          <div className="j-builder-section">
            <h3>{t('2. Categories & Clues')}</h3>
            <p className="j-builder-hint">{t('Each category has 5 clues worth 200–1000 points. Give each clue an answer in "What is…" form.')}</p>
            {draft.categories.map((cat, ci) => (
              <div className="j-builder-cat" key={ci}>
                <div className="j-builder-cat-head">
                  <div className="j-builder-cat-title">{t('Category {0}').replace('{0}', String(ci + 1))}</div>
                  <button className="btn btn-sm btn-danger" onClick={() => removeCategory(ci)} disabled={draft.categories.length <= 3}>{t('Remove')}</button>
                </div>
                <div className="j-builder-grid">
                  <label>
                    {t('Category name')}
                    <input value={cat.name} onChange={(e) => updateCategory(ci, { name: e.target.value })} />
                  </label>
                  <label>
                    {t('Category name (Sanskrit)')}
                    <input value={cat.nameSanskrit} onChange={(e) => updateCategory(ci, { nameSanskrit: e.target.value })} />
                  </label>
                </div>
                <div className="j-builder-clues">
                  {cat.clues.map((k, ki) => (
                    <div className="j-builder-clue" key={ki}>
                      <div className="j-builder-clue-value">{k.value}</div>
                      <input value={k.clue} onChange={(e) => updateClue(ci, ki, { clue: e.target.value })} placeholder={t('Clue')} />
                      <input value={k.answer} onChange={(e) => updateClue(ci, ki, { answer: e.target.value })} placeholder={t('Answer')} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="j-builder-actions">
              <button className="btn btn-sm btn-secondary" onClick={addCategory} disabled={draft.categories.length >= 6}>
                + {t('Add Category')}
              </button>
              <button className="btn btn-sm btn-secondary" onClick={() => setShowFinal((s) => !s)}>
                {showFinal ? '−' : '+'} {t('Final Jeopardy Clue')}
              </button>
            </div>
          </div>

          {showFinal && (
            <div className="j-builder-section">
              <h3>{t('3. Final Jeopardy Clue')}</h3>
              <div className="j-builder-grid">
                <label>
                  {t('Category')}
                  <input value={finalCat} onChange={(e) => setFinalCat(e.target.value)} />
                </label>
                <label>
                  {t('Category (Sanskrit)')}
                  <input value={finalCatSa} onChange={(e) => setFinalCatSa(e.target.value)} />
                </label>
              </div>
              <label>
                {t('Clue')}
                <input value={finalClue} onChange={(e) => setFinalClue(e.target.value)} />
              </label>
              <label>
                {t('Answer')}
                <input value={finalAnswer} onChange={(e) => setFinalAnswer(e.target.value)} />
              </label>
            </div>
          )}

          {error && <div className="j-builder-error">{error}</div>}

          <div className="j-builder-actions">
            <button className="btn btn-primary" onClick={save}>{t('💾 Save Quiz')}</button>
            <button className="btn btn-secondary" onClick={() => setDraft(null)}>{t('Cancel')}</button>
          </div>
        </div>
      )}
    </div>
  )
}
