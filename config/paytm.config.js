import { getPaymentMethodDetails } from "@/lib/adminServices";
const data=await getPaymentMethodDetails()


export const paytmConfig = {
  mid: process.env.PAYTM_MID,
  key: process.env.PAYTM_MERCHANT_KEY,
  website: "WEBSTAGING",
  industryType: "Retail",
  channelId: "WEB",
  callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/paytm/callback`,
  transactionURL: "https://securegw.paytm.in/theia/processTransaction"
};
