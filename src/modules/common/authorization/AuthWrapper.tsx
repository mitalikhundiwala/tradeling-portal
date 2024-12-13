"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthStatus } from "@/modules/common/authorization/models/auth.model";
import { IUser } from "@/modules/common/models/user";
import { AuthRepository } from "@/services/auth.repository";

export interface IAuthContext {
  status: AuthStatus;
  user: IUser | null;
  permissions: string[];
}

const AppContext = createContext<IAuthContext>({
  status: AuthStatus.UNKNOWN, // to check if authenticated or not
  user: null, // store all the user details
  permissions: [],
});

export function AuthWrapper({ children }: { children: any }) {
  const router = useRouter();

  const status = AuthStatus.UNAUTHENTICATED;
  const user = null;
  const permissions: string[] = [];

  const authContext: IAuthContext = {
    status,
    user,
    permissions,
  };

  useEffect(() => {
    const hasToken = AuthRepository.hasToken();
    if (!hasToken) {
      router.push("/login");
    }
  }, []);

  return (
    <AppContext.Provider value={authContext}>
      {status !== AuthStatus.UNKNOWN ? (
        children
      ) : (
        <div className="flex flex-col items-center">
          <div className="pt-4 w-[350px] flex justify-center">
            <Skeleton className="h-8 w-[300px]" />
          </div>
          <div className="space-y-2 w-[300px] flex justify-center">
            <div>Authenticating</div>
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
