"use client";

import { useState } from "react";
import { Product } from "@/lib/types/productTypes";
import { formatPrice, CATEGORIES, DEAL_TAG_OPTIONS } from "@/data/initialData";
import {
  PlusCircle,
  Edit,
  Trash2,
  Search,
  UploadCloud,
  Check,
  X,
  Sparkles,
  Layers,
  Tag,
  Percent,
} from "lucide-react";
import { optimizeImageFile } from "@/lib/stores/productsStore";

interface CatalogTabProps {
  products: Product[];
  onSaveProduct: (product: Product) => void;
  onDeleteProduct: (id: string | number) => void;
}

export default function CatalogTab({
  products,
  onSaveProduct,
  onDeleteProduct,
}: CatalogTabProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Add / Edit Modal state
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState<Partial<Product>>({
    name: "",
    category: CATEGORIES[0],
    price: 999,
    oldPrice: 1200,
    rating: 4.8,
    description: "",
    image: "/images/Bookkeeping Services.jpg",
    stockCount: 50,
    inStock: true,
    badge: "Featured",
    isDeal: false,
    dealTag: "Flash Sale",
  });
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isCompressing, setIsCompressing] = useState(false);

  // Delete modal
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | number | null>(null);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    const matchesCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleOpenAdd = () => {
    setEditProduct({
      id: Date.now(),
      name: "",
      category: CATEGORIES[0],
      price: 1500,
      oldPrice: 2000,
      rating: 4.9,
      description: "",
      image: "/images/Bookkeeping Services.jpg",
      stockCount: 50,
      inStock: true,
      badge: "New Service",
      isDeal: false,
      dealTag: "Corporate Special",
    });
    setImagePreview("/images/Bookkeeping Services.jpg");
    setIsEditing(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditProduct({ ...p });
    setImagePreview(p.image);
    setIsEditing(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      const optimized = await optimizeImageFile(file, 900, 0.85);
      setImagePreview(optimized);
      setEditProduct((prev) => ({ ...prev, image: optimized }));
    } catch (err) {
      console.error("Error optimizing image:", err);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleSave = () => {
    if (!editProduct.name || !editProduct.price) return;
    const finalProduct: Product = {
      id: editProduct.id || Date.now(),
      name: editProduct.name,
      category: editProduct.category || CATEGORIES[0],
      price: Number(editProduct.price),
      oldPrice: editProduct.oldPrice ? Number(editProduct.oldPrice) : undefined,
      discount:
        editProduct.oldPrice && editProduct.oldPrice > editProduct.price
          ? Math.round(((editProduct.oldPrice - editProduct.price) / editProduct.oldPrice) * 100)
          : undefined,
      rating: editProduct.rating || 4.9,
      description: editProduct.description || "",
      image: editProduct.image || imagePreview || "/images/Bookkeeping Services.jpg",
      stockCount: Number(editProduct.stockCount) || 50,
      inStock: editProduct.inStock ?? true,
      badge: editProduct.badge,
      isDeal: editProduct.isDeal,
      dealTag: editProduct.dealTag,
      featured: editProduct.featured ?? true,
    };

    onSaveProduct(finalProduct);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 sm:flex-row sm:items-center sm:justify-between backdrop-blur-sm">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search catalog by service, product, category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/90 py-2 pl-9 pr-4 text-xs text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 focus:border-amber-500 focus:outline-none"
          >
            <option value="all">All Portfolio Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add New Package / Item</span>
        </button>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-4 transition-all hover:border-slate-700 backdrop-blur-sm"
          >
            <div>
              {/* Image & Badges */}
              <div className="relative h-44 w-full overflow-hidden rounded-xl bg-slate-950">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute left-2 top-2 flex flex-wrap gap-1">
                  {p.badge && (
                    <span className="rounded-md bg-amber-500/90 px-2 py-0.5 text-[10px] font-bold text-slate-950 shadow">
                      {p.badge}
                    </span>
                  )}
                  {p.isDeal && (
                    <span className="rounded-md bg-rose-600/90 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                      {p.dealTag || "Promo Deal"}
                    </span>
                  )}
                </div>

                <span className="absolute bottom-2 right-2 rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-semibold text-slate-300 backdrop-blur">
                  ★ {p.rating || "4.9"}
                </span>
              </div>

              {/* Title & Category */}
              <div className="mt-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                  {p.category}
                </span>
                <h3 className="line-clamp-1 font-bold text-white text-sm mt-0.5">{p.name}</h3>
                <p className="line-clamp-2 mt-1 text-xs text-slate-400 leading-relaxed">
                  {p.description}
                </p>
              </div>
            </div>

            {/* Price & Actions footer */}
            <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-extrabold text-white">{formatPrice(p.price)}</span>
                  {p.oldPrice && (
                    <span className="text-xs text-slate-500 line-through">
                      {formatPrice(p.oldPrice)}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-500">
                  {p.inStock ? `Available (${p.stockCount || 50} slots)` : "Archived"}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(p)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:border-amber-500/50 hover:text-white"
                  title="Edit Package"
                >
                  <Edit className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(p.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-rose-900/50 bg-rose-950/30 text-rose-400 hover:bg-rose-900/50 hover:text-white"
                  title="Delete Package"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-base font-bold text-white mb-4">
              {editProduct.id && products.some((p) => p.id === editProduct.id)
                ? "Edit Service / Catalog Item"
                : "Add New Package / Service"}
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Title / Package Name</label>
                <input
                  type="text"
                  value={editProduct.name || ""}
                  onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                  placeholder="e.g. Comprehensive Financial Audit & Compliance"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={editProduct.category || CATEGORIES[0]}
                    onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Badge / Tag</label>
                  <input
                    type="text"
                    value={editProduct.badge || ""}
                    onChange={(e) => setEditProduct({ ...editProduct, badge: e.target.value })}
                    placeholder="e.g. Most Popular / Executive"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Price (SAR)</label>
                  <input
                    type="number"
                    value={editProduct.price || 0}
                    onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Original Price (SAR)</label>
                  <input
                    type="number"
                    value={editProduct.oldPrice || 0}
                    onChange={(e) => setEditProduct({ ...editProduct, oldPrice: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Description & Scope</label>
                <textarea
                  rows={3}
                  value={editProduct.description || ""}
                  onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                  placeholder="Details on deliverables, duration, compliance scope..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Featured Image</label>
                <div className="flex items-center gap-4">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-16 w-16 rounded-xl object-cover border border-slate-700"
                    />
                  )}
                  <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-slate-600 bg-slate-800/60 px-4 py-3 hover:border-amber-500">
                    <UploadCloud className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-300">
                      {isCompressing ? "Compressing WebP..." : "Upload & Optimize Image"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl border border-slate-700 px-4 py-2 font-semibold text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="rounded-xl bg-amber-500 px-5 py-2 font-bold text-slate-950 hover:bg-amber-400"
                >
                  Save to Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-center">
            <Trash2 className="mx-auto h-10 w-10 text-rose-400 mb-3" />
            <h3 className="text-base font-bold text-white">Delete Item from Portfolio?</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              This will remove this service/product from live listings.
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteProduct(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-500"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
