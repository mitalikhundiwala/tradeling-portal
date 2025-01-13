"use client";

import { DataTable } from "@/modules/common/components/table/data-table";
import { columns } from "@/modules/orders/columns";
import { DataTablePagination } from "../common/components/table/data-table-pagination";
import { DataTableToolbar } from "../common/components/table/data-table-toolbar";
import { useMemo, useState } from "react";

import {
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";

interface IProps {
  pageSize: number;
}

export default function OrdersSkeleton(props: IProps) {
  const tableColumns = useMemo(
    () =>
      true
        ? columns.map((column) => ({
            ...column,
            cell: () => <Skeleton className="h-5 w-full bg-gray-300" />,
          }))
        : columns,
    []
  );

  const tableData = useMemo(() => Array(props.pageSize).fill({}), []);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="rounded-md mb-8">
        <DataTableToolbar table={table} />
      </div>
      <DataTable columns={columns} table={table} />
      <DataTablePagination table={table} />
    </>
  );
}
