import axios from "axios";
import api from "./api";
import type { Event } from "./events";

export type StatusTicket = {
  status: "pending_verification" | "verified" | "cancelled";
};

export type Ticket = {
  _id: string;
  event: Event;
  eventDateId: string;
  quantity: number;
  purchaserEmail: string;
  status: StatusTicket;
  price: number;
};

export const createTicket = async (
  eventId: string,
  eventDateId: string,
  quantity: number
) => {
  try {
    const response = await api.post<Ticket>("/tickets", {
      eventId,
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

export const verifyCodeTicket = async (ticketId: string, code: string) => {
  try {
    const response = await api.patch<Ticket>(`/tickets/${ticketId}/verify`, {
      code,
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

export const sendCodeTicket = async (ticketId: string) => {
  try {
    const response = await api.patch<Ticket>(`/tickets/${ticketId}/send-code`);
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

export const changeEmailTicket = async (ticketId: string, newEmail: string) => {
  try {
    const response = await api.patch<Ticket>(`/tickets/${ticketId}/email`, {
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
