import { Outlet } from "react-router";
import Header from "./components/Header";
import { Toaster } from "sonner";

function Layout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <main id="main-content" className="flex-1 flex flex-col overflow-y-auto">
        <Outlet />
      </main>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default Layout;
