import type { EventDate } from "@/api/events";
import { Button } from "../ui/button";
import { useUsuario } from "@/context/UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { isPast } from "date-fns";
import { useEffect, useState } from "react";

type EventDateItemProps = {
  date: EventDate;
  eventId: string;
  index: number;
};

function EventDateItem({ date, eventId, index }: EventDateItemProps) {
  const { user } = useUsuario();
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const [dateExpired, setDateExpired] = useState(isPast(new Date(date.fecha)));

  const buyTicket = () => {
    if (!user) loginWithRedirect();
    else navigate(`/evento/${eventId}/fecha/${index + 1}`);
  };

  const goStaffPage = () => {
    navigate(`/evento/${eventId}/fecha/${index + 1}/staff`);
  };

  useEffect(() => {
    setDateExpired(isPast(new Date(date.fecha)));
  }, [date]);

  return (
    <div className="flex items-center justify-between w-full border border-2 rounded p-2">
      <p className=" font-semibold uppercase">
        {new Date(date.fecha).toLocaleString("es-AR", {
          timeZone: "America/Argentina/Buenos_Aires",
          year: "numeric",
          month: "long",
          weekday: "long",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      {dateExpired ? (
        <span className="text-red-800 font-bold">Finalizada</span>
      ) : (
        <div className="flex flex-col sm:flex-row gap-3 items-center ">
          {Number(date.cantidadEntradas) > 0 ? (
            <span className="text-sm font-thin">
              Quedan {date.cantidadEntradas} entradas
            </span>
          ) : (
            <span className="text-sm font-thin text-red-600">Agotadas</span>
          )}

          {(!user || user.rol == "normal") &&
            Number(date.cantidadEntradas) > 0 && (
              <Button onClick={buyTicket}>Comprar</Button>
            )}

          {user?.rol == "staff" && (
            <Button onClick={goStaffPage}>Comenzar</Button>
          )}
        </div>
      )}
    </div>
  );
}

export default EventDateItem;
