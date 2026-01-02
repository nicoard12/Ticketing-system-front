import { getEventById, type EventDate, type Event } from "@/api/events";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createTicket } from "@/api/tickets";
import PaymentPendingOptions from "@/components/ticket/PaymentPendingOptions";
import Spinner from "@/components/Spinner";

function BuyTicket() {
  const { id, numFecha } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState<EventDate | undefined>(
    undefined
  );
  const [cantidad, setCantidad] = useState(1);
  const [getEventNormally, setGetEventNormally] = useState<boolean>(false);
  const [buying, setBuying] = useState(false);
  const navigate = useNavigate();

  const comprar = async () => {
    try {
      setBuying(true);
      const response = await createTicket(id!, selectedDate!._id!, cantidad);
      window.open(response.url, "_blank", "noopener,noreferrer");
      navigate(`/ticket/${response.ticketId}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error al intentar comprar el ticket";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await getEventById(id!);
        setEvent(response);
        if (numFecha !== undefined) {
          setSelectedDate(response.fechas[parseInt(numFecha) - 1]);
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Error al cargar el evento. Intente nuevamente."
        );
      }
    };

    if (id && numFecha && getEventNormally) getEvent();
  }, [id, numFecha, getEventNormally]);

  if (!getEventNormally)
    return <PaymentPendingOptions setGetEventNormally={setGetEventNormally} />;

  if (!event) return null;
  return (
    <div className="bg-white border border-gray-300 rounded shadow p-6 w/full sm:w-1/2 flex flex-col gap-4 text-black">
      <h1 className="text-2xl font-semibold text-center">
        Comprando entradas para {event.titulo}
      </h1>
      <div>
        <p className="text-lg font-medium">Fecha del evento:</p>
        <p className="text-base uppercase">
          {selectedDate?.fecha &&
            new Date(selectedDate.fecha).toLocaleString("es-AR", {
              timeZone: "America/Argentina/Buenos_Aires",
              year: "numeric",
              month: "long",
              weekday: "long",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
        </p>
      </div>
      <div>
        <p className="text-lg font-medium">Entradas disponibles:</p>
        <p className="text-base">{selectedDate?.cantidadEntradas}</p>
      </div>
      <div>
        <p className="text-lg font-medium">Precio por entrada:</p>
        <p className="text-base">${event.precioEntrada}</p>
      </div>
      <div className="flex flex-col gap-2">
        <label className="block text-lg font-medium">
          Cantidad de entradas:
        </label>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
        >
          {Array.from(
            {
              length: Math.min(8, Number(selectedDate?.cantidadEntradas) || 0),
            },
            (_, i) => i + 1
          ).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-lg font-medium">Precio total:</p>
        <p className="font-medium text-2xl">
          ${cantidad * (Number(event.precioEntrada) || 0)}
        </p>
      </div>

      {buying ? (
        <Spinner />
      ) : (
        <Button onClick={comprar} className="w-full">
          Confirmar compra
        </Button>
      )}
    </div>
  );
}

export default BuyTicket;
