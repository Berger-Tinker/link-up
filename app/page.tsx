import Link from "next/link";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type User = {
  id: number;
  name: string;
  username: string;
};

async function getPostsWithUsers() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  // Lancer les deux fetch en parallèle — plus rapide qu’en série
  const [postsRes, usersRes] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10", {
      next: { revalidate: 60 },
    }),
    fetch("https://jsonplaceholder.typicode.com/users", {
      next: { revalidate: 300 },
    }),
  ]);
  if (!postsRes.ok || !usersRes.ok)
    throw new Error("Erreur lors du chargement des données");
  const [posts, users]: [Post[], User[]] = await Promise.all([
    postsRes.json(),
    usersRes.json(),
  ]);
  // Créer un dictionnaire userId → user pour accès rapide
  const usersById = Object.fromEntries(users.map((u) => [u.id, u]));
  return posts.map((post) => ({
    ...post,
    author: usersById[post.userId]?.name ?? "Inconnu",
    handle: "@" + (usersById[post.userId]?.username ?? "inconnu"),
  }));
}

export default async function HomePage() {
  const posts = await getPostsWithUsers();
  return (
    <div className="page-container">
      <h1>Fil d’actualité</h1>
      {posts.map((post) => (
        <article
          key={post.id}
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <strong>{post.author}</strong>
          <span style={{ color: "#6b7280", marginLeft: "0.5rem" }}>
            {post.handle}
          </span>
          <Link href={`/post/${post.id}`} style={{color: "#6d28d9", fontWeight: "500", margin: "0.5rem 0", display: "block", cursor: "pointer"}}>{post.title}</Link>
          <p style={{ color: "#6b7280", margin: 0 }}>{post.body}</p>
        </article>
      ))}
    </div>
  );
}
