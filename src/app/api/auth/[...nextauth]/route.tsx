
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import SignInUser from "@/app/action/auth/signInUser";

// Define the shape of the credentials passed into `authorize`
interface Credentials {
  email: string;
  password: string;
}

// Define the `authOptions` with proper typing
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials | undefined) {
        if (!credentials) {
          return null; // Return null if no credentials are provided
        }

        // Call the SignInUser function with the provided email
        const user = await SignInUser(credentials.email);
        console.log(user)

        // If no error and we have user data, return it
        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name || "Anonymous",  // Fallback to "Anonymous" if no name is available
          };
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin", // Custom sign-in page
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
