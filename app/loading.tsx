// app/loading.tsx
// Affiché automatiquement pendant que HomePage charge ses données
// Pas de "use client" nécessaire
export default function Loading() {
  return (
    <div className="page-container">
      <h1>Fil d’actualité</h1>
      {/* Squelettes de chargement — 3 cartes fantômes */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          {/* Barres grises qui imitent le contenu à venir */}
          <div
            style={{
              height: "16px",
              width: "40%",
              background: "#e5e7eb",
              borderRadius: "4px",
              marginBottom: "0.75rem",
            }}
          />
          <div
            style={{
              height: "12px",
              width: "90%",
              background: "#f3f4f6",
              borderRadius: "4px",
              marginBottom: "0.4rem",
            }}
          />
          <div
            style={{
              height: "12px",
              width: "70%",
              background: "#f3f4f6",
              borderRadius: "4px",
            }}
          />
        </div>
      ))}
    </div>
  );
}
