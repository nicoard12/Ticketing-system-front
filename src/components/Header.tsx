import { useNavigate } from "react-router-dom";
import UserLogo from "./UserLogo";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { useUsuario } from "@/context/UserContext";

function Header() {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const { user } = useUsuario();

  const goRegistrarEvento = () => {
    navigate("/registrar-evento");
  };

  return (
    <div className=" text-primary-foreground p-5 py-7 text-lg sm:text-2xl flex flex-col gap-5">
      <div className="flex justify-between">
        <p
          id="home-logo"
          className="italic cursor-pointer"
          onClick={() => navigate("/")}
        >
          TicketingSystem
        </p>
        {isLoading ? null : (
          <div className="flex gap-5 items-center">
            {isAuthenticated ? (
              <>
                {user?.rol == "productor" && (
                  <Button
                    size={"sm"}
                    onClick={goRegistrarEvento}
                    variant={"ghost"}
                    className="cursor-pointer"
                  >
                    Crear evento
                  </Button>
                )}
                <UserLogo />
              </>
            ) : (
              <Button
                variant={"outline"}
                className="cursor-pointer"
                onClick={() => loginWithRedirect()}
              >
                Iniciar sesión
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
