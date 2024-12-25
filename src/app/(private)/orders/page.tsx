import Orders from "@/modules/orders/orders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
  description: "Orders Management",
};

export default async function OrdersPage() {
  return <Orders />;
}

export const dynamic = "force-dynamic";
