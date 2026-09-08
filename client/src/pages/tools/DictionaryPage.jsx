import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Volume2, Sprout, Link2 } from "lucide-react";
import { supabase } from "../../services/supabase";
import { toIAST, toDevanagari } from "../../services/sanskrit";
import { speakWithFallback } from "../../services/speech";
import { useLanguage } from "../../context/LanguageContext";
import { bi } from "../../services/bilingual";

const POS_HI = {
  noun: "संज्ञा",
  verb: "क्रिया",
  adjective: "विशेषण",
  adverb: "क्रियाविशेषण",
  pronoun: "सर्वनाम",
  particle: "अव्यय",
  indeclinable: "अव्यय"
};

let cachedMonierCore = null;
async function getMonierCore() {
  if (!cachedMonierCore) {
    const mod = await import("../../data/monier_core.json");
    cachedMonierCore = mod.default || mod;
  }
  return cachedMonierCore;
}

function searchLocalMonier(monierList, query) {
  if (!monierList || !monierList.length) return [];
  const trimmed = (query || "").trim();
  if (!trimmed) return monierList.slice(0, 40);
  const qLower = trimmed.toLowerCase();
  const devQuery = toDevanagari(trimmed) || trimmed;
  return monierList
    .filter((entry) => {
      return (
        entry.word.includes(devQuery) ||
        entry.word.includes(trimmed) ||
        (entry.iast && entry.iast.toLowerCase().includes(qLower)) ||
        entry.meanings?.some((m) => m.toLowerCase().includes(qLower)) ||
        (entry.raw_def && entry.raw_def.toLowerCase().includes(qLower))
      );
    })
    .slice(0, 40)
    .map((e, idx) => ({
      id: `mw-${idx}-${e.word}`,
      word: e.word,
      iast: e.iast,
      pos: e.pos,
      meanings: e.meanings,
      raw_def: e.raw_def,
      source: "Monier-Williams"
    }));
}

function DictionaryPage() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const monierRef = useRef(cachedMonierCore);

  const load = async (query) => {
    setLoading(true);
    setError("");
    const trimmed = query.trim();

    try {
      const sel = "id, word, root, pos, meanings, meanings_hi, derivations";
      let cloudData = [];
      if (!trimmed) {
        const { data } = await supabase.from("dictionary").select(sel).order("word").limit(40);
        cloudData = data || [];
      } else {
        const { data } = await supabase.from("dictionary").select(sel).or(`word.ilike.%${trimmed}%, meanings.cs.{${trimmed}}, meanings_hi.cs.{${trimmed}}`).limit(30);
        cloudData = data || [];
      }

      // Load local Monier-Williams data on-demand if needed
      if (!monierRef.current) {
        monierRef.current = await getMonierCore();
      }

      // Supplement cloud results with Monier-Williams
      const localResults = searchLocalMonier(monierRef.current, trimmed);
      const combined = [...cloudData];
      const seenWords = new Set(cloudData.map((c) => c.word));

      for (const m of localResults) {
        if (!seenWords.has(m.word)) {
          combined.push(m);
          seenWords.add(m.word);
        }
      }

      setEntries(combined);
    } catch (e) {
      console.warn("Supabase dictionary unavailable, falling back to local Monier-Williams:", e);
      try {
        if (!monierRef.current) {
          monierRef.current = await getMonierCore();
        }
        setEntries(searchLocalMonier(monierRef.current, trimmed));
      } catch (err) {
        setError(t("Failed to load dictionary data."));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => load(q), 300);
    return () => window.clearTimeout(timer);
  }, [q]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>{t("Sanskrit Dictionary")}</h2>
        <p>{t("Word meaning, Devanagari, transliteration, English meaning, examples and related words.")}</p>
      </div>

      <div className="form-group" style={{ maxWidth: 560 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("Search: राम, rāma, love, गुरु…")}
          style={{ fontSize: 17, padding: "12px 14px" }}
        />
      </div>
      {error && <p style={{ color: "#e55" }}>{error}</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {entries.map((e) => (
          <div key={e.id} className="card" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong style={{ fontSize: 22 }}>{e.word}</strong>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="btn btn-sm btn-outline" onClick={() => speakWithFallback(e.word)} title={t("Hear pronunciation")}>
                  <Volume2 size={14} />
                </button>
                <button className="btn btn-sm btn-primary" onClick={() => navigate(`/explore/${encodeURIComponent(e.word)}`)}>
                  <span>{t("Explore")}</span>
                </button>
              </div>
            </div>
            <div style={{ color: "var(--vt-text-light)", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span>
                {toIAST(e.word)} {e.pos ? ` · ${bi(lang, e.pos, POS_HI[e.pos] || e.pos)}` : ""}
              </span>
              {e.source === "Monier-Williams" && (
                <span className="chip" style={{ fontSize: 10, padding: "2px 6px", background: "rgba(230, 126, 34, 0.12)", color: "var(--vt-orange)", borderRadius: 4, fontWeight: 600 }}>
                  MW 1899
                </span>
              )}
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, color: "var(--vt-text)", lineHeight: 1.6 }}>
              {(lang === "hi" && e.meanings_hi && e.meanings_hi.length ? e.meanings_hi : e.meanings || []).map((m, i) => <li key={i}>{m}</li>)}
              {(lang === "hi" ? e.meanings_hi?.length || 0 : e.meanings?.length || 0) === 0 && e.raw_def ? (
                <li style={{ color: "var(--vt-text-light)" }}>{e.raw_def}</li>
              ) : (lang === "hi" ? e.meanings_hi?.length || 0 : e.meanings?.length || 0) === 0 ? (
                <li style={{ color: "var(--vt-text-lighter)" }}>—</li>
              ) : null}
            </ul>
            {e.root && (
              <div style={{ fontSize: 13, color: "var(--vt-text-light)", display: "flex", alignItems: "center", gap: 6 }}>
                <Sprout size={14} color="var(--vt-green)" />
                <span>{t("Root")}: {toDevanagari(e.root) || e.root} ({toIAST(e.root)})</span>
              </div>
            )}
            {e.derivations && e.derivations.length > 0 && (
              <div style={{ fontSize: 13, color: "var(--vt-text-light)", display: "flex", alignItems: "center", gap: 6 }}>
                <Link2 size={14} color="var(--vt-orange)" />
                <span>{t("Related")}: {e.derivations.join(", ")}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {!loading && entries.length === 0 && <p style={{ color: "var(--vt-text-lighter)", marginTop: 16 }}>{t("No entries found.")}</p>}
    </div>
  );
}

export default DictionaryPage;
