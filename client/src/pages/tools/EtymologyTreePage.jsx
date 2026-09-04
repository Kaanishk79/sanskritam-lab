import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { supabase } from "../../services/supabase";
import { toIAST } from "../../services/sanskrit";
import { useLanguage } from "../../context/LanguageContext";
const POS_HI = {
  noun: "\u0938\u0902\u091C\u094D\u091E\u093E",
  verb: "\u0915\u094D\u0930\u093F\u092F\u093E",
  adjective: "\u0935\u093F\u0936\u0947\u0937\u0923",
  adverb: "\u0915\u094D\u0930\u093F\u092F\u093E\u0935\u093F\u0936\u0947\u0937\u0923",
  pronoun: "\u0938\u0930\u094D\u0935\u0928\u093E\u092E",
  particle: "\u0905\u0935\u094D\u092F\u092F",
  indeclinable: "\u0905\u0935\u094D\u092F\u092F",
  interjection: "\u0935\u093F\u0938\u094D\u092E\u092F\u093E\u0926\u093F\u092C\u094B\u0927\u0915",
  root_verb: "\u0927\u093E\u0924\u0941",
  prefix: "\u0909\u092A\u0938\u0930\u094D\u0917",
  suffix: "\u092A\u094D\u0930\u0924\u094D\u092F\u092F",
  symbol: "\u0938\u0902\u0915\u0947\u0924",
  numeral: "\u0938\u0902\u0916\u094D\u092F\u093E\u0935\u093E\u091A\u0940"
};
const CURATED_ROOTS = [
  { root: "\u0915\u0943", meaning: "to do, make", meaningHi: "\u0915\u0930\u0928\u093E, \u092C\u0928\u093E\u0928\u093E" },
  { root: "\u092D\u0942", meaning: "to be, become", meaningHi: "\u0939\u094B\u0928\u093E, \u092C\u0928\u0928\u093E" },
  { root: "\u0917\u092E\u094D", meaning: "to go", meaningHi: "\u091C\u093E\u0928\u093E" },
  { root: "\u0927\u093E", meaning: "to place, hold", meaningHi: "\u0930\u0916\u0928\u093E, \u0927\u093E\u0930\u0923 \u0915\u0930\u0928\u093E" },
  { root: "\u0936\u094D\u0930\u0941", meaning: "to hear", meaningHi: "\u0938\u0941\u0928\u0928\u093E" },
  { root: "\u091C\u0928\u094D", meaning: "to be born", meaningHi: "\u091C\u0928\u094D\u092E \u0932\u0947\u0928\u093E" },
  { root: "\u0935\u0926\u094D", meaning: "to speak", meaningHi: "\u092C\u094B\u0932\u0928\u093E, \u0915\u0939\u0928\u093E" },
  { root: "\u0926\u0943\u0936\u094D", meaning: "to see", meaningHi: "\u0926\u0947\u0916\u0928\u093E" },
  { root: "\u0938\u094D\u0925\u093E", meaning: "to stand", meaningHi: "\u0916\u0921\u093C\u093E \u0939\u094B\u0928\u093E, \u0930\u0939\u0928\u093E" },
  { root: "\u0907", meaning: "to go", meaningHi: "\u091C\u093E\u0928\u093E" },
  { root: "\u091C\u093F", meaning: "to conquer", meaningHi: "\u091C\u0940\u0924\u0928\u093E" },
  { root: "\u0939\u0928\u094D", meaning: "to strike", meaningHi: "\u092E\u093E\u0930\u0928\u093E, \u092A\u094D\u0930\u0939\u093E\u0930 \u0915\u0930\u0928\u093E" },
  { root: "\u0926\u093E", meaning: "to give", meaningHi: "\u0926\u0947\u0928\u093E" },
  { root: "\u092A\u093E", meaning: "to drink, protect", meaningHi: "\u092A\u0940\u0928\u093E, \u0930\u0915\u094D\u0937\u093E \u0915\u0930\u0928\u093E" },
  { root: "\u091A\u0930\u094D", meaning: "to move", meaningHi: "\u091A\u0932\u0928\u093E, \u092D\u091F\u0915\u0928\u093E" },
  { root: "\u0938\u094D\u092E\u0943", meaning: "to remember", meaningHi: "\u0938\u094D\u092E\u0930\u0923 \u0915\u0930\u0928\u093E" }
];
function EtymologyTreePage() {
  const { t, lang } = useLanguage();
  const hi = lang === "hi";
  const [rows, setRows] = useState([]);
  const [selRoot, setSelRoot] = useState(null);
  const [q, setQ] = useState("");
  useEffect(() => {
    let alive = true;
    supabase.from("dictionary").select("word, root, pos, meanings, meanings_hi").not("root", "is", null).limit(2e3).then(({ data }) => {
      if (!alive || !data) return;
      setRows(data);
      if (data.length > 0) setSelRoot(data[0].root);
    });
    return () => {
      alive = false;
    };
  }, []);
  const roots = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const r of rows) {
      if (!r.root) continue;
      const key = r.root.trim();
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(r);
    }
    const list = [...map.entries()].map(([root, words]) => ({ root, count: words.length, words }));
    list.sort((a, b) => b.count - a.count);
    for (const c of CURATED_ROOTS) {
      if (!list.some((l) => l.root === c.root)) {
        list.push({ root: c.root, count: 0, words: [] });
      }
    }
    return list;
  }, [rows]);
  const filteredWords = useMemo(() => {
    const base = roots.find((r) => r.root === selRoot)?.words || [];
    if (!q.trim()) return base;
    return base.filter((w) => (w.word + (w.meanings || []).join(" ") + (w.meanings_hi || []).join(" ")).toLowerCase().includes(q.toLowerCase()));
  }, [roots, selRoot, q]);
  const curRoot = roots.find((r) => r.root === selRoot);
  const curRootNote = CURATED_ROOTS.find((c) => c.root === selRoot);
  return <div className="page-container">
      <div className="page-header">
        <h2>{t("Etymology Tree")}</h2>
        <p>{t("One verbal root (dh\u0101tu), many words \u2014 see how Sanskrit words grow from their roots like branches from a tree.")}</p>
      </div>

      <div className="card" style={{ maxWidth: 820, margin: "0 auto", padding: 24 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {roots.slice(0, 40).map((r) => <button
    key={r.root}
    className={`btn btn-sm ${selRoot === r.root ? "btn-primary" : "btn-secondary"}`}
    onClick={() => setSelRoot(r.root)}
  >
              √{r.root}{r.count > 0 ? ` (${r.count})` : ""}
            </button>)}
        </div>

        {curRoot && <div className="card" style={{ padding: 20, marginBottom: 16, background: "rgba(255,152,0,0.06)", border: "2px solid rgba(255,152,0,0.35)" }}>
            <p style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>
              √{curRoot.root} <span style={{ color: "var(--vt-muted)", fontSize: 15, fontWeight: 400 }}>√{toIAST(curRoot.root)}</span>
            </p>
            {curRootNote && <p style={{ margin: "4px 0 0", color: "var(--vt-muted)" }}>{hi ? curRootNote.meaningHi : curRootNote.meaning}</p>}
            <p style={{ margin: "10px 0 0", fontSize: 13 }}>
              {t("This root grows")} <strong>{curRoot.count}</strong> {t("words in our dictionary")}
              {curRoot.count === 0 && t(" \u2014 add words from the dictionary to see more branches.")}
            </p>
            <input
    className="lab-input"
    style={{ marginTop: 12, width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--vt-border)" }}
    value={q}
    onChange={(e) => setQ(e.target.value)}
    placeholder={t("Filter words of this root\u2026")}
  />
          </div>}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 10 }}>
          {filteredWords.map((w) => <div key={w.word} className="card" style={{ margin: 0, padding: "12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 6 }}>
                <strong style={{ fontSize: 17 }}>{w.word}</strong>
                {w.pos && <span className="badge">{hi ? POS_HI[w.pos] || w.pos : w.pos}</span>}
              </div>
              <p style={{ margin: "6px 0 0", color: "var(--vt-muted)", fontSize: 13 }}>
                {(hi && Array.isArray(w.meanings_hi) && w.meanings_hi.length ? w.meanings_hi : w.meanings || []).slice(0, 3).join(" \xB7 ")}
              </p>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--vt-muted)", fontStyle: "italic" }}>{toIAST(w.word)}</p>
              <a href={`#/explore/${encodeURIComponent(w.word)}`} style={{ fontSize: 13, color: "var(--vt-orange)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                <span>{t("Explore")}</span> <ArrowRight size={12} />
              </a>
            </div>)}
        </div>

        {filteredWords.length === 0 && <p style={{ textAlign: "center", color: "var(--vt-muted)", padding: 20 }}>
            {t("No words for this root in the dictionary yet. Browse other roots above.")}
          </p>}
      </div>
    </div>;
}
export {
  EtymologyTreePage as default
};
