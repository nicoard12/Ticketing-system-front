import { getEventById, type Event, type EventDate } from "@/api/events";
import { type Validation } from "@/api/tickets";
import QRConfirmation from "@/components/staff/QRConfirmation";
import QRScanner from "@/components/staff/QRScanner";
import { useUsuario } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function StaffPage() {
  const { id, numFecha } = useParams();
  const { user, contextLoading } = useUsuario();
  const [event, setEvent] = useState<Event | null>(null);
  const [showQRscanner, setShowQRscanner] = useState(true);
  const [openQRConfirmation, setOpenQRConfirmation] = useState(false);
  const [validation, setValidation] = useState<Validation | null>(null);
  const [selectedDate, setSelectedDate] = useState<EventDate | undefined>(
    undefined
  );
  const navigate = useNavigate();

  const validate = async (qrCode: string) => {
    setShowQRscanner(false);
    console.log(qrCode)
    setValidation({isValid:true, message:"Ticket valido", quantity: 2})
    //TODO try{
    // const response= await validateQR(qrCode) //devolver state isValid, message y ticket
    // setValidation(response)
    // setOpenQRConfirmation(true)
    //} catch(error){
    // toast.error(
    //   error instanceof Error
    //     ? error.message
    //     : "Error al cargar el evento. Intente nuevamente."
    // );
    // }
    setOpenQRConfirmation(true);
  };

  const closeQRConfirmation = () => {
    setOpenQRConfirmation(false);
  };

  useEffect(() => {
    if (!openQRConfirmation) setShowQRscanner(true);
  }, [openQRConfirmation]);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await getEventById(id!);
        setEvent(response);
        if (numFecha !== undefined) {
          setSelectedDate(response.fechas[parseInt(numFecha) - 1]);
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Error al cargar el evento. Intente nuevamente."
        );
      }
    };

    if (id) getEvent();
  }, [id, numFecha]);

  useEffect(() => {
    if (contextLoading) return;
    if (!user || user.rol !== "staff") {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, contextLoading]);

  const formattedDate = selectedDate?.fecha
    ? new Date(selectedDate.fecha).toLocaleString("es-AR", {
        timeZone: "America/Argentina/Buenos_Aires",
        year: "2-digit",
        month: "numeric",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="flex flex-col gap-10 items-center text-black w-full flex-1">
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-3xl font-bold">{event?.titulo}</h2>
        <p className="text-lg font-medium">{formattedDate}</p>
      </div>

      {showQRscanner && <QRScanner validate={validate} />}

      {openQRConfirmation && <QRConfirmation validation={validation} close={closeQRConfirmation}/>}
    </div>
  );
}

export default StaffPage;
