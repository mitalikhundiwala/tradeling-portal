import Orders from "@/modules/orders/orders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
  description: "Orders Management",
};

export default async function OrdersPage(props: {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const size = Number(searchParams?.limit) || 10;
  return <Orders page={currentPage} size={size} />;
}

export const dynamic = "force-dynamic";
