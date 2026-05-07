export type Post = {
  id: number;
  author: string;
  handle: string;
  content: string;
  likes: number;
  createdAt: string;
};

// Données initiales — quelques posts de départ
let posts: Post[] = [
  {
    id: 1,
    author: "Alice Martin",
    handle: "@alice_dev",
    content: "Je viens de déployer mon premier projet Next.js 🚀",
    likes: 24,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    author: "Bob Nguyen",
    handle: "@bob_codes",
    content:
      "Les Server Components changent vraiment la façon de penser le rendu !",
    likes: 18,
    createdAt: "2024-01-15T08:30:00Z",
  },
  {
    id: 3,
    author: "Clara Dubois",
    handle: "@clara_ui",
    content:
      "Tailwind ou CSS classique avec Next.js ? Curieuse des pratiques !",
    likes: 41,
    createdAt: "2024-01-14T18:00:00Z",
  },
];

// Fonctions d'accès — encapsuler les opérations sur le tableau
export const getAllPosts = () => [...posts]; // copie pour éviter les mutations directes;

export const getPostById = (id: number) => posts.find((p) => p.id === id);

export const createPost = (data: Omit<Post, "id" | "createdAt" | "likes">) => {
  const newPost: Post = {
    id: Date.now(),
    ...data,
    likes: 0,
    createdAt: new Date().toISOString(),
  };
  posts = [...posts, newPost];
  return newPost;
};

export const updatePost = (id: number, data: Partial<Post>) => {
  posts = posts.map((p) => (p.id === id ? { ...p, ...data } : p));
  return posts.find((p) => p.id === id);
};

export const deletePost = (id: number) => {
  const exists = posts.some((p) => p.id === id);
  posts = posts.filter((p) => p.id !== id);
  return exists;
};

export const toggleLike = (id: number, increment: boolean) => {
  posts = posts.map((p) =>
    p.id === id ? { ...p, likes: p.likes + (increment ? 1 : -1) } : p,
  );
  return posts.find((p) => p.id === id);
};
