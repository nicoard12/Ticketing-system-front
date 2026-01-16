import api from "./api";
import axios from "axios";

export type Rol = "productor" | "normal" | "staff" | "admin";

export interface User {
  idAuth: string;
  nombre: string;
  email: string;
  imagen: string;
  rol: Rol;
}

export const createUser = async (user: User) => {
  //Si el usuario no existe lo crea y lo devuelve, si ya existia solamente lo devuelve
  const response = await api.post<User>("/users", user);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get<User[]>("/users");
  return response.data;
};

export const changeRoleUser = async (userId: string, role: Rol) => {
  try {
    const response = await api.put<User>(`/users/${userId}/role`, {
      rol: role,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error al cambiar el rol"
      );
    }
    throw new Error("Error inesperado");
  }
};

export const getUserById = async (userId: string) => {
  try {
    const response = await api.get<User>(`/users/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error al cambiar el rol"
      );
    }
    throw new Error("Error inesperado");
  }
};
