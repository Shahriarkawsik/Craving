import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./page";

import DashNavbar from "./dashNavbar/page";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="">
      <AppSidebar />
<<<<<<< HEAD
      <main className="px-5">
        <SidebarTrigger />
        {children}
      </main>
=======
      <SidebarTrigger />
      <div className="flex w-11/12 flex-col mx-5   gap-4">
        <nav>
          {" "}
          <DashNavbar />
        </nav>
        <main className="  ">{children}</main>
      </div>
>>>>>>> 896b7bb00efd14bc83d051d15691922b9439f71b
    </SidebarProvider>
  );
}
