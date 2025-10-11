import React from "react";
import { useNavigate } from "react-router-dom";
import LogoUser from "./LogoUser";
import { Button } from "./ui/button";

function Header() {
  const navigate = useNavigate();

  const goRegistrarEvento = () => {
    navigate("/registrar-evento");
  };

  return (
    <div className="bg-primary text-primary-foreground p-5 py-7 text-lg sm:text-2xl flex flex-col gap-5">
      <div className="flex justify-between">
        <p className="italic cursor-pointer" onClick={() => navigate("/")}>
          TicketingSystem
        </p>
        <div className="flex gap-5 items-center">
          <Button
            size={"sm"}
            onClick={goRegistrarEvento}
            variant={"ghost"}
            className="cursor-pointer"
          >
            Crear evento
          </Button>
          <LogoUser />
        </div>
      </div>
    </div>
  );
}

export default Header;
