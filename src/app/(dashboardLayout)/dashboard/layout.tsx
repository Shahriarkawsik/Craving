import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


import DashNavbar from "./dashNavbar/page";
import NextAuthSessionProvider from "@/Providers/NextAuthSessionProvider";
import AppSidebar from "./page";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
  <NextAuthSessionProvider>
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="text-black cursor-pointer" />
      <div className="flex w-11/12 flex-col md:mx-8">
        <nav className="my-5">
          <DashNavbar />
        </nav>
        <main>{children}</main>
      </div>
    </SidebarProvider>
    </NextAuthSessionProvider>
  );
}
