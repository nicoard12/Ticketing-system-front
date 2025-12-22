import axios from "axios";
import api from "./api";
import { handleApiEventError } from "@/helpers/handleApiError";

export type EventDate = {
  _id?: string;
  fecha: Date | string;
  cantidadEntradas: number | string;
};

export type Event = {
  _id: string;
  titulo: string;
  fechas: EventDate[];
  descripcion: string;
  precioEntrada: string;
  ubicacion: string;
  imagenUrl: string;
  createdBy: string;
};

export const getEvents = async () => {
  const response = await api.get<Event[]>("/events");
  return response.data;
};

export const getEventById = async (id: string) => {
  try {
    const response = await api.get<Event>(`/events/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error al obtener el evento"
      );
    }
    throw new Error("Error inesperado");
  }
};

export const createEvent = async (
  event: Omit<Event, "_id" | "createdBy">,
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
  event: Omit<Event, "_id" | "createdBy">,
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

    const response = await api.patch<Event>(`/events/${id}`, formData, {
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
