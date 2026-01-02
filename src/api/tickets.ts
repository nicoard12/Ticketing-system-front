import axios from "axios";
import api from "./api";
import type { Event } from "./events";

export type StatusTicket =
  | "pending_payment"
  | "pending_verification"
  | "active"
  | "used";

export type Ticket = {
  _id: string;
  event: Event;
  eventDateId: string;
  userId: string;
  originalUserId: string;
  quantity: number;
  purchaserEmail: string;
  status: StatusTicket;
  price: number;
  dateCreated: Date;
  payment_url?: string;
  paymentExpiresAt?: Date;
};

export type Validation = {
  isValid: boolean;
  message: string;
  quantity?: number;
};

export type CreateTicketResponse = {
  url: string;
  ticketId: string;
};

export const getPending_payment = async () => {
  try {
    const response = await api.get<Ticket | null>("/tickets/pending-payment");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Error al obtener ticket pendiente de pago"
      );
    }
    throw new Error("Error inesperado");
  }
};

export const createTicket = async (
  event: string,
  eventDateId: string,
  quantity: number
) => {
  try {
    const response = await api.post<CreateTicketResponse>("/tickets", {
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
    const response = await api.post<boolean>(`/tickets/${ticketId}/transfer`, {
      quantity,
      email,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error al transferir el ticket"
      );
    }
    throw new Error("Error inesperado");
  }
};

export const validateQR = async (
  qrCode: string,
  eventId: string,
  eventDateId: string
) => {
  try {
    const response = await api.patch<Validation>(`/tickets/validate-qr`, {
      qrCode,
      eventId,
      eventDateId,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error al validar el QR"
      );
    }
    throw new Error("Error inesperado");
  }
};

export const removePendingTicket = async (ticketId: string) => {
  try {
    const response = await api.delete<boolean>(
      `/tickets/pending-payment/${ticketId}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error al validar el QR"
      );
    }
    throw new Error("Error inesperado");
  }
};
