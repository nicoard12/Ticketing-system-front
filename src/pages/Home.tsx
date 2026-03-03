import { getEvents, type Event } from "@/api/events";
import { getUsers, type User } from "@/api/users";
import EventCard from "@/components/event/EventCard";
import Searchbar from "@/components/Searchbar";
import UserCard from "@/components/user/UserCard";
import { useUsuario } from "@/context/userContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createPortal } from "react-dom";

function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const { user, contextLoading } = useUsuario();

  useEffect(() => {
    const mainContent = document.getElementById("main-content");
    const handleScroll = () => {
      if (mainContent) {
        setIsScrolled(mainContent.scrollTop > 30);
      }
    };
    mainContent?.addEventListener("scroll", handleScroll);
    return () => mainContent?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (user?.rol == "admin") {
      setUsers(
        allUsers.filter(
          (u) =>
            u.nombre.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setEvents(
        allEvents.filter((event) =>
          event.titulo.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, allEvents, allUsers, user]);

  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response);
      setAllEvents(response);
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any).code === "ERR_NETWORK"
      ) {
        toast.error(
          "Error al conectar con el servidor, por favor intentalo más tarde."
        );
      }
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
      setAllUsers(response);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al obtener los usuarios";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (contextLoading) return;

    if (user?.rol == "admin") fetchUsers();
    else fetchEvents();
  }, [contextLoading, user]);

  return (
    <div className="flex flex-col items-center gap-10 w-full max-w-7xl mx-auto mt-6 p-3 flex-1">
      <div className="w-full px-4 sm:px-0 h-[64px] max-w-2xl mx-auto">
        {isScrolled && document.getElementById("header-search-portal")
          ? createPortal(
            <Searchbar search={search} setSearch={setSearch} placeholder={user  ?.rol == "admin" ? "Buscar usuarios..." : "Buscar eventos, artistas o lugares..."} />,
            document.getElementById("header-search-portal")!
          )
          : <Searchbar search={search} setSearch={setSearch} placeholder={user?.rol == "admin" ? "Buscar usuarios..." : "Buscar eventos, artistas o lugares..."} />}
      </div>

      {events.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}

      {users.length > 0 && (
        <div className="flex flex-col gap-3 w-full">
          {users.map((user) => (
            <UserCard key={user.idAuth} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
