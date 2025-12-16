import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react"; // icono de tacho
import type { Event } from "@/api/events";
import { convertirUTC } from "@/helpers/fechas";

type DateFormProps = {
  setEvento: React.Dispatch<React.SetStateAction<Omit<Event, "_id">>>;
  fechasEditables?: Date[] | null
};

function DateForm({ setEvento, fechasEditables }: DateFormProps) {
  const [fechas, setFechas] = useState<string[]>([""]);

  const agregarFecha = () => {
    setFechas([...fechas, ""]);
  };

  const cambiarFecha = (index: number, value: string) => {
    const nuevaFecha = [...fechas];
    nuevaFecha[index] = value;
    setFechas(nuevaFecha);
    setEvento((prev) => ({
      ...prev,
      fechas: nuevaFecha.map(f => new Date(f)),
    }));
  };

  const eliminarFecha = (index: number) => {
    const nuevasFechas = fechas.filter((_, i) => i !== index);
    setFechas(nuevasFechas);
    setEvento((prev) => ({
      ...prev,
      fechas: nuevasFechas.map((f) => new Date(f)),
    }));
  };

  useEffect(() =>{
    if (fechasEditables && fechasEditables.length > 0) setFechas(fechasEditables.map(f => f.toString()))
  },[fechasEditables])

  return (
    <div className="flex flex-col items-start w-full gap-1">
      <label>Fechas</label>

      <div className="flex flex-col items-start w-full gap-3">
        <div className="flex flex-col items-start w-full gap-2 overflow-auto max-h-50">
          {fechas.map((fecha, i) => (
            <div key={i} className="flex items-center w-full gap-2">
              <input
                type="datetime-local"
                className="p-2 border rounded flex-1"
                value={convertirUTC(fecha)}
                name="fecha"
                onChange={(e) => cambiarFecha(i, e.target.value)}
              />
              {fechas.length > 1 && (
                <button
                  type="button"
                  className="cursor-pointer rounded p-1"
                  onClick={() => eliminarFecha(i)}
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
        </div>

        <Button
          variant="default"
          type="button"
          data-cy="add-date-button"
          onClick={agregarFecha}
        >
          Agregar fecha
        </Button>
      </div>
    </div>
  );
}

export default DateForm;
