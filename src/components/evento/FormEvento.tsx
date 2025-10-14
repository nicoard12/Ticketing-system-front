import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import type { Evento } from "@/api/eventos";
import FechasForm from "./FechasForm";
import { useNavigate } from "react-router-dom";

type FormEventoProps = {
  submit: (e: Omit<Evento, "_id">, imagen?: File | null) => Promise<void>
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  eventoEditable?: Evento | null;
  children?: React.ReactNode;
};

function FormEvento({
  submit,
  loading,
  setLoading,
  setError,
  children,
  eventoEditable,
}: FormEventoProps) {
  const navigate = useNavigate();
  const [imagen, setImagen] = useState<File | null>(null);
  const [evento, setEvento] = useState<Omit<Evento, "_id">>({
    titulo: "",
    fechas: [],
    descripcion: "",
    cantidadEntradas: "",
    precioEntrada: "",
    ubicacion: "",
    imagenUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEvento((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    setLoading(true);
    e.preventDefault();
    if (
      !evento.titulo.trim() ||
      !evento.descripcion.trim() ||
      !evento.cantidadEntradas.toString().trim() ||
      !evento.precioEntrada.toString().trim() ||
      !evento.ubicacion.trim() ||
      (!imagen && !eventoEditable) ||
      !evento.fechas.length ||
      evento.fechas.some(
        (f: unknown) => !f || (typeof f === "string" && !f.trim())
      )
    ) {
      setError("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }
    if (imagen) {
      submit(evento, imagen)
    } else submit(evento);
  };

  const goBack = () => {
    if (eventoEditable) navigate(`/evento/${eventoEditable._id}`);
    else navigate("/");
  };

  useEffect(() => {
    if (eventoEditable) {
      setEvento({
        ...eventoEditable,
        fechas: eventoEditable.fechas.map((f) => f.fecha),
      });
    }
  }, [eventoEditable]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full sm:w-6/10 flex flex-col p-3 sm:p-8 gap-5 items-center bg-white text-black rounded-lg shadow border border-gray-300"
    >
      <div className="flex flex-col gap-10 w-full">
        {/* Columna izquierda */}
        <div className="flex flex-col gap-8 flex-1 rounded w-full">
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Título del evento</label>
            <input
              type="text"
              value={evento.titulo}
              placeholder="Título del evento"
              className="p-2 border rounded"
              name="titulo"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Descripción</label>
            <textarea
              placeholder="Descripción"
              value={evento.descripcion}
              className="p-2 border rounded min-h-[80px]"
              name="descripcion"
              maxLength={500}
              onChange={handleChange}
            />
            <span
              className={`text-sm self-end ${
                evento.descripcion.length >= 500
                  ? "text-red-500 font-semibold"
                  : "text-gray-500"
              }`}
            >
              {evento.descripcion.length}/500
            </span>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">N° entradas por fecha</label>
            <input
              type="number"
              value={evento.cantidadEntradas}
              placeholder="N° entradas por fecha"
              className="p-2 border rounded"
              name="cantidadEntradas"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Precio de las entradas</label>
            <input
              type="number"
              value={evento.precioEntrada}
              placeholder="Precio de las entradas"
              className="p-2 border rounded"
              name="precioEntrada"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Lugar del evento</label>
            <input
              type="text"
              value={evento.ubicacion}
              placeholder="Lugar del evento"
              className="p-2 border rounded w-full"
              name="ubicacion"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col items-end gap-8 w-full sm:w-1/2">
          <div className="w-full flex flex-col items-start">
            <label className="block mb-1 font-medium">Foto del evento</label>
            {imagen ? (
              <div className="my-3 flex justify-center">
                <img
                  src={URL.createObjectURL(imagen)}
                  alt="Vista previa"
                  className="max-h-32 rounded shadow"
                />
              </div>
            ) : eventoEditable?.imagenUrl ? (
              <div className="my-3 flex justify-center">
                <img
                  src={eventoEditable.imagenUrl}
                  alt="Vista previa"
                  className="max-h-32 rounded shadow"
                />
              </div>
            ) : null}
            <label className="inline-block bg-primary text-sm font-medium text-white p-2.5 rounded-md cursor-pointer hover:bg-primary/90 transition">
              {imagen || eventoEditable?.imagenUrl
                ? "Cambiar imagen"
                : "Subir imagen"}
              <input
                type="file"
                accept="image/*"
                onChange={changeImagen}
                className="hidden"
              />
            </label>
          </div>

          <FechasForm setEvento={setEvento} fechasEditables={evento.fechas} />
        </div>
      </div>

      {children}

      {loading ? (
        <Button type="button" variant={"outline"} className="text-black mt-3">
          {eventoEditable ? "Guardando..." : "Creando evento..."}
        </Button>
      ) : (
        <div className="flex gap-3">
          <Button
            type="button"
            onClick={goBack}
            variant={"outline"}
            size={"lg"}
            className="cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant={"secondary"}
            size={"lg"}
            className="cursor-pointer"
          >
            Aceptar
          </Button>
        </div>
      )}
    </form>
  );
}

export default FormEvento;
