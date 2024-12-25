import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DataTable } from "@/modules/common/components/table/data-table";
import { columns } from "@/modules/orders/columns";

export default async function Orders() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/orders`);

  const orders = await response.json();
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
