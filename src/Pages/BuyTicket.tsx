import { getEventById, type EventDate, type Event } from "@/api/events";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

//TODO:
// Usuario hace checkout

// Pago aprobado por MercadoPago (lo dejo para el final)

// Se registra la compra en el sistema (ticket en estado pending_verification)

// Se envía email de verificación (ingresar codigo 4 digitos)

// Usuario confirma el email (en caso de no poder acceder al email hay que dar la posibilidad de enviarlo a otro email)

// Se habilita el envío del QR definitivo

function BuyTicket() {
  const { id, numFecha } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState<EventDate | undefined>(
    undefined
  );
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const getEvent = async () => {
      const response = await getEventById(id!);
      setEvent(response);
      if (numFecha !== undefined) {
        setSelectedDate(response.fechas[parseInt(numFecha) - 1]);
      }
    };

    if (id) getEvent();
  }, [id, numFecha]);

  return (
    <div className="w-full text-primary flex flex-col items-center justify-center p-4 ">
      <div className="bg-white border border-gray-300 rounded shadow p-6 w/full sm:w-1/2 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-center">
          Comprando entradas para {event?.titulo}
        </h1>
        <div>
          <p className="text-lg font-medium">Fecha del evento:</p>
          <p className="text-base uppercase">
            {selectedDate?.fecha &&
              new Date(selectedDate.fecha).toLocaleString("es-AR", {
                timeZone: "America/Argentina/Buenos_Aires",
                year: "numeric",
                month: "long",
                weekday: "long",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
          </p>
        </div>
        <div>
          <p className="text-lg font-medium">Entradas disponibles:</p>
          <p className="text-base">{selectedDate?.cantidadEntradas}</p>
        </div>
        <div>
          <p className="text-lg font-medium">Precio por entrada:</p>
          <p className="text-base">${event?.precioEntrada}</p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="block text-lg font-medium">
            Cantidad de entradas:
          </label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          >
            {Array.from(
              {
                length: Math.min(
                  8,
                  Number(selectedDate?.cantidadEntradas) || 0
                ),
              },
              (_, i) => i + 1
            ).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-lg font-medium">Precio total:</p>
          <p className="font-medium text-2xl">
            ${cantidad * (Number(event?.precioEntrada) || 0)}
          </p>
        </div>
        <Button className="w-full">Comprar</Button>
      </div>
    </div>
  );
}

export default BuyTicket;
