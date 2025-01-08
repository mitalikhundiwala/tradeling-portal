import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ILoggedInUser, ISession, IToken } from "@/modules/common/models/user";
// import { AuthService } from "@/modules/login/services/auth.service";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  debug: true,
  cookies: {
    csrfToken: {
      name: "auth.token",
    },
    callbackUrl: {
      name: "auth.callback.url",
    },
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials): Promise<ILoggedInUser | null> {
        if (credentials === null) return null;
        try {
          // const response = await AuthService.authenticate({
          //   username: credentials.username as string,
          //   password: credentials.password as string,
          // });
          const response = {
            id: "233",
            email: "mitali@example.com",
            firstName: "Mitali",
            lastName: "Patel",
            accessToken: "234324jhb32k4k234knj",
            refreshToken: "234234234vcvcvdsfwdfdfsf",
            emailVerified: new Date(),
            roles: [],
            permissions: [],
          };

          return response;
        } catch (error) {
          throw new Error(JSON.stringify(error));
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }: { session: ISession; token: IToken }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token as any;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.roles = token.roles;
      session.permissions = token.permissions;
      return session;
    },
  },
});
