import Spinner from "@/components/Spinner";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function VerifyPayment() {
  const { id } = useParams();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        //socket
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Error al verificar el pago. Intente nuevamente."
        );
      }
    };

    if (id) verifyPayment();
  }, [id]);

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-8 bg-white rounded-xl shadow-lg text-center">
      <Spinner />
      <h1 className="text-2xl font-bold text-gray-900">
        Procesando tu pago 💳
      </h1>
      <p className="text-gray-600 max-w-sm">
        Estamos confirmando la operación. En segundos te mandamos al siguiente
        paso.
      </p>
    </div>
  );
}

export default VerifyPayment;
