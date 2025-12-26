import type { User } from '@/api/users';
import { Button } from '@/components/ui/button';

type ModalUserConfirmation={
    selectedRole: string;
    current_role: string;
    user: User
    confirm: () => void;
    cancel: () => void;
}

function ModalUserConfirmation({selectedRole, user, current_role, confirm, cancel} : ModalUserConfirmation) {

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl border-2 border-gray-300">
        <h3 className="text-lg font-bold mb-4">Confirmar cambio de rol</h3>
        <p className="mb-6">
          ¿Estás seguro que deseas cambiar el rol de <span className="font-semibold">{user.nombre}</span> de <span className="font-semibold uppercase">{current_role}</span> a <span className="font-semibold uppercase">{selectedRole}</span>?
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={cancel}
            id="cancel-role-change"
          >
            Cancelar
          </Button>
          <Button
            variant="default"
            onClick={confirm}
            id="confirm-role-change"
          >
            Cambiar rol
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ModalUserConfirmation
