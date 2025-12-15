import { getEvents, type EventResponse } from "@/api/events";
import Searcher from "@/components/Searcher";
import EventCard from "@/components/evento/EventCard";
import React, { useEffect, useState } from "react";

function Home() {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [allEvents, setAllEvents] = useState<EventResponse[]>([]);

  const onSearch = (query: string) => {
    setEvents(
      allEvents.filter((event) =>
        event.titulo.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response);
        setAllEvents(response);
      } catch (error) {
        if (error.code == "ERR_NETWORK")
          alert(
            "Error al conectar con el servidor, por favor intentalo mas tarde."
          );
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 p-4">
      <Searcher onSearch={onSearch} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Home;
