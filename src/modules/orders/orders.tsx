import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { OrdersService } from "./services/orders.service";
import OrdersTable from "./orders-table";

interface IProps {
  page: number;
  size: number;
}

export default async function Orders({ page, size }: IProps) {
  const response = await OrdersService.retrieveOrders({
    page,
    limit: size,
  });

  const orders = response.orders;
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
        <OrdersTable
          page={page}
          size={size}
          orders={orders}
          total={response.total}
        />
      </div>
    </div>
  );
}
