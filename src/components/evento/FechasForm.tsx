import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react"; // icono de tacho
import type { Evento } from "@/api/eventos";

type FechasFormProps = {
  setEvento: React.Dispatch<React.SetStateAction<Omit<Evento, "_id">>>;
};

function FechasForm({ setEvento }: FechasFormProps) {
  const [fechas, setFechas] = useState<string[]>([""]);

  const agregarFecha = () => {
    setFechas([...fechas, ""]);
  };

  const cambiarFecha = (index: number, value: string) => {
    const nuevasFechas = [...fechas];
    nuevasFechas[index] = value;
    setFechas(nuevasFechas);
    setEvento((prev) => ({
      ...prev,
      fechas: nuevasFechas.map((f) => new Date(f)),
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

  return (
    <div className="flex flex-col items-start w-full gap-1">
      <label>Fechas</label>

      <div className="flex flex-col items-start w-full gap-3">
        <div className="flex flex-col items-start gap-2 overflow-auto max-h-50">
          {fechas.map((fecha, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="datetime-local"
                className="p-2 border rounded flex-1"
                value={fecha}
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
          variant="outline"
          type="button"
          className="cursor-pointer text-black"
          onClick={agregarFecha}
        >
          Agregar fecha
        </Button>
      </div>
    </div>
  );
}

export default FechasForm;
