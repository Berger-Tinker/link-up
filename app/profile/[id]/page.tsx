import type { Metadata } from "next";

// app/profile/[id]/page.tsx
// 🟢 Composant Serveur async — reçoit params.id depuis l'URL
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  company: { name: string };
  address: { city: string };
};

type Post = {
  id: number;
  title: string;
  body: string;
};

// On type les props de la page — TypeScript nous garantit que params.id existe
type Props = {
  params: Promise<{ id: string }>;
};

// Pré-générer les pages des 10 utilisateurs au build
export async function generateStaticParams() {
  const users = await fetch("https://jsonplaceholder.typicode.com/users").then(
    (r) => r.json(),
  );
  return users.map((u: { id: number }) => ({ id: String(u.id) }));
}

// Appelée au moment du rendu pour générer le <title> et les <meta>
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {id} = await params
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );
  if (!res.ok) return { title: "Profil introuvable · LinkUp" };
  const user = await res.json();
  return {
    title: `${user.name} · LinkUp`,
    description: `Profil de ${user.name} sur LinkUp`,
  };
}

export default async function UserProfilePage({ params }: Props) {
  // Deux fetch en parallèle : l'utilisateur ET ses posts
  const { id } = await params;
  const [userRes, postsRes] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      next: { revalidate: 300 },
    }),
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`, {
      next: { revalidate: 60 },
    }),
  ]);
  if (!userRes.ok) throw new Error(`Utilisateur ${id} introuvable`);
  if (!postsRes.ok) throw new Error("Impossible de charger les posts");
  const [user, posts]: [User, Post[]] = await Promise.all([
    userRes.json(),
    postsRes.json(),
  ]);
  return (
    <div className="page-container">
      {/* En-tête du profil */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
          padding: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "#6d28d9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            marginBottom: "1rem",
          }}
        >
          👤
        </div>
        <h1 style={{ marginBottom: "0.25rem" }}>{user.name}</h1>
        <p style={{ color: "#6b7280", margin: "0 0 0.5rem" }}>
          @{user.username}
        </p>
        <p style={{ color: "#6b7280", margin: 0, fontSize: "0.9rem" }}>
          {user.company.name} · {user.address.city}
        </p>
      </div>
      {/* Posts de l'utilisateur */}
      <h2 style={{ marginBottom: "1rem" }}>Posts ({posts.length})</h2>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "1rem",
            marginBottom: "0.75rem",
          }}
        >
          <p style={{ fontWeight: "500", marginBottom: "0.5rem" }}>
            {post.title}
          </p>
          <p style={{ color: "#6b7280", margin: 0, fontSize: "0.9rem" }}>
            {post.body}
          </p>
        </div>
      ))}
    </div>
  );
}
