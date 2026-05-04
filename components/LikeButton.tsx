"use client";

import { useState } from "react";

type LikeButtonProps = { initialLikes: number };

export default function LikeButton({ initialLikes }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialLikes);

  function handleLike() {
    setCount(liked ? count - 1 : count + 1);
    setLiked(!liked);
  }

  return (
    <button
      onClick={handleLike}
      style={{
        background: liked ? "#fce7f3" : "transparent",
        border: `1px solid ${liked ? "#ec4899" : "#d1d5db"}`,
        color: liked ? "#ec4899" : "#6b7280",
        padding: "0.3rem 0.8rem",
        borderRadius: "999px",
        cursor: "pointer",
        fontSize: "0.9rem",
        transition: "all 0.15s ease",
      }}
    >
      {liked ? "❤️ " : "🤍"} {count} j'aime
    </button>
  );
}
