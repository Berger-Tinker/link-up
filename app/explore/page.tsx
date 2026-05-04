const suggestedUsers = [
  {
    id: 1,
    name: "David Chen",
    handle: "@david_ts",
    bio: "TypeScript fanatic 💙",
    followers: 1240,
  },
  {
    id: 2,
    name: "Eva Rossi",
    handle: "@eva_design",
    bio: "UI/UX · CSS lover 🎨",
    followers: 3800,
  },
  {
    id: 3,
    name: "Frank Müller",
    handle: "@frank_devops",
    bio: "DevOps · K8s · CI/CD 🛠️ ",
    followers: 920,
  },
  {
    id: 4,
    name: "Giulia Romano",
    handle: "@giulia_ml",
    bio: "ML · Python 🤖",
    followers: 5600,
  },
];

export default function Explore() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "0px 4rem",
      }}
    >
      <h1>Explore</h1>
      {suggestedUsers.map((user) => (
        <article
          style={{
            backgroundColor: "white",
            borderRadius: "1rem",
            padding: "1rem",
            border: "solid 1px grey",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: ".75rem" }}>
            <p style={{ fontWeight: "bold" }}>{user.name}</p>
            <p>{user.handle}</p>
          </div>
          <p>{user.bio}</p>
          <div style={{ display: "flex", flexDirection: "row", gap: ".75rem" }}>
            <p>🫃{user.followers.toLocaleString()} followers</p>
            <button>follow</button>
          </div>
        </article>
      ))}
    </div>
  );
}
