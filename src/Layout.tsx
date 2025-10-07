import { Outlet } from "react-router";
import Header from "./components/Header";

function Layout() {

  return (
    <div className="bg-background text-foreground">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
