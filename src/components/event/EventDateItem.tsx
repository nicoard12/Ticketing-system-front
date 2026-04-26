import type { EventDate } from "@/api/events";
import { Button } from "../ui/button";
import { useUsuario } from "@/context/userContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { isPast } from "date-fns";
import { useEffect, useState } from "react";
import { CalendarClock, TicketCheck, ArrowRight } from "lucide-react";

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
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full p-4 sm:p-5 gap-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-lg duration-300">

      {/* Información de Fecha */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white/10 rounded-xl shadow-sm border border-white/5 text-white hidden sm:flex">
          <CalendarClock size={24} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-white uppercase tracking-wider mb-1">
            Fecha {index + 1}
          </span>
          <p className="font-bold text-white text-base sm:text-lg capitalize">
            {new Date(date.fecha).toLocaleString("es-AR", {
              timeZone: "America/Argentina/Buenos_Aires",
              year: "numeric",
              month: "short",
              weekday: "long",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      {/* Estado y Acciones */}
      <div className="flex flex-col  lg:flex-row items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-white/10">

        {dateExpired ? (
          <span className="px-4 py-1.5 bg-red-100 text-red-700 font-bold text-sm rounded-full w-full sm:w-auto text-center">
            Finalizada
          </span>
        ) : (
          <>
            {Number(date.cantidadEntradas) > 0 ? (
              <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full whitespace-nowrap">
                <TicketCheck size={16} /> Quedan {date.cantidadEntradas}
              </span>
            ) : (
              <span className="px-4 py-1.5 bg-red-100 text-red-700 font-bold text-sm rounded-full whitespace-nowrap">
                Agotadas
              </span>
            )}

            <div className="flex gap-2">
              {(!user || user.rol == "normal") && Number(date.cantidadEntradas) > 0 && (
                <Button
                  onClick={buyTicket}
                  className="rounded-xl shadow-lg shadow-primary/20 font-bold px-8 py-6 flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition-all duration-300 group overflow-hidden relative"
                >
                  <span className="relative z-10">Comprar Ticket</span>
                  <ArrowRight size={18} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              )}

              {user?.rol == "staff" && (
                <Button onClick={goStaffPage} variant="secondary" className="rounded-xl font-bold px-6 border-white/10 hover:bg-white/10">
                  Comenzar
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EventDateItem;
