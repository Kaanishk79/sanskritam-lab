import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { TIMELINE_EVENTS } from "../../data/timeline";
import { loadTimelineEvents } from "../../services/contentDb";

function TimelinePage() {
  const { t, lang } = useLanguage();
  const [events, setEvents] = useState(TIMELINE_EVENTS);
  const [activeCat, setActiveCat] = useState("all");

  useEffect(() => {
    let live = true;
    loadTimelineEvents().then((rows) => {
      if (live) setEvents(rows);
    });
    return () => {
      live = false;
    };
  }, []);

  const filteredEvents =
    activeCat === "all" ? events : events.filter((e) => e.category === activeCat);

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>{t("Evolutionary Timeline")}</h2>
        <p>
          {t(
            "Interactive timeline showing how Sanskrit language and philosophy evolved over centuries"
          )}
        </p>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        {["all", "text", "grammar", "philosophy"].map((cat) => (
          <button
            key={cat}
            className={`btn ${activeCat === cat ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setActiveCat(cat)}
          >
            {cat === "all"
              ? t("All Events")
              : t(cat.charAt(0).toUpperCase() + cat.slice(1))}
          </button>
        ))}
      </div>

      <div className="timeline">
        {filteredEvents.map((e, i) => (
          <div key={i} className="timeline-item">
            <div
              className="badge"
              style={{
                background:
                  e.category === "text"
                    ? "#2d5016"
                    : e.category === "grammar"
                    ? "#7d3c00"
                    : "#4a148c",
                color:
                  e.category === "text"
                    ? "#a8e6a3"
                    : e.category === "grammar"
                    ? "#ffcc80"
                    : "#ce93d8",
                marginBottom: 8,
                display: "inline-block",
              }}
            >
              {e.year}
            </div>
            <h3 style={{ color: "var(--vt-text)", fontSize: 16, marginBottom: 4 }}>
              {lang === "hi" && e.titleHi ? e.titleHi : e.title}
            </h3>
            <p style={{ color: "var(--vt-text-light)", fontSize: 14 }}>
              {lang === "hi" && e.descriptionHi ? e.descriptionHi : e.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimelinePage;
