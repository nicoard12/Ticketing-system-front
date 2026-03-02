import { useNavigate } from "react-router-dom";
import UserLogo from "./UserLogo";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { useUsuario } from "@/context/userContext";

import logo from "@/public/logo.png";

function Header() {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const { user } = useUsuario();

  const goRegistrarEvento = () => {
    navigate("/registrar-evento");
  };

  return (
    <header className="bg-black/20 border-b border-white/10 text-primary-foreground p-4 sm:px-8 flex justify-between gap-5 items-center">
      <div
        id="home-logo"
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="TicketingSystem Logo" className="h-18 w-18" />
      </div>

      <div id="header-search-portal" className="flex-1 max-w-2xl mx-4 transition-all duration-300"></div>

      {isLoading ? null : (
        <div className="flex gap-5 items-center">
          {isAuthenticated ? (
            <>
              {user?.rol == "productor" && (
                <Button
                  size={"sm"}
                  onClick={goRegistrarEvento}
                  variant={"ghost"}
                >
                  Crear evento
                </Button>
              )}
              <UserLogo />
            </>
          ) : (
            <Button
              variant={"secondary"}
              className="bg-white text-black hover:bg-gray-200 transition-colors font-semibold"
              onClick={() => loginWithRedirect()}
            >
              Iniciar sesión
            </Button>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
