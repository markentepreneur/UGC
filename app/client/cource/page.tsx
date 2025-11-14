import CourceClient from "@/app/components/Cource/CourceClient";
import PaymentFail from "@/app/components/Cource/PaymentFail";
import PaymentSuccess from "@/app/components/Cource/PaymentSuccess";
import { IUser } from "@/interfaces/IUser";
import { fetchRequestFromServer } from "@/lib/serverfetchTools";

const CourcePage = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const params = await searchParams;
  let isPaid = false;
  try {
    const res = await fetchRequestFromServer<{ data: IUser }>(
      "/api/user/details"
    );
    isPaid = !!res.data.paidAt;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_e) {}
  if (isPaid) {
    return <PaymentSuccess />;
  }

  if (params.checkPayment) {
    return <PaymentFail />;
  }

  return <CourceClient />;
};

export default CourcePage;
