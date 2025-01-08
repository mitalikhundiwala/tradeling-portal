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
import RoleService, { IRolePage } from "@/modules/roles/services/roles.service";
import { House } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { IRole } from "@/modules/roles/models/role.model";
import { Pagination } from "@/modules/common/components/Pagination.component";
import { DataTable } from "@/modules/common/components/Table.component";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import {
  CreateRoleModal,
  newRoleSchemaTypes,
} from "./components/CreateRoleModal.component";
import { useToast } from "@/hooks/use-toast";
import { TableLoading } from "@/modules/common/components/loaders/TableLoader.component";
import { map } from "lodash";

export interface IProps {
  initialData: IRolePage | null;
  initialDataUpdatedAt: number;
}

export interface IQueryParams {
  page?: string;
  limit?: string;
}

const RoleListPage: FunctionComponent<IProps> = ({
  initialData,
  initialDataUpdatedAt,
}: IProps) => {
  const [page, setPage] = useState("1");
  const [pageSize, setPageSize] = useState("10");
  const [isOpen, setOpen] = useState(false);
  const { toast } = useToast();

  const { isLoading, error, data, refetch, isFetching } = useQuery({
    queryKey: ["retrieveRolePage", page, pageSize],
    queryFn: () => {
      const params = {
        limit: pageSize,
        page,
      };
      return RoleService.retrieveRolesList(params);
    },
    initialData,
    staleTime: 1000,
    initialDataUpdatedAt,
  });

  const { isLoading: isLoadingPermissions, data: permissions } = useQuery({
    queryKey: ["retrievePermissionsList"],
    queryFn: () => {
      return RoleService.retrievePermissionsList();
    },
  });

  const columns: ColumnDef<IRole>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row: { original } }) => {
          return <div>{`${original.name}`}</div>;
        },
      },
    ],
    []
  );

  const _handleModalToggle = useCallback((isOpen: boolean) => {
    setOpen(isOpen);
  }, []);

  const _handlePageSizeChange = (pageSize: string) => {
    setPageSize(pageSize);
  };

  const _handleNewRoleRequest = useCallback(
    async ({ name, permissions }: newRoleSchemaTypes) => {
      try {
        const payload = {
          roleName: name,
          permissionIds: permissions,
        };
        console.log("payload::", payload);
        await RoleService.createNewRole(payload);
        setOpen(false);
        refetch();
        toast({
          title: "Role Created Successfully!",
          description:
            "The role has been added to the system. You can now manage their details or assign roles.",
        });
      } catch (e) {
        console.log(e);
        const errorMessage =
          e instanceof Error ? e.message : "We Couldn't Complete Your Request";
        toast({
          variant: "destructive",
          title: errorMessage,
          description:
            "Role creation failed. Please try again shortly. If the issue persists, we're here to help",
        });
      }
    },
    []
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
          <BreadcrumbPage>Roles</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="bg-white p-4">
        <div className="flex justify-between">
          <H1 className="font-bold text-lg">
            {isLoading ? "Fetching Roles...." : "Roles"}
          </H1>
          <div>
            <Button
              className="font-bold"
              onClick={() => {
                setOpen(true);
              }}
            >
              Create Role
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
        {!isLoadingPermissions && permissions?.length ? (
          <CreateRoleModal
            isOpen={isOpen}
            permissions={permissions}
            handleNewRoleSubmit={_handleNewRoleRequest}
            handleModalToggle={_handleModalToggle}
          />
        ) : null}
      </div>
    </div>
  );
};

export default RoleListPage;
