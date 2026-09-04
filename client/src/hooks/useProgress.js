import { useState, useCallback, useEffect } from "react";
import { loadProgress, saveProgress, updateProgress, getRecommendedTrack } from "../services/learning";
import { lessons } from "../data/lessons";
import { supabase } from "../services/supabase";
async function authUserId() {
  const {
    data: { session }
  } = await supabase.auth.getSession();
  return session?.user?.id ?? null;
}
async function syncToServer(p) {
  const userId = await authUserId();
  if (!userId) return;
  await supabase.from("user_progress").upsert(
    {
      user_id: userId,
      current_track: p.currentTrack,
      current_level: p.currentLevel,
      completed_lessons: p.completedLessons,
      quiz_scores: p.quizScores,
      xp: p.xp,
      streak: p.streak,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    },
    { onConflict: "user_id" }
  );
}
async function loadFromServer() {
  const userId = await authUserId();
  if (!userId) return null;
  const { data } = await supabase.from("user_progress").select("*").eq("user_id", userId).single();
  if (!data) return null;
  const local = loadProgress();
  return {
    ...local,
    completedLessons: data.completed_lessons ?? [],
    quizScores: data.quiz_scores ?? {},
    currentLevel: data.current_level ?? 0,
    currentTrack: data.current_track ?? "child",
    xp: data.xp ?? 0,
    streak: data.streak ?? 0
  };
}
function useProgress() {
  const [progress, setProgress] = useState(loadProgress);
  useEffect(() => {
    let alive = true;
    void loadFromServer().then((server) => {
      if (!alive || !server) return;
      setProgress(server);
      saveProgress(server);
    });
    return () => {
      alive = false;
    };
  }, []);
  const persist = useCallback((p) => {
    saveProgress(p);
    void syncToServer(p);
  }, []);
  const completeLesson = useCallback((lessonId, score, difficulty) => {
    setProgress((p) => {
      const next = updateProgress(p, lessonId, score, difficulty);
      persist(next);
      return next;
    });
  }, [persist]);
  const switchTrack = useCallback((track) => {
    setProgress((p) => {
      const next = { ...p, currentTrack: track };
      persist(next);
      return next;
    });
  }, [persist]);
  const switchClass = useCallback((govClassId) => {
    setProgress((p) => {
      const next = { ...p, currentGovClass: govClassId };
      persist(next);
      return next;
    });
  }, [persist]);
  const resetProgress = useCallback(() => {
    const fresh = loadProgress();
    fresh.currentLevel = 0;
    fresh.currentTrack = "child";
    fresh.currentGovClass = "class-1-2";
    fresh.completedLessons = [];
    fresh.quizScores = {};
    fresh.xp = 0;
    fresh.streak = 0;
    for (const s of Object.values(fresh.skills)) {
      s.unlocked = true;
      s.completed = false;
      s.progress = 0;
    }
    saveProgress(fresh);
    persist(fresh);
    setProgress(fresh);
  }, [persist]);
  const recommendedTrack = getRecommendedTrack(progress.xp);
  const availableLessons = lessons.filter((l) => {
    const trackLevels = {
      child: [0, 1],
      teen: [1, 2, 3],
      undergrad: [2, 3, 4],
      graduate: [3, 4, 5],
      phd: [5, 6]
    };
    return trackLevels[progress.currentTrack]?.includes(l.level);
  });
  return { progress, completeLesson, switchTrack, switchClass, resetProgress, recommendedTrack, availableLessons };
}
export {
  useProgress
};
