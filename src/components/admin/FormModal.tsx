"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { FieldDef } from "./section-config";

interface FormModalProps {
  fields: FieldDef[];
  initialData?: Record<string, unknown> | null;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  onClose: () => void;
  title: string;
}

function ImageUpload({
  name,
  value,
  onChange,
  label,
}: {
  name: string;
  value: string;
  onChange: (url: string) => void;
  label: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Upload failed");
      }

      const { url } = await res.json();
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {/* Preview */}
      {value && (
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt={label}
            className="h-24 w-auto rounded-lg border border-gray-200 object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600"
          >
            ×
          </button>
        </div>
      )}

      {/* Upload button */}
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
          onChange={handleUpload}
          className="hidden"
          name={name}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {uploading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Subiendo...
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {value ? "Cambiar imagen" : "Subir imagen"}
            </>
          )}
        </button>
        {value && (
          <span className="text-xs text-gray-400 truncate max-w-[200px]">{value}</span>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function FormModal({
  fields,
  initialData,
  onSubmit,
  onClose,
  title,
}: FormModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // Track image field values separately
  const [imageValues, setImageValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      const imgVals: Record<string, string> = {};
      fields.forEach((field) => {
        let val = initialData[field.name];
        if (field.type === "json" && val != null && typeof val !== "string") {
          val = JSON.stringify(val, null, 2);
        }
        if (field.type === "image") {
          imgVals[field.name] = (val as string) || "";
        }
        if (val != null) {
          setValue(field.name, val);
        }
      });
      setImageValues(imgVals);
    } else {
      reset();
      setImageValues({});
    }
  }, [initialData, fields, setValue, reset]);

  const processSubmit = async (formData: Record<string, unknown>) => {
    const processed: Record<string, unknown> = {};
    fields.forEach((field) => {
      let val = formData[field.name];
      if (field.type === "number" && val != null && val !== "") {
        val = Number(val);
      }
      if (field.type === "boolean") {
        val = val === true || val === "true" || val === "on";
      }
      if (field.type === "image") {
        val = imageValues[field.name] || "";
      }
      processed[field.name] = val ?? "";
    });

    if (initialData?.id) {
      processed.id = initialData.id;
    }

    await onSubmit(processed);
  };

  const renderField = (field: FieldDef) => {
    const baseClasses =
      "w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition";

    switch (field.type) {
      case "textarea":
        return (
          <textarea
            {...register(field.name, { required: field.required })}
            rows={4}
            className={baseClasses + " resize-y"}
            placeholder={field.label}
          />
        );

      case "json":
        return (
          <textarea
            {...register(field.name, { required: field.required })}
            rows={5}
            className={baseClasses + " resize-y font-mono text-xs"}
            placeholder='["item1", "item2"]'
          />
        );

      case "number":
        return (
          <input
            type="number"
            {...register(field.name, { required: field.required })}
            className={baseClasses}
            placeholder="0"
          />
        );

      case "boolean":
        return (
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              {...register(field.name)}
              className="h-4 w-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
            />
            <span className="text-sm text-gray-600">Enabled</span>
          </div>
        );

      case "select":
        return (
          <select
            {...register(field.name, { required: field.required })}
            className={baseClasses}
          >
            <option value="">Select...</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "image":
        return (
          <ImageUpload
            name={field.name}
            value={imageValues[field.name] || ""}
            onChange={(url) => {
              setImageValues((prev) => ({ ...prev, [field.name]: url }));
              setValue(field.name, url);
            }}
            label={field.label}
          />
        );

      default:
        return (
          <input
            type="text"
            {...register(field.name, { required: field.required })}
            className={baseClasses}
            placeholder={field.label}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form body */}
        <form
          onSubmit={handleSubmit(processSubmit)}
          className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
        >
          {fields
            .filter((f) => f.name !== "createdAt" && f.name !== "updatedAt")
            .map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-0.5">*</span>
                  )}
                </label>
                {renderField(field)}
                {errors[field.name] && (
                  <p className="mt-1 text-xs text-red-500">
                    {field.label} is required.
                  </p>
                )}
              </div>
            ))}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit(processSubmit)}
            className="px-4 py-2 text-sm font-medium text-white bg-[#0B1426] hover:bg-[#162033] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting && (
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            )}
            {initialData ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
