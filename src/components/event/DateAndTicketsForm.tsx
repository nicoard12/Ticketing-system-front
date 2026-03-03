import type { EventDate } from "@/api/events";
import { convertirUTC } from "@/helpers/fechas";
import { Trash2, Calendar, Ticket } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
      className="w-full flex flex-col sm:flex-row items-end gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors group/row"
    >
      <div className="flex flex-col flex-1 w-full gap-2">
        <label className="text-xs font-bold flex items-center gap-1.5 text-slate-600 ml-1">
          <Calendar size={12} className="text-primary" /> Fecha y Hora
        </label>
        <Input
          type="datetime-local"
          className="bg-white border-gray-300 focus:border-primary/50 text-black placeholder:text-gray-400"
          value={convertirUTC(fecha.fecha)}
          name="fecha"
          onChange={(e) => cambiarFecha(index, e.target.value)}
        />
      </div>

      <div className="flex flex-col w-full sm:w-32 gap-2">
        <label className="text-xs font-bold flex items-center gap-1.5 text-slate-600 ml-1">
          <Ticket size={12} className="text-primary" /> Entradas
        </label>
        <Input
          type="number"
          className="bg-white border-gray-300 focus:border-primary/50 text-black placeholder:text-gray-400"
          value={fecha.cantidadEntradas}
          name="cantEntradas"
          placeholder="0"
          onChange={(e) => cambiarEntradas(index, e.target.value)}
        />
      </div>

      {deleteEnabled && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="text-slate-400 hover:text-destructive hover:bg-destructive/10 transition-all opacity-0 group-hover/row:opacity-100 focus:opacity-100"
          onClick={() => eliminarFecha(index)}
          title="Eliminar esta fecha"
        >
          <Trash2 size={16} />
        </Button>
      )}
    </div>
  );
}

export default DateAndTicketsForm;
