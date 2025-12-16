import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react"; // icono de tacho
import type { Event, EventDate } from "@/api/events";
import { convertirUTC } from "@/helpers/fechas";
import DateAndTicketsForm from "./DateAndTicketsForm";

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
      <label htmlFor="fecha" className="font-semibold">
        Fechas
      </label>
      <hr className="w-full mb-2"/>
      <div className="flex flex-col items-start w-full gap-3">
        <div className="flex flex-col items-center justify-center w-full gap-2 overflow-auto max-h-90">
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
