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
  try {
    // Convertir a number
    const eventoNormalizado = {
      ...evento,
      cantidadEntradas: Number(evento.cantidadEntradas),
      precioEntrada: Number(evento.precioEntrada),
    };

    const response = await api.put<Evento>(`/eventos/${id}`, eventoNormalizado);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Error en la request:', error.response);
      if (error.response.data.message[0] == "titulo must be shorter than or equal to 40 characters"){
        throw new Error("El titulo del evento no debe tener mas de 40 caracteres")
      }else if (error.response.data.message[0] == "descripcion must be shorter than or equal to 300 characters"){
        throw new Error("La descripcion del evento no debe tener mas de 300 caracteres")
      }
      else throw new Error (error.response.data.message[0])
    } else {
      console.error('Error inesperado:', error.message);
      throw new Error(`Error inesperado: ${error.message}`);
    }
  }
};



export const deleteEvento = async (id: string) => {
  await api.delete(`/eventos/${id}`);
};

