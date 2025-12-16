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
      className={`flex justify-center items-center gap-30 py-2 px-4 rounded hover:bg-gray-100/70`}
    >
      <div className="flex gap-30 w-full">
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
      </div>

      {deleteEnabled && (
        <button
          type="button"
          className="flex items-center gap-1 bg-red-500 text-white text-sm font-medium cursor-pointer rounded p-2"
          onClick={() => eliminarFecha(index)}
        >
          <Trash2 size={14} /> Eliminar
        </button>
      )}
    </div>
  );
}

export default DateAndTicketsForm;
