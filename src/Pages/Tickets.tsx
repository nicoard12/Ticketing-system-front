import { getTicketsByUser, type Ticket } from "@/api/tickets";
import EventCard from "@/components/event/EventCard";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const fetchTickets = async () => {
    try {
      const response = await getTicketsByUser();
      setTickets(response);
    } catch (error) {
      toast.error(error.message || "Error al obtener los tickets");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);
  return (
    tickets.length > 0 && (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {tickets.map((ticket) => (
          <EventCard key={ticket._id} event={ticket.event} />
        ))}
      </div>
    )
  );
}

export default Tickets;
