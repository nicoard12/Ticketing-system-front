import { getEventById, updateEvent, type Event } from "@/api/events";
import EventForm from "@/components/event/EventForm";
import { useUsuario } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function EventEdit() {
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState<Event | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, contextLoading } = useUsuario();

  const editarEvento = async (
    e: Omit<Event, "_id" | "createdBy">,
    image?: File | null
  ) => {
    try {
      await updateEvent(event!._id, e, image!);
      toast.success("Evento actualizado");
      navigate(`/evento/${id}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al editar el evento";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const getEvent = async () => {
      const response = await getEventById(id!);
      setEvent(response);
    };

    if (id) getEvent();
  }, [id]);

  useEffect(() => {
    if (contextLoading) return;
    if (!user || user.rol !== "productor") {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, contextLoading]);

  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <h1 className="text-3xl font-semibold">Editar evento</h1>
      <EventForm
        submit={editarEvento}
        loading={loading}
        setLoading={setLoading}
        eventoEditable={event}
      />
    </div>
  );
}

export default EventEdit;
