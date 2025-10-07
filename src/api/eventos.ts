import api from './api';

export interface Evento {
  id: number;
  titulo: string;
  fechas: Date[];
  descripcion: string;
  cantidadEntradas: number;
  precioEntrada: number;
  ubicacion: string;
  imagenUrl: string;
}

export const getEventos = async () => {
  const response = await api.get<Evento[]>('/eventos');
  return response.data;
};
export const getEventoById = async (id: number) => {
  const response = await api.get<Evento>(`/eventos/${id}`);
  return response.data;
};

export const createEvento = async (evento: Omit<Evento, 'id'>) => {
  const response = await api.post<Evento>('/eventos', evento);
  return response.data;
};  
export const updateEvento = async (id: number, evento: Omit<Evento, 'id'>) => {
  const response = await api.put<Evento>(`/eventos/${id}`, evento);
  return response.data;
}

export const deleteEvento = async (id: number) => {
  await api.delete(`/eventos/${id}`);
};

