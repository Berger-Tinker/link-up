import { Metadata } from "next";

// app/posts/[id]/page.tsx
type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};
type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};
type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) return { title: "Post introuvable · LinkUp" };
  const post : Post = await res.json();
  return {
    title: `${post.title.length > 60 ? post.title.slice(0, 60) + "..." : post.title} · LinkUp`,
    description: `${post.title.length > 60 ? post.title.slice(0, 60) + "..." : post.title} · LinkUp`,
  };
}

export default async function PostPage({ params }: Props) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { id } = await params;

  const [postRes, commentsRes] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      next: { revalidate: 60 },
    }),
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
      next: { revalidate: 60 },
    }),
  ]);
  if (!postRes.ok) throw new Error("Post introuvable");
  const [post, comments]: [Post, Comment[]] = await Promise.all([
    postRes.json(),
    commentsRes.json(),
  ]);
  return (
    <div className="page-container">
      {" "}
      {/* Article principal */}
      <article
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
          padding: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <h1 style={{ marginBottom: "1rem" }}>{post.title}</h1>
        <p style={{ lineHeight: "1.7" }}>{post.body}</p>
      </article>
      {/* Section commentaires */}
      <h2 style={{ marginBottom: "1rem" }}>Commentaires ({comments.length})</h2>
      {comments.map((comment) => (
        <div
          key={comment.id}
          style={{
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "1rem",
            marginBottom: "0.75rem",
          }}
        >
          <p style={{ fontWeight: "500", marginBottom: "0.25rem" }}>
            {comment.name}
          </p>
          <p
            style={{
              color: "#6b7280",
              fontSize: "0.85rem",
              marginBottom: "0.5rem",
            }}
          >
            {comment.email}
          </p>
          <p style={{ color: "#374151", margin: 0, fontSize: "0.9rem" }}>
            {comment.body}
          </p>
        </div>
      ))}
    </div>
  );
}
