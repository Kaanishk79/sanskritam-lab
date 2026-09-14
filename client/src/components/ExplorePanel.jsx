import { useState, useEffect } from "react";
import {
  Volume2,
  X,
  Clock,
  BookOpen,
  Languages,
  Link as LinkIcon,
  Scroll,
  MessageSquare,
  Brain,
  Sprout,
  Tag,
} from "lucide-react";
import { supabase } from "../services/supabase";
import { toIAST, toDevanagari } from "../services/sanskrit";
import { speakWithFallback } from "../services/speech";
import { useLanguage } from "../context/LanguageContext";

const POS_HI = {
  noun: "संज्ञा",
  verb: "क्रिया",
  adjective: "विशेषण",
  indeclinable: "अव्यय",
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

    const makeSnippet = (content, term) => {
      const idx = content.indexOf(term);
      if (idx === -1) return content.slice(0, 140) + "…";
      const start = Math.max(0, idx - 40);
      const end = Math.min(content.length, idx + term.length + 60);
      return (start > 0 ? "…" : "") + content.slice(start, end).trim() + (end < content.length ? "…" : "");
    };

    const doSearch = async () => {
      const iast2 = toIAST(w);
      const [dictR, relR, textsR, corpusR] = await Promise.all([
        supabase.from("dictionary").select("*").or(`word.eq.${w},iast.ilike.${iast2}`).limit(1).maybeSingle(),
        supabase.from("dictionary").select("word, meanings, meanings_hi, pos").ilike("word", `%${w}%`).neq("word", w).limit(6),
        supabase.from("texts").select("id, title, content").ilike("content", `%${w}%`).limit(3),
        supabase.from("corpus_texts").select("id, title, content").ilike("content", `%${w}%`).limit(3),
      ]);
      if (!alive) return;
      const row = dictR.data;
      setEntry(row);
      setRelated(relR.data || []);
      const textRefs = (textsR.data || []).slice(0, 3).map((x) => ({
        id: x.id,
        title: x.title,
        snippet: makeSnippet(x.content, w),
        source: "texts",
      }));
      const corpusRefs = (corpusR.data || []).slice(0, 3).map((x) => ({
        id: x.id,
        title: x.title,
        snippet: makeSnippet(x.content, w),
        source: "corpus",
      }));
      setRefs(textRefs);
      setExamples(corpusRefs);

      const conceptMatches = iast2.split(/[a-z]*/).filter(Boolean);
      const concepts2 = [];
      if (conceptMatches.length || w.length <= 6) {
        concepts2.push({
          name: "Root family",
          icon: <Sprout size={14} color="var(--vt-green)" />,
          desc: row?.root
            ? lang === "hi"
              ? `मूल ${toDevanagari(row.root) || row.root} (${toIAST(row.root)}) से व्युत्पन्न`
              : `Derives from ${toDevanagari(row.root) || row.root} (${toIAST(row.root)})`
            : t("Etymology via dictionary root field"),
        });
      }
      if (row?.pos) {
        concepts2.push({
          name: "Part of speech",
          icon: <Tag size={14} color="var(--vt-orange)" />,
          desc: lang === "hi" ? POS_HI[row.pos] ?? row.pos : row.pos,
        });
      }
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
    setTimeout(() => stop, 20000);
  };

  return (
    <div className="explore-panel card" style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div>
          <h2 style={{ fontSize: 34, margin: 0 }}>{word}</h2>
          <p style={{ color: "var(--vt-text-light)", margin: "4px 0 0", fontSize: 15 }}>{iast}</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-sm btn-outline" onClick={speak} disabled={speaking} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Volume2 size={14} /> <span>{speaking ? "…" : t("Pronounce")}</span>
          </button>
          {onClose && (
            <button className="btn btn-sm btn-outline" onClick={onClose} aria-label={t("Close")} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p style={{ color: "var(--vt-text-light)", display: "flex", alignItems: "center", gap: 6 }}>
          <Clock size={14} /> <span>{t("Looking up")}…</span>
        </p>
      ) : (
        <>
          <div className="explore-section">
            <h4 style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <BookOpen size={16} /> <span>{t("Meaning")}</span>
            </h4>
            {entry ? (
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {(lang === "hi" && entry.meanings_hi && entry.meanings_hi.length ? entry.meanings_hi : entry.meanings || []).map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
                {(lang === "hi" ? entry.meanings_hi?.length || 0 : entry.meanings?.length || 0) === 0 && (
                  <li style={{ color: "var(--vt-text-lighter)" }}>—</li>
                )}
              </ul>
            ) : (
              <p style={{ color: "var(--vt-text-light)", margin: 0 }}>
                {t("Not in dictionary yet — try the related-words and text references below.")}
              </p>
            )}
          </div>

          <div className="explore-section">
            <h4 style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Languages size={16} /> <span>{t("Grammar")}</span>
            </h4>
            <p style={{ margin: 0 }}>
              <span className="chip">
                {t("Part of speech")}: {(lang === "hi" ? POS_HI[entry?.pos ?? ""] ?? entry?.pos : entry?.pos) || "—"}
              </span>{" "}
              <span className="chip">
                {t("Root")}: {entry?.root ? `${toDevanagari(entry.root) || entry.root} (${toIAST(entry.root)})` : "—"}
              </span>{" "}
              <span className="chip">IAST: {iast}</span>
            </p>
          </div>

          {related.length > 0 && (
            <div className="explore-section">
              <h4 style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <LinkIcon size={16} /> <span>{t("Related words")}</span>
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {related.map((r) => (
                  <button key={r.word} className="btn btn-sm btn-outline" onClick={() => exploreWord(r.word)}>
                    {r.word} <span style={{ color: "var(--vt-text-light)" }}>({lang === "hi" && r.meanings_hi?.length ? r.meanings_hi[0] : r.meanings[0] || ""})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {refs.length > 0 && (
            <div className="explore-section">
              <h4 style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Scroll size={16} /> <span>{t("Text references")}</span>
              </h4>
              {refs.map((r) => (
                <div key={r.id} style={{ marginBottom: 8 }}>
                  <strong style={{ fontSize: 14 }}>{r.title}</strong>
                  <p style={{ margin: "2px 0", color: "var(--vt-text)", fontSize: 13, lineHeight: 1.6 }}>{r.snippet}</p>
                </div>
              ))}
            </div>
          )}

          {examples.length > 0 && (
            <div className="explore-section">
              <h4 style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <MessageSquare size={16} /> <span>{t("Example sentences")}</span>
              </h4>
              {examples.map((r) => (
                <div key={r.id} style={{ marginBottom: 8 }}>
                  <strong style={{ fontSize: 14 }}>{r.title}</strong>
                  <p style={{ margin: "2px 0", color: "var(--vt-text)", fontSize: 13, lineHeight: 1.6 }}>{r.snippet}</p>
                  <button className="btn btn-sm btn-outline" onClick={() => speakWithFallback(r.snippet.slice(0, 120))} aria-label={t("Pronounce")} style={{ display: "inline-flex", alignItems: "center" }}>
                    <Volume2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {concepts.length > 0 && (
            <div className="explore-section">
              <h4 style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Brain size={16} /> <span>{t("Related concepts")}</span>
              </h4>
              {concepts.map((c) => (
                <p key={c.name} style={{ margin: "2px 0", fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
                  {c.icon} <strong>{t(c.name)}</strong> — <span>{c.desc}</span>
                </p>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export { ExplorePanel as default, exploreWord };
