import { Link } from "react-router-dom";
import { Home, Compass, BookOpen } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "65vh",
        textAlign: "center",
        padding: "32px 16px",
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontFamily: "'Noto Serif Devanagari', serif",
          color: "var(--vt-gold, #c9a84c)",
          lineHeight: 1.1,
          marginBottom: 8,
          textShadow: "0 0 20px rgba(201, 168, 76, 0.2)",
        }}
      >
        ४०४
      </div>
      <h1
        style={{
          fontSize: "24px",
          fontWeight: 700,
          color: "var(--vt-text, #f0e6d2)",
          marginBottom: 12,
        }}
      >
        {t("Page Not Found")} — मार्गः न लब्धः
      </h1>
      <p
        style={{
          color: "var(--vt-text-muted, #9e9382)",
          maxWidth: 460,
          fontSize: "15px",
          lineHeight: 1.6,
          marginBottom: 28,
        }}
      >
        {t("The page or scroll you are looking for does not exist in this library. Please return to the dashboard or explore our corpus.")}
      </p>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          to="/"
          className="btn btn-primary"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 20px",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          <Home size={18} />
          {t("Return to Dashboard")}
        </Link>
        <Link
          to="/search"
          className="btn btn-secondary"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 20px",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          <Compass size={18} />
          {t("Sanskrit Search")}
        </Link>
        <Link
          to="/research/ncert"
          className="btn btn-secondary"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 20px",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          <BookOpen size={18} />
          {t("NCERT Library")}
        </Link>
      </div>
    </div>
  );
}
