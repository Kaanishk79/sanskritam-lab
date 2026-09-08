import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { GRAMMAR_RULES, PHILOSOPHY_NETWORKS } from "../../data/grammarMaps";
import { loadGrammarRules, loadPhilosophyNetworks } from "../../services/contentDb";

function GrammarMapsPage() {
  const [activeTab, setActiveTab] = useState("grammar");
  const [rules, setRules] = useState(GRAMMAR_RULES);
  const [philosophies, setPhilosophies] = useState(PHILOSOPHY_NETWORKS);
  const [selectedRule, setSelectedRule] = useState(null);
  const [selectedDarshana, setSelectedDarshana] = useState(null);
  const { t, lang } = useLanguage();
  const hi = lang === "hi";

  useEffect(() => {
    let live = true;
    loadGrammarRules().then((rows) => {
      if (live && rows) {
        setRules(rows);
        setSelectedRule(rows[0]);
      }
    });
    loadPhilosophyNetworks().then((rows) => {
      if (live && rows) {
        setPhilosophies(rows);
        setSelectedDarshana(rows[0]);
      }
    });
    return () => {
      live = false;
    };
  }, []);

  const activeRule = selectedRule || rules[0];
  const activePhilos = selectedDarshana || philosophies[0];

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>{t("Grammar & Philosophy Maps")}</h2>
        <p>
          {t(
            "Interactive network maps of Pāṇinian sūtras and interconnected Indian philosophical systems (Darśanas)."
          )}
        </p>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <button
          className={`btn ${activeTab === "grammar" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setActiveTab("grammar")}
        >
          {t("Pāṇini Grammar Network")}
        </button>
        <button
          className={`btn ${activeTab === "philosophy" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setActiveTab("philosophy")}
        >
          {t("Philosophy Networks")}
        </button>
      </div>

      {activeTab === "grammar" ? (
        <div>
          {/* Interactive SVG Network Map */}
          <div
            style={{
              padding: 24,
              background: "#0d1b2a",
              borderRadius: 12,
              border: "1px solid #1e3a5f",
              marginBottom: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div style={{ fontSize: 13, color: "#7fa6ce", marginBottom: 8, letterSpacing: "1px", fontWeight: 600 }}>
              {t("PĀṆINIAN SŪTRA RELATIONSHIP GRAPH")}
            </div>

            <div style={{ position: "relative", width: "100%", maxWidth: 620, height: 320 }}>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 620 320"
                style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
              >
                {rules.map((r, i) => {
                  const angle = (i / rules.length) * 2 * Math.PI - Math.PI / 2;
                  const x = 310 + 200 * Math.cos(angle);
                  const y = 160 + 105 * Math.sin(angle);
                  const isSel = activeRule?.id === r.id;
                  return (
                    <line
                      key={`line-${r.id}`}
                      x1="310"
                      y1="160"
                      x2={x}
                      y2={y}
                      stroke={isSel ? "#c9a84c" : "#2a507a"}
                      strokeWidth={isSel ? "2.5" : "1.5"}
                      strokeDasharray={isSel ? "none" : "4 4"}
                      style={{ transition: "all 0.3s" }}
                    />
                  );
                })}
              </svg>

              {/* Center Hub */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "linear-gradient(135deg, #243b55, #141e30)",
                  border: "2px solid #c9a84c",
                  borderRadius: "50%",
                  width: 90,
                  height: 90,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 20px rgba(201, 168, 76, 0.3)",
                  zIndex: 2,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 11, color: "#c9a84c", fontWeight: 700 }}>अष्टाध्यायी</div>
                <div style={{ fontSize: 10, color: "#8ca0b8" }}>Pāṇini</div>
              </div>

              {/* Node Rules */}
              {rules.map((r, i) => {
                const angle = (i / rules.length) * 2 * Math.PI - Math.PI / 2;
                const x = 310 + 200 * Math.cos(angle);
                const y = 160 + 105 * Math.sin(angle);
                const isSel = activeRule?.id === r.id;
                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRule(r)}
                    style={{
                      position: "absolute",
                      left: x,
                      top: y,
                      transform: "translate(-50%, -50%)",
                      background: isSel ? "#c9a84c" : "#132842",
                      color: isSel ? "#121212" : "#f0e6d2",
                      border: isSel ? "2px solid #ffe699" : "1px solid #2a507a",
                      borderRadius: 8,
                      padding: "8px 14px",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.25s",
                      zIndex: 3,
                      boxShadow: isSel ? "0 0 16px rgba(201, 168, 76, 0.5)" : "none",
                    }}
                  >
                    <div style={{ fontSize: 10, color: isSel ? "#333" : "#7fa6ce", fontWeight: 600 }}>{r.id}</div>
                    <div style={{ fontSize: 17, fontFamily: "'Noto Sans Devanagari', serif", fontWeight: 700 }}>{r.rule}</div>
                  </div>
                );
              })}
            </div>

            {/* Selected Rule Inspector */}
            {activeRule && (
              <div
                style={{
                  marginTop: 18,
                  padding: "12px 20px",
                  background: "rgba(20, 40, 68, 0.8)",
                  borderRadius: 8,
                  border: "1px solid #284c75",
                  maxWidth: 540,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 700, color: "#c9a84c", marginBottom: 4 }}>
                  {activeRule.rule} — {hi ? activeRule.meaningHi ?? activeRule.meaning : activeRule.meaning}
                </div>
                <div style={{ fontSize: 13, color: "#a8c0dc" }}>
                  Aṣṭādhyāyī Sūtra {activeRule.id} · {activeRule.category}
                </div>
              </div>
            )}
          </div>

          <div className="text-list">
            {rules.map((r) => (
              <div
                key={r.id}
                className="text-item"
                style={{
                  cursor: "pointer",
                  borderLeft: activeRule?.id === r.id ? "4px solid #c9a84c" : "none",
                }}
                onClick={() => setSelectedRule(r)}
              >
                <div>
                  <div className="text-title">
                    {r.rule} — {hi ? r.meaningHi ?? r.meaning : r.meaning}
                  </div>
                  <div className="text-meta">Aṣṭādhyāyī {r.id} · {r.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* Philosophy Darśana Network */}
          <div
            style={{
              padding: 24,
              background: "#0d1b2a",
              borderRadius: 12,
              border: "1px solid #1e3a5f",
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 13, color: "#7fa6ce", marginBottom: 16, letterSpacing: "1px", fontWeight: 600 }}>
              {t("ṢAḌ-DARŚANA COMPLEMENTARY PAIRINGS (आस्तिक षड्दर्शनानि)")}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              {[
                { pair: "Nyāya ↔ Vaiśeṣika", desc: "Logic, Epistemology & Atomic Ontology", color: "#3498db" },
                { pair: "Sāṅkhya ↔ Yoga", desc: "Dualistic Metaphysics & Experiential Meditation", color: "#2ecc71" },
                { pair: "Mīmāṃsā ↔ Vedānta", desc: "Vedic Hermeneutics & Non-dual Ultimate Reality", color: "#9b59b6" },
              ].map((p) => (
                <div
                  key={p.pair}
                  style={{
                    background: "#162840",
                    border: `1px solid ${p.color}`,
                    borderRadius: 8,
                    padding: "12px 18px",
                    maxWidth: 240,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontWeight: 700, color: p.color, fontSize: 15, marginBottom: 4 }}>{p.pair}</div>
                  <div style={{ fontSize: 12, color: "#9bb5d0" }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid-3">
            {philosophies.map((p) => (
              <div
                key={p.name}
                className="module-card"
                style={{
                  borderTop: `4px solid ${p.color}`,
                  cursor: "pointer",
                  background: activePhilos?.name === p.name ? "rgba(30, 50, 80, 0.7)" : undefined,
                }}
                onClick={() => setSelectedDarshana(p)}
              >
                <h3>{p.name}</h3>
                <p style={{ marginTop: 8 }}>
                  <strong>{t("Focus:")}</strong> {hi ? p.focusHi ?? p.focus : p.focus}
                </p>
                <p style={{ marginTop: 4 }}>
                  <strong>{t("Texts:")}</strong> {hi ? p.textsHi ?? p.texts : p.texts}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GrammarMapsPage;
