import { Outlet, useLocation, matchPath } from "react-router";
import Header from "./components/Header";
import { Toaster } from "sonner";

const bgByRoute: Record<string, string> = {
  "/tickets": "bg-gray-100",
  "/evento/:id/fecha/:numFecha/staff": "bg-gray-100",
};

function Layout() {
  const location = useLocation();

  const bgClass =
    Object.entries(bgByRoute).find(([path]) =>
      matchPath(path, location.pathname)
    )?.[1] ?? "";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 p-3 ${bgClass}`}>
        <Outlet />
      </main>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default Layout;
