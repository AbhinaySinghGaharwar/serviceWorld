import { getChildPanels } from "@/lib/adminServices";
import ClientPage from "./ClientPage";
export default async function Page(){
    const res = await getChildPanels();
console.log(res )
  if (res.error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 dark:text-red-400 text-lg">
        ❌ {res.error}
      </div>
    );
  }

  const panels = res.requests || [];
  return (
    <>
    <ClientPage panels={panels}/>
    </>
  )
}