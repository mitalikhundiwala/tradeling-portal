/* eslint-disable */

"use client";
import { FunctionComponent, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/modules/common/components";
import { H1 } from "@/modules/common/components/Typograhphy";
import UserService, { IUserPage } from "@/modules/users/services/user.service";
import { House } from "lucide-react";
import { useParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "@/modules/users/models/user.model";
import { Pagination } from "@/modules/common/components/Pagination.component";
import { DataTable } from "@/modules/common/components/Table.component";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { CreateUserModal } from "./components/CreateUserModal.component";

export interface IProps {
  initialData: IUserPage | null;
}

export interface IQueryParams {
  page?: string;
  limit?: string;
}

const UserListPage: FunctionComponent<IProps> = ({ initialData }: IProps) => {
  const params: IQueryParams = useParams();
  const { page = "1", limit = "10" } = params;
  const [isOpen, setOpen] = useState(false);
  const columns: ColumnDef<IUser>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row: { original } }) => {
          return <div>{`${original.firstName} ${original.lastName}`}</div>;
        },
      },
      {
        accessorKey: "email",
        header: "Email",
      },
    ],
    [],
  );

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["retrieveUserPage", page, limit],
    queryFn: () => {
      const params = {
        limit,
        page,
      };

      return UserService.retrieveUserList(params);
    },
    initialData,
    staleTime: 100,
  });

  const _handleModalToggle = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const reactTableInstance = useReactTable({
    columns,
    data: data?.items ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Breadcrumb className="py-4">
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
      <div className="bg-white p-4">
        <div className="flex justify-between">
          <H1 className="font-bold text-lg">Users</H1>
          <div>
            <Button
              className="font-bold"
              onClick={() => {
                setOpen(true);
              }}
            >
              Create User
            </Button>
          </div>
        </div>
        {!isLoading && data?.items.length ? (
          <>
            <DataTable tableInstance={reactTableInstance} />
            <div className="pt-10">
              <Pagination
                currentPage={parseInt(page as string)}
                totalCount={data?.totalCount as number}
                onPageChange={() => {}}
                onPageSizeChange={() => {}}
                rowsPerPage={parseInt(limit)}
              />
            </div>
          </>
        ) : null}
        <CreateUserModal
          isOpen={isOpen}
          handleSubmit={() => {}}
          handleModalToggle={_handleModalToggle}
        />
      </div>
    </div>
  );
};

export default UserListPage;
