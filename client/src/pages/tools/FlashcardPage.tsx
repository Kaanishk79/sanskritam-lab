import { useState, useEffect } from 'react'
import { flashcards, flashcardDecks } from '../../data/flashcards'
import type { SM2Card, SRSState } from '../../services/srs'
import { loadSRS, saveSRS, initCards, getDueCards, getNewCards, getStats, gradeCard } from '../../services/srs'
import { useLanguage } from '../../context/LanguageContext'

export default function FlashcardPage() {
  const { t } = useLanguage()
  const [srsState, setSrsState] = useState<SRSState>(loadSRS())
  const [deck, setDeck] = useState('all')
  const [mode, setMode] = useState<'review' | 'browse' | 'stats'>('stats')
  const [currentCard, setCurrentCard] = useState<SM2Card | null>(null)
  const [showBack, setShowBack] = useState(false)
  const [cardsLeft, setCardsLeft] = useState(0)

  useEffect(() => {
    const state = loadSRS()
    const initialized = initCards(flashcards, state.cards)
    if (initialized !== state.cards) {
      const newState = { ...state, cards: initialized }
      saveSRS(newState)
      setSrsState(newState)
    } else {
      setSrsState(state)
    }
  }, [])

  const stats = getStats(srsState.cards)

  const startReview = () => {
    const due = getDueCards(srsState.cards, deck)
    const newc = getNewCards(srsState.cards, deck)
    const all = [...due, ...newc]
    if (all.length === 0) return
    setCurrentCard(all[0])
    setCardsLeft(all.length - 1)
    setShowBack(false)
    setMode('review')
  }

  const handleGrade = (quality: number) => {
    if (!currentCard) return
    const updated = gradeCard(srsState.cards, currentCard.card.id, quality)
    const newState = { ...srsState, cards: updated }
    setSrsState(newState)
    saveSRS(newState)

    const due = getDueCards(updated, deck)
    const newc = getNewCards(updated, deck)
    const remaining = [...due, ...newc].filter((c) => c.card.id !== currentCard.card.id)

    if (remaining.length > 0) {
      setCurrentCard(remaining[0])
      setCardsLeft(remaining.length - 1)
      setShowBack(false)
    } else {
      setMode('stats')
      setCurrentCard(null)
    }
  }

  const deckCards = deck === 'all' ? flashcards : flashcards.filter((f) => f.deckId === deck)
  const currentDeckName = deck === 'all' ? 'All Decks' : flashcardDecks.find((d) => d.id === deck)?.name || 'All'

  return (
    <div>
      <div className="page-header">
        <h2>{t('📇 Spaced Repetition Flashcards')}</h2>
        <p>{t('Anki-style SM-2 algorithm — master Sanskrit vocabulary, grammar, and more')}</p>
      </div>

      <div className="flashcard-mode-bar">
        <button className={`btn btn-sm ${mode === 'stats' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setMode('stats')}>{t('📊 Stats')}</button>
        <button className={`btn btn-sm ${mode === 'browse' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setMode('browse')}>{t('📚 Browse')}</button>
        <button className={`btn btn-sm ${mode === 'review' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => { if (mode !== 'review') startReview() }}>
          {t('🎯 Review')}
        </button>
      </div>

      {mode === 'stats' && (
        <div>
          <div className="flashcard-deck-select">
            <span>{t('Deck:')}</span>
            <select value={deck} onChange={(e) => setDeck(e.target.value)}>
              <option value="all">{t('All Decks')}</option>
              {flashcardDecks.map((d) => <option key={d.id} value={d.id}>{d.icon} {d.name}</option>)}
            </select>
            <button className="btn btn-primary btn-sm" onClick={startReview}>{t('Start Review')}</button>
          </div>

          <div className="flashcard-stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">{t('Total Cards')}</div>
            </div>
            <div className="stat-card accent">
              <div className="stat-value">{stats.due + stats.newCards}</div>
              <div className="stat-label">{t('Due for Review')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.newCards}</div>
              <div className="stat-label">{t('New')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.young}</div>
              <div className="stat-label">{t('Learning')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.mature}</div>
              <div className="stat-label">{t('Mature')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.reviewed}</div>
              <div className="stat-label">{t('Reviewed')}</div>
            </div>
          </div>

          <div className="flashcard-decks-grid">
            {flashcardDecks.map((d) => {
              const c = flashcards.filter((f) => f.deckId === d.id)
              const due = getDueCards(srsState.cards, d.id).length
              return (
                <div key={d.id} className="card deck-card" onClick={() => { setDeck(d.id); startReview() }}>
                  <div className="deck-icon">{d.icon}</div>
                  <div className="deck-name">{d.name}</div>
                  <div className="deck-count">{c.length} {t('cards')} · {due} {t('due')}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {mode === 'review' && currentCard && (
        <div className="flashcard-review">
          <div className="flashcard-counter">{cardsLeft + 1} {t('remaining')}</div>

          <div className={`flashcard-card ${showBack ? 'flipped' : ''}`} onClick={() => setShowBack(true)}>
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <div className="flashcard-text">{currentCard.card.front}</div>
                {!showBack && <div className="flashcard-tap">{t('Tap to reveal')}</div>}
              </div>
              <div className="flashcard-back">
                <div className="flashcard-text">{currentCard.card.back}</div>
                {currentCard.card.hint && <div className="flashcard-hint">💡 {currentCard.card.hint}</div>}
                <div className="flashcard-tags">
                  {currentCard.card.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </div>
          </div>

          {showBack && (
            <div className="flashcard-grade">
              <p>{t('How well did you know this?')}</p>
              <div className="flashcard-grade-btns">
                <button className="btn grade-again" onClick={() => handleGrade(0)}>{t('Again')}</button>
                <button className="btn grade-hard" onClick={() => handleGrade(2)}>{t('Hard')}</button>
                <button className="btn grade-good" onClick={() => handleGrade(3)}>{t('Good')}</button>
                <button className="btn grade-easy" onClick={() => handleGrade(5)}>{t('Easy')}</button>
              </div>
            </div>
          )}
        </div>
      )}

      {mode === 'review' && !currentCard && (
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
          <h3>{t('All caught up!')}</h3>
          <p>{t('No due cards in {0}. Come back later.').replace('{0}', currentDeckName)}</p>
          <button className="btn btn-primary" onClick={() => setMode('stats')}>{t('Back to Stats')}</button>
        </div>
      )}

      {mode === 'browse' && (
        <div>
          <div className="flashcard-deck-select">
            <span>{t('Deck:')}</span>
            <select value={deck} onChange={(e) => setDeck(e.target.value)}>
              <option value="all">{t('All Decks')}</option>
              {flashcardDecks.map((d) => <option key={d.id} value={d.id}>{d.icon} {d.name}</option>)}
            </select>
            <span className="browse-count">{deckCards.length} {t('cards')}</span>
          </div>

          <div className="flashcard-browse-grid">
            {deckCards.map((fc) => {
              const sc = srsState.cards[fc.id]
              const isNew = !sc || sc.repetitions === 0
              const due = sc && sc.nextReview <= Date.now()
              return (
                <div key={fc.id} className={`browse-card ${isNew ? 'new' : ''} ${due ? 'due' : ''}`}>
                  <div className="browse-front">{fc.front}</div>
                  <div className="browse-back">{fc.back}</div>
                  <div className="browse-meta">
                    {fc.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                    {isNew && <span className="badge badge-new">{t('New')}</span>}
                    {due && <span className="badge badge-due">{t('Due')}</span>}
                    {sc && sc.repetitions > 0 && <span className="badge badge-learned">{t('Ease:')} {sc.ease}</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {mode === 'browse' && deckCards.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: 32 }}>
          <p>{t('No cards in this deck.')}</p>
        </div>
      )}
    </div>
  )
}
