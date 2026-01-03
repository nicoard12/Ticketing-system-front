import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { io } from "socket.io-client";
import { getPending_payment, type Ticket } from "@/api/tickets";
import ModalVerificationCode from "@/components/ticket/ModalVerificationCode";
import ModalTicketConfirmation from "@/components/ticket/ModalTicketConfirmation";

const socket = io(import.meta.env.VITE_API_URL);

type SocketData = {
  status: string;
  ticket: Ticket;
};

function VerifyPayment() {
  const { id } = useParams();
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [openSocket, setOpenSocket] = useState(false);
  const [openTicketConfirmation, setOpenTicketConfirmation]= useState(false)
  const navigate = useNavigate();

  const closeVerificationCode = () => {
    setOpenTicketConfirmation(true)
  };

  useEffect(() => {
    if (!id && !openSocket) return;

    const ticketHandler = (data: SocketData) => {
      console.log(data);
      if (data.status === "PAID") {
        setTicket(data.ticket);
      } else {
        toast.error("El pago expiró, vuelve a comprar tus tickets.")
        setPaymentFailed(true);
        navigate("/")
      }
    };

    const connectErrorHandler = () => {
      toast.error("Error de conexión con el servidor.");
      setPaymentFailed(true);
    };

    socket.on(`ticket-${id}`, ticketHandler);
    socket.on("connect_error", connectErrorHandler);

    return () => {
      socket.off(`ticket-${id}`, ticketHandler);
      socket.off("connect_error", connectErrorHandler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, openSocket]);

  useEffect(() => {
    const getTicketPP = async () => {
      try {
        const response = await getPending_payment();
        if (response) {
          if (id !== response._id) navigate("/tickets");
          else setOpenSocket(true);
        } else navigate("/tickets");
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Error. Por favor reinicia la pagina"
        );
      }
    };
    if (!id) return;
    getTicketPP();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!openSocket) return null

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-8 bg-white rounded-xl shadow-lg text-center">
      {ticket ? (
        <>
          <h1 className="text-2xl font-bold text-gray-900">¡Pago exitoso!</h1>
          <ModalVerificationCode ticket={ticket} onClose={closeVerificationCode} />
          {openTicketConfirmation && <ModalTicketConfirmation onClose={() => navigate("/")} />}
        </>
      ) : paymentFailed ? (
        <h1 className="text-2xl font-bold text-gray-900">
          Hubo un error con el pago.
        </h1>
      ) : (
        <>
          <Spinner />
          <h1 className="text-2xl font-bold text-gray-900">
            Procesando tu pago 💳
          </h1>
          <p className="text-gray-600 max-w-sm">
            Estamos confirmando la operación. En segundos te mandamos al
            siguiente paso.
          </p>
        </>
      )}
    </div>
  );
}

export default VerifyPayment;
