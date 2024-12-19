import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser } from "@/modules/common/models/user";

async function authenticateUser(
  email: string,
  password: string,
): Promise<IUser | null> {
  if (email === "test@example.com" && password === "Password@123") {
    return {
      id: "1",
      uid: "1",
      email: "test@example.com",
      firstName: "John",
      lastName: "Doe",
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

        const user = await authenticateUser(
          credentials.username as string,
          credentials.password as string,
        );

        // const response = await fetch("https://qa.hykeapi.com//auth/v2/login", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     emailId: credentials.username,
        //     password: credentials.password,
        //   }),
        // });

        // if (!response.ok) return null;

        //const user = await response.json();

        if (!user) {
          return null;
        }

        return {
          id: user.uid,
          uid: user.uid,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          name: `${user.firstName} ${user.lastName}`,
          roles: user.roles,
          permissions: user.permissions,
          emailVerified: null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If a user is returned from authorize(), add its properties to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }

      return token;
    },
    async session({ session, token }) {
      // Add token properties to the session object
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          emailVerified: token.emailVerified as null,
        };
      }
      return session;
    },
  },
});
