"use client";

import { DataTable } from "@/modules/common/components/table/data-table";
import { columns } from "@/modules/orders/columns";
import { IOrdersPage } from "./models/order";
import { DataTablePagination } from "../common/components/table/data-table-pagination";
import { DataTableToolbar } from "../common/components/table/data-table-toolbar";
import { use, useEffect, useMemo, useRef, useState } from "react";

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
import { isEmpty, reduce } from "lodash";
import useUpdateSearchParams from "@/hooks/use-search-params";
import { useTranslation } from "react-i18next";

interface IProps {
  ordersReponse: Promise<IOrdersPage>;
  page: number;
  size: number;
  statuses: string[];
}

interface Result {
  [key: string]: string[]; // Allow dynamic keys of type string, with values being arrays of strings
}

interface IQueryParams {
  page?: number;
  size?: number;
  statuses?: string[];
}

export default function OrdersTable(props: IProps) {
  const { t } = useTranslation();

  const response = use(props.ordersReponse);

  const setSearchParams = useUpdateSearchParams();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: props.page ? props.page - 1 : 0,
    pageSize: props.size,
  });

  const prevPaginationRef = useRef({
    pageIndex: props.page - 1,
    pageSize: props.size,
  });

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() => {
    if (props.statuses.length) {
      return [
        {
          id: "orderStatus",
          value: props.statuses,
        },
      ];
    }
    return [];
  });

  const { data, isFetching } = useQuery({
    queryKey: [
      "retrieveOrders",
      pagination.pageSize,
      pagination.pageIndex,
      columnFilters,
    ],
    queryFn: () => {
      const filters: Result = reduce(
        columnFilters,
        (acc, item) => {
          acc[item.id] = item.value as string[];
          return acc;
        },
        {} as Result,
      );
      const statuses = filters?.["orderStatus"];
      return OrdersService.retrieveOrders({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        statuses: statuses ? statuses.join(",") : null,
      });
    },
    initialData: response,
    refetchOnMount: false,
  });

  useEffect(() => {
    const params: IQueryParams = {
      page: pagination.pageIndex + 1,
      size: pagination.pageSize,
    };

    if (pagination.pageSize !== prevPaginationRef.current.pageSize) {
      setPagination({
        ...pagination,
        pageIndex: 0,
      });
    }

    const filters: Result = reduce(
      columnFilters,
      (acc, item) => {
        acc[item.id] = item.value as string[];
        return acc;
      },
      {} as Result,
    );
    if (!isEmpty(filters)) {
      if (filters["orderStatus"]?.length) {
        params.statuses = filters["orderStatus"];
      }
    } else {
      params.statuses = undefined;
    }
    setSearchParams(params);
    prevPaginationRef.current = pagination;
  }, [pagination, columnFilters]);

  useEffect(() => {
    setPagination({
      ...pagination,
      pageIndex: 0,
    });
  }, [columnFilters]);

  const tableData = useMemo(
    () => (isFetching ? Array(pagination.pageSize).fill({}) : data.orders),
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
    rowCount: data.total,
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
