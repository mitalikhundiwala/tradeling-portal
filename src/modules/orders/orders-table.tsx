"use client";

import { DataTable } from "@/modules/common/components/table/data-table";
import { columns } from "@/modules/orders/columns";
import { IOrdersPage } from "./models/order";
import { DataTablePagination } from "../common/components/table/data-table-pagination";
import { DataTableToolbar } from "../common/components/table/data-table-toolbar";
import { use, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { OrdersService } from "./services/orders.service";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import { reduce } from "lodash";

interface IProps {
  ordersReponse: Promise<IOrdersPage>;
  page: number;
  size: number;
  statuses: string[];
}

interface Result {
  [key: string]: string[]; // Allow dynamic keys of type string, with values being arrays of strings
}

export default function OrdersTable(props: IProps) {
  const response = use(props.ordersReponse);

  const [page, setPage] = useState(props.page);
  const [size, setSize] = useState(props.size);
  const [statuses, setStatuses] = useState(props.statuses);

  const searchParams = useSearchParams();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: size,
  });

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    {
      id: "orderStatus",
      value: statuses,
    },
  ]);

  const { data, isFetching } = useQuery({
    queryKey: ["retrieveOrders", page, size, statuses],
    queryFn: () => {
      return OrdersService.retrieveOrders({
        page: page,
        limit: size,
        statuses,
      });
    },
    initialData: response,
    refetchOnMount: false,
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (pagination.pageSize !== size) {
      params.set("page", "1");
      params.set("size", pagination.pageSize.toString());
      setPage(1);
      setSize(pagination.pageSize);
    } else {
      if (pagination.pageIndex + 1 !== page) {
        params.set("page", (pagination.pageIndex + 1).toString());
        setPage(pagination.pageIndex + 1);
      }
    }

    window.history.pushState(null, "", `?${params.toString()}`);
  }, [pagination]);

  useEffect(() => {
    const filters: Result = reduce(
      columnFilters,
      (acc, item) => {
        acc[item.id] = item.value as string[];
        return acc;
      },
      {} as Result,
    );
    if (filters["orderStatus"].length) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("statuses", filters["orderStatus"].toString());
      setStatuses(filters["orderStatus"]);
      console.log("statuses:::", statuses);
      window.history.pushState(null, "", `?${params.toString()}`);
    }
  }, [columnFilters]);

  const tableData = useMemo(
    () => (isFetching ? Array(size).fill({}) : data.orders),
    [isFetching, data],
  );

  const tableColumns = useMemo(
    () =>
      isFetching
        ? columns.map((column) => ({
            ...column,
            cell: () => <Skeleton className="h-5 w-full bg-gray-300" />,
          }))
        : columns,
    [isFetching],
  );

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    state: {
      pagination,
      columnVisibility,
      columnFilters,
    },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    pageCount: data.total,
    manualPagination: true,
    manualFiltering: true,
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
