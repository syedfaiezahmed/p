"use client";

import { useState } from "react";
import { ConsultingService } from "@/lib/types/inquiryTypes";
import {
  PlusCircle,
  Edit,
  Trash2,
  Search,
  CheckCircle2,
  X,
  Briefcase,
} from "lucide-react";

interface ServicesTabProps {
  services: ConsultingService[];
  onSaveService: (service: ConsultingService) => void;
  onDeleteService: (id: string | number) => void;
}

export const SERVICE_CATEGORIES = [
  "Corporate Advisory",
  "Accounting & Compliance",
  "Statutory HR & Payroll",
  "Digital Transformation",
  "Tax Advisory & ZATCA",
  "Risk & Treasury Management",
];

export default function ServicesTab({
  services,
  onSaveService,
  onDeleteService,
}: ServicesTabProps) {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<ConsultingService>>({
    title: "",
    slug: "",
    category: SERVICE_CATEGORIES[0],
    shortDescription: "",
    fullDescription: "",
    deliverables: [],
    engagementDuration: "Monthly Retainer",
    pricingTier: "Starting SAR 3,999/mo",
    featured: true,
    active: true,
  });
  const [newDeliverable, setNewDeliverable] = useState("");
  const [deleteId, setDeleteId] = useState<string | number | null>(null);

  const filtered = services.filter((s) => {
    const matchSearch =
      search.trim() === "" ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase());

    const matchCat = selectedCat === "all" || s.category === selectedCat;
    return matchSearch && matchCat;
  });

  const handleOpenAdd = () => {
    setEditForm({
      id: `serv-${Date.now()}`,
      title: "",
      slug: "",
      category: SERVICE_CATEGORIES[0],
      shortDescription: "",
      fullDescription: "",
      deliverables: ["Initial scope definition & onboarding", "Monthly management reporting"],
      engagementDuration: "Monthly Retainer",
      pricingTier: "Custom Quote",
      featured: true,
      active: true,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (s: ConsultingService) => {
    setEditForm({ ...s });
    setIsEditing(true);
  };

  const handleAddDeliverable = () => {
    if (!newDeliverable.trim()) return;
    setEditForm((prev) => ({
      ...prev,
      deliverables: [...(prev.deliverables || []), newDeliverable.trim()],
    }));
    setNewDeliverable("");
  };

  const handleRemoveDeliverable = (idx: number) => {
    setEditForm((prev) => ({
      ...prev,
      deliverables: prev.deliverables?.filter((_, i) => i !== idx),
    }));
  };

  const handleSave = () => {
    if (!editForm.title) return;
    const slug = editForm.slug || editForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const finalService: ConsultingService = {
      id: editForm.id || `serv-${Date.now()}`,
      title: editForm.title,
      slug,
      category: editForm.category || SERVICE_CATEGORIES[0],
      shortDescription: editForm.shortDescription || "",
      fullDescription: editForm.fullDescription || editForm.shortDescription || "",
      deliverables: editForm.deliverables || [],
      engagementDuration: editForm.engagementDuration || "Monthly Retainer",
      pricingTier: editForm.pricingTier || "Custom Advisory",
      featured: editForm.featured ?? true,
      active: editForm.active ?? true,
      image: editForm.image || "/images/Bookkeeping Services.jpg",
    };

    onSaveService(finalService);
    setIsEditing(false);
  };

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search practice areas and deliverables..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/80 py-2 pl-9 pr-4 text-xs text-white placeholder-slate-400 focus:border-[#8A1650] focus:outline-none"
            />
          </div>

          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 focus:border-[#8A1650] focus:outline-none"
          >
            <option value="all">All Practice Categories</option>
            {SERVICE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#8A1650] hover:bg-[#6e1240] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Practice Area</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-sm transition-all hover:border-slate-700"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-md bg-slate-800 border border-slate-700 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                  {s.category}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(s)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500 hover:text-white"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteId(s.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-rose-900/40 bg-rose-950/20 text-rose-300 hover:bg-rose-900/40"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="text-base font-bold text-white mt-2.5">{s.title}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{s.shortDescription}</p>

              {/* Key Deliverables */}
              {s.deliverables && s.deliverables.length > 0 && (
                <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950/60 p-3 space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                    Core Deliverables:
                  </span>
                  {s.deliverables.map((d, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 block">Engagement Model:</span>
                <span className="font-medium text-slate-300">{s.engagementDuration || "Monthly Retainer"}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block">Advisory Fee:</span>
                <span className="font-semibold text-white">{s.pricingTier || "Custom Quote"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-7 text-white shadow-2xl">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-base font-bold mb-4">
              {editForm.id && services.some((s) => s.id === editForm.id)
                ? "Edit Practice Area"
                : "Add New Practice Area"}
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-300 mb-1">Service Title</label>
                <input
                  type="text"
                  value={editForm.title || ""}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  placeholder="e.g. ZATCA E-Invoicing Phase 2 Audit & Filing"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-white focus:border-[#8A1650] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-300 mb-1">Category</label>
                  <select
                    value={editForm.category || SERVICE_CATEGORIES[0]}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-[#8A1650] focus:outline-none"
                  >
                    {SERVICE_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">Pricing Tier</label>
                  <input
                    type="text"
                    value={editForm.pricingTier || ""}
                    onChange={(e) => setEditForm({ ...editForm, pricingTier: e.target.value })}
                    placeholder="e.g. Starting SAR 4,500/mo"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-[#8A1650] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editForm.shortDescription || ""}
                  onChange={(e) => setEditForm({ ...editForm, shortDescription: e.target.value })}
                  placeholder="Summary of the consulting practice..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white focus:border-[#8A1650] focus:outline-none"
                />
              </div>

              {/* Deliverables */}
              <div>
                <label className="block font-medium text-slate-300 mb-1">Deliverables</label>
                <div className="space-y-1.5 mb-2">
                  {editForm.deliverables?.map((deliv, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg bg-slate-950 border border-slate-800 px-3 py-1.5"
                    >
                      <span className="text-slate-300">{deliv}</span>
                      <button
                        onClick={() => handleRemoveDeliverable(idx)}
                        className="text-slate-500 hover:text-rose-400"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newDeliverable}
                    onChange={(e) => setNewDeliverable(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddDeliverable()}
                    placeholder="Add deliverable point..."
                    className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-white focus:border-[#8A1650] focus:outline-none"
                  />
                  <button
                    onClick={handleAddDeliverable}
                    className="rounded-xl bg-slate-800 px-3 py-1.5 font-semibold text-slate-200 hover:bg-slate-700"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl border border-slate-700 px-4 py-2 font-medium text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="rounded-xl bg-[#8A1650] hover:bg-[#6e1240] px-4 py-2 font-semibold text-white shadow"
                >
                  Save Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center text-white">
            <Trash2 className="mx-auto h-8 w-8 text-rose-400 mb-2" />
            <h3 className="text-sm font-bold">Remove Practice Area?</h3>
            <p className="text-xs text-slate-400 mt-1 mb-5">
              This service will be removed from your active consulting catalog.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-slate-700 px-3.5 py-1.5 text-xs font-medium text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteService(deleteId);
                  setDeleteId(null);
                }}
                className="rounded-lg bg-rose-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-rose-500"
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
