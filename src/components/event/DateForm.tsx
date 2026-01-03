import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Event, EventDate } from "@/api/events";
import DateAndTicketsForm from "./DateAndTicketsForm";

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
    <div className="flex flex-col items-start w-full gap-1">
      <label htmlFor="fecha" className="font-semibold">
        Fechas
      </label>
      <hr className="w-full mb-2"/>
      <div className="flex flex-col items-start w-full gap-3">
        <div className="flex flex-col w-full items-start lg:items-center gap-4 sm:gap-2 overflow-auto max-h-90">
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
