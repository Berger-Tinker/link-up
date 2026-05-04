import PostCard from "@/components/PostCard";

type Post = {
  id: number;
  author: string;
  handle: string;
  content: string;
  likes: number;
  time: string;
};

type ShortPost = {
  id: number;
  content: string;
  likes: number;
  time: string;
};

const currentUser = {
  name: "Alice Martin",
  handle: "@alice_dev",
  bio: "Développeuse full-stack · Next.js addict · Coffee ☕",
  followers: 312,
  following: 148,
  joinedDate: "Septembre 2024",
};

const myPosts: ShortPost[] = [
  {
    id: 1,
    content: "Je viens de déployer mon premier projet Next.js 🚀",
    likes: 24,
    time: "Il y a 2h",
  },
  {
    id: 2,
    content: "Les hooks React sont vraiment puissants quand on les maîtrise 💡",
    likes: 15,
    time: "Hier",
  },
];

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "0 4rem",
      }}
    >
      <h1>🫃 Hello, I'm {currentUser.name}.</h1>
      <p>
        {currentUser.bio} <br />
        {currentUser.followers} followers and {currentUser.following} followings
      </p>
      {myPosts.map((p) => (
        <PostCard
          key={p.id}
          id={p.id}
          author={currentUser.name}
          handle={currentUser.handle}
          content={p.content}
          likes={p.likes}
          time={p.time}
        />
      ))}
    </div>
  );
}
