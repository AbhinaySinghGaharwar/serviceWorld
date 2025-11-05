import EditUserPage from "./EditUserPage";
import { getUserById } from "@/lib/adminServices";

export default async function EditMain({ params }) {
const {id} = await params;
  const user = await getUserById(id);

  return <EditUserPage user={user.user} />;
}
