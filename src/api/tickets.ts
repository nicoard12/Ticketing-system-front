import axios from "axios";
import api from "./api";

export type StatusTicket = {
  status: "pending_verification" | "verified" | "cancelled";
};

export type Ticket = {
  _id: string;
  userId: string;
  eventId: string;
  eventDateId: string;
  quantity: number;
  purchaserEmail: string;
  status: StatusTicket;
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
