// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import dbConnect from "@/lib/dbConnect";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       name: string;
//       email: string;
//       role: string;
//       image?: string | null;
//     };
//   }

//   interface User {
//     id: string;
//     name: string;
//     email: string;
//     role: string;
//     image?: string | null;
//   }
// }

// // Define NextAuth Options
// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text", placeholder: "Enter Email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials) return null;

//         // database theke user find
//         const db = await dbConnect();
//         const user = await db
//           .collection("users")
//           .findOne({ email: credentials.email });

//         if (!user || user.password !== credentials.password) {
//           return null;
//         }

//         return {
//           id: user._id.toString(),
//           name: user.name,
//           email: user.email,
//           role: user.role,
//           image: user.image || null,
//         };
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],

//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       if (account) {
//         try {
//           // console.log("from signIn callback",  {user, account, profile, email, credentials })
//           const { providerAccountId, provider } = account;
//           const { email: email, name, image} = user;
//           const payload = {
//             providerAccountId,
//             provider,
//             email,
//             name,
//             image,
//             role: "User",
//           };
//           console.log("from signIn callback", payload);
//           const isUserExist = await dbConnect().then((db)=> db.collection("users").findOne({providerAccountId}))
//           if(!isUserExist){
//             (await dbConnect().then((db)=> db.collection("users"))).insertOne(payload)
//           }
//         } catch (error) {
//           console.log(error)
//           return false
//         }
//       }
//       return true;
//     },
//     //jwt te users all data save
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.email = user.email;
//         token.role = user.role;
//         token.image = user.image || null;
//       }
//       return token;
//     },

//     //session make hole token data set to session
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.name = token.name as string;
//         session.user.email = token.email as string;
//         session.user.role = token.role as string;
//         session.user.image = token.image as string;
//       }
//       return session;
//     },
//   },

//   pages: {
//     signIn: "/signin",
//   },

//   session: {
//     strategy: "jwt", // jwt use kore session handle korbo
//   },

//   secret: process.env.NEXTAUTH_SECRET, // secret key set kora joruri
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

// ==========================================================




import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/dbConnect";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      image?: string | null;
      phone?: number;
      status?: string;
      address?: string;
      created_at?: Date;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string | null;
    phone?: number;
    status?: string;
    address?: string;
    created_at?: Date;
  }
}

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
          image: user.image || null,
          phone: user.phone || null,
          status: user.status || "Active",
          address: user.address || "Not Provided",
          created_at: user.created_at || new Date(),
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const db = await dbConnect();
          const existingUser = await db.collection("users").findOne({ email: user.email });

          if (!existingUser) {
            const newUser = {
              email: user.email,
              name: user.name,
              image: user.image || null,
              role: "User",
              phone: null,
              status: "Active",
              address: "Not Provided",
              created_at: new Date(),
            };
            await db.collection("users").insertOne(newUser);
          }
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.image = user.image || null;
        token.phone = user.phone || null;
        token.status = user.status || "Active";
        token.address = user.address || "Not Provided";
        token.created_at = user.created_at || new Date();
      } else {
        const db = await dbConnect();
        const dbUser = await db.collection("users").findOne({ email: token.email });

        if (dbUser) {
          token.id = dbUser._id.toString();
          token.phone = dbUser.phone || null;
          token.status = dbUser.status || "Active";
          token.address = dbUser.address || "Not Provided";
          token.created_at = dbUser.created_at || new Date();
        }
      }

      console.log("🔹 Updated JWT Token:", token);
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        role: token.role as string,
        image: token.image as string,
        phone: token.phone as number || null,
        status: token.status as string || "Active",
        address: token.address as string || "Not Provided",
        created_at: token.created_at as Date || new Date(),
      };

      console.log("🔹 Updated Session Data:", session);
      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };



