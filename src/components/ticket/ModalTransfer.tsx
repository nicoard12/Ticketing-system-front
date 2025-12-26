import { useState } from "react";
import { transferTicket, type Ticket } from "@/api/tickets";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";

function ModalTransfer({
  ticket,
  onClose,
  getTicketsAgain
}: {
  ticket: Ticket;
  onClose: () => void;
  getTicketsAgain: () => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const handleConfirm = async () => {
    if (email.trim() == "" || confirmEmail.trim() == "") {
        toast.error("Completa todos los campos por favor")
        return;
    }

    if (email !== confirmEmail) {
      toast.error("Los emails no coinciden");
      return;
    }
    try {
      await transferTicket(ticket._id, quantity, email);
      getTicketsAgain()
      onClose()
      toast.success("Ticket transferido")
    } catch (error) {
      toast.error(error.message || "Error al transferir el ticket");
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-100 p-5">
      <div className="flex flex-col gap-3 bg-white p-6 rounded-lg shadow-lg ">
        <h2 className="text-lg font-semibold">Transferir Ticket</h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="quantity">Cantidad a transferir</label>
          <select
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border rounded-md p-2"
          >
            {Array.from({ length: ticket.quantity }, (_, i) => i + 1).map(
              (n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              )
            )}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">
            Email del destinatario (debe ser usuario del sistema)
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="confirmEmail">Confirmar Email</label>
          <Input
            id="confirmEmail"
            type="email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleConfirm} variant={"destructive"}>
            Confirmar
          </Button>
          <Button onClick={handleCancel} variant="outline">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ModalTransfer;
