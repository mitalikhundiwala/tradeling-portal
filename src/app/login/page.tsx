import { GetServerSidePropsResult } from "next";
import Login from "@/modules/login";

export default function LoginPage({ user }: any) {
  return <Login />;
}
