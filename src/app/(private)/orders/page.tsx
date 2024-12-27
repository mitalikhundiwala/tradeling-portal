import Orders from "@/modules/orders/orders";
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
}) {
  const searchParams = await props.searchParams;
  const currentPage = searchParams?.page ? Number(searchParams.page) : 1;
  const size = searchParams?.size ? Number(searchParams.size) : 10;
  const statuses = searchParams?.statuses ? searchParams.statuses : null;
  return <Orders page={currentPage} size={size} statuses={statuses} />;
}
