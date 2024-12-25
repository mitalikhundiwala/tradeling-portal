/* eslint-disable */

import { Metadata } from "next";
import UserList from "@/modules/users/page";

export const metadata: Metadata = {
  title: "Users",
  description: "User management",
};

interface UsersPageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
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
  const { page, limit } = await searchParams;
  const users = await fetchDataWithDelay();

  return (
    <div>
      <UserList initialData={null} />
    </div>
  );
}
