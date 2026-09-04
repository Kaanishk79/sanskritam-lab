import { createContext, useContext, useState, useRef, useCallback } from "react";
import DevanagariKeyboard from "../components/DevanagariKeyboard";
const KeyboardContext = createContext(null);
function KeyboardProvider({ children }) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [currentTarget, setCurrentTarget] = useState(null);
  const defaultRef = useRef(null);
  const openKeyboard = useCallback((ref) => {
    setCurrentTarget(ref);
    setKeyboardVisible(true);
  }, []);
  const closeKeyboard = useCallback(() => {
    setKeyboardVisible(false);
    setCurrentTarget(null);
  }, []);
  const toggleKeyboard = useCallback((ref) => {
    if (keyboardVisible && currentTarget === ref) {
      closeKeyboard();
    } else {
      openKeyboard(ref);
    }
  }, [keyboardVisible, currentTarget, openKeyboard, closeKeyboard]);
  const registerInput = useCallback((ref) => {
    defaultRef.current = ref.current;
  }, []);
  return <KeyboardContext.Provider value={{ keyboardVisible, openKeyboard, closeKeyboard, toggleKeyboard, registerInput }}>
      {children}
      {keyboardVisible && currentTarget && <div className="kb-overlay">
          <DevanagariKeyboard targetRef={currentTarget} onClose={closeKeyboard} />
        </div>}
    </KeyboardContext.Provider>;
}
function useKeyboard() {
  const ctx = useContext(KeyboardContext);
  if (!ctx) throw new Error("useKeyboard must be used within KeyboardProvider");
  return ctx;
}
export {
  KeyboardProvider,
  useKeyboard
};
