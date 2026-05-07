import Link from "next/link";
import { getAllPosts } from "@/lib/store";
import NewPostForm from "@/components/NewPostForm";

export default async function HomePage() {
  const posts = await getAllPosts();
  return (
    <div className="page-container">
      <h1>Fil d’actualité</h1>
      <NewPostForm></NewPostForm>
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
          <Link href={`/post/${post.id}`} style={{color: "#6d28d9", fontWeight: "500", margin: "0.5rem 0", display: "block", cursor: "pointer"}}>{post.createdAt}</Link>
          <p style={{ color: "#6b7280", margin: 0 }}>{post.content}</p>
        </article>
      ))}
    </div>
  );
}
