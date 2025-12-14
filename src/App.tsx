import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Layout";
import EventAdd from "./Pages/EventAdd";
import EventEdit from "./Pages/EventEdit";
import Event from "./Pages/Event";
import Profile from "./Pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="evento/:id" element={<Event />} />
          <Route path="registrar-evento" element={<EventAdd />} />
          <Route path="editar-evento/:id" element={<EventEdit />} />
          <Route path="perfil" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
