import { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkUp",
  description: "Lorem ipsum",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <header>
          <nav style={{display: "flex", justifyContent: "space-between", padding: "1rem 2rem"}}>
            <Link href="/" style={{color: "#6d28d9", textDecoration: "none", fontWeight: "bold"}}>🔗LinkUp</Link>
            <div style={{display: "flex", flexDirection: "row", gap:'1rem'}}>
              <Link href="/explore">Explorer</Link>
              <Link href="/profile">Mon profile</Link>
            </div>
          </nav>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
