import api from './api';

type Rol = 'productor' | 'normal' | 'staff';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: Rol;
}
export const getUsuarios = async () => {
  const response = await api.get<Usuario[]>('/usuarios');
  return response.data;
}

export const getUsuarioById = async (id: number) => {
  const response = await api.get<Usuario>(`/usuarios/${id}`);
  return response.data;
}

export const createUsuario = async (usuario: Omit<Usuario, 'id'>) => {
  const response = await api.post<Usuario>('/usuarios', usuario);
  return response.data;
}

export const updateUsuario = async (id: number, usuario: Omit<Usuario, 'id'>) => {
  const response = await api.put<Usuario>(`/usuarios/${id}`, usuario);
  return response.data;
}

export const deleteUsuario = async (id: number) => {
  await api.delete(`/usuarios/${id}`);
}

