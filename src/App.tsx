import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Layout";
import RegistrarEvento from "./Pages/RegistrarEvento";
import EditarEvento from "./Pages/EditarEvento";
import UnEvento from "./Pages/UnEvento";
import Profile from "./Pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="evento/:id" element={<UnEvento />} />
          <Route path="registrar-evento" element={<RegistrarEvento />} />
          <Route path="editar-evento/:id" element={<EditarEvento />} />
          <Route path="perfil" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
