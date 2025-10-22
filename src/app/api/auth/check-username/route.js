import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  const { username } = await req.json();
  const client = await clientPromise;
  const db = client.db("mydb");
  const user = await db.collection("users").findOne({ username });
  return new Response(JSON.stringify({ exists: !!user }), { status: 200 });
}
