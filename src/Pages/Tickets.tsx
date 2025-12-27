import { getTicketsByUser, type Ticket } from "@/api/tickets";
import Tabs from "@/components/ticket/Tabs";
import TicketCard from "@/components/ticket/TicketCard";
import { useUsuario } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function ticketVencido(t: Ticket): boolean {
  if (!t.event) return true;

  const fechaEvento = t.event.fechas.find(
    (f) => f._id === t.eventDateId
  )?.fecha;

  if (!fechaEvento) return true;

  return new Date(fechaEvento) < new Date();
}

function eventExist(t: Ticket) {
  return !!t.event && t.event.fechas.find((f) => f._id == t.eventDateId);
}

function Tickets() {
  const { user } = useUsuario();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [currentTab, setCurrentTab] = useState("activados");
  const [reload, setReload] = useState(false);
  const tabsOptions = [
    { label: "Activados", value: "activados" },
    { label: "Desactivados", value: "desactivados" },
    { label: "Pendientes", value: "pendientes" },
  ];

  const esTransferido = (t: Ticket) => {
    return t.originalUserId && t.originalUserId == user?.idAuth;
  };

  const getTicketsAgain = () => {
    setReload(!reload);
  };

  const fetchTickets = async () => {
    try {
      const response = await getTicketsByUser();
      setTickets(response);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al obtener los tickets";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [reload]);

  useEffect(() => {
    if (tickets.length == 0 || !user) return;
    if (currentTab == "activados") {
      setFilteredTickets(
        tickets.filter(
          (t) =>
            t.status === "active" &&
            !ticketVencido(t) &&
            !esTransferido(t) &&
            eventExist(t)
        )
      );
    } else if (currentTab == "desactivados") {
      setFilteredTickets(
        tickets.filter(
          (t) =>
            (t.status === "used" || ticketVencido(t) || esTransferido(t)) &&
            eventExist(t)
        )
      );
    } else {
      setFilteredTickets(
        tickets.filter(
          (t) =>
            t.status === "pending_verification" &&
            !ticketVencido(t) &&
            !esTransferido(t) &&
            eventExist(t)
        )
      );
    }
  }, [tickets, currentTab, user]);

  return (
    <div className="flex flex-col items-center gap-2 text-black w-full">
      <Tabs
        tabsOptions={tabsOptions}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      {filteredTickets.length > 0 && (
        <div className="flex flex-col gap-3 p-2 sm:flex-row overflow-auto w-full">
          {filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              ticket={ticket}
              currentTab={currentTab}
              getTicketsAgain={getTicketsAgain}
            />
          ))}
        </div>
      )}

      {filteredTickets.length == 0 && (
        <div className="text-gray-400 flex justify-center items-center mt-10 text-lg">
          {currentTab == "activados" ? (
            <p>Aquí se mostrarán los tickets de tus próximos eventos.</p>
          ) : currentTab == "desactivados" ? (
            <p>Aquí se mostrarán los tickets transferidos, usados o vencidos.</p>
          ) : (
            <p>
              Aquí se mostrarán tickets para los cuales te faltó verificar un
              email.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Tickets;
