import { useState } from "react";
import {
  changeTicketEmail,
  sendTicketCode,
  verifyTicketCode,
  type Ticket,
} from "@/api/tickets";
import { Button } from "../ui/button";
import { toast } from "sonner";

function ModalVerificationCode({
  ticket,
  onClose,
}: {
  ticket?: Ticket;
  onClose: () => void;
}) {
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [code, setCode] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [currentEmail, setCurrentEmail] = useState(
    ticket?.purchaserEmail || ""
  );

  const confirmarEmail = async () => {
    try {
      await verifyTicketCode(ticket!._id, code);
      onClose()
    } catch (error) {
      toast.error(error.message || "Error al verificar el código");
    }
  };

  const reenviarCodigo = async () => {
    try {
      await sendTicketCode(ticket!._id);
      toast.success("Código reenviado");
    } catch (error) {
      toast.error(error.message || "Error al reenviar el código");
    }
  };

  const cambiarEmail = async () => {
    if (!newEmail || !confirmEmail) {
      toast.error("Por favor completa ambos campos de correo");
      return;
    }

    if (newEmail !== confirmEmail) {
      toast.error("Los correos electrónicos no coinciden");
      return;
    }

    try {
      await changeTicketEmail(ticket!._id, newEmail);
      setCurrentEmail(newEmail);
      toast.success("Un nuevo código se ha enviado a tu nuevo correo");
      setNewEmail("");
      setConfirmEmail("");
      setShowChangeEmail(false);
    } catch (error) {
      toast.error(error.message || "Error al cambiar el correo electrónico");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-100 p-5">
      <div className="bg-white rounded-xl p-7 flex flex-col items-center justify-between gap-5">
        <header className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold">Verificación de email</h2>
          <p className="text-gray-600">
            Introduce el código de 6 dígitos enviado a{" "}
            <strong>{currentEmail}</strong>
          </p>
        </header>

        <main className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-3 ">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                confirmarEmail();
              }}
              className="flex flex-col gap-3"
            >
              <input
                id="code-input"
                name="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
                placeholder="Código"
                className="p-3 text-2xl rounded-lg border border-gray-200 outline-none"
              />
              <Button type="submit" size={"lg"} variant={"secondary"}>
                Confirmar
              </Button>
            </form>
          </div>

          <button
            type="button"
            onClick={reenviarCodigo}
            className="bg-transparent border-0 text-blue-600 underline cursor-pointer p-0 text-sm"
          >
            Reenviar código
          </button>

          {showChangeEmail && (
            <section className="w-full p-4 rounded-lg bg-blue-50 border border-blue-100 flex flex-col gap-2">
              <p className="text-gray-800">
                Escribe el nuevo correo para recibir el código
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  cambiarEmail();
                }}
                className="flex flex-col gap-2"
              >
                <input
                  type="email"
                  placeholder="nuevo@correo.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className=" py-2 px-3 rounded-lg border border-gray-200"
                  aria-label="Nuevo email"
                />
                <input
                  type="email"
                  placeholder="Confirma tu correo"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  className=" py-2 px-3 rounded-lg border border-gray-200"
                  aria-label="Confirmar email"
                />

                <Button type="submit" size={"lg"} variant={"secondary"}>
                  Confirmar cambio
                </Button>
              </form>
            </section>
          )}
          {showChangeEmail ? (
            <button
              type="button"
              onClick={() => setShowChangeEmail(false)}
              className="bg-transparent border-0 text-blue-600 underline cursor-pointer p-0 text-sm"
            >
              Cancelar
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowChangeEmail(true)}
              className="bg-transparent border-0 text-blue-600 underline cursor-pointer p-0 text-sm"
            >
              ¿Deseas cambiar el email para recibir el código?
            </button>
          )}
        </main>
      </div>
    </div>
  );
}

export default ModalVerificationCode;
