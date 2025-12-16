import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react"; // icono de tacho
import type { Event, EventDate } from "@/api/events";
import { convertirUTC } from "@/helpers/fechas";

type DateFormProps = {
  setEvento: React.Dispatch<React.SetStateAction<Omit<Event, "_id">>>;
  fechasEditables?: EventDate[];
};

function DateForm({ setEvento, fechasEditables }: DateFormProps) {
  const [fechas, setFechas] = useState<Omit<EventDate, "_id" | "titulo">[]>([
    {
      fecha: "",
      cantidadEntradas: "",
    },
  ]);

  const agregarFecha = () => {
    setFechas([...fechas, { fecha: "", cantidadEntradas: "" }]);
  };

  const cambiarFecha = (index: number, value: string, name: string) => {
    const updatedFechas = [...fechas];

    if (name == "fecha") {
      updatedFechas[index] = {
        ...updatedFechas[index],
        fecha: new Date(value),
      };
    } else {
      updatedFechas[index] = {
        ...updatedFechas[index],
        cantidadEntradas: value,
      };
    }

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

  useEffect(() => {
    const inputs = document.querySelectorAll('input[type="number"]');

    const disableScroll = (e: WheelEvent) => e.preventDefault();

    inputs.forEach((input) => input.addEventListener("wheel", disableScroll));

    // Limpieza para evitar fugas de eventos
    return () => {
      inputs.forEach((input) =>
        input.removeEventListener("wheel", disableScroll)
      );
    };
  }, []);

  return (
    <div className="flex flex-col items-start w-full gap-1">
      <label>Fechas</label>

      <div className="flex flex-col items-start w-full gap-3">
        <div className="flex flex-col items-start w-full gap-2 overflow-auto max-h-50">
          {fechas.map((fecha, i) => (
            <div key={i} className="flex items-center w-full gap-2">
              <input
                type="datetime-local"
                className="p-2 border rounded"
                value={convertirUTC(fecha.fecha)}
                name="fecha"
                onChange={(e) => cambiarFecha(i, e.target.value, e.target.name)}
              />
              <input
                type="number"
                name="cantEntradas"
                value={fecha.cantidadEntradas}
                placeholder="Cantidad de entradas para esta fecha"
                onChange={(e) => cambiarFecha(i, e.target.value, e.target.name)}
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
