import axios from "axios";
import api from "./api";
import type { Event } from "./events";

export type StatusTicket = "pending_verification" | "active" | "used";

export type Ticket = {
  _id: string;
  event: Event;
  eventDateId: string;
  originalUserId: string;
  quantity: number;
  purchaserEmail: string;
  status: StatusTicket;
  price: number;
  dateCreated: Date;
};

export const createTicket = async (
  event: string,
  eventDateId: string,
  quantity: number
) => {
  try {
    const response = await api.post<Ticket>("/tickets", {
      event,
      eventDateId,
      quantity,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error al comprar las entradas"
      );
    }
    throw new Error("Error inesperado");
  }
};

export const verifyTicketCode = async (ticketId: string, code: string) => {
  try {
    const response = await api.patch<boolean>(`/tickets/${ticketId}/verify`, {
      code: Number(code),
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error al verificar el código"
      );
    }
    throw new Error("Error inesperado");
  }
};

export const sendTicketCode = async (ticketId: string) => {
  try {
    const response = await api.patch<boolean>(`/tickets/${ticketId}/send-code`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error al reenviar el código"
      );
    }
    throw new Error("Error inesperado");
  }
};

export const changeTicketEmail = async (ticketId: string, newEmail: string) => {
  try {
    const response = await api.patch<boolean>(`/tickets/${ticketId}/email`, {
      newEmail,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error al cambiar el correo"
      );
    }
    throw new Error("Error inesperado");
  }
};

export const getTicketsByUser = async () => {
  try {
    const response = await api.get<Ticket[]>("/tickets/user"); //Se obtienen los del respectivo usuario logueado
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Error al obtener los tickets del usuario"
      );
    }
    throw new Error("Error inesperado");
  }
};

export const transferTicket = async (
  ticketId: string,
  quantity: number,
  email: string
) => {
  try {
    const response = await api.post<boolean>(`/tickets/${ticketId}/transfer`,{
      quantity, email
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Error al obtener los tickets del usuario"
      );
    }
    throw new Error("Error inesperado");
  }
};
