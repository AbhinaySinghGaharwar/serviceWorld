
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req, res) {
    try {
        const token = await cookies().get("token", { req, res }); 

        if (!token) return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
        const user = jwt.verify(token.value, process.env.JWT_SECRET); // verify JWT
        return new Response(JSON.stringify({ user }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 401 });
    }
}
