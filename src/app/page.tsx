import db from "@/db";
import { playing_with_neon, users } from "@/db/schema";
export default async function Home() {
  const result = await db.select().from(playing_with_neon);

  return <div>landing page</div>;
}
