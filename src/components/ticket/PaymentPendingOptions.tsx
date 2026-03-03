import {
  getPending_payment,
  removePendingTicket,
  type Ticket,
} from "@/api/tickets";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AlertCircle, Clock, Ticket as TicketIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

type PaymentPendingOptionsProps = {
  setGetEventNormally: React.Dispatch<React.SetStateAction<boolean>>;
};

function PaymentPendingOptions({
  setGetEventNormally,
}: PaymentPendingOptionsProps) {
  const [open, setOpen] = useState(false);
  const [pendingTicket, setPendingTicket] = useState<Ticket | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const navigate = useNavigate();

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
      await removePendingTicket(pendingTicket!._id);
      setGetEventNormally(true);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error al cancelar ticket pendiente"
      );
    }
  };

  const goToPay = () => {
    window.open(pendingTicket!.payment_url, "_blank", "noopener,noreferrer");
    navigate(`/ticket/${pendingTicket!._id}`);
  };

  useEffect(() => {
    const getTicketPP = async () => {
      try {
        const response = await getPending_payment();
        if (response) {
          setOpen(true);
          setPendingTicket(response);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(() => {
    if (timeLeft == 0) setGetEventNormally(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="flex flex-col gap-6 p-8 bg-white rounded-3xl text-slate-900 w-full max-w-lg border border-slate-200 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="flex bg-amber-50 text-amber-600 rounded-2xl p-4">
            <AlertCircle size={28} />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-extrabold tracking-tight">
              Pago Pendiente
            </h3>
            <p className="text-sm text-slate-500 font-medium">
              Ya tenés una reserva iniciada para este evento.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
                <TicketIcon size={18} className="text-primary" />
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Evento</p>
                <p className="font-bold text-slate-800 line-clamp-1">
                  {pendingTicket?.event.titulo}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Fecha</p>
                <p className="text-xs font-bold text-slate-800">
                  {(() => {
                    const fechaObj = pendingTicket?.event.fechas?.find(
                      (f) => f._id === pendingTicket?.eventDateId
                    )?.fecha;
                    if (!fechaObj) return "—";
                    try {
                      return new Date(String(fechaObj)).toLocaleDateString();
                    } catch {
                      return String(fechaObj);
                    }
                  })()}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cantidad</p>
                <p className="text-xs font-bold text-slate-800">
                  {pendingTicket?.quantity ?? "—"} Entradas
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 bg-amber-50 text-amber-700 py-2 px-4 rounded-full text-xs font-bold">
            <Clock size={14} />
            <span>
              {timeLeft == 0 ? "Expirado" : `Expira en ${formatRemaining(timeLeft)}`}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={goToPay}
            variant={"secondary"}
            className="h-14 rounded-2xl font-bold text-base shadow-lg shadow-secondary/10"
          >
            Continuar con el pago
          </Button>
          <Button
            onClick={cancelPendingTicket}
            variant={"ghost"}
            className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl text-xs font-bold"
          >
            Cancelar esta reserva y empezar de nuevo
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPendingOptions;
