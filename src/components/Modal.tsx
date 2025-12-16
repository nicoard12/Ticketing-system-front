import React from "react";
import { Button } from "./ui/button";
import type { EventResponse } from "@/api/events";

type ModalProps = {
  evento: EventResponse | null;
  cancelar: () => void;
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
            <p className="bg-gray-100 rounded shadow p-3">
              Eliminando...
            </p>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={cancelar}
                id="cancel-deletion"
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={confirmar}
                id="confirm-deletion"
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
