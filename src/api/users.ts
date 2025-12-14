import api from './api';

export type Rol = 'productor' | 'normal' | 'staff';

export interface User {
  idAuth: string;
  nombre: string;
  email: string;
  rol: Rol;
}

export const createUser = async (user: User) => { //Si el usuario no existe lo crea y lo devuelve, si ya existia solamente lo devuelve
  const response = await api.post<User>('/users', user);
  return response.data;
}



