import type { EventDate } from "@/api/events";
import { convertirUTC } from "@/helpers/fechas";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";

type DateAndTicketsProps = {
    fecha: EventDate;
}

function DateAndTickets({fecha} : DateAndTicketsProps) {

    const cambiarFecha = () =>{

    }

    const eliminarFecha = () =>{

    }

  return (
    <div className="flex items-center w-full gap-2">
      <input
        type="datetime-local"
        className="p-2 border rounded flex-1"
        value={convertirUTC(fecha.fecha)}
        name="fecha"
        onChange={(e) => cambiarFecha(i, e.target.value)}
      />
      {fechas.length > 1 && (
        <button
          type="button"
          className="cursor-pointer rounded p-1"
          onClick={() => eliminarFecha(i)}
        >
          <Trash2 size={18} />
        </button>
      )}
    </div>
  );
}

export default DateAndTickets;
