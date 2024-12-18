import { Metadata } from "next";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/modules/orders/columns";

export const metadata: Metadata = {
  title: "Orders",
  description: "Orders Management",
};

export default async function OrdersPage() {
  const response = await fetch("http://localhost:3000/api/orders");

  const orders = await response.json();
  console.log('orders::', orders);

  return (
    <div className="container mx-auto px-6">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Orders</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Orders</h1>
      <div className="bg-white overflow-hidden">
        <DataTable columns={columns} data={orders.data} />
      </div>
    </div>
  );
}
