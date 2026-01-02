import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Layout";
import EventAdd from "./Pages/EventAdd";
import EventEdit from "./Pages/EventEdit";
import EventPage from "./Pages/Event";
import Profile from "./Pages/Profile";
import BuyTicket from "./Pages/BuyTicket";
import Tickets from "./Pages/Tickets";
import StaffPage from "./Pages/StaffPage";
import VerifyPayment from "./Pages/VerifyPayment";


//Todo: eliminar redirect en cada ruta y agregar proteccion de rutas en este archivo
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="evento/:id" element={<EventPage />} />
          <Route path="evento/:id/fecha/:numFecha" element={<BuyTicket />} />
          <Route path="evento/:id/fecha/:numFecha/staff" element={<StaffPage />} />
          <Route path="ticket/:id" element={<VerifyPayment />} />
          <Route path="registrar-evento" element={<EventAdd />} />
          <Route path="editar-evento/:id" element={<EventEdit />} />
          <Route path="perfil" element={<Profile />} />
          <Route path="tickets" element={<Tickets />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
