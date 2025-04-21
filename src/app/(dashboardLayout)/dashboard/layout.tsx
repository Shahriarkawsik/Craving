import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


import DashNavbar from "./dashNavbar/page";
import NextAuthSessionProvider from "@/Providers/NextAuthSessionProvider";
import AppSidebar from "./page";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
  <NextAuthSessionProvider>
    <SidebarProvider className="">
      <AppSidebar />
      <SidebarTrigger className="text-amber-400 hover:text-amber-400 hover:bg-amber-100" />
      <div className="flex w-11/12 flex-col md:mx-5   gap-4">
        <nav>
          {" "}
          <DashNavbar />
        </nav>
        <main className="  ">{children}</main>
      </div>
    </SidebarProvider>
    </NextAuthSessionProvider>
  );
}
