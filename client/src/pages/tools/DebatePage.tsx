import { useEffect, useState } from 'react'
import { DEBATE_TOPICS, type DebateTopic } from '../../data/debates'
import { loadDebateTopics } from '../../services/contentDb'
import { api } from '../../services/api'
import { toIAST } from '../../services/sanskrit'
import { speakWithFallback } from '../../services/speech'
import { useLanguage } from '../../context/LanguageContext'

interface Turn {
  who: 'you' | 'rival'
  sa: string
  en: string
  hi?: string
}

export default function DebatePage() {
  const { t, lang } = useLanguage()
  const [topics, setTopics] = useState<DebateTopic[]>(DEBATE_TOPICS)
  const [topic, setTopic] = useState<DebateTopic | null>(null)
  const [side, setSide] = useState<'for' | 'against' | null>(null)
  const [turns, setTurns] = useState<Turn[]>([])
  const [typing, setTyping] = useState(false)
  const [custom, setCustom] = useState('')

  useEffect(() => {
    loadDebateTopics().then(setTopics)
  }, [])

  const pickTopic = (tp: DebateTopic) => {
    setTopic(tp)
    setSide(null)
    setTurns([])
  }

  const pickSide = (s: 'for' | 'against') => {
    setSide(s)
    const first = s === 'for' ? topic!.against.points[0] : topic!.for.points[0]
    setTurns([{ who: 'rival', sa: first.sa, en: first.en, hi: first.hi }])
  }

  const rivalReply = (): Turn => {
    const stance = side === 'for' ? topic!.against : topic!.for
    const used = turns.filter((x) => x.who === 'rival').length
    const pt = stance.points[used % stance.points.length]
    return { who: 'rival', sa: pt.sa, en: pt.en, hi: pt.hi }
  }

  const playTurn = async (mine: string, info?: { en: string; hi?: string }) => {
    if (typing) return
    setTyping(true)
    setTurns((ts) => [...ts, { who: 'you', sa: mine, en: info?.en ?? '', hi: info?.hi }])
    let reply: Turn
    try {
      const res = await api.tutor.chat(
        [{ role: 'user', content: `Debate topic: ${topic!.question} — I argue ${side === 'for' ? 'for' : 'against'}. My point: ${mine}. Reply with one short counter-point in Sanskrit with English translation.` }],
        { mode: 'debate' },
      )
      const sa = res.reply?.split('—')[0]?.trim() ?? mine
      reply = { who: 'rival', sa, en: res.reply?.includes('—') ? res.reply.split('—').slice(1).join('—').trim() : '' }
    } catch {
      reply = rivalReply()
    }
    setTimeout(() => {
      setTurns((ts) => [...ts, reply])
      setTyping(false)
      speakWithFallback(reply.sa)
    }, 600)
  }

  const speakPoint = (sa: string) => speakWithFallback(sa)

  const stance = topic ? (side === 'for' ? topic.for : topic.against) : null

  return (
    <div>
      <div className="page-header">
        <h2>{t('⚔️ Debate Mode')}</h2>
        <p>{t('Pick a topic and a side — argue your point in Sanskrit, hear the counter-argument.')}</p>
      </div>

      <div className="card" style={{ maxWidth: 760, margin: '0 auto', padding: 24 }}>
        {!topic && (
          <div>
            <p style={{ fontWeight: 600, margin: '0 0 12px' }}>{t('Choose a topic')}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
              {topics.map((tp) => (
                <button key={tp.id} className="card" style={{ margin: 0, textAlign: 'left' }} onClick={() => pickTopic(tp)}>
                  <strong>{tp.emoji} {lang === 'hi' && tp.titleHi ? tp.titleHi : tp.title}</strong>
                  <span style={{ display: 'block', fontSize: 13, opacity: 0.7, marginTop: 4 }}>{lang === 'hi' && tp.questionHi ? tp.questionHi : tp.question}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {topic && !side && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 18, margin: '0 0 4px' }}>{topic.emoji} {lang === 'hi' && topic.questionHi ? topic.questionHi : topic.question}</p>
            <p style={{ fontSize: 13, opacity: 0.6, margin: '0 0 16px' }}>{lang === 'hi' && topic.titleHi ? topic.titleHi : topic.title}</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => pickSide('for')}>{t('I argue FOR')}</button>
              <button className="btn btn-secondary" onClick={() => pickSide('against')}>{t('I argue AGAINST')}</button>
              <button className="btn btn-sm btn-secondary" onClick={() => setTopic(null)}>{t('← Topics')}</button>
            </div>
          </div>
        )}

        {topic && side && stance && (
          <div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
              <button className="btn btn-sm btn-secondary" onClick={() => setTopic(null)}>{t('← Topics')}</button>
              <button className="btn btn-sm btn-secondary" onClick={() => setSide(null)}>{t('← Side')}</button>
              <span style={{ flex: 1 }} />
              <span className="badge">{t('You argue')}: {side === 'for' ? t('FOR') : t('AGAINST')}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              {stance.points.map((pt, i) => (
                <button key={i} className="card" style={{ margin: 0, textAlign: 'left' }} onClick={() => playTurn(pt.sa, { en: pt.en, hi: pt.hi })}>
                  <strong>{pt.sa}</strong>
                  <span style={{ display: 'block', fontSize: 12, opacity: 0.65, fontStyle: 'italic' }}>{toIAST(pt.sa)}</span>
                  <span style={{ display: 'block', fontSize: 13, opacity: 0.8, marginTop: 4 }}>{lang === 'hi' && pt.hi ? pt.hi : pt.en}</span>
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <input
                className="form-control"
                placeholder={t('Or type your own point in Sanskrit…')}
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                style={{ flex: 1 }}
              />
              <button className="btn btn-primary btn-sm" disabled={!custom.trim() || typing} onClick={() => { playTurn(custom.trim()); setCustom('') }}>
                {t('Send')}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 380, overflowY: 'auto' }}>
              {turns.map((tn, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: tn.who === 'you' ? 'flex-end' : 'flex-start' }}>
                  <div
                    className="card"
                    style={{
                      margin: 0,
                      maxWidth: '80%',
                      padding: '10px 14px',
                      background: tn.who === 'you' ? 'rgba(255,213,79,0.10)' : 'rgba(46,125,50,0.08)',
                      border: tn.who === 'you' ? '1px solid rgba(255,213,79,0.35)' : '1px solid rgba(46,125,50,0.35)',
                    }}
                  >
                    <p style={{ margin: 0 }}>{tn.sa}</p>
                    {(lang === 'hi' ? (tn.hi || tn.en) : tn.en) && <p style={{ margin: '4px 0 0', fontSize: 13, opacity: 0.75 }}>{lang === 'hi' ? (tn.hi || tn.en) : tn.en}</p>}
                    {tn.who === 'rival' && (
                      <button className="btn btn-sm btn-secondary" style={{ marginTop: 8, padding: '2px 8px' }} onClick={() => speakPoint(tn.sa)}>
                        🔊
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {typing && <p style={{ textAlign: 'center', opacity: 0.6, fontSize: 13 }}>{t('Rival is thinking…')}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}