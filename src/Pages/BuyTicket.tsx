import { getEventById, type EventDate, type EventResponse } from "@/api/events";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BuyTicket() {
  const { id, idFecha } = useParams();
  const [event, setEvent] = useState<EventResponse | null>(null);
  const [dateSelected, setDateSelected] = useState<EventDate | undefined>(
    undefined
  );

  useEffect(() => {
    const getEvent = async () => {
      const response = await getEventById(id!);
      setEvent(response);
      setDateSelected(response.fechas.find((f) => f._id == idFecha));
    };

    if (id) getEvent();
  }, [id, idFecha]);

  return (
    <div>
      BuyTicket de {event?.titulo} para la fecha{" "}
      {dateSelected?.fecha && new Date(dateSelected.fecha).toLocaleString("es-AR", {
        timeZone: "America/Argentina/Buenos_Aires",
        year: "numeric",
        month: "long",
        weekday: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </div>
  );
}

export default BuyTicket;
