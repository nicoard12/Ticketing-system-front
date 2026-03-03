import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import type { Event } from "@/api/events";
import DateForm from "./DateForm";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Spinner from "../Spinner";
import { UploadCloud, X, Image as ImageIcon, MapPin, DollarSign, AlignLeft, Type } from "lucide-react";

type EventFormProps = {
  submit: (
    e: Omit<Event, "_id" | "createdBy">,
    imagen?: File | null
  ) => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  eventoEditable?: Event | null;
};

function EventForm({
  submit,
  loading,
  setLoading,
  eventoEditable,
}: EventFormProps) {
  const navigate = useNavigate();
  const [imagen, setImagen] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [evento, setEvento] = useState<Omit<Event, "_id" | "createdBy">>({
    titulo: "",
    fechas: [],
    descripcion: "",
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
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagen(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImagen = () => {
    setImagen(null);
    setPreviewUrl(null);
    if (!eventoEditable) {
      setEvento(prev => ({ ...prev, imagenUrl: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    if (
      !evento.titulo.trim() ||
      !evento.descripcion.trim() ||
      !evento.precioEntrada.toString().trim() ||
      !evento.ubicacion.trim() ||
      (!imagen && !eventoEditable) ||
      !evento.fechas.length ||
      evento.fechas.some(
        (f) =>
          !f ||
          (typeof f.fecha === "string" && f.fecha.trim() === "") ||
          String(f.cantidadEntradas).trim() === ""
      )
    ) {
      toast.error("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }
    if (imagen) {
      submit(evento, imagen);
    } else submit(evento);
  };

  const goBack = () => {
    if (eventoEditable) navigate(`/evento/${eventoEditable._id}`);
    else navigate("/");
  };

  useEffect(() => {
    if (eventoEditable) {
      setEvento(eventoEditable);
      setPreviewUrl(eventoEditable.imagenUrl);
    }
  }, [eventoEditable]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-5xl flex flex-col p-6 sm:p-10 gap-8 bg-white text-black rounded-2xl shadow-xl border border-gray-200 animate-in fade-in zoom-in duration-500"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
        <div className="flex flex-col gap-6 w-full">
          <div className="space-y-2">
            <label className="text-sm font-bold flex items-center gap-2 text-slate-700">
              <Type size={16} className="text-primary" /> Título del evento
            </label>
            <Input
              type="text"
              value={evento.titulo}
              placeholder="Ej: Festival de Rock 2026"
              className="bg-gray-50 border-gray-300 focus:border-primary/50 transition-all py-6 text-lg text-black placeholder:text-gray-400"
              name="titulo"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold flex items-center gap-2 text-slate-700">
              <AlignLeft size={16} className="text-primary" /> Descripción
            </label>
            <Textarea
              placeholder="Describe los detalles del evento..."
              value={evento.descripcion}
              className="bg-gray-50 border-gray-300 focus:border-primary/50 transition-all min-h-[120px] resize-none text-black placeholder:text-gray-400"
              name="descripcion"
              maxLength={500}
              onChange={handleChange}
            />
            <div className="flex justify-end">
              <span
                className={`text-xs font-mono font-medium ${evento.descripcion.length >= 500
                  ? "text-destructive font-bold"
                  : "text-gray-500"
                  }`}
              >
                {evento.descripcion.length}/500
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center gap-2 text-slate-700">
                <DollarSign size={16} className="text-primary" /> Precio Entrada
              </label>
              <Input
                type="number"
                value={evento.precioEntrada}
                placeholder="0.00"
                className="bg-gray-50 border-gray-300 focus:border-primary/50 transition-all text-black placeholder:text-gray-400"
                name="precioEntrada"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center gap-2 text-slate-700">
                <MapPin size={16} className="text-primary" /> Ubicación
              </label>
              <Input
                type="text"
                value={evento.ubicacion}
                placeholder="Ciudad, Estadio, Teatro..."
                className="bg-gray-50 border-gray-300 focus:border-primary/50 transition-all text-black placeholder:text-gray-400"
                name="ubicacion"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 w-full">
          <div className="space-y-3">
            <label className="text-sm font-bold flex items-center gap-2 text-slate-700">
              <ImageIcon size={16} className="text-primary" /> Imagen del evento
            </label>
            <div
              className={`relative border-2 border-dashed rounded-xl transition-all duration-300 group ${previewUrl ? "border-transparent" : "border-gray-300 hover:border-primary/30 bg-gray-50"
                }`}
            >
              {previewUrl ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-md border border-gray-200">
                  <img
                    src={previewUrl}
                    alt="Vista previa"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <label className="cursor-pointer bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2 rounded-full transition-transform hover:scale-110">
                      <UploadCloud size={24} />
                      <input type="file" accept="image/*" onChange={changeImagen} className="hidden" />
                    </label>
                    <button
                      type="button"
                      onClick={removeImagen}
                      className="bg-destructive/80 hover:bg-destructive backdrop-blur-md text-white p-2 rounded-full transition-transform hover:scale-110"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-video cursor-pointer py-10">
                  <div className="p-4 bg-primary/10 rounded-full text-primary mb-3 group-hover:scale-110 transition-transform">
                    <UploadCloud size={32} />
                  </div>
                  <p className="text-sm font-bold text-slate-800">Haz clic para subir imagen</p>
                  <p className="text-xs text-slate-500 mt-1">Soporta: JPG, PNG, WEBP</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={changeImagen}
                    name="imagen"
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <DateForm setEvento={setEvento} fechasEditables={evento.fechas} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6 border-t border-gray-100 min-h-[80px]">
        {loading ? (
          <Spinner size="md" className="text-secondary" />
        ) : (
          <>
            <Button
              type="button"
              onClick={goBack}
              variant="outline"
              size="lg"
              className="w-full sm:w-40 border-gray-300 hover:bg-gray-100 text-slate-600"
              data-cy="cancel-button"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="w-full sm:w-48 shadow-lg shadow-secondary/20 font-bold"
            >
              Aceptar y Guardar
            </Button>
          </>
        )}
      </div>
    </form>
  );
}

export default EventForm;
