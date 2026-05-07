import { NextResponse } from "next/server";
import { getPostById, toggleLike } from "@/lib/store";

type Params = { params: { id: string } };
// POST /api/posts/[id]/likes
// Corps attendu : { increment: true } pour liker, { increment: false } pour unliker

export async function POST(request: Request, { params }: Params) {
const resolvedParams = await params
  const id = parseInt(resolvedParams.id)
  const post = getPostById(Number(id));
  if (!post)
    return NextResponse.json({ error: "Post introuvable" }, { status: 404 });
  const { increment } = await request.json();
  if (typeof increment !== "boolean") {
    return NextResponse.json(
      { error: "increment doit être un booléen" },
      { status: 400 },
    );
  }
  const updated = toggleLike(Number(id), increment);
  return NextResponse.json({ likes: updated?.likes });
}
