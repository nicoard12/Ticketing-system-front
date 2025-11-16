import api from "./api";
import { handleApiError } from "@/helpers/handleApiError";

export type Evento = {
  _id: string;
  titulo: string;
  fechas: Date[];
  descripcion: string;
  cantidadEntradas: string; //en bd number
  precioEntrada: string; //en bd number
  ubicacion: string;
  imagenUrl: string;
};

export const getEventos = async () => {
  const response = await api.get<Evento[]>("/eventos");
  return response.data.map((evento) => ({
    ...evento,
    cantidadEntradas: String(evento.cantidadEntradas),
    precioEntrada: String(evento.precioEntrada),
  }));
};

export const getEventoById = async (id: string) => {
  const response = await api.get<Evento>(`/eventos/${id}`);
  return {
    ...response.data,
    cantidadEntradas: String(response.data.cantidadEntradas),
    precioEntrada: String(response.data.precioEntrada),
  };
};

export const createEvento = async (
  evento: Omit<Evento, "_id">,
  imagen: File | null
) => {
  try {
    const formData = new FormData();

    // Campos del evento
    formData.append("titulo", evento.titulo);
    formData.append("descripcion", evento.descripcion);
    formData.append("cantidadEntradas", evento.cantidadEntradas.toString());
    formData.append("precioEntrada", evento.precioEntrada.toString());
    formData.append("ubicacion", evento.ubicacion);
    formData.append("fechas", JSON.stringify(evento.fechas));
    formData.append("imagen", imagen!);

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = await api.post<Evento>("/eventos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error, "crear");
  }
};

export const updateEvento = async (
  id: string,
  evento: Omit<Evento, "_id">,
  imagen: File | null
) => {
  try {
    const formData = new FormData();

    formData.append("titulo", evento.titulo);
    formData.append("descripcion", evento.descripcion);
    formData.append("cantidadEntradas", evento.cantidadEntradas.toString());
    formData.append("precioEntrada", evento.precioEntrada.toString());
    formData.append("ubicacion", evento.ubicacion);
    formData.append("fechas", JSON.stringify(evento.fechas));
    // Imagen opcional
    if (imagen) {
      formData.append("imagen", imagen);
    }

    const response = await api.put<Evento>(`/eventos/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error, "actualizar");
  }
};

export const deleteEvento = async (id: string) => {
  await api.delete(`/eventos/${id}`);
};