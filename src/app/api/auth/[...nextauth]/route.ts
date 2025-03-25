import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions"; // Import from lib

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
