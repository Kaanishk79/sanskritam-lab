export default function PageLoader() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "45vh",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          border: "3px solid rgba(201, 168, 76, 0.2)",
          borderTopColor: "var(--vt-gold, #c9a84c)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <span
        style={{
          fontSize: "14px",
          color: "var(--vt-text-muted, #9e9382)",
          letterSpacing: "0.5px",
        }}
      >
        लोड भवति...
      </span>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
