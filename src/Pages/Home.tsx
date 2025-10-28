import { getEventos, type Evento } from "@/api/eventos";
import Buscador from "@/components/Buscador";
import EventoBox from "@/components/evento/EventoBox";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";

function Home() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [allEventos, setAllEventos] = useState<Evento[]>([]);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const onSearch = (query: string) => {
    setEventos(
      allEventos.filter((evento) =>
        evento.titulo.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const fetchEventos = async () => {
      const response = await getEventos();
      setEventos(response);
      setAllEventos(response);
    };

    fetchEventos();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((token) => {
        if (localStorage && localStorage.getItem("app_token") !== token) {
          localStorage.setItem("app_token", token);
        }
      });
    }
  }, [isAuthenticated]);

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
