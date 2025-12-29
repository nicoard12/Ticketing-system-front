import type { Validation } from "@/api/tickets";
import { CheckCircle, X } from "lucide-react";
import { Button } from "../ui/button";

function QRConfirmation({ validation, close}: { validation: Validation | null, close: () => void}) {
  if (!validation) return null;

  return (
    <div
      className={`w-8/10 flex-1 flex flex-col items-center justify-around text-white p-6 rounded-lg ${
        validation.isValid ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {validation.isValid ? (
        <CheckCircle className="w-10 h-10 " />
      ) : (
        <X className="w-10 h-10 text-white" />
      )}

      {validation.isValid && (
        <p className="font-bold text-2xl">{validation.quantity} personas</p>
      )}
      <p className="font-medium text-lg">{validation.message}</p>

      <Button onClick={close} variant={"outline"} size={"lg"} className="text-base">Confirmar</Button>
    </div>
  );
}

export default QRConfirmation;
