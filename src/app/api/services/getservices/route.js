import { getServices } from "@/lib/services";

export async function GET(request){
    const services= await getServices()
    return Response.json(services)
}