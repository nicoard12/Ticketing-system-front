import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

function ModalTicketConfirmation({onClose}: {onClose: () => void}) {
  const navigate = useNavigate();



  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-100 p-5">
      <div className="bg-white rounded-xl p-7 flex flex-col items-center justify-between gap-5 max-w-md w-full text-black">
        <header className="flex flex-col gap-1 text-center">
          <h2 className="text-2xl font-bold">¡Listo!</h2>
        </header>

        <main className="text-center text-gray-700">
          <p>
            Hemos enviado un código QR a tu email que será solicitado para poder
            entrar al evento
          </p>
        </main>

        <footer className="w-full flex justify-center">
          <Button type="button" onClick={onClose} size="lg">
            Aceptar
          </Button>
        </footer>
      </div>
    </div>
  );
}

export default ModalTicketConfirmation;
