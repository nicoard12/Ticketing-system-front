import type { EventDateResponse } from "@/api/events";
import React from "react";

type EventDateItemProps= {
    date: EventDateResponse;
}

function EventDateItem({date}: EventDateItemProps) {
  return (
    <div>
      <p>
        {new Date(date.fecha).toLocaleString("es-AR", {
          timeZone: "America/Argentina/Buenos_Aires",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
}

export default EventDateItem;
