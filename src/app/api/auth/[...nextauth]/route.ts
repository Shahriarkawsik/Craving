// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import SignInUser from "@/app/action/auth/signInUser";
// import GoogleProvider from "next-auth/providers/google";

// // Define the shape of the credentials passed into `authorize`
// interface Credentials {
//   email: string;
//   password: string;
// }
// // console.log(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
// // Ensure environment variables exist before proceeding
// if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
//   throw new Error(
//     "Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in environment variables"
//   );
// }
// // Define the `authOptions` with proper typing
// export const authOptions: NextAuthOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text", placeholder: "Enter Email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials: Credentials | undefined) {
//         if (!credentials) {
//           return null; // Return null if no credentials are provided
//         }

//         // Call the SignInUser function with the provided email
//         const user = await SignInUser(credentials.email);

//         // If no error and we have user data, return it
//         if (user) {
//           return {
//             id: user.id,
//             email: user.email,
//             name: user.name || "Anonymous", // Fallback to "Anonymous" if no name is available
//           };
//         }

//         // Return null if user data could not be retrieved
//         return null;
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   pages: {
//     signIn: "/signin", // Custom sign-in page
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

// =============================================================================

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions = {
providers: [
  CredentialsProvider({
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      Email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials, req) {
      console.log(req)
      console.log("credentials from auth", credentials)
      const user = {id: "1", name:"shahidul", email:"shahidul@gmail.com"}
      console.log(user)

      // If no error and we have user data, return it
      if (user) {
        return user;
      }
      // Return null if user data could not be retrieved
      return null;
    },
  }),
],
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
