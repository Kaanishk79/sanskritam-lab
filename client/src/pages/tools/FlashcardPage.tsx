import { useState, useEffect } from 'react'
import { flashcards, flashcardDecks } from '../../data/flashcards'
import type { Flashcard, SM2Card, SRSState } from '../../services/srs'
import { loadSRS, saveSRS, initCards, getDueCards, getNewCards, getStats, gradeCard } from '../../services/srs'
import { loadFlashcards, loadFlashcardDecks } from '../../services/contentDb'
import { syncSRSFromDb, persistSRSToDb } from '../../services/userDb'
import { useLanguage } from '../../context/LanguageContext'

const TAG_HI: Record<string, string> = {
  vowel: 'स्वर', consonant: 'व्यंजन', noun: 'संज्ञा', family: 'परिवार', nature: 'प्रकृति',
  verb: 'क्रिया', adjective: 'विशेषण', case: 'विभक्ति', karaka: 'कारक', sandhi: 'संधि',
  compound: 'समास', tatpurusa: 'तत्पुरुष', bahuvrihi: 'बहुव्रीहि', karmadharaya: 'कर्मधारय',
  dvandva: 'द्वन्द्व', avyayibhava: 'अव्ययीभाव', tense: 'काल', mood: 'वृत्ति', metre: 'छंद',
  grammar: 'व्याकरण', text: 'ग्रंथ', school: 'पाठ्यपुस्तक', academic: 'शैक्षणिक',
  author: 'लेखक', category: 'श्रेणी', genre: 'विधा', drama: 'नाटक', poetry: 'काव्य',
  epic: 'महाकाव्य', gita: 'गीता', kalidasa: 'कालिदास', nyaya: 'न्याय',
  epistemology: 'ज्ञानमीमांसा', logic: 'तर्क', vedanta: 'वेदांत', philosophy: 'दर्शन',
  philosopher: 'दार्शनिक', yoga: 'योग', research: 'शोध', textcrit: 'पाठ्य-समालोचना',
  paleography: 'प्राचीन लेखन', codicology: 'ग्रंथ-विज्ञान', digital: 'डिजिटल',
}

export default function FlashcardPage() {
  const { t, lang } = useLanguage()
  const [srsState, setSrsState] = useState<SRSState>(loadSRS())
  const [cardPool, setCardPool] = useState<Flashcard[]>(flashcards)
  const [decks, setDecks] = useState(flashcardDecks)
  const [deck, setDeck] = useState('all')
  const [mode, setMode] = useState<'review' | 'browse' | 'stats'>('stats')
  const [currentCard, setCurrentCard] = useState<SM2Card | null>(null)
  const [showBack, setShowBack] = useState(false)
  const [cardsLeft, setCardsLeft] = useState(0)

  useEffect(() => {
    let live = true
    loadFlashcards().then((fc) => {
      if (!live) return
      setCardPool(fc)
      const state = loadSRS()
      const initialized = initCards(fc, state.cards)
      if (initialized !== state.cards) {
        const newState = { ...state, cards: initialized }
        saveSRS(newState)
        persistSRSToDb(newState)
        setSrsState(newState)
      } else {
        setSrsState(state)
      }
      syncSRSFromDb().then((dbState) => {
        if (dbState) {
          const merged = { ...dbState, cards: initCards(fc, dbState.cards) }
          setSrsState(merged)
          saveSRS(merged)
        }
      })
    })
    loadFlashcardDecks().then((d) => {
      if (live) setDecks(d)
    })
    return () => {
      live = false
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
    persistSRSToDb(newState)

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

  const deckCards = deck === 'all' ? cardPool : cardPool.filter((f) => f.deckId === deck)
  const currentDeckName = deck === 'all' ? t('All Decks') : (lang === 'hi' ? decks.find((d) => d.id === deck)?.nameHi || decks.find((d) => d.id === deck)?.name || t('All Decks') : decks.find((d) => d.id === deck)?.name || t('All Decks'))

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
              {decks.map((d) => <option key={d.id} value={d.id}>{d.icon} {lang === 'hi' ? d.nameHi || d.name : d.name}</option>)}
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
            {decks.map((d) => {
              const c = cardPool.filter((f) => f.deckId === d.id)
              const due = getDueCards(srsState.cards, d.id).length
              return (
                <div key={d.id} className="card deck-card" onClick={() => { setDeck(d.id); startReview() }}>
                  <div className="deck-icon">{d.icon}</div>
                  <div className="deck-name">{lang === 'hi' ? d.nameHi || d.name : d.name}</div>
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
                <div className="flashcard-text">{lang === 'hi' && currentCard.card.backHi ? currentCard.card.backHi : currentCard.card.back}</div>
                {(lang === 'hi' ? (currentCard.card.hintHi || currentCard.card.hint) : currentCard.card.hint) && <div className="flashcard-hint">💡 {lang === 'hi' && currentCard.card.hintHi ? currentCard.card.hintHi : currentCard.card.hint}</div>}
                <div className="flashcard-tags">
                  {currentCard.card.tags.map((t) => <span key={t} className="tag">{lang === 'hi' ? TAG_HI[t] || t : t}</span>)}
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
              {decks.map((d) => <option key={d.id} value={d.id}>{d.icon} {lang === 'hi' ? d.nameHi || d.name : d.name}</option>)}
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
                  <div className="browse-back">{lang === 'hi' && fc.backHi ? fc.backHi : fc.back}</div>
                  <div className="browse-meta">
                    {fc.tags.map((t) => <span key={t} className="tag">{lang === 'hi' ? TAG_HI[t] || t : t}</span>)}
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
