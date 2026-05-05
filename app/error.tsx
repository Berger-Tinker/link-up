"use client";
// ⚠️ error.tsx DOIT être un Client Component
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="page-container">
      <h1>Oups — quelque chose s’est mal passé</h1>
      <p style={{ color: "#6b7280", marginBottom: "1rem" }}>{error.message}</p>
      <button
        onClick={() => reset()}
        style={{
          padding: "0.5rem 1.25rem",
          borderRadius: "8px",
          border: "1px solid #6d28d9",
          color: "#6d28d9",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        Réessayer
      </button>
    </div>
  );
}
