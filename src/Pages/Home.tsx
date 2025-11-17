import { getEventos, type Evento } from "@/api/eventos";
import Buscador from "@/components/Buscador";
import EventoBox from "@/components/evento/EventoBox";
import React, { useEffect, useState } from "react";

function Home() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [allEventos, setAllEventos] = useState<Evento[]>([]);

  const onSearch = (query: string) => {
    setEventos(
      allEventos.filter((evento) =>
        evento.titulo.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await getEventos();
        setEventos(response);
        setAllEventos(response);
      } catch (error) {
        if (error.code == "ERR_NETWORK")
          alert(
            "Error al conectar con el servidor, por favor intentalo mas tarde."
          );
      }
    };

    fetchEventos();
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 p-4">
      <Buscador onSearch={onSearch} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {eventos.map((evento) => (
          <EventoBox key={evento._id} evento={evento} />
        ))}
      </div>
    </div>
  );
}

export default Home;
