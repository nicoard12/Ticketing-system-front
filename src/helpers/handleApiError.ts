export const handleApiEventError = (error: any, contexto: string) => {
  if (error.response) {
    console.error(`Error en la request (${contexto}):`, error.response);

    const dataMessage = error.response.data.message;
    // Si es un array, tomamos el primer elemento; si es string, lo usamos directamente
    const msg = Array.isArray(dataMessage) ? dataMessage[0] : dataMessage;

    switch (msg) {
      case 'titulo must be shorter than or equal to 40 characters':
        throw new Error('El título del evento no debe tener más de 40 caracteres');
      case 'descripcion must be shorter than or equal to 300 characters':
        throw new Error('La descripción del evento no debe tener más de 500 caracteres');
      default:
        throw new Error(msg || `Error desconocido al ${contexto} el evento`);
    }
  } else {
    console.error(`Error inesperado (${contexto}):`, error.message);
    throw new Error(`Error inesperado al ${contexto} el evento: ${error.message}`);
  }
};

