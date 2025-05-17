import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import { getUserFromDb, User } from "@/utils/db";

/**
 * NextAuth.js configuration for handling authentication
 * This exports three main functions:
 * - handlers: API route handlers for authentication
 * - auth: Helper to get session in server components
 * - signIn: Function to trigger sign-in flow
 */
export const { handlers, auth, signIn } = NextAuth({
  // Authentication providers configuration
  providers: [
    // Credentials provider for email/password authentication
    Credentials({
      // Define the login form fields that will be displayed
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      /**
       * Authorize function is called when user attempts to sign in
       * It validates credentials and returns user data if successful
       */
      async authorize(credentials) {
        try {
          // Validate email and password format using Zod schema
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // Attempt to find user and verify password in database
          const user = await getUserFromDb(email, password);

          if (!user) {
            throw new Error("Invalid credentials");
          }

          // Remove sensitive password data before returning user
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: _pwd, ...userWithoutPassword } = user;
          return userWithoutPassword as User;
        } catch (error) {
          // Handle validation errors from Zod
          if (error instanceof ZodError) {
            throw new Error("Invalid input data");
          }
          throw error;
        }
      },
    }),
  ],

  // Custom pages for different authentication states
  pages: {
    signIn: "/auth/signin", // Custom sign-in page path
    error: "/auth/error", // Custom error page path
  },

  // Callbacks to customize the authentication behavior
  callbacks: {
    /**
     * JWT callback is called whenever a JWT is created or updated
     * We use it to add custom user data to the token
     */
    async jwt({ token, user }) {
      if (user) {
        // Add user ID and email to the token
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    /**
     * Session callback is called whenever a session is checked
     * We use it to add custom user data to the session
     */
    async session({ session, token }) {
      if (token) {
        // Add token data to the session user object
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});
