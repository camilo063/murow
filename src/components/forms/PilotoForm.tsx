"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const pilotoSchema = z.object({
  fullName: z.string().min(2, "Nombre requerido"),
  mediaName: z.string().min(2, "Nombre del medio requerido"),
  position: z.string().min(1, "Selecciona tu cargo"),
  email: z.string().email("Email invalido"),
  country: z.string().min(2, "Pais requerido"),
  pageViews: z.string().min(1, "Selecciona rango de page views"),
  currentCms: z.string().min(1, "Selecciona tu CMS"),
  hasSubscription: z.string().min(1, "Selecciona una opcion"),
  challenge: z.string().optional(),
});

type PilotoFormData = z.infer<typeof pilotoSchema>;

const positionOptions = [
  "Director Digital",
  "CTO",
  "Editor",
  "CEO",
  "Otro",
];

const pageViewOptions = [
  "< 100K",
  "100K-500K",
  "500K-1M",
  "> 1M",
];

const cmsOptions = [
  "Strapi",
  "WordPress",
  "Ghost",
  "Otro",
];

const subscriptionOptions = [
  "Si",
  "No",
  "En evaluacion",
];

export default function PilotoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PilotoFormData>({
    resolver: zodResolver(pilotoSchema),
  });

  const onSubmit = async (data: PilotoFormData) => {
    setServerError("");
    try {
      const res = await fetch("/api/piloto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Error al enviar el formulario");
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setServerError(
        err instanceof Error ? err.message : "Error inesperado. Intenta de nuevo."
      );
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-lg md:p-12">
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: "#00B4D8" }}
        >
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-3 text-2xl font-bold" style={{ color: "#0A2540" }}>
          Solicitud recibida
        </h3>
        <p className="mb-6 text-lg" style={{ color: "#4A5568" }}>
          Nuestro equipo revisara tu solicitud y te contactara en las proximas 24 horas
          habiles para agendar la llamada de kickoff.
        </p>
        <div className="mx-auto max-w-md rounded-xl p-6" style={{ background: "#F0F7FF" }}>
          <h4 className="mb-3 font-semibold" style={{ color: "#0A2540" }}>
            Proximos pasos:
          </h4>
          <ol className="space-y-2 text-left text-sm" style={{ color: "#4A5568" }}>
            <li className="flex gap-2">
              <span className="font-bold" style={{ color: "#00B4D8" }}>1.</span>
              Recibiras un email de confirmacion
            </li>
            <li className="flex gap-2">
              <span className="font-bold" style={{ color: "#00B4D8" }}>2.</span>
              Agendaremos una llamada de descubrimiento
            </li>
            <li className="flex gap-2">
              <span className="font-bold" style={{ color: "#00B4D8" }}>3.</span>
              Preparamos tu entorno en 48h
            </li>
            <li className="flex gap-2">
              <span className="font-bold" style={{ color: "#00B4D8" }}>4.</span>
              Arrancamos el piloto de 30 días
            </li>
          </ol>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[#0A2540] placeholder-gray-400 outline-none transition focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20";
  const selectClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[#0A2540] outline-none transition focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20";
  const labelClass = "mb-1.5 block text-sm font-medium text-[#0A2540]";
  const errorClass = "mt-1 text-xs text-red-500";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl bg-white p-8 shadow-lg md:p-10"
      noValidate
    >
      <h3 className="mb-6 text-xl font-bold" style={{ color: "#0A2540" }}>
        Completa tus datos
      </h3>

      {serverError && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {serverError}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {/* Nombre completo */}
        <div>
          <label className={labelClass}>Nombre completo *</label>
          <input
            type="text"
            placeholder="Juan Perez"
            className={inputClass}
            {...register("fullName")}
          />
          {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
        </div>

        {/* Nombre del medio */}
        <div>
          <label className={labelClass}>Nombre del medio *</label>
          <input
            type="text"
            placeholder="El Diario Digital"
            className={inputClass}
            {...register("mediaName")}
          />
          {errors.mediaName && <p className={errorClass}>{errors.mediaName.message}</p>}
        </div>

        {/* Cargo */}
        <div>
          <label className={labelClass}>Cargo *</label>
          <select className={selectClass} {...register("position")}>
            <option value="">Selecciona...</option>
            {positionOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.position && <p className={errorClass}>{errors.position.message}</p>}
        </div>

        {/* Email corporativo */}
        <div>
          <label className={labelClass}>Email corporativo *</label>
          <input
            type="email"
            placeholder="juan@medio.com"
            className={inputClass}
            {...register("email")}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        {/* Pais */}
        <div>
          <label className={labelClass}>Pais *</label>
          <input
            type="text"
            placeholder="Colombia"
            className={inputClass}
            {...register("country")}
          />
          {errors.country && <p className={errorClass}>{errors.country.message}</p>}
        </div>

        {/* Page Views mensuales */}
        <div>
          <label className={labelClass}>Page Views mensuales *</label>
          <select className={selectClass} {...register("pageViews")}>
            <option value="">Selecciona...</option>
            {pageViewOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.pageViews && <p className={errorClass}>{errors.pageViews.message}</p>}
        </div>

        {/* CMS actual */}
        <div>
          <label className={labelClass}>CMS actual *</label>
          <select className={selectClass} {...register("currentCms")}>
            <option value="">Selecciona...</option>
            {cmsOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.currentCms && (
            <p className={errorClass}>{errors.currentCms.message}</p>
          )}
        </div>

        {/* Modelo de suscripciones */}
        <div>
          <label className={labelClass}>Modelo de suscripciones *</label>
          <select className={selectClass} {...register("hasSubscription")}>
            <option value="">Selecciona...</option>
            {subscriptionOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.hasSubscription && (
            <p className={errorClass}>{errors.hasSubscription.message}</p>
          )}
        </div>
      </div>

      {/* Mayor desafio */}
      <div className="mt-5">
        <label className={labelClass}>Mayor desafio (opcional)</label>
        <textarea
          rows={4}
          placeholder="Cuentanos cual es tu mayor reto para monetizar contenido digital..."
          className={inputClass}
          {...register("challenge")}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 w-full rounded-lg px-8 py-4 text-base font-bold text-white transition hover:brightness-110 disabled:opacity-60"
        style={{ background: "#FF6B35" }}
      >
        {isSubmitting ? "Enviando..." : "Solicitar mi piloto gratuito"}
      </button>

      <p className="mt-4 text-center text-xs" style={{ color: "#4A5568" }}>
        Al enviar, aceptas nuestra{" "}
        <a href="/privacidad" className="underline" style={{ color: "#00B4D8" }}>
          Politica de Privacidad
        </a>
        .
      </p>
    </form>
  );
}
