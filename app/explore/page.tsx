type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  company: { name: string };
  address: { city: string };
};

async function getUsers(): Promise<User[]> {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users?_limit=10",
    { next: { revalidate: 60 } }, // ISR : actualiser toutes les 60 secondes
  );
  if (!res.ok) {
    throw new Error("Impossible de charger les users");
  }
  return res.json();
}

export default async function Explore() {
  const users = await getUsers();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "0px 4rem",
      }}
    >
      <h1>Explore</h1>
      {users.map((user) => (
        <article
          key={user.id}
          style={{
            backgroundColor: "white",
            borderRadius: "1rem",
            padding: "1rem",
            border: "solid 1px grey",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: ".75rem" }}>
            <p style={{ fontWeight: "bold" }}>{user.name}</p>
            <p>@{user.username}</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
            laudantium
          </p>
          <div style={{ display: "flex", flexDirection: "row", gap: ".75rem" }}>
            <button>follow</button>
          </div>
        </article>
      ))}
    </div>
  );
}
