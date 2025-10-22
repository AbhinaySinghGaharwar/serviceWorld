import { cookies } from "next/headers";

export async function POST(req, res) {
  const response = new Response(JSON.stringify({ message: "Logged out" }), { status: 200 });
  (await cookies()).delete("token", { req, res: response });
  return response;
}
