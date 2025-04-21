
"use client"
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
interface Props {
    children:ReactNode;
}
const NextAuthSessionProvider: React.FC<Props> = ({children}) => {
    return <SessionProvider>{children}</SessionProvider>
};

export default NextAuthSessionProvider;