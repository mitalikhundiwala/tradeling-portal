/* eslint-disable */

"use client";
import { FunctionComponent, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import UserService, { IUserPage } from "@/modules/users/services/user.service";
import { House } from "lucide-react";
import { useParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { FormattedDate } from "@/modules/common/components/date/formatted-date";
import { IUser } from "@/modules/users/models/user.model";
import { DataTable } from "@/modules/common/components/table/data-table";

export interface IProps {
  initialData: IUserPage | null;
}

export interface IQueryParams {
  page?: number;
  limit?: number;
}

const UserListPage: FunctionComponent<IProps> = ({ initialData }: IProps) => {
  const params: IQueryParams = useParams();
  const { page, limit } = params;

  const columns: ColumnDef<IUser>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
      },
      {
        accessorKey: "Email",
        header: "email",
      },
      {
        accessorKey: "createdDate",
        header: "Created At",
        cell: ({ row }) => {
          return <FormattedDate date={row.getValue("createdAt")} />;
        },
      },
    ],
    [],
  );

  const { isLoading, error, data, refetch, isFetching } = useQuery({
    queryKey: ["retrieveUserPage", page, limit],
    queryFn: () => {
      const params = {
        limit,
        page,
      };
      return UserService.retrieveUserList(params);
    },
    initialData,
  });

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <House size={16} />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Users</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="bg-white py-6">
        <DataTable columns={columns} data={data?.items ?? []} />
      </div>
    </div>
  );
};

export default UserListPage;
