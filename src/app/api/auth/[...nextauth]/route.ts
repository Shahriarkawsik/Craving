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
      phone?:number;
      status?:string;
      address?:string;
      created_at?:Date;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string | null;
    phone?:number;
    status?:string;
    address?:string;
    created_at?:Date;
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
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user || user.password !== credentials.password) {
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "User",
          image: user.image || null,
          phone: user.phone || 0,
          status: user.status || "Active",
          address: user.address || "Not Provided",
          created_at:user.created_at || new Date(),
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
          // console.log("from signIn callback",  {user, account, profile, credentials })
          const { providerAccountId, provider } = account;
          const { email: email, name, image} = user;
          const payload = {
            providerAccountId,
            provider,
            email,
            name,
            image,
            role: "User",
            phone: 0,
            status: "Active",
            address: "Not Provided",
            created_at: new Date(),
          };
          console.log("from signIn callback", payload);
          const isUserExist = await dbConnect().then((db)=> db.collection("users").findOne({providerAccountId}))
          if(!isUserExist){
            (await dbConnect().then((db)=> db.collection("users"))).insertOne(payload)
          }
        } catch (error) {
          console.log(error)
          return false
        }
      }
      return true;
    },
    //jwt te users all data save
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role || "User";
        token.image = user.image || null;
        token.phone = user.phone || 0;
        token.status = user.status || "Active";
        token.address = user.address || "Not Provided";
        token.created_at = user.created_at || new Date();
      }
      else{
        const updatedUser = await dbConnect().then((db) => db.collection("users").findOne({email:token.email}))
        if(updatedUser){
          token.role = updatedUser.role || "User";
          token.image = updatedUser.image || null;
          token.phone = updatedUser.phone || 0;
          token.status = updatedUser.status || "Active";
          token.address = updatedUser.address || "Not Provided";
          token.created_at = updatedUser.created_at || new Date();
        }
      }
      return token;
    },

    //session make hole token data set to session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string || "User";
        session.user.image = token.image as string;
        session.user.phone = token.phone as number || 0;
        session.user.status = token.status as  string || "Active";
        session.user.address = token.address as string || "Not Provided";
        session.user.created_at = token.created_at as Date || new Date();
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

