"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FormattedDate } from "../common/components/date/formatted-date";
import { IOrder } from "./models/order";

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "orderNo",
    header: "Order No",
  },
  {
    accessorKey: "businessName",
    header: "Business Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => {
      return <FormattedDate date={row.getValue("orderDate")} />;
    },
  },
  {
    accessorKey: "orderValue",
    header: () => <div className="text-right">Order Value</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("orderValue"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "AED",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
    meta: {
      filterKey: "orderStatus",
    },
  },
];
