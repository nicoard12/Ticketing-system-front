import type { EventDate } from "@/api/events";
import { convertirUTC } from "@/helpers/fechas";
import { Trash2 } from "lucide-react";

type DateAndTicketsProps = {
  index: number;
  fecha: EventDate;
  cambiarFecha: (index: number, value: string) => void;
  cambiarEntradas: (index: number, value: string) => void;
  eliminarFecha: (index: number) => void;
  deleteEnabled: boolean;
};

function DateAndTicketsForm({
  index,
  fecha,
  cambiarFecha,
  cambiarEntradas,
  eliminarFecha,
  deleteEnabled,
}: DateAndTicketsProps) {

  return (
    <div
      className={`w-full flex flex-col sm:flex-row justify-center items-start sm:items-center gap-3 sm:gap-5 md:gap-10 lg:gap-30 px-2 sm:py-2 sm:px-4 rounded hover:bg-gray-100/70`}
    >
      <div className="flex flex-col">
        <label htmlFor="fecha" className="font-medium p-1 text-sm">
          Fecha {index + 1}
        </label>
        <input
          type="datetime-local"
          className="p-2 border rounded "
          value={convertirUTC(fecha.fecha)}
          name="fecha"
          onChange={(e) => cambiarFecha(index, e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="cantEntradas" className="font-medium p-1 text-sm">
          N° Entradas
        </label>
        <input
          type="number"
          className="p-2 border rounded "
          value={fecha.cantidadEntradas}
          name="cantEntradas"
          placeholder="Cantidad de entradas"
          onChange={(e) => cambiarEntradas(index, e.target.value)}
        />
      </div>

      {deleteEnabled && (
        <button
          type="button"
          className="flex items-center gap-1 bg-red-500 text-white text-sm font-medium cursor-pointer rounded p-2 sm:mt-6"
          onClick={() => eliminarFecha(index)}
        >
          <Trash2 size={14} /> Eliminar
        </button>
      )}
    </div>
  );
}

export default DateAndTicketsForm;
