// app/payments/page.jsx
import { getPaymentHistory } from "@/lib/userActions";
import PaymentTable from "./ClientPage";


export default async function Page() {
  const data = await getPaymentHistory();

  const newdata=JSON.stringify(data)
  return <PaymentTable dbData={newdata} />;
}
