import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Metadata } from "next";
import RolesList from "@/modules/roles/page";
import RolesService from "@/modules/roles/services/roles.service";
import { House } from "lucide-react";

export const metadata: Metadata = {
  title: "Roles",
  description: "Roles management",
};

interface RolesPageProps {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}

const fetchDataWithDelay = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
      ]);
    }, 2000); // 3-second delay
  });
};

export default async function RolesPage({ searchParams }: RolesPageProps) {
  const { page = 1, limit = 10 } = await searchParams;
  await fetchDataWithDelay();
  const roles = await RolesService.retrieveRolesList({
    page: Number(page),
    limit: Number(limit),
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
          <BreadcrumbPage>Roles</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="bg-white p-4">
        <RolesList initialData={roles} initialDataUpdatedAt={Date.now()} />
      </div>
    </>
  );
}
