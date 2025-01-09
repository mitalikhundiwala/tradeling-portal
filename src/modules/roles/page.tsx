"use client";
import { FunctionComponent, useMemo, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/modules/common/components";
import { H1 } from "@/modules/common/components/Typography";
import RolesService, {
  IRolePage,
} from "@/modules/roles/services/roles.service";
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ViewPermissions from "./components/view-permissions.component";

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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isOpen, setOpen] = useState(false);
  const { toast } = useToast();

  const { isLoading, error, data, refetch, isFetching } = useQuery({
    queryKey: ["retrieveRolePage", page, pageSize],
    queryFn: () => {
      const params = {
        limit: pageSize,
        page,
      };
      return RolesService.retrieveRolesList(params);
    },
    initialData,
    staleTime: 1000,
    initialDataUpdatedAt,
  });

  const { isLoading: isLoadingPermissions, data: permissions } = useQuery({
    queryKey: ["retrievePermissionsList"],
    queryFn: () => {
      return RolesService.retrievePermissionsList();
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
      {
        accessorKey: "permissions",
        header: "Permissions",
        cell: ({ row: { original } }) => {
          return (
            <HoverCard key={original.id}>
              <HoverCardTrigger>View</HoverCardTrigger>
              <HoverCardContent>
                <ViewPermissions roleId={original.id} />
              </HoverCardContent>
            </HoverCard>
          );
        },
      },
    ],
    []
  );

  const _handleModalToggle = useCallback((isOpen: boolean) => {
    setOpen(isOpen);
  }, []);

  const _handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };

  const _handleNewRoleRequest = useCallback(
    async ({ name, permissions }: newRoleSchemaTypes) => {
      try {
        const payload = {
          roleName: name,
          permissionIds: permissions,
        };
        await RolesService.createNewRole(payload);
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
    <>
      <div className="flex justify-between">
        <H1 className="font-bold text-lg">
          {isLoading ? "Fetching Roles...." : "Roles"}
        </H1>

        <Button
          className="font-bold"
          onClick={() => {
            setOpen(true);
          }}
        >
          Create Role
        </Button>
      </div>
      {isFetching ? <TableLoading /> : null}
      {!isFetching && data?.items.length ? (
        <>
          <DataTable tableInstance={reactTableInstance} />
          <div className="pt-10">
            <Pagination
              currentPage={page}
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
    </>
  );
};

export default RoleListPage;
