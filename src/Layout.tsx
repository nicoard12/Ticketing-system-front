import { Outlet } from "react-router";
import Header from "./components/Header";
import { Toaster } from "sonner"

function Layout() {

  return (
    <div className="text-foreground">
      <Header />
      <Outlet />

      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default Layout;
