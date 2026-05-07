import { NextResponse } from "next/server";
import { getAllPosts, createPost } from "@/lib/store";

// GET /api/posts
// Supporte ?limit=N et ?author=alice pour filtrer
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? 100);
  const author = searchParams.get("author");
  let posts = getAllPosts();
  if (author) {
    posts = posts.filter((p) =>
      p.handle.toLowerCase().includes(author.toLowerCase()),
    );
  }
  return NextResponse.json({
    posts: posts.slice(0, limit),
    total: posts.length,
  });
}


// POST /api/posts
// Corps attendu : { author, handle, content }
export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps JSON invalide" }, { status: 400 });
  }
  const { author, handle, content } = body;
  if (!author || !handle || !content) {
    return NextResponse.json(
      { error: "author, handle et content sont requis" },
      { status: 400 },
    );
  }
  const post = createPost({ author, handle, content });
  return NextResponse.json(post, { status: 201 });
}
