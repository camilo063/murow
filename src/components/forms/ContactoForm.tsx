"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactoSchema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  email: z.string().email("Email invalido"),
  company: z.string().min(1, "Empresa requerida"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactoFormData = z.infer<typeof contactoSchema>;

export default function ContactoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactoFormData>({
    resolver: zodResolver(contactoSchema),
  });

  const onSubmit = async (data: ContactoFormData) => {
    setServerError("");
    try {
      const res = await fetch("/api/contacto", {
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
      <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
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
        <h3 className="mb-3 text-xl font-bold" style={{ color: "#0A2540" }}>
          Mensaje enviado
        </h3>
        <p style={{ color: "#4A5568" }}>
          Gracias por contactarnos. Te responderemos en las proximas 24 horas habiles.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[#0A2540] placeholder-gray-400 outline-none transition focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20";
  const labelClass = "mb-1.5 block text-sm font-medium text-[#0A2540]";
  const errorClass = "mt-1 text-xs text-red-500";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl bg-white p-8 shadow-lg"
      noValidate
    >
      <h3 className="mb-6 text-xl font-bold" style={{ color: "#0A2540" }}>
        Enviar mensaje
      </h3>

      {serverError && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {serverError}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label className={labelClass}>Nombre *</label>
          <input
            type="text"
            placeholder="Tu nombre"
            className={inputClass}
            {...register("name")}
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Email *</label>
          <input
            type="email"
            placeholder="tu@empresa.com"
            className={inputClass}
            {...register("email")}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Empresa *</label>
          <input
            type="text"
            placeholder="Nombre de tu empresa o medio"
            className={inputClass}
            {...register("company")}
          />
          {errors.company && (
            <p className={errorClass}>{errors.company.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Mensaje *</label>
          <textarea
            rows={5}
            placeholder="Como podemos ayudarte?"
            className={inputClass}
            {...register("message")}
          />
          {errors.message && (
            <p className={errorClass}>{errors.message.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-lg px-8 py-4 text-base font-bold text-white transition hover:brightness-110 disabled:opacity-60"
        style={{ background: "#FF6B35" }}
      >
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
