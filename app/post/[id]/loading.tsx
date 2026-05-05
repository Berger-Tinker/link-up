// app/posts/[id]/loading.tsx
export default function Loading() {
  return (
    <div className="page-container">
      <div
        style={{
          height: "32px",
          width: "60%",
          background: "#e5e7eb",
          borderRadius: "6px",
          marginBottom: "1.5rem",
        }}
      />
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            height: "14px",
            background: "#f3f4f6",
            borderRadius: "4px",
            marginBottom: "0.5rem",
            width: `${100 - i * 10}%`,
          }}
        />
      ))}
    </div>
  );
}
