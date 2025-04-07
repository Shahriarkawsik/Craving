import authOptions from "@/lib/authoptions";
import NextAuth from "next-auth";

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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };