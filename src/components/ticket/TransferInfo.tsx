import type { Ticket } from "@/api/tickets";
import { getUserById, type User } from "@/api/users";
import { useUsuario } from "@/context/userContext";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function TransferInfo({ ticket }: { ticket: Ticket }) {
  const { user, contextLoading } = useUsuario();
  const [transferReceived, setTransferReceived] = useState(false);
  const [transferUser, setTransferUser] = useState<User | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const getUser = async () => {
    try {
      if (transferReceived)
        setTransferUser(await getUserById(ticket.originalUserId));
      else setTransferUser(await getUserById(ticket.userId));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error al obtener el usuario de transferencia";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (contextLoading && !user) return;
    if (user!.idAuth == ticket.originalUserId) {
      setTransferReceived(false);
    } else setTransferReceived(true);
  }, [user, contextLoading]);

  return (
    ticket.originalUserId && (
      <div className="relative inline-block mt-[-8px]">
        <span
          className="flex items-center gap-1 text-xs font-semibold text-orange-400 cursor-pointer"
          onMouseEnter={() => { if (!transferUser) getUser(); setShowTooltip(true); }}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Info size={12} strokeWidth={3} className="z-10" /> Transferido
        </span>
        {showTooltip && transferUser && (
          <span className="absolute top-full left-0 mb-2 z-50 w-max max-w-[200px] whitespace-normal bg-gray-900 text-white border border-gray-700 rounded px-3 py-2 shadow-xl text-[10px] leading-tight">
            {transferReceived ? "Este ticket te lo transfirió" : "Transferiste este ticket a"}{" "}
            <span className="font-bold">{transferUser.nombre}</span>
          </span>
        )}
      </div>
    )
  );
}

export default TransferInfo;
