import api from './api';

export type Rol = 'productor' | 'normal' | 'staff';

export interface User {
  idAuth: string;
  nombre: string;
  email: string;
  rol: Rol;
}
export const getUsuarioById = async (id: string) => {
  const response = await api.get<User>(`/usuarios/${id}`);
  return response.data;
}

export const createUsuario = async (user: User) => {
  const response = await api.post<User>('/usuarios', user);
  return response.data;
}

export const updateUsuario = async (user: User) => {
  const response = await api.put<User>(`/usuarios/${user.idAuth}`, user);
  return response.data;
}


