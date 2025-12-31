import { getPending_payment, type Ticket } from "@/api/tickets";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AlertCircle, Clock } from "lucide-react";
import { Button } from "../ui/button";

type PaymentPendingOptionsProps = {
  setGetEventNormally: React.Dispatch<React.SetStateAction<boolean>>;
};

function PaymentPendingOptions({
  setGetEventNormally,
}: PaymentPendingOptionsProps) {
  const [open, setOpen] = useState(false);
  const [pendingTicket, setPendingTicket] = useState<Ticket | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const formatRemaining = (ms: number | null) => {
    if (ms === null) return "--";
    if (ms <= 0) return "Expirado";
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const parts: string[] = [];
    if (days) parts.push(`${days}d`);
    if (hours) parts.push(`${hours}h`);
    if (minutes) parts.push(`${minutes}m`);
    parts.push(`${seconds}s`);
    return parts.join(" ");
  };

  const cancelPendingTicket = async () => {
    try {
      //TODO: eliminar o poner en vencido pendingTicket
      setGetEventNormally(true);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error al cancelar ticket pendiente"
      );
    }
  };

  useEffect(() => {
    const getTicketPP = async () => {
      try {
        const response = await getPending_payment();
        if (response) {
          setOpen(true);
          setPendingTicket(response);
          //abrir modal dando opciones de seguir con pago (redirigir a response.payment_url) o cancelar y empezar d nuevo
        } else setGetEventNormally(true);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Error. Por favor reinicia la pagina"
        );
      }
    };
    getTicketPP();
  }, []);

  useEffect(() => {
    if (!pendingTicket?.paymentExpiresAt) {
      setTimeLeft(null);
      return;
    }

    const update = () => {
      const expiresAt = new Date(
        String(pendingTicket.paymentExpiresAt)
      ).getTime();
      const now = Date.now();
      const diff = expiresAt - now;
      setTimeLeft(diff > 0 ? diff : 0);
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [pendingTicket?.paymentExpiresAt]);

  useEffect(() =>{
    if (timeLeft == 0) setGetEventNormally(true)
  },[timeLeft])

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-100 p-5">
      <div className="flex flex-col gap-3 p-6 sm:p-8 bg-white rounded-2xl text-black">
        <div className="flex items-center gap-4">
          <div className="flex-none bg-amber-100 text-amber-700 rounded-full p-3">
            <AlertCircle />
          </div>
          <h3 className="flex-1 text-lg font-semibold">
            Tenés un ticket con pago pendiente
          </h3>
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
            <p className="text-sm text-slate-500">Evento</p>
            <p className="font-medium text-slate-800">
              {pendingTicket?.event.titulo}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
            <div>
              <p className="text-sm text-slate-500">Fecha seleccionada</p>
              <p className="font-medium text-slate-800">
                {(() => {
                  const fechaObj = pendingTicket?.event.fechas?.find(
                    (f) => f._id === pendingTicket?.eventDateId
                  )?.fecha;
                  if (!fechaObj) return "—";
                  try {
                    return new Date(String(fechaObj)).toLocaleString();
                  } catch {
                    return String(fechaObj);
                  }
                })()}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg flex items-end justify-between">
            <div>
              <p className="text-sm text-slate-500">Cantidad</p>
              <p className="font-medium text-slate-800">
                {pendingTicket?.quantity ?? "—"} entradas
              </p>
            </div>
            <div className="text-slate-500">
              Estado:{" "}
              <span className="font-medium text-amber-600">Pago pendiente</span>
            </div>
          </div>
        </div>

        <div className="flex itesm-start">
          <div className="flex items-center gap-2 bg-amber-50 text-amber-700 py-2 px-3 text-sm rounded-full font-medium">
            <Clock size={14}/>
            <span>{timeLeft == 0 ? "" : "Link vence en "} {formatRemaining(timeLeft)}</span>
          </div>
        </div>

        <div className="flex gap-3 ">
          <Button variant={"secondary"}>Continuar con el pago</Button>
          <Button onClick={cancelPendingTicket} variant={"outline"}>
            Cancelar y empezar de nuevo
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPendingOptions;
