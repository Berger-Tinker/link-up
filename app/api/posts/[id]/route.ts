import { NextResponse } from "next/server";
import { getPostById, updatePost, deletePost } from "@/lib/store";

type Params = { params: { id: string } };

// GET /api/posts/[id]
export async function GET(_: Request, { params }: Params) {
  const post = getPostById(Number(params.id));
  if (!post) {
    return NextResponse.json({ error: "Post introuvable" }, { status: 404 });
  }
  return NextResponse.json(post);
}

// PATCH /api/posts/[id]
// Mise à jour partielle — seuls les champs envoyés sont modifiés
export async function PATCH(request: Request, { params }: Params) {
  const resolvedParams = await params
  const id = parseInt(resolvedParams.id)

  const post = getPostById(id);
  if (!post)
    return NextResponse.json({ error: "Post introuvable" }, { status: 404 });
  const body = await request.json();
  const updated = updatePost(Number(id), body);
  return NextResponse.json(updated);
}

// DELETE /api/posts/[id]
export async function DELETE(_: Request, { params }: Params) {
  const resolvedParams = await params
  const id = resolvedParams.id

  const deleted = deletePost(Number(id));
  if (!deleted) {
    return NextResponse.json({ error: "Post introuvable" }, { status: 404 });
  }
  return new Response(null, { status: 204 }); // 204 : succès sans corps
}
