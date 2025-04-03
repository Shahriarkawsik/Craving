
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


// =======================================
// "use-client"
// import { ReactNode } from "react";
// import { SessionProvider } from "next-auth/react";

// interface NextAuthSessionProviderProps {
//   children: ReactNode;
// }

// export default function NextAuthSessionProvider({ children }: NextAuthSessionProviderProps) {
//   return <SessionProvider>{children}</SessionProvider>;
// }
