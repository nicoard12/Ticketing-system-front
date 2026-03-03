import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteEvent, type Event, getEventById } from "@/api/events";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, MapPin, DollarSign } from "lucide-react";
import Modal from "@/components/Modal";
import { toast } from "sonner";
import { useAuth0 } from "@auth0/auth0-react";
import { useUsuario } from "@/context/userContext";
import EventDateItem from "@/components/event/EventDateItem";

function EventPage() {
  const { id } = useParams();
  const [evento, setEvento] = useState<Event | null>(null);
  const [modal, setModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { isAuthenticated } = useAuth0();
  const { user } = useUsuario();
  const navigate = useNavigate();

  const goToEdit = () => {
    navigate(`/editar-evento/${id}`);
  };

  const startDelete = async () => {
    try {
      setDeleting(true);
      await deleteEvent(id!);
      setDeleting(false);
      setModal(false);
      toast.warning("Evento eliminado");
      navigate("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error al intentar eliminar el evento";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await getEventById(id!);
        setEvento(response);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Error al obtener el evento. Intente nuevamente."
        );
      }
    };

    if (id) getEvent();
  }, [id]);

  if (!evento) return null;

  return (
    <div className="flex flex-col items-center w-full min-h-screen pb-20">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 pt-10 px-4 sm:px-6 lg:px-8">

        <div className="w-full lg:w-1/2 flex flex-col items-center justify-start relative">
          <div className="w-full aspect-square sm:aspect-video lg:aspect-square overflow-hidden rounded-3xl shadow-2xl relative bg-black/20">
            <img
              src={evento.imagenUrl}
              alt={`Imagen de: ${evento.titulo}`}
              className="object-cover w-full h-full transition-transform duration-700 ease-out"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-start">

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h1 data-cy="title" className="font-extrabold text-4xl sm:text-5xl text-white tracking-tight leading-tight">
                {evento.titulo}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/80 font-medium mt-2">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/5">
                  <MapPin size={18} className="text-white" />
                  <span className="text-sm">{evento.ubicacion || "Ubicación no especificada"}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/5">
                  <DollarSign size={18} className="text-white" />
                  <span className="text-sm">
                    {evento.precioEntrada || 0}
                  </span>
                </div>
              </div>

              {/* Acciones de Productor */}
              {isAuthenticated && String(evento.createdBy) === String(user?.idAuth) && user?.rol === "productor" && (
                <div className="flex flex-wrap gap-3 mt-4">
                  <Button onClick={goToEdit} variant="ghost" className="text-white/70 hover:bg-white/10 hover:text-white rounded-xl">
                    <Edit size={16} className="mr-2 text-white" />
                    Editar evento
                  </Button>
                  <Button onClick={() => setModal(true)} variant="ghost" className="text-red-400 hover:bg-red-400/10 hover:text-red-300 rounded-xl">
                    <Trash2 size={16} className="mr-2" />
                    Eliminar evento
                  </Button>
                </div>
              )}
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-bold text-white mb-2">Acerca de este evento</h3>
              <p className="text-base text-white/80 leading-relaxed font-normal whitespace-pre-wrap">
                {evento.descripcion}
              </p>
            </div>

            <hr className="my-6 border-white/10" />

            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-extrabold text-white">Fechas y Disponibilidad</h2>
              <div className="flex flex-col gap-3">
                {evento.fechas.map((f, index) => (
                  <EventDateItem
                    key={f._id}
                    date={f}
                    eventId={evento._id}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <Modal
          evento={evento}
          cancelar={() => setModal(false)}
          confirmar={startDelete}
          deleting={deleting}
        />
      )}
    </div>
  );
}

export default EventPage;
