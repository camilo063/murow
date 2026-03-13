"use client";

import { useState } from "react";
import { FieldDef } from "./section-config";

interface DataTableProps {
  columns: FieldDef[];
  data: Record<string, unknown>[];
  onEdit?: (item: Record<string, unknown>) => void;
  onDelete?: (id: string) => void;
  readOnly?: boolean;
}

export default function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
  readOnly = false,
}: DataTableProps) {
  const [sortKey, setSortKey] = useState<string>("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return 1;
    if (bVal == null) return -1;
    const cmp =
      typeof aVal === "number" && typeof bVal === "number"
        ? aVal - bVal
        : String(aVal).localeCompare(String(bVal));
    return sortDir === "asc" ? cmp : -cmp;
  });

  // Show max 5 columns in table for readability, plus actions
  const visibleColumns = columns.slice(0, 5);

  const formatCell = (value: unknown, field: FieldDef) => {
    if (value == null || value === "") return <span className="text-gray-400">--</span>;
    if (field.type === "boolean") {
      return (
        <span
          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
            value ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
          }`}
        >
          {value ? "Yes" : "No"}
        </span>
      );
    }
    if (field.type === "json") {
      const str = typeof value === "string" ? value : JSON.stringify(value);
      return (
        <span className="text-xs font-mono text-gray-600 max-w-[200px] truncate block">
          {str}
        </span>
      );
    }
    const str = String(value);
    return (
      <span className="max-w-[250px] truncate block" title={str}>
        {str.length > 80 ? str.slice(0, 80) + "..." : str}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {visibleColumns.map((col) => (
                <th
                  key={col.name}
                  className="px-4 py-3 text-left font-semibold text-gray-600 cursor-pointer hover:text-gray-900 select-none whitespace-nowrap"
                  onClick={() => handleSort(col.name)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {sortKey === col.name && (
                      <span className="text-cyan-500">
                        {sortDir === "asc" ? "\u2191" : "\u2193"}
                      </span>
                    )}
                  </span>
                </th>
              ))}
              {!readOnly && (
                <th className="px-4 py-3 text-right font-semibold text-gray-600 whitespace-nowrap">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sorted.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleColumns.length + (readOnly ? 0 : 1)}
                  className="px-4 py-12 text-center text-gray-400"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              sorted.map((item) => (
                <tr
                  key={item.id as string}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {visibleColumns.map((col) => (
                    <td key={col.name} className="px-4 py-3 text-gray-700">
                      {formatCell(item[col.name], col)}
                    </td>
                  ))}
                  {!readOnly && (
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEdit?.(item)}
                          className="px-2.5 py-1 text-xs font-medium text-cyan-700 bg-cyan-50 hover:bg-cyan-100 rounded-md transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(item.id as string)}
                          className="px-2.5 py-1 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete confirmation dialog */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Confirm Delete
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this record? This action cannot be
              undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete?.(deleteId);
                  setDeleteId(null);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
