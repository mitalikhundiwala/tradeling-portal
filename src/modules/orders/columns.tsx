"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FormattedDate } from "../common/components/date/formatted-date";
import { IOrder } from "./models/order";

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "orderNo",
    header: () => <div className="rtl:text-right">Order No</div>,
  },
  {
    accessorKey: "businessName",
    header: () => <div className="rtl:text-right">Business Name</div>,
  },
  {
    accessorKey: "quantity",
    header: () => <div className="rtl:text-right">Quantity</div>,
  },
  {
    accessorKey: "orderDate",
    header: () => <div className="rtl:text-right">Order Date</div>,
    cell: ({ row }) => {
      return <FormattedDate date={row.getValue("orderDate")} />;
    },
  },
  {
    accessorKey: "orderValue",
    header: () => <div className="text-right rtl:text-left">Order Value</div>,
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
    header: () => <div className="rtl:text-right">Order Status</div>,
    meta: {
      filterKey: "orderStatus",
    },
  },
];
