import { House } from "lucide-react";
import Orders from "@/modules/orders/orders";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Metadata } from "next";
import { Suspense } from "react";
import OrdersSkeleton from "@/modules/orders/orders-skeleton";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/providers/TranslationsProvider";

export const metadata: Metadata = {
  title: "Orders",
  description: "Orders Management",
};

const i18nNamespaces = ["orders"];

export default async function OrdersPage(props: {
  searchParams?: Promise<{
    page?: string;
    size?: string;
    statuses?: string;
  }>;
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = (await params).locale;
  const searchParams = await props.searchParams;
  const currentPage = searchParams?.page ? Number(searchParams.page) : 1;
  const size = searchParams?.size ? Number(searchParams.size) : 10;
  const statuses = searchParams?.statuses ? searchParams.statuses : null;

  const { t, resources } = await initTranslations(locale, ["orders"]);

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={i18nNamespaces}
    >
      <Breadcrumb className="py-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <House size={16} />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/orders">{t("orders:header")}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="bg-white p-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">
          {t("orders:header")}
        </h1>
        <div className="bg-white overflow-hidden">
          <Suspense fallback={<OrdersSkeleton pageSize={size} />}>
            <Orders page={currentPage} size={size} statuses={statuses} />
          </Suspense>
        </div>
      </div>
    </TranslationsProvider>
  );
}
