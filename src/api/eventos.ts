import api from './api';

export type Evento = {
  _id: string;
  titulo: string;
  fechas: Date[];
  descripcion: string;
  cantidadEntradas: string;  //en bd number
  precioEntrada: string;     //en bd number
  ubicacion: string;
  imagenUrl: string;
}

export const getEventos = async () => {
  const response = await api.get<Evento[]>('/eventos');
  return response.data.map(evento => ({
    ...evento,
    cantidadEntradas: String(evento.cantidadEntradas),
    precioEntrada: String(evento.precioEntrada),
  }));
};

export const getEventoById = async (id: string) => {
  const response = await api.get<Evento>(`/eventos/${id}`);
  return {
    ...response.data,
    cantidadEntradas: String(response.data.cantidadEntradas),
    precioEntrada: String(response.data.precioEntrada),
  };
};


export const createEvento = async (evento: Omit<Evento, '_id'>) => {
  const payload = {
    ...evento,
    cantidadEntradas: Number(evento.cantidadEntradas),
    precioEntrada: Number(evento.precioEntrada),
  };

  const response = await api.post<Evento>('/eventos', payload);
  return response.data;
};

export const updateEvento = async (id: string, evento: Omit<Evento, '_id'>) => {
  const response = await api.put<Evento>(`/eventos/${id}`, evento);
  return response.data;
}

export const deleteEvento = async (id: string) => {
  await api.delete(`/eventos/${id}`);
};

