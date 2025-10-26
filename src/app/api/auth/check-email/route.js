import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  const { email } = await req.json();
  const client = await clientPromise;
  const db = client.db("smmpanel");
  const user = await db.collection("users").findOne({ email });
  return new Response(JSON.stringify({ exists: !!user }), { status: 200 });
}
