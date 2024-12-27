"use client";

import { Table } from "@tanstack/react-table";
import { CircleDashed, MailCheck, X } from "lucide-react";

import { DataTableViewOptions } from "./data-table-view-options";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Button } from "@/components/ui/button";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const statuses = [
    {
      value: "In Progress",
      label: "In Progress",
      icon: CircleDashed,
    },
    {
      value: "Delivered",
      label: "Delivered",
      icon: MailCheck,
    },
    {
      value: "Cancelled",
      label: "Cancelled",
      icon: X,
    },
  ];

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("orderStatus") && (
          <DataTableFacetedFilter
            column={table.getColumn("orderStatus")}
            title="Status"
            options={statuses}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
