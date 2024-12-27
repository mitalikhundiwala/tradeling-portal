/* eslint-disable */

import { Metadata } from "next";
import UserList from "@/modules/users/page";
import UserService, { IUserPage } from "@/modules/users/services/user.service";

export const metadata: Metadata = {
  title: "Users",
  description: "User management",
};

interface UsersPageProps {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}

const fetchDataWithDelay = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
      ]);
    }, 5000); // 3-second delay
  });
};

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const { page = "1", limit = "10" } = await searchParams;
  await fetchDataWithDelay();
  const users = await UserService.retrieveUserList({ page, limit });
  return (
    <div>
      <UserList initialData={users} />
    </div>
  );
}
