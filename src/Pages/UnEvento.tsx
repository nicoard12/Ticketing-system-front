import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteEvento, type Evento, getEventoById } from "@/api/eventos";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Modal from "@/components/Modal";
import { toast } from "sonner";
import { useAuth0 } from "@auth0/auth0-react";

function UnEvento() {
  const { id } = useParams();
  const [evento, setEvento] = useState<Evento | null>(null);
  const [modal, setModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
  const navigate = useNavigate();

  const goToEdit = () => {
    navigate(`/editar-evento/${id}`);
  };

  const deleteEvent = async () => {
    try {
      setDeleting(true);
      await deleteEvento(id);
      setDeleting(false);
      setModal(false);
      toast.warning("Evento eliminado");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message);
      if (error.response?.data?.statusCode == 403) navigate("/");
    }
  };

  useEffect(() => {
    const getEvento = async () => {
      const response = await getEventoById(id);
      setEvento(response);
    };

    if (id) getEvento();
  }, [id]);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) loginWithRedirect();
  }, [isLoading, isAuthenticated]);

  if (!isAuthenticated) return null;

  return (
    <div className="text-primary flex flex-col lg:flex-row p-5 gap-5 bg-white border border-gray-300 m-5 rounded shadow">
      <div className="aspect-square flex items-center justify-center overflow-hidden rounded w-full lg:w-1/3 ">
        <img
          src={evento?.imagenUrl}
          alt={`Imagen de : ${evento?.titulo}`}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col lg:flex-row flex-1 gap-5 justify-between ">
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="font-semibold text-2xl">{evento?.titulo}</h1>
            <p className="text-base overflow-y-auto max-h-[200px] break-all">
              {evento?.descripcion}
            </p>
          </div>
          <div className="flex flex-col items-start h-[270px] 2xl:h-[350px]">
            <h2 className="text-lg font-semibold">Fechas</h2>
            <div className="flex flex-col gap-2 overflow-y-auto justify-start items-start pr-10">
              {evento?.fechas.map((f) => {
                return (
                  <p key={f._id}>
                    {new Date(f.fecha).toLocaleString("es-AR", {
                      timeZone: "America/Argentina/Buenos_Aires",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        {evento?.createdBy == user?.sub && (
          <div className="flex flex-col justify-between gap-5">
            <Button
              onClick={goToEdit}
              variant={"outline"}
              className="cursor-pointer"
            >
              {" "}
              <Edit />
              Editar evento
            </Button>
            <Button
              onClick={() => setModal(true)}
              variant={"destructive"}
              className="cursor-pointer"
            >
              {" "}
              <Trash2 />
              Eliminar evento
            </Button>
          </div>
        )}
      </div>

      {modal && (
        <Modal
          evento={evento}
          cancelar={() => setModal(false)}
          confirmar={deleteEvent}
          deleting={deleting}
        />
      )}
    </div>
  );
}

export default UnEvento;
