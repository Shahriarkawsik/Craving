import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


import DashNavbar from "./dashNavbar/page";
import AppSidebar from "./page";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="">
      <AppSidebar />
      <SidebarTrigger />
      <div className="flex w-11/12 flex-col md:mx-5   gap-4">
        <nav>
          {" "}
          <DashNavbar />
        </nav>
        <main className="  ">{children}</main>
      </div>
    </SidebarProvider>
  );
}
