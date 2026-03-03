import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Event, EventDate } from "@/api/events";
import DateAndTicketsForm from "./DateAndTicketsForm";
import { CalendarPlus, CalendarDays } from "lucide-react";

type DateFormProps = {
  setEvento: React.Dispatch<React.SetStateAction<Omit<Event, "_id" | "createdBy">>>;
  fechasEditables?: EventDate[];
};

function DateForm({ setEvento, fechasEditables }: DateFormProps) {
  const [fechas, setFechas] = useState<EventDate[]>([
    {
      fecha: "",
      cantidadEntradas: "",
    },
  ]);

  const agregarFecha = () => {
    setFechas([...fechas, { fecha: "", cantidadEntradas: "" }]);
  };

  const cambiarFecha = (index: number, value: string) => {
    const updatedFechas = [...fechas];
    updatedFechas[index] = {
      ...updatedFechas[index],
      fecha: new Date(value),
    };

    setFechas(updatedFechas);
    setEvento((prev) => ({
      ...prev,
      fechas: updatedFechas,
    }));
  };

  const cambiarEntradas = (index: number, value: string) => {
    const updatedFechas = [...fechas];
    updatedFechas[index] = {
      ...updatedFechas[index],
      cantidadEntradas: value,
    };

    setFechas(updatedFechas);
    setEvento((prev) => ({
      ...prev,
      fechas: updatedFechas,
    }));
  };

  const eliminarFecha = (index: number) => {
    const nuevasFechas = fechas.filter((_, i) => i !== index);

    setFechas(nuevasFechas);
    setEvento((prev) => ({
      ...prev,
      fechas: nuevasFechas,
    }));
  };

  useEffect(() => {
    if (fechasEditables && fechasEditables.length > 0)
      setFechas(fechasEditables);
  }, [fechasEditables]);


  return (
    <div className="flex flex-col items-start w-full gap-4">
      <div className="flex items-center justify-between w-full border-b border-gray-100 pb-2">
        <label className="font-bold text-lg flex items-center gap-2 text-slate-800">
          <CalendarDays size={20} className="text-secondary" /> Fechas y Entradas
        </label>
        <span className="text-xs font-bold text-secondary bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full shadow-sm">
          {fechas.length} {fechas.length === 1 ? "fecha" : "fechas"}
        </span>
      </div>

      <div className="flex flex-col items-start w-full gap-4">
        <div className="flex flex-col w-full gap-3 overflow-y-auto max-h-[400px] pr-2 scrollbar-thin">
          {fechas.map((fecha, i) => (
            <DateAndTicketsForm
              key={i}
              index={i}
              fecha={fecha}
              cambiarFecha={cambiarFecha}
              cambiarEntradas={cambiarEntradas}
              eliminarFecha={eliminarFecha}
              deleteEnabled={fechas.length > 1}
            />
          ))}
        </div>

        <Button
          variant="outline"
          type="button"
          data-cy="add-date-button"
          onClick={agregarFecha}
          className="w-full border-2 border-secondary/20 text-secondary bg-secondary/10 hover:bg-secondary/20 hover:border-secondary/30 transition-all py-6 gap-2 font-bold shadow-sm"
        >
          <CalendarPlus size={18} />
          Agregar otra fecha
        </Button>
      </div>
    </div>
  );
}

export default DateForm;
