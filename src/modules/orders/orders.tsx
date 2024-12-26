import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { OrdersService } from "./services/orders.service";
import { Suspense } from "react";
import OrdersTable from "./orders-table";

interface IProps {
  page: number;
  size: number;
  statuses: string | null;
}

export default function Orders({ page, size, statuses }: IProps) {
  const statusesArray = statuses ? statuses.split(",") : [];
  const ordersReponse = OrdersService.retrieveOrders({
    page,
    limit: size,
    statuses: statusesArray,
  });

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
        <Suspense fallback={<p>Loading Orders table..</p>}>
          <OrdersTable
            ordersReponse={ordersReponse}
            page={page}
            size={size}
            statuses={statusesArray}
          />
        </Suspense>
      </div>
    </div>
  );
}
