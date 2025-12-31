import { getPending_payment } from "@/api/tickets";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type PaymentPendingOptionsProps = {
  setGetEventNormally: React.Dispatch<React.SetStateAction<boolean>>;
};

function PaymentPendingOptions({
  setGetEventNormally,
}: PaymentPendingOptionsProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getTicketPP = async () => {
      try {
        const response = await getPending_payment();
        if (response) {
          setOpen(true);
          console.log("ticket con pago pendiente: ", response);
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

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-100 p-5">
      <p>Payment pending</p>
    </div>
  );
}

export default PaymentPendingOptions;
