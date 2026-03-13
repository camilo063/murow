"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { sectionConfigs } from "@/components/admin/section-config";
import DataTable from "@/components/admin/DataTable";
import FormModal from "@/components/admin/FormModal";

export default function AdminSectionPage() {
  const params = useParams();
  const section = params.section as string;
  const config = sectionConfigs[section];

  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Record<string, unknown> | null>(
    null
  );

  const fetchData = useCallback(async () => {
    if (!config) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(config.endpoint);
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
    } catch {
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, [config]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!config) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-gray-900">
          Section not found
        </h2>
        <p className="text-gray-500 mt-2">
          The section &quot;{section}&quot; does not exist.
        </p>
      </div>
    );
  }

  const handleCreate = () => {
    setEditItem(null);
    setModalOpen(true);
  };

  const handleEdit = (item: Record<string, unknown>) => {
    setEditItem(item);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${config.endpoint}?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      await fetchData();
    } catch {
      alert("Failed to delete record.");
    }
  };

  const handleSubmit = async (formData: Record<string, unknown>) => {
    try {
      const isEdit = !!formData.id;
      const res = await fetch(config.endpoint, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to save");
      }
      setModalOpen(false);
      setEditItem(null);
      await fetchData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save record.");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1426]">{config.title}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {data.length} record{data.length !== 1 ? "s" : ""}
          </p>
        </div>
        {!config.readOnly && (
          <button
            onClick={handleCreate}
            className="px-4 py-2 text-sm font-medium text-white bg-[#0B1426] hover:bg-[#162033] rounded-lg transition-colors flex items-center gap-2"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New
          </button>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <svg
            className="animate-spin h-6 w-6 text-gray-400 mx-auto mb-3"
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
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 rounded-xl border border-red-200 p-6 text-center">
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={fetchData}
            className="mt-3 px-4 py-1.5 text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      ) : (
        <DataTable
          columns={config.fields}
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          readOnly={config.readOnly}
        />
      )}

      {/* Modal */}
      {modalOpen && (
        <FormModal
          fields={config.fields}
          initialData={editItem}
          onSubmit={handleSubmit}
          onClose={() => {
            setModalOpen(false);
            setEditItem(null);
          }}
          title={editItem ? `Edit ${config.title}` : `New ${config.title}`}
        />
      )}
    </div>
  );
}
