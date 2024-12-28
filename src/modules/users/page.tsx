/* eslint-disable */

"use client";
import { FunctionComponent, useMemo, useState, useCallback } from "react";
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
import { H1 } from "@/modules/common/components/Typography";
import UserService, { IUserPage } from "@/modules/users/services/user.service";
import { House } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "@/modules/users/models/user.model";
import { Pagination } from "@/modules/common/components/Pagination.component";
import { DataTable } from "@/modules/common/components/Table.component";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import {
  CreateUserModal,
  newUserSchemaTypes,
} from "./components/CreateUserModal.component";
import { useToast } from "@/hooks/use-toast";
import { TableLoading } from "@/modules/common/components/loaders/TableLoader.component";

export interface IProps {
  initialData: IUserPage | null;
  initialDataUpdatedAt: number;
}

export interface IQueryParams {
  page?: string;
  limit?: string;
}

const UserListPage: FunctionComponent<IProps> = ({
  initialData,
  initialDataUpdatedAt,
}: IProps) => {
  const [page, setPage] = useState("1");
  const [pageSize, setPageSize] = useState("10");
  const [isOpen, setOpen] = useState(false);
  const { toast } = useToast();

  const { isLoading, error, data, refetch, isFetching } = useQuery({
    queryKey: ["retrieveUserPage", page, pageSize],
    queryFn: () => {
      const params = {
        limit: pageSize,
        page,
      };
      return UserService.retrieveUserList(params);
    },
    initialData,
    staleTime: 1000,
    initialDataUpdatedAt,
  });

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

  const _handleModalToggle = useCallback((isOpen: boolean) => {
    setOpen(isOpen);
  }, []);

  const _handlePageSizeChange = (pageSize: string) => {
    setPageSize(pageSize);
  };

  const _handleNewUserRequest = useCallback(
    async ({ firstName, lastName, email, password }: newUserSchemaTypes) => {
      try {
        const payload = {
          firstName,
          lastName,
          email,
          password,
          roleIds: [1],
        };
        await UserService.createNewUser(payload);
        setOpen(false);
        refetch();
        toast({
          title: "User Created Successfully!",
          description:
            "The user has been added to the system. You can now manage their details or assign roles.",
        });
      } catch (e) {
        const errorMessage =
          e instanceof Error ? e.message : "We Couldn't Complete Your Request";
        toast({
          variant: "destructive",
          title: errorMessage,
          description:
            "User creation failed. Please try again shortly. If the issue persists, we're here to help",
        });
      }
    },
    [],
  );

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
          <H1 className="font-bold text-lg">
            {isLoading ? "Fetching Users...." : "Users"}
          </H1>
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
        {isFetching ? (
          <div>
            <TableLoading />
          </div>
        ) : null}
        {!isFetching && data?.items.length ? (
          <>
            <DataTable tableInstance={reactTableInstance} />
            <div className="pt-10">
              <Pagination
                currentPage={parseInt(page as string)}
                totalCount={data?.totalCount as number}
                onPageChange={() => {}}
                onPageSizeChange={_handlePageSizeChange}
                pageSize={pageSize}
              />
            </div>
          </>
        ) : null}
        <CreateUserModal
          isOpen={isOpen}
          handleNewUserSubmit={_handleNewUserRequest}
          handleModalToggle={_handleModalToggle}
        />
      </div>
    </div>
  );
};

export default UserListPage;
