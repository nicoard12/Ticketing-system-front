import { Outlet, useLocation } from "react-router";
import Header from "./components/Header";
import { Toaster } from "sonner";

const bgByRoute: Record<string, string> = {
  "/tickets": "bg-gray-100"
};

function Layout() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 p-3 ${bgByRoute[location.pathname] ?? ""}`}>
        <Outlet />
      </main>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default Layout;
