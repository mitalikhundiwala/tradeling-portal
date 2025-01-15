/* eslint-disable */

"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CircleUserRound, LogOut } from "lucide-react";

import { Button } from "../../../../components/ui/button";

export default function DropdownMenuComponent() {
  const { data: session } = {} as any;

  function logoutHandler() {
    //logout();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center">
          {session?.user?.firstName} {session?.user?.lastName}
          <div className="pl-2">
            <CircleUserRound />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session?.user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center">
          <Button
            variant="ghost"
            className="text-red-500"
            onClick={logoutHandler}
          >
            <LogOut />
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
