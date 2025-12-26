import type { Ticket } from "@/api/tickets";
import EventCard from "@/components/event/EventCard";
import { Ticket as TicketIcon } from "lucide-react";

function TicketCard({ ticket }: { ticket: Ticket }) {
  const totalPrice = ticket.price * ticket.quantity;
  const formattedDate = new Date(ticket.dateCreated).toLocaleDateString();

  return (
    <div className="flex flex-col gap-2 bg-white items-center border border-gray-200 rounded-lg shadow-md p-4 flex-shrink-0">
      <div className="flex items-center gap-1">
        <TicketIcon className="w-8 h-8 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-800">Ticket</h3>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-gray-600">
          <span className="font-medium">Cantidad:</span> {ticket.quantity}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Fecha de creación:</span>{" "}
          {formattedDate}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Precio total:</span> ${totalPrice}
        </p>
      </div>
      {ticket.event ? (
        <EventCard key={ticket._id} event={ticket.event} />
      ) : (
        <p className="text-red-500 ">El evento fue eliminado</p>
      )}
    </div>
  );
}

export default TicketCard;
