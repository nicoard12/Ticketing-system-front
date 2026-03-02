import { sendTicketCode, type Ticket } from "@/api/tickets";
import EventCard from "@/components/event/EventCard";
import { Ticket as TicketIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import VerificationCodeModal from "./VerificationCodeModal";
import { toast } from "sonner";
import TransferModal from "./TransferModal";
import TransferInfo from "./TransferInfo";
import ConfirmationModal from "./ConfirmationModal";

function TicketCard({
  ticket,
  currentTab,
  getTicketsAgain,
}: {
  ticket: Ticket;
  currentTab: string;
  getTicketsAgain: () => void;
}) {
  const [openVerificationModal, setOpenVerificationModal] = useState(false);
  const [openTicketConfirmation, setOpenTicketConfirmation] = useState(false);
  const [openTransferModal, setOpenTransferModal] = useState(false);
  const [tab, setTab] = useState(currentTab);
  const totalPrice = ticket.price * ticket.quantity;
  const formattedDate = new Date(ticket.dateCreated).toLocaleDateString();

  const activarTicket = async () => {
    try {
      await sendTicketCode(ticket!._id);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al activar el ticket";
      toast.error(errorMessage);
    }
    setOpenVerificationModal(true);
  };

  const closeVerification = () => {
    setOpenVerificationModal(false)
    setOpenTicketConfirmation(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setTab(currentTab);
    }, 100);
  }, [currentTab]);

  return (
    <div className="flex flex-col gap-4 bg-white border border-gray-200 rounded-xl shadow-sm p-5 sm:max-w-md h-fit shrink-0 overflow-visible transition-all">
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-col flex-1 min-w-0">
          <TransferInfo ticket={ticket} />
          <div className="flex items-center gap-2 mt-1">
            <TicketIcon className="w-6 h-6 text-blue-600 shrink-0" />
            <h3 className="text-lg font-bold text-gray-900 break-words">Ticket</h3>
          </div>
        </div>

        <div className="shrink-0">
          {tab == "pendientes" && (
            <Button onClick={activarTicket} variant={"secondary"} size={"sm"} className="h-8">
              Activar
            </Button>
          )}

          {tab == "activados" && !ticket.originalUserId && (
            <Button
              onClick={() => setOpenTransferModal(true)}
              size={"sm"}
              className="text-blue-700 h-8 px-2"
              variant={"link"}
            >
              Transferir
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-1.5 text-sm">
        <div className="text-gray-600 flex justify-between gap-2 flex-wrap">
          <span className="font-medium text-gray-500">Cantidad:</span>
          <span className="text-gray-900">{ticket.quantity}</span>
        </div>
        <div className="text-gray-600 flex justify-between gap-2 flex-wrap">
          <span className="font-medium text-gray-500">Fecha evento:</span>
          <span className="text-gray-900 break-words text-right">
            {new Date(
              ticket.event.fechas.find((f) => f._id == ticket.eventDateId)!.fecha
            ).toLocaleDateString()}
          </span>
        </div>
        <div className="text-gray-600 flex justify-between gap-2 flex-wrap">
          <span className="font-medium text-gray-500">Compra:</span>
          <span className="text-gray-900">{formattedDate}</span>
        </div>
        <div className="text-gray-600 flex justify-between gap-2 pt-1 border-t border-gray-100 flex-wrap">
          <span className="font-medium text-gray-500">Precio total:</span>
          <span className="text-blue-600 font-bold">${totalPrice}</span>
        </div>
      </div>
      {ticket.event ? (
        <div className="w-full flex items-center justify-center mt-2">
          <EventCard key={ticket._id} event={ticket.event} />
        </div>
      ) : (
        <p className="text-red-500 ">El evento fue eliminado</p>
      )}

      {openVerificationModal && (
        <VerificationCodeModal ticket={ticket} onClose={closeVerification} />
      )}
      {openTicketConfirmation && <ConfirmationModal onClose={() => getTicketsAgain()} />}

      {openTransferModal && (
        <TransferModal
          ticket={ticket}
          onClose={() => setOpenTransferModal(false)}
          getTicketsAgain={getTicketsAgain}
        />
      )}
    </div>
  );
}

export default TicketCard;
