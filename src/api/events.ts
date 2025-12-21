import api from "./api";
import { handleApiEventError } from "@/helpers/handleApiError";

export type EventDate = {
  _id?: string;
  fecha: Date | string; 
  cantidadEntradas: number | string;
};

//Puede que tenga que remover esto y unificar solo en Event
export type EventResponse = {
  _id: string;
  titulo: string;
  fechas: EventDate[];
  descripcion: string;
  precioEntrada: string; 
  ubicacion: string;
  imagenUrl: string;
  createdBy: string;
};

export type Event = {
  _id: string;
  titulo: string;
  fechas: EventDate[];
  descripcion: string;
  precioEntrada: string; 
  ubicacion: string;
  imagenUrl: string;
};

export const getEvents = async () => {
  const response = await api.get<EventResponse[]>("/events");
  return response.data
};

export const getEventById = async (id: string) => {
  const response = await api.get<EventResponse>(`/events/${id}`);
  return response.data
};

export const createEvent = async (
  event: Omit<Event, "_id">,
  imagen: File | null
) => {
  try {
    const formData = new FormData();

    formData.append("titulo", event.titulo);
    formData.append("descripcion", event.descripcion);
    formData.append("precioEntrada", event.precioEntrada.toString());
    formData.append("ubicacion", event.ubicacion);
    formData.append("fechas", JSON.stringify(event.fechas));
    formData.append("imagen", imagen!);

    const response = await api.post<Event>("/events", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    handleApiEventError(error, "crear");
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
    formData.append("precioEntrada", event.precioEntrada.toString());
    formData.append("ubicacion", event.ubicacion);
    formData.append("fechas", JSON.stringify(event.fechas));
    // Imagen opcional
    if (imagen) {
      formData.append("imagen", imagen);
    }

    const response = await api.put<Event>(`/events/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    handleApiEventError(error, "actualizar");
  }
};

export const deleteEvent = async (id: string) => {
  await api.delete(`/events/${id}`);
};