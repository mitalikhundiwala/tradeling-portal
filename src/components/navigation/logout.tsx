"use client";

import { logout } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function logoutComponent() {
  function logoutHandler() {
    logout();
  }
  return (
    <Button variant="ghost" className="text-red-500" onClick={logoutHandler}>
      <LogOut />
      Logout
    </Button>
  );
}
