import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import { toIAST, toDevanagari } from "../services/sanskrit";
import { speakWithFallback } from "../services/speech";
import { useLanguage } from "../context/LanguageContext";
const POS_HI = {
  noun: "\u0938\u0902\u091C\u094D\u091E\u093E",
  verb: "\u0915\u094D\u0930\u093F\u092F\u093E",
  adjective: "\u0935\u093F\u0936\u0947\u0937\u0923",
  indeclinable: "\u0905\u0935\u094D\u092F\u092F"
};
function exploreWord(word) {
  window.dispatchEvent(new CustomEvent("sanskritlab:explore", { detail: word }));
}
function ExplorePanel({ word, onClose }) {
  const { t, lang } = useLanguage();
  const [entry, setEntry] = useState(null);
  const [related, setRelated] = useState([]);
  const [refs, setRefs] = useState([]);
  const [examples, setExamples] = useState([]);
  const [concepts, setConcepts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  useEffect(() => {
    let alive = true;
    const w = word.trim();
    if (!w) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setEntry(null);
    setRelated([]);
    setRefs([]);
    setExamples([]);
    setConcepts([]);
    const iast2 = toIAST(w);
    const doSearch = async () => {
      const [dict, sameRoot, textsR, corpusR] = await Promise.all([
        supabase.from("dictionary").select("*").ilike("word", w).limit(1),
        supabase.from("dictionary").select("word, meanings, meanings_hi").ilike("root", `%${w.slice(0, 1)}%`).limit(6),
        supabase.from("texts").select("id, title, content").ilike("content", `%${w}%`).limit(5),
        supabase.from("corpus_texts").select("id, title, content").ilike("content", `%${w}%`).limit(5)
      ]);
      if (!alive) return;
      const row = dict.data?.[0];
      setEntry(row || null);
      const relatedWords = [];
      if (row?.root && sameRoot.data) {
        for (const r of sameRoot.data) {
          if (r.word !== w) relatedWords.push({ word: r.word, meanings: r.meanings || [], meanings_hi: r.meanings_hi || [] });
        }
      }
      if (row?.derivations && row.derivations.length > 0) {
        const derivR = await supabase.from("dictionary").select("word, meanings, meanings_hi").in("word", row.derivations).limit(6);
        if (alive && derivR.data) {
          for (const d of derivR.data) {
            if (!relatedWords.some((r) => r.word === d.word)) relatedWords.push({ word: d.word, meanings: d.meanings || [], meanings_hi: d.meanings_hi || [] });
          }
        }
      }
      setRelated(relatedWords.slice(0, 6));
      const makeSnippet = (content, needle) => {
        const idx = content.indexOf(needle);
        if (idx < 0) return content.slice(0, 80);
        const start = Math.max(0, idx - 30);
        const end = Math.min(content.length, idx + needle.length + 50);
        return (start > 0 ? "\u2026" : "") + content.slice(start, end) + (end < content.length ? "\u2026" : "");
      };
      const textRefs = (textsR.data || []).slice(0, 3).map((x) => ({
        id: x.id,
        title: x.title,
        snippet: makeSnippet(x.content, w),
        source: "texts"
      }));
      const corpusRefs = (corpusR.data || []).slice(0, 3).map((x) => ({
        id: x.id,
        title: x.title,
        snippet: makeSnippet(x.content, w),
        source: "corpus"
      }));
      setRefs(textRefs);
      setExamples(corpusRefs);
      const conceptMatches = iast2.split(/[a-z]*/).filter(Boolean);
      const concepts2 = [];
      if (conceptMatches.length || w.length <= 6) {
        concepts2.push({ name: "Root family", icon: "\u{1F331}", desc: row?.root ? lang === "hi" ? `\u092E\u0942\u0932 ${toDevanagari(row.root) || row.root} (${toIAST(row.root)}) \u0938\u0947 \u0935\u094D\u092F\u0941\u0924\u094D\u092A\u0928\u094D\u0928` : `Derives from ${toDevanagari(row.root) || row.root} (${toIAST(row.root)})` : t("Etymology via dictionary root field") });
      }
      if (row?.pos) concepts2.push({ name: "Part of speech", icon: "\u{1F3F7}\uFE0F", desc: lang === "hi" ? POS_HI[row.pos] ?? row.pos : row.pos });
      setConcepts(concepts2);
      setLoading(false);
    };
    doSearch().catch(() => {
      if (alive) setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [word]);
  const iast = toIAST(word);
  const speak = () => {
    const stop = speakWithFallback(word, (sp) => setSpeaking(sp));
    setTimeout(() => stop, 2e4);
  };
  return <div className="explore-panel card" style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div>
          <h2 style={{ fontSize: 34, margin: 0 }}>{word}</h2>
          <p style={{ color: "var(--vt-text-light)", margin: "4px 0 0", fontSize: 15 }}>{iast}</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-sm btn-outline" onClick={speak} disabled={speaking}>
            {speaking ? "🔊…" : "🔊 " + t("Pronounce")}
          </button>
          {onClose && <button className="btn btn-sm btn-outline" onClick={onClose}>✕</button>}
        </div>
      </div>

      {loading ? <p style={{ color: "var(--vt-text-light)" }}>⏳ {t("Looking up")}…</p> : <>
          <div className="explore-section">
            <h4>📖 {t("Meaning")}</h4>
            {entry ? <ul style={{ margin: 0, paddingLeft: 20 }}>
                {(lang === "hi" && entry.meanings_hi && entry.meanings_hi.length ? entry.meanings_hi : entry.meanings || []).map((m, i) => <li key={i}>{m}</li>)}
                {(lang === "hi" ? entry.meanings_hi?.length || 0 : entry.meanings?.length || 0) === 0 && <li style={{ color: "var(--vt-text-lighter)" }}>—</li>}
              </ul> : <p style={{ color: "var(--vt-text-light)", margin: 0 }}>{t("Not in dictionary yet — try the related-words and text references below.")}</p>}
          </div>

          <div className="explore-section">
            <h4>🔤 {t("Grammar")}</h4>
            <p style={{ margin: 0 }}>
              <span className="chip">{t("Part of speech")}: {(lang === "hi" ? POS_HI[entry?.pos ?? ""] ?? entry?.pos : entry?.pos) || "—"}</span>{" "}
              <span className="chip">{t("Root")}: {entry?.root ? `${toDevanagari(entry.root) || entry.root} (${toIAST(entry.root)})` : "—"}</span>{" "}
              <span className="chip">IAST: {iast}</span>
            </p>
          </div>

          {related.length > 0 && <div className="explore-section">
              <h4>🔗 {t("Related words")}</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {related.map((r) => <button key={r.word} className="btn btn-sm btn-outline" onClick={() => exploreWord(r.word)}>
                    {r.word} <span style={{ color: "var(--vt-text-light)" }}>({lang === "hi" && r.meanings_hi?.length ? r.meanings_hi[0] : r.meanings[0] || ""})</span>
                  </button>)}
              </div>
            </div>}

          {refs.length > 0 && <div className="explore-section">
              <h4>📜 {t("Text references")}</h4>
              {refs.map((r) => <div key={r.id} style={{ marginBottom: 8 }}>
                  <strong style={{ fontSize: 14 }}>{r.title}</strong>
                  <p style={{ margin: "2px 0", color: "var(--vt-text)", fontSize: 13, lineHeight: 1.6 }}>{r.snippet}</p>
                </div>)}
            </div>}

          {examples.length > 0 && <div className="explore-section">
              <h4>💬 {t("Example sentences")}</h4>
              {examples.map((r) => <div key={r.id} style={{ marginBottom: 8 }}>
                  <strong style={{ fontSize: 14 }}>{r.title}</strong>
                  <p style={{ margin: "2px 0", color: "var(--vt-text)", fontSize: 13, lineHeight: 1.6 }}>{r.snippet}</p>
                  <button className="btn btn-sm btn-outline" onClick={() => speakWithFallback(r.snippet.slice(0, 120))}>🔊</button>
                </div>)}
            </div>}

          {concepts.length > 0 && <div className="explore-section">
              <h4>🧠 {t("Related concepts")}</h4>
              {concepts.map((c) => <p key={c.name} style={{ margin: "2px 0", fontSize: 14 }}>
                  {c.icon} <strong>{t(c.name)}</strong> — {c.desc}
                </p>)}
            </div>}
        </>}
    </div>;
}
export {
  ExplorePanel as default,
  exploreWord
};
