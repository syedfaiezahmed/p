"use client";

import { useState } from "react";
import { Product } from "@/lib/types/productTypes";
import { formatPrice, DEAL_TAG_OPTIONS } from "@/data/initialData";
import { Flame, Tag, Percent, Sparkles, Check, Edit } from "lucide-react";

interface DealsTabProps {
  products: Product[];
  onSaveProduct: (product: Product) => void;
}

export default function DealsTab({ products, onSaveProduct }: DealsTabProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [dealTag, setDealTag] = useState("Corporate Special");
  const [dealDiscount, setDealDiscount] = useState<number>(20);

  const handleToggleDeal = (product: Product) => {
    const isNowDeal = !product.isDeal;
    const newOldPrice = isNowDeal && !product.oldPrice ? Math.round(product.price * 1.25) : product.oldPrice;
    const updated: Product = {
      ...product,
      isDeal: isNowDeal,
      dealTag: isNowDeal ? product.dealTag || "Corporate Special" : undefined,
      oldPrice: newOldPrice,
    };
    onSaveProduct(updated);
  };

  const handleSaveDealDetails = () => {
    if (!selectedProduct) return;
    const calcPrice = selectedProduct.oldPrice
      ? Math.round(selectedProduct.oldPrice * (1 - dealDiscount / 100))
      : Math.round(selectedProduct.price * (1 - dealDiscount / 100));

    const updated: Product = {
      ...selectedProduct,
      isDeal: true,
      dealTag,
      price: calcPrice,
      discount: dealDiscount,
    };
    onSaveProduct(updated);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <Flame className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Promotional Campaigns & Flash Deals</h2>
            <p className="text-xs text-slate-400">
              Highlight featured consulting tiers, limited-time audit discounts, and special bundles.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of items */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => {
          const isDealActive = Boolean(p.isDeal);
          return (
            <div
              key={p.id}
              className={`flex flex-col justify-between rounded-2xl border p-4 transition-all ${
                isDealActive
                  ? "border-amber-500/50 bg-slate-900/95 shadow-lg shadow-amber-500/5"
                  : "border-slate-800 bg-slate-900/70"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                    {p.category}
                  </span>
                  <button
                    onClick={() => handleToggleDeal(p)}
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold transition-colors ${
                      isDealActive
                        ? "bg-amber-500 text-slate-950"
                        : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    {isDealActive ? "Deal Active" : "Activate Deal"}
                  </button>
                </div>

                <h3 className="font-bold text-white text-sm mt-1">{p.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-slate-400">{p.description}</p>
              </div>

              <div className="mt-4 border-t border-slate-800 pt-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Current Rate: </span>
                    <span className="font-bold text-white">{formatPrice(p.price)}</span>
                    {p.oldPrice && (
                      <span className="ml-2 text-xs text-slate-500 line-through">
                        {formatPrice(p.oldPrice)}
                      </span>
                    )}
                  </div>

                  {isDealActive && (
                    <button
                      onClick={() => {
                        setSelectedProduct(p);
                        setDealTag(p.dealTag || "Corporate Special");
                        setDealDiscount(p.discount || 20);
                      }}
                      className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-slate-300 hover:border-amber-500/50 hover:text-white"
                    >
                      <Edit className="h-3 w-3" />
                      <span>Edit Tag</span>
                    </button>
                  )}
                </div>

                {isDealActive && p.dealTag && (
                  <div className="mt-2 inline-flex items-center gap-1 rounded bg-rose-600/20 px-2 py-0.5 text-[10px] font-bold text-rose-400 border border-rose-600/30">
                    <Tag className="h-3 w-3" />
                    <span>{p.dealTag}</span>
                    {p.discount && <span>• {p.discount}% OFF</span>}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Deal Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-1">
              Configure Deal: {selectedProduct.name}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Set the badge style and promo discount percentage.
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Deal Badge Label</label>
                <select
                  value={dealTag}
                  onChange={(e) => setDealTag(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                >
                  {DEAL_TAG_OPTIONS.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Discount Percentage ({dealDiscount}%)
                </label>
                <input
                  type="range"
                  min="5"
                  max="70"
                  step="5"
                  value={dealDiscount}
                  onChange={(e) => setDealDiscount(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <div className="flex justify-between text-slate-300">
                  <span>Simulated Special Price:</span>
                  <span className="font-bold text-amber-400">
                    {formatPrice(
                      Math.round(
                        (selectedProduct.oldPrice || selectedProduct.price) *
                          (1 - dealDiscount / 100)
                      )
                    )}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="rounded-xl border border-slate-700 px-4 py-2 font-semibold text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveDealDetails}
                  className="rounded-xl bg-amber-500 px-4 py-2 font-bold text-slate-950 hover:bg-amber-400"
                >
                  Apply Deal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
