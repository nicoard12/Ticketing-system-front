import api from './api';

export type Rol = 'productor' | 'normal' | 'staff';

export interface Usuario {
  idAuth: string;
  nombre: string;
  email: string;
  rol: Rol;
}
export const getUsuarioById = async (id: string) => {
  const response = await api.get<Usuario>(`/usuarios/${id}`);
  return response.data;
}

export const createUsuario = async (usuario: Usuario) => {
  const response = await api.post<Usuario>('/usuarios', usuario);
  return response.data;
}

export const updateUsuario = async (usuario: Usuario) => {
  const response = await api.put<Usuario>(`/usuarios/${usuario.idAuth}`, usuario);
  return response.data;
}

// export const deleteUsuario = async (id: string) => {
//   await api.delete(`/usuarios/${id}`);
// }

