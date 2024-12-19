import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser } from "@/modules/common/models/user";

async function authenticateUser(
  email: string,
  password: string
): Promise<IUser | null> {
  if (email === "test@example.com" && password === "Password@123") {
    return {
      id: "1",
      uid: "1",
      email: "test@example.com",
      firstName: "John",
      lastName: "Doe",
      accessToken: "2342423424",
      roles: [{ id: 1, name: "a" }],
      permissions: ["user.permissions"],
      emailVerified: null,
    }; // Return the user object on successful authentication
  }
  return null; // Return null if authentication fails
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  debug: true,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials): Promise<IUser | null> {
        if (credentials === null) return null;

        // const user = await authenticateUser(
        //   credentials.username as string,
        //   credentials.password as string
        // );

        const response = await fetch(
          "https://hub-service-uxh1.onrender.com/hub-service/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.username,
              password: credentials.password,
            }),
          }
        );
        console.log("response::", response);

        if (!response.ok) return null;

        const user = await response.json();

        if (!user) {
          throw new Error("Unable to signin");
        }

        return {
          id: user.uid ?? "234234j",
          uid: user.uid,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          accessToken: user.accessToken,
          roles: user.roles,
          permissions: user.permissions,
          emailVerified: null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
});
