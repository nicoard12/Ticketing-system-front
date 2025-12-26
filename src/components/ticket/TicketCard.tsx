import { sendTicketCode, type Ticket } from "@/api/tickets";
import EventCard from "@/components/event/EventCard";
import { Ticket as TicketIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import ModalVerificationCode from "./ModalVerificationCode";
import { toast } from "sonner";
import ModalTransfer from "./ModalTransfer";
import TransferInfo from "./TransferInfo";

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
  const [openTransferModal, setOpenTransferModal] = useState(false);
  const [tab, setTab] = useState(currentTab);
  const totalPrice = ticket.price * ticket.quantity;
  const formattedDate = new Date(ticket.dateCreated).toLocaleDateString();

  const activarTicket = async () => {
    try {
      await sendTicketCode(ticket!._id);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error al activar el ticket";
      toast.error(errorMessage);
    }
    setOpenVerificationModal(true);
  };

  const closeVerification = () => {
    getTicketsAgain();
    toast.success("Ticket activado");
  };

  useEffect(() => {
    setTimeout(() => {
      setTab(currentTab);
    }, 100);
  }, [currentTab]);

  return (
    <div className="flex flex-col gap-2 bg-white border border-gray-200 rounded-lg shadow p-4 flex-shrink-0">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <TransferInfo ticket={ticket} />
          <div className="flex items-center gap-1">
            <TicketIcon className="w-8 h-8 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-800">Ticket</h3>
          </div>
        </div>

        {tab == "pendientes" && (
          <Button onClick={activarTicket} variant={"secondary"} size={"sm"}>
            Activar
          </Button>
        )}

        {tab == "activados" && !ticket.originalUserId && (
          <Button
            onClick={() => setOpenTransferModal(true)}
            size={"sm"}
            className="text-blue-800"
            variant={"link"}
          >
            Transferir
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-gray-600">
          <span className="font-medium">Cantidad:</span> {ticket.quantity}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Fecha del evento:</span> {new Date(ticket.event.fechas.find(f => f._id == ticket.eventDateId)!.fecha).toLocaleDateString()}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Fecha de compra:</span> {formattedDate}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Precio total:</span> ${totalPrice}
        </p>
      </div>
      {ticket.event ? (
        <div className="w-full flex items-center justify-center mt-2">
          <EventCard key={ticket._id} event={ticket.event} />
        </div>
      ) : (
        <p className="text-red-500 ">El evento fue eliminado</p>
      )}

      {openVerificationModal && (
        <ModalVerificationCode ticket={ticket} onClose={closeVerification} />
      )}

      {openTransferModal && (
        <ModalTransfer
          ticket={ticket}
          onClose={() => setOpenTransferModal(false)}
          getTicketsAgain={getTicketsAgain}
        />
      )}
    </div>
  );
}

export default TicketCard;
