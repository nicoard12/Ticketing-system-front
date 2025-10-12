import React from "react";
import { Button } from "./ui/button";
import type { Evento } from "@/api/eventos";

type ModalProps = {
  evento: Evento | null;
  cancelar: (value: React.SetStateAction<boolean>) => void;
  confirmar: () => Promise<void>;
  deleting: boolean;
};

function Modal({ evento, cancelar, confirmar, deleting }: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl border-2 border-gray-300">
        <h3 className="text-lg font-bold mb-4">Confirmar eliminación</h3>
        <p className="mb-6">
          ¿Estás seguro que deseas eliminar el evento "{evento?.titulo}"? Esta
          acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-3">
          {deleting ? (
            <Button variant="outline" className="cursor-pointer">
              Eliminando...
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={cancelar}
                className="cursor-pointer"
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={confirmar}
                className="cursor-pointer"
              >
                Eliminar
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
