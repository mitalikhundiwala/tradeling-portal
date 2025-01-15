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
import { logout } from "@/app/actions";
import { useSession } from "next-auth/react";

export default function DropdownMenuComponent() {
  const { data: session } = useSession();

  function logoutHandler() {
    logout();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center">
          {session?.user?.firstName} {session?.user?.lastName}
          <div className="ltr:pl-2 rtl:pr-2">
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
