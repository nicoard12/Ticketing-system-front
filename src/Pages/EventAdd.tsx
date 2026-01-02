import { createEvent, type Event } from "@/api/events";
import EventForm from "@/components/event/EventForm";
import { useUsuario } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function RegistrarEvento() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, contextLoading } = useUsuario();

  const newEvent = async (
    e: Omit<Event, "_id" | "createdBy">,
    image?: File | null
  ) => {
    try {
      await createEvent(e, image!);
      toast.success("Evento creado");
      navigate("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al añadir evento";
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contextLoading) return;
    if (!user || user.rol !== "productor") {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, contextLoading]);

  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <h1 className="text-3xl font-semibold">Crear evento</h1>
      <EventForm submit={newEvent} loading={loading} setLoading={setLoading} />
    </div>
  );
}

export default RegistrarEvento;
