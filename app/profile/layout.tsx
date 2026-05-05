// app/profile/layout.tsx
// Ce layout enveloppe TOUTES les pages sous /profile
// Il s'imbrique entre le RootLayout (navbar) et chaque page
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* En-tête commun à toute la section profils */}
      <div
        style={{
          background: "linear-gradient(135deg, #6d28d9 0%, #4f46e5 100%)",
          padding: "1.5rem",
          marginBottom: "0",
          color: "white",
          textAlign: "center",
        }}
      >
        <p style={{color: "white", fontSize: "0.85rem", opacity: 0.85, margin: 0 }}>
            Profils LinkUp
        </p>
      </div>
      {children}
    </div>
  );
}
