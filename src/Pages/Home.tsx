import { getEvents, type Event } from "@/api/events";
import { getUsers, type User } from "@/api/users";
import Searcher from "@/components/Searcher";
import EventCard from "@/components/event/EventCard";
import UserCard from "@/components/user/UserCard";
import { useUsuario } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const { user, contextLoading } = useUsuario();

  const onSearch = (query: string) => {
    if (user?.rol == "admin") {
      setUsers(
        allUsers.filter(
          (user) =>
            user.nombre.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setEvents(
        allEvents.filter((event) =>
          event.titulo.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

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

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
      setAllUsers(response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (contextLoading) return;

    if (user?.rol == "admin") fetchUsers();
    else fetchEvents();
  }, [contextLoading, user]);

  return (
    <div className="flex flex-col items-center gap-10">
      <Searcher onSearch={onSearch} />

      {events.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}

      {users.length > 0 && (
        <div className="flex flex-col gap-3 w-full sm:w-1/2">
          {users.map((user) => (
            <UserCard key={user.idAuth} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
