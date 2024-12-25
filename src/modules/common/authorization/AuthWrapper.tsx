"use client";

import React, { createContext, useContext, useEffect } from "react";
import { AuthStatus } from "@/modules/common/authorization/models/auth.model";
import { ILoggedInUser } from "@/modules/common/models/user";
import { useSession } from "next-auth/react";
import { AuthRepository } from "@/lib/auth.repository";

export interface IAuthContext {
  status: AuthStatus;
  user: ILoggedInUser | null;
  permissions: string[];
}

const AppContext = createContext<IAuthContext>({
  status: AuthStatus.UNKNOWN, // to check if authenticated or not
  user: null, // store all the user details
  permissions: [],
});

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const status = AuthStatus.UNAUTHENTICATED;
  const user = null;
  const permissions: string[] = [];

  const authContext: IAuthContext = {
    status,
    user,
    permissions,
  };

  useEffect(() => {
    if (session === null) {
      AuthRepository.deleteAllCookies();
    }
  }, []);

  return (
    <AppContext.Provider value={authContext}>
      {children}
      {/* {status !== AuthStatus.UNKNOWN ? (
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
      )} */}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
