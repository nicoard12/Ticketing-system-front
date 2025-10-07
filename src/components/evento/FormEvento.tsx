import React, { useState } from "react";
import { Button } from "../ui/button";
import type { Evento } from "@/api/eventos";
import FechasForm from "./FechasForm";
import { uploadImage } from "../../helpers/cloudinary.ts";

type FormEventoProps = {
  submit: (e: Omit<Evento, "_id">) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  children?: React.ReactNode;
};

function FormEvento({
  submit,
  loading,
  setLoading,
  setError,
  children,
}: FormEventoProps) {
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
      !imagen ||
      !evento.fechas.length ||
      evento.fechas.some(
        (f: unknown) => !f || (typeof f === "string" && !f.trim())
      )
    ) {
      setError("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }
    const imageCloudinary = await uploadImage(imagen);
    if (imageCloudinary == "error") {
      setError("Error del servidor, intentelo mas tarde.");
      setLoading(false);
    } else submit({ ...evento, imagenUrl: imageCloudinary });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-3 sm:p-8 gap-3 items-center bg-secondary text-white rounded-lg"
    >
      <div className="flex flex-col sm:flex-row gap-10 sm:gap-20">
        {/* Columna izquierda */}
        <div className="flex flex-col gap-8 flex-1 rounded w-full sm:w-1/2">
          <input
            type="text"
            value={evento.titulo}
            placeholder="Título del evento"
            className="p-2 border rounded "
            name="titulo"
            onChange={handleChange}
          />
          <textarea
            placeholder="Descripción"
            value={evento.descripcion}
            className="p-2 border rounded  min-h-[80px]"
            name="descripcion"
            onChange={handleChange}
          />
          <input
            type="number"
            value={evento.cantidadEntradas}
            placeholder="N° entradas por fecha"
            className="p-2 border rounded "
            name="cantidadEntradas"
            onChange={handleChange}
          />
          <input
            type="number"
            value={evento.precioEntrada}
            placeholder="Precio de las entradas"
            className="p-2 border rounded "
            name="precioEntrada"
            onChange={handleChange}
          />
          <input
            type="text"
            value={evento.ubicacion}
            placeholder="Lugar del evento"
            className="p-2 border rounded w-full "
            name="ubicacion"
            onChange={handleChange}
          />
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col items-end gap-8 w-full sm:w-1/2">
          <div className="w-full flex flex-col items-start">
            <label className="block mb-1">Foto del evento</label>
              {imagen && (
                <div className="my-3 flex justify-center">
                  <img
                    src={URL.createObjectURL(imagen)}
                    alt="Vista previa"
                    className="max-h-32 rounded shadow"
                  />
                </div>
              )}
            <label className="inline-block bg-background text-black p-2 rounded-md cursor-pointer hover:bg-accent transition">
              {imagen ? "Cambiar imagen" : "Subir imagen"}
              <input
                type="file"
                accept="image/*"
                onChange={changeImagen}
                className="hidden"
              />
            </label>
          </div>

          <FechasForm setEvento={setEvento} />
        </div>
      </div>

      {children}

      {loading ? (
        <Button type="button" variant={"outline"} className="text-black mt-3">
          Creando evento...
        </Button>
      ) : (
        <Button type="submit" size={"lg"} className="cursor-pointer mt-3">
          Aceptar
        </Button>
      )}
    </form>
  );
}

export default FormEvento;
