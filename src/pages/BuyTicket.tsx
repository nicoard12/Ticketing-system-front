import { getEventById, type EventDate, type Event } from "@/api/events";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createTicket } from "@/api/tickets";
import PaymentPendingOptions from "@/components/ticket/PaymentPendingOptions";
import Spinner from "@/components/Spinner";
import { Calendar, Users, DollarSign, ArrowLeft, Info, MapPin } from "lucide-react";

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
    } finally {
      setBuying(false);
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
    <div className="flex-1 flex flex-col items-center p-4 sm:p-6 w-full bg-slate-950/5">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 overflow-hidden mb-12 shadow-sm">
        {/* Header con botón atrás */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Volver"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">Finalizar Compra</h1>
        </div>

        <div className="p-5 sm:p-8 flex flex-col gap-6 sm:gap-8">
          {/* Info del Evento */}
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
              {event.titulo}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <Calendar size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">Fecha</p>
                  <p className="text-sm font-medium capitalize">
                    {selectedDate?.fecha &&
                      new Date(selectedDate.fecha).toLocaleString("es-AR", {
                        timeZone: "America/Argentina/Buenos_Aires",
                        month: "short",
                        weekday: "long",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">Lugar</p>
                  <p className="text-sm font-medium">{event.ubicacion || "Ubicación del evento"}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Selección de Cantidad */}
          <section className="p-6 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-slate-500" />
                <label className="text-sm font-bold text-slate-700">Cantidad de entradas</label>
              </div>
              <span className="text-xs font-medium text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
                {selectedDate?.cantidadEntradas} disponibles
              </span>
            </div>

            <div className="flex items-center gap-4">
              <select
                className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-3 text-lg font-semibold text-slate-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer"
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
                    {num} {num === 1 ? "Entrada" : "Entradas"}
                  </option>
                ))}
              </select>

              <div className="text-right">
                <p className="text-xs font-semibold text-slate-400 uppercase">Precio Unitario</p>
                <p className="text-lg font-bold text-slate-900">${event.precioEntrada}</p>
              </div>
            </div>
          </section>

          {/* Checkout Footer */}
          <section className="flex flex-col gap-6 pt-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between border-t border-gray-100 pt-2 gap-2">
              <div>
                <p className="text-sm font-medium text-slate-500">Monto Total</p>
                <div className="flex items-center gap-1 text-primary">
                  <DollarSign size={24} strokeWidth={3} />
                  <span className="text-3xl font-extrabold tracking-tight">
                    {cantidad * (Number(event.precioEntrada) || 0)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-slate-400">
                <Info size={14} className="mt-0.5 shrink-0" />
                <p className="text-[10px] leading-tight font-medium text-left">
                  Serás redirigido a Mercado Pago para completar el pago de forma segura.
                </p>
              </div>
            </div>

            {buying ? (
              <div className="h-[56px] flex items-center justify-center">
                <Spinner size="md" />
              </div>
            ) : (
              <Button
                onClick={comprar}
                className="w-full h-14 text-lg font-bold rounded-xl active:scale-[0.98] transition-all"
              >
                Confirmar y Pagar
              </Button>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default BuyTicket;
