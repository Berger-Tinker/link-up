import LikeButton from "./LikeButton";

type Post = {
  id: number;
  author: string;
  handle: string;
  content: string;
  likes: number;
  time: string;
};

export default function postCard(post:Post) {
    return (
        <article
          style={{
            backgroundColor: "white",
            borderRadius: "1rem",
            padding: "1rem",
            border: "solid 1px grey",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: ".75rem" }}>
            <p style={{ fontWeight: "bold" }}>{post.author}</p>
            <p>{post.handle}</p>
            <p>{post.time}</p>
          </div>
          <p>{post.content}</p>
          <LikeButton initialLikes={post.likes}/>
        </article>
    )
}