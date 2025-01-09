import { House } from "lucide-react";
import { getDictionary } from "@/app/actions/dictionary";
import Orders from "@/modules/orders/orders";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Locale } from "i18n.config";
import { Metadata } from "next";
import { Suspense } from "react";

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
  const searchParams = await props.searchParams;
  const currentPage = searchParams?.page ? Number(searchParams.page) : 1;
  const size = searchParams?.size ? Number(searchParams.size) : 10;
  const statuses = searchParams?.statuses ? searchParams.statuses : null;
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
            <Orders page={currentPage} size={size} statuses={statuses} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
