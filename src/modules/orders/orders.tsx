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
import { House } from "lucide-react";
import { getDictionary, Locale } from "@/app/actions/dictionary";

interface IProps {
  page: number;
  size: number;
  statuses: string | null;
  params: {
    lang: Locale;
  };
}

export default async function Orders({ page, size, statuses, params }: IProps) {
  const lang = params.lang;
  const intl = await getDictionary(lang);
  console.log(intl);
  const statusesArray = statuses ? statuses.split(",") : [];
  const ordersReponse = OrdersService.retrieveOrders({
    page,
    limit: size,
    statuses,
  });

  return (
    <>
      <Breadcrumb className="py-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <House size={16} />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/orders">{intl.ordersTitle}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="bg-white p-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">
          {intl.ordersTitle}
        </h1>
        <div className="bg-white overflow-hidden">
          <Suspense fallback={<p>{intl.ordersLoading}</p>}>
            <OrdersTable
              ordersReponse={ordersReponse}
              page={page}
              size={size}
              statuses={statusesArray}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}
