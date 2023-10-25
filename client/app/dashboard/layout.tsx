import Sidebar from "@/components/Dashboard/Layout/Sidebar";
import Topbar from "@/components/Dashboard/Layout/Topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-[calc(100%-50px)]">
        <Topbar />
        <main className="flex flex-col h-full container mx-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}