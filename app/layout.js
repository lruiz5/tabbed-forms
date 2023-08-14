import "./globals.css";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/sidebar-nav";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Maintenance & Safety Inspection",
  description: "Maintenance & Safety Inspection",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

const sidebarNavItems = [
  {
    title: "Maintenance & Safety",
    href: "/",
  },
  {
    title: "Second Form",
    href: "/secondary",
  },
  {
    title: "Third Form",
    href: "/tertiary",
  },
];

export default function SettingsLayout({ children }) {
  return (
    <html>
      <body className="p-10">
        <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
          <div className="hidden space-y-6 px-10 py-7 pb-12 md:block">
            <div className="space-y-0.5">
              <h2 className="text-2xl font-bold tracking-tight">
                Vehicle Maintenance & Safety Inspection
              </h2>
              <p className="text-muted-foreground">
                STATE OF CALIFORNIA DEPARTMENT OF CALIFORNIA HIGHWAY PATROL
              </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
              <aside className="-mx-4 lg:w-1/5">
                <SidebarNav items={sidebarNavItems} />
              </aside>
              <div className="flex-1 lg:max-w-2xl">{children}</div>
            </div>
          </div>{" "}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
