import { getDictionary } from "@/app/actions/dictionary";
import Orders from "@/modules/orders/orders";
import { Locale } from "i18n.config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
  description: "Orders Management",
};

export default async function OrdersPage(props: {
  searchParams?: Promise<{
    page?: string;
    size?: string;
    statuses?: string;
  }>;
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;
  const lang = (await params).lang;
  const intl = await getDictionary(lang);
  console.log(intl);
  const searchParams = await props.searchParams;
  const currentPage = searchParams?.page ? Number(searchParams.page) : 1;
  const size = searchParams?.size ? Number(searchParams.size) : 10;
  const statuses = searchParams?.statuses ? searchParams.statuses : null;
  return (
    <Orders
      page={currentPage}
      size={size}
      statuses={statuses}
      params={params}
    />
  );
}
