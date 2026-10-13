// Sanskrit Shloka Recitation Audio Service
// Supports Play, Pause, Resume, Replay, and Graceful Fallback with state notifications

import { pickVoice } from "./speech";

class ShlokaReciter {
  constructor() {
    this.synth = typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this.onlineAudio = null;
    this.currentText = "";
    this.currentId = null;
    this.status = "idle"; // 'idle' | 'loading' | 'playing' | 'paused' | 'error'
    this.listeners = new Set();
    this.errorMessage = null;
    this.mode = null; // 'browser' | 'online'
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  notify() {
    const state = this.getState();
    this.listeners.forEach((fn) => fn(state));
  }

  getState() {
    return {
      status: this.status,
      currentId: this.currentId,
      errorMessage: this.errorMessage,
      isPlaying: this.status === "playing",
      isPaused: this.status === "paused",
      isLoading: this.status === "loading",
      isSupported: Boolean(this.synth || typeof Audio !== "undefined")
    };
  }

  stop() {
    try {
      if (this.synth) {
        this.synth.cancel();
      }
    } catch {
      // ignore
    }
    if (this.onlineAudio) {
      try {
        this.onlineAudio.pause();
        this.onlineAudio.currentTime = 0;
      } catch {
        // ignore
      }
      this.onlineAudio = null;
    }
    this.currentUtterance = null;
    this.status = "idle";
    this.errorMessage = null;
    this.notify();
  }

  pause() {
    if (this.status !== "playing") return;

    if (this.mode === "browser" && this.synth) {
      try {
        this.synth.pause();
        this.status = "paused";
        this.notify();
        return;
      } catch (err) {
        console.warn("Speech pause failed:", err);
      }
    }

    if (this.mode === "online" && this.onlineAudio) {
      try {
        this.onlineAudio.pause();
        this.status = "paused";
        this.notify();
        return;
      } catch (err) {
        console.warn("Audio pause failed:", err);
      }
    }

    // If native pause is finicky, treat as paused
    this.status = "paused";
    this.notify();
  }

  resume() {
    if (this.status !== "paused") return;

    if (this.mode === "browser" && this.synth) {
      try {
        this.synth.resume();
        this.status = "playing";
        this.notify();
        return;
      } catch {
        // fallback to replaying
      }
    }

    if (this.mode === "online" && this.onlineAudio) {
      this.onlineAudio.play().then(() => {
        this.status = "playing";
        this.notify();
      }).catch((err) => {
        this.status = "error";
        this.errorMessage = err.message || "Failed to resume audio recitation";
        this.notify();
      });
      return;
    }

    // fallback: play again from start
    if (this.currentId && this.currentText) {
      this.play(this.currentId, this.currentText);
    }
  }

  replay() {
    if (!this.currentId || !this.currentText) return;
    this.stop();
    this.play(this.currentId, this.currentText);
  }

  play(id, text) {
    if (!text || !text.trim()) {
      this.status = "error";
      this.errorMessage = "No shloka text available for recitation";
      this.notify();
      return;
    }

    // Stop whatever was playing
    this.stop();

    this.currentId = id;
    this.currentText = text;
    this.status = "loading";
    this.errorMessage = null;
    this.notify();

    // Clean up text for clearer recitation pacing:
    // replace double danda (॥) or single danda (।) with breath pauses
    const recitationText = text
      .replace(/॥/g, "।")
      .replace(/\s+/g, " ")
      .trim();

    // Check if browser speech synthesis is available
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {}
      try {
        this.synth.resume();
      } catch {}

      const voice = pickVoice();
      const utterance = new SpeechSynthesisUtterance(recitationText);
      // Sanskrit recitation tempo: rate 0.78 for deliberate meter and chanting cadence
      utterance.rate = 0.78;
      utterance.pitch = 1.0;
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang || "sa-IN";
      } else {
        utterance.lang = "sa-IN";
      }

      this.currentUtterance = utterance;
      this.mode = "browser";

      let speechStarted = false;

      utterance.onstart = () => {
        speechStarted = true;
        this.status = "playing";
        this.errorMessage = null;
        this.notify();
      };

      utterance.onend = () => {
        this.status = "idle";
        this.currentId = null;
        this.notify();
      };

      utterance.onerror = (_e) => {
        // If error occurred before it even started, attempt online audio fallback
        if (!speechStarted) {
          this.playOnlineFallback(recitationText);
        } else {
          this.status = "idle";
          this.currentId = null;
          this.notify();
        }
      };

      // In case speechSynthesis hangs silently without starting (known Chrome quirk)
      setTimeout(() => {
        if (this.status === "loading" && !speechStarted) {
          try {
            this.synth.speak(utterance);
          } catch {
            this.playOnlineFallback(recitationText);
          }
        }
      }, 50);

      // Timeout watchdog
      setTimeout(() => {
        if (this.status === "loading" && !speechStarted) {
          try {
            this.synth.cancel();
          } catch {}
          this.playOnlineFallback(recitationText);
        }
      }, 1400);

      try {
        this.synth.speak(utterance);
      } catch {
        this.playOnlineFallback(recitationText);
      }
    } else {
      this.playOnlineFallback(recitationText);
    }
  }

  playOnlineFallback(text) {
    if (typeof Audio === "undefined") {
      this.status = "error";
      this.errorMessage = "Audio recitation is not supported on this browser device.";
      this.notify();
      return;
    }

    this.mode = "online";
    const sample = text.slice(0, 180);
    const urls = [
      "/api/tts?q=" + encodeURIComponent(sample),
      "https://api.streamelements.com/kappa/v2/speech?voice=hi-IN&text=" + encodeURIComponent(sample),
      "https://translate.google.com/translate_tts?ie=UTF-8&tl=hi&client=tw-ob&q=" + encodeURIComponent(sample)
    ];

    let currentIdx = 0;
    const tryNextUrl = () => {
      if (currentIdx >= urls.length) {
        this.status = "error";
        this.errorMessage = "Audio recitation unavailable. Please verify device sound or try another browser.";
        this.notify();
        return;
      }

      const url = urls[currentIdx++];
      const audio = new Audio(url);
      this.onlineAudio = audio;

      audio.oncanplay = () => {
        if (this.status === "loading") {
          audio.play().then(() => {
            this.status = "playing";
            this.errorMessage = null;
            this.notify();
          }).catch(() => {
            tryNextUrl();
          });
        }
      };

      audio.onended = () => {
        this.status = "idle";
        this.currentId = null;
        this.onlineAudio = null;
        this.notify();
      };

      audio.onerror = () => {
        tryNextUrl();
      };
    };

    tryNextUrl();
  }
}

export const shlokaReciter = new ShlokaReciter();
