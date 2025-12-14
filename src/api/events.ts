import api from "./api";
import { handleApiError } from "@/helpers/handleApiError";

export type Event = {
  _id: string;
  titulo: string;
  fechas: Date[];
  descripcion: string;
  cantidadEntradas: string; 
  precioEntrada: string; 
  ubicacion: string;
  imagenUrl: string;
  createdBy: string;
};

export const getEvents = async () => {
  const response = await api.get<Event[]>("/eventos");
  return response.data.map((event) => ({
    ...event,
    cantidadEntradas: String(event.cantidadEntradas),
    precioEntrada: String(event.precioEntrada),
  }));
};

export const getEventById = async (id: string) => {
  const response = await api.get<Event>(`/eventos/${id}`);
  return {
    ...response.data,
    cantidadEntradas: String(response.data.cantidadEntradas),
    precioEntrada: String(response.data.precioEntrada),
  };
};

export const createEvent = async (
  event: Omit<Event, "_id">,
  imagen: File | null
) => {
  try {
    const formData = new FormData();

    formData.append("titulo", event.titulo);
    formData.append("descripcion", event.descripcion);
    formData.append("cantidadEntradas", event.cantidadEntradas.toString());
    formData.append("precioEntrada", event.precioEntrada.toString());
    formData.append("ubicacion", event.ubicacion);
    formData.append("fechas", JSON.stringify(event.fechas));
    formData.append("imagen", imagen!);

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = await api.post<Event>("/eventos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error, "crear");
  }
};

export const updateEvent = async (
  id: string,
  event: Omit<Event, "_id">,
  imagen: File | null
) => {
  try {
    const formData = new FormData();

    formData.append("titulo", event.titulo);
    formData.append("descripcion", event.descripcion);
    formData.append("cantidadEntradas", event.cantidadEntradas.toString());
    formData.append("precioEntrada", event.precioEntrada.toString());
    formData.append("ubicacion", event.ubicacion);
    formData.append("fechas", JSON.stringify(event.fechas));
    // Imagen opcional
    if (imagen) {
      formData.append("imagen", imagen);
    }

    const response = await api.put<Event>(`/eventos/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error, "actualizar");
  }
};

export const deleteEvent = async (id: string) => {
  await api.delete(`/eventos/${id}`);
};