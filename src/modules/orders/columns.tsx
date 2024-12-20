"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FormattedDate } from "../common/components/date/formatted-date";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
  orderNo: string;
  businessName: string;
  orderDate: Date;
  orderValue: number;
  orderStatus: string;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderNo",
    header: "Order No",
  },
  {
    accessorKey: "businessName",
    header: "Business Name",
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
  },
];
