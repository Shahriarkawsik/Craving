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
// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// // import SignInUser from "@/app/action/auth/signInUser";
// import GoogleProvider from "next-auth/providers/google";
// import dbConnect from "@/lib/dbConnect";

// // Define the shape of the credentials passed into `authorize`
// interface Credentials {
//   email: string;
//   password: string;
//   role:string;
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
//         name: { label: "Name", type: "text", placeholder: "Enter Name" },
//         role: { label: "Role", type: "text" },
//       },
//       async authorize(credentials: Credentials | undefined) {
//         if (!credentials) {
//           return null; // Return null if no credentials are provided
//         }

//         // Call the SignInUser function with the provided email
//         // const user = await SignInUser(credentials.email);
//         const user = await (
//           await dbConnect().then((db) => db.collection("users"))
//         ).findOne({ email: credentials.email });

//         console.log("===========================check", user);
//         const isPasswordCorrect = credentials.password == user?.password;

//         // If no error and we have user data, return it
//         if (isPasswordCorrect) {
//           return {
//             id: user.id,
//             email: user.email,
//             password: user.password,
//             role: user.role,
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
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//         token.role = user.role;
//         token.name = user.name;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       if (session.user) {
//         session.user.email = token.email;
//         session.user.role = token.role;
//         session.user.name = token.name;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/signin", // Custom sign-in page
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };



import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/dbConnect";

// NextAuth-এর ডিফল্ট টাইপ Extend করা হচ্ছে
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string | null;
  }
}

// Define NextAuth Options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // database theke user find
        const db = await dbConnect();
        const user = await db.collection("users").findOne({ email: credentials.email });

        if (!user || user.password !== credentials.password) {
          return null; 
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image || null, // Default fallback
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    //jwt te users all data save
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.image = user.image || null;
      }
      return token;
    },

    //session make hole token data set to session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },

  session: {
    strategy: "jwt", // jwt use kore session handle korbo
  },

  secret: process.env.NEXTAUTH_SECRET, // secret key set kora joruri
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
