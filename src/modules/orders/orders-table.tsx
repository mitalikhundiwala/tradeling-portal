"use client";
import {
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import { DataTable } from "@/modules/common/components/table/data-table";
import { columns } from "@/modules/orders/columns";
import { IOrder } from "./models/order";
import { DataTablePagination } from "../common/components/table/data-table-pagination";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IProps {
  orders: IOrder[];
  page: number;
  size: number;
  total: number;
}

export default function OrdersTable({ orders, page, size, total }: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: size,
  });

  const table = useReactTable({
    data: orders,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    pageCount: total,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    if (pagination.pageIndex + 1 !== page) {
      const newQueryString = createQueryString(
        "page",
        (pagination.pageIndex + 1).toString(),
      );
      router.replace(`${pathname}?${newQueryString}`);
    }
  }, [pagination]); //

  return (
    <>
      <DataTable columns={columns} table={table} />
      <DataTablePagination table={table} />
    </>
  );
}
