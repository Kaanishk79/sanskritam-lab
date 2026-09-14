import { useState, useEffect, useCallback, useRef } from "react";
import { devanagariLayouts, insertAtCursor } from "../services/keyboard";
import { useLanguage } from "../context/LanguageContext";
import { X } from "lucide-react";
const tabs = [
  { key: "consonants", label: "\u0935\u094D\u092F\u091E\u094D\u091C\u0928" },
  { key: "vowels", label: "\u0938\u094D\u0935\u0930" },
  { key: "matras", label: "\u092E\u093E\u0924\u094D\u0930\u093E" },
  { key: "digits", label: "\u0905\u0919\u094D\u0915" },
  { key: "special", label: "\u091A\u093F\u0939\u094D\u0928" }
];
function DevanagariKeyboard({ targetRef, onClose }) {
  const { t } = useLanguage();
  const [tab, setTab] = useState("consonants");
  const [caps, setCaps] = useState(false);
  const [halant, setHalant] = useState(false);
  const keyboardRef = useRef(null);
  const type = useCallback((char) => {
    const input = targetRef.current;
    if (!input) return;
    let toInsert = char;
    if (caps && devanagariLayouts.vowels.chars.flat().includes(char)) {
    }
    insertAtCursor(input, toInsert);
    if (halant) setHalant(false);
  }, [targetRef, caps, halant]);
  const typeHalant = useCallback(() => {
    const input = targetRef.current;
    if (!input) return;
    insertAtCursor(input, "\u094D");
  }, [targetRef]);
  const typeSpace = useCallback(() => {
    const input = targetRef.current;
    if (!input) return;
    insertAtCursor(input, " ");
  }, [targetRef]);
  useEffect(() => {
    function handleClick(e) {
      if (keyboardRef.current && !keyboardRef.current.contains(e.target)) {
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
  const layout = devanagariLayouts[tab];
  return <div className="devanagari-keyboard" ref={keyboardRef}>
      <div className="kb-header">
        <span className="kb-title">देवनागरी कुञ्जीपटल</span>
        <div className="kb-actions">
          <button
    className={`kb-toggle ${caps ? "active" : ""}`}
    onClick={() => setCaps((c) => !c)}
    title={t("Caps")}
  >
            अा
          </button>
          <button className="kb-close" onClick={onClose} aria-label={t("Close")}>
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="kb-tabs">
        {tabs.map((t2) => <button
    key={t2.key}
    className={`kb-tab ${tab === t2.key ? "active" : ""}`}
    onClick={() => setTab(t2.key)}
  >
            {t2.label}
          </button>)}
      </div>

      <div className="kb-body">
        {"groups" in layout ? layout.groups.map((group) => <div key={group.name} className="kb-row">
              {group.chars.map((ch) => <button key={ch} className="kb-key kons" onClick={() => type(ch)}>
                  {ch}
                </button>)}
            </div>) : layout.chars.map((row, i) => <div key={i} className="kb-row">
              {row.map((ch) => <button key={ch} className="kb-key" onClick={() => type(ch)}>
                  {ch}
                </button>)}
            </div>)}

        <div className="kb-row kb-bottom-row">
          <button className="kb-key kb-key-halant" onClick={typeHalant}>् (Halant)</button>
          <button className="kb-key kb-key-space" onClick={typeSpace}>␣ Space</button>
          <button className="kb-key kb-key-bksp" onClick={() => {
    const input = targetRef.current;
    if (input) insertAtCursor(input, "\b");
  }}>⌫</button>
        </div>
      </div>
    </div>;
}
export {
  DevanagariKeyboard as default
};
