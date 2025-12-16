import type { EventDateResponse } from "@/api/events";
import React from "react";
import { Button } from "../ui/button";

type EventDateItemProps= {
    date: EventDateResponse;
}

function EventDateItem({date}: EventDateItemProps) {
  return (
    <div className="flex items-center justify-center w-full border border-2 rounded p-3">
      <p className="w-full font-semibold uppercase">
        {new Date(date.fecha).toLocaleString("es-AR", {
          timeZone: "America/Argentina/Buenos_Aires",
          year: "numeric",
          month: "long",
          weekday: "long",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      <Button>
        Comprar
      </Button>
    </div>
  );
}

export default EventDateItem;
