import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import EventAdd from "./pages/EventAdd";
import EventEdit from "./pages/EventEdit";
import EventPage from "./pages/Event";
import BuyTicket from "./pages/BuyTicket";
import Tickets from "./pages/Tickets";
import StaffPage from "./pages/StaffPage";
import VerifyPayment from "./pages/VerifyPayment";

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
          <Route path="tickets" element={<Tickets />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
