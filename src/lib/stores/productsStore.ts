import { useState, useEffect, useCallback } from "react";
import { Product } from "@/lib/types/productTypes";
import { initialProducts } from "@/data/initialData";

const CATALOG_STORAGE_KEY = "prospera_admin_catalog_v1";
const EVENT_PRODUCTS_UPDATED = "prospera_products_updated";

let globalProductsCache: Product[] = initialProducts;
let isInitialized = false;

function initializeCache() {
  if (isInitialized || typeof window === "undefined") return;
  try {
    const saved = localStorage.getItem(CATALOG_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        globalProductsCache = parsed;
      } else {
        localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(initialProducts));
      }
    } else {
      localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(initialProducts));
    }
  } catch {}
  isInitialized = true;
}

export function optimizeImageFile(
  file: File,
  maxDim = 800,
  quality = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.type === "image/svg+xml" || file.size < 20 * 1024) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        let dataUrl = canvas.toDataURL("image/webp", quality);
        if (!dataUrl.startsWith("data:image/webp")) {
          dataUrl = canvas.toDataURL("image/jpeg", quality);
        }
        resolve(dataUrl);
      };
      img.onerror = () => {
        resolve(reader.result as string);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function getStoredProducts(): Product[] {
  initializeCache();
  return globalProductsCache;
}

export function useProducts() {
  initializeCache();
  const [productsList, setProductsList] = useState<Product[]>(globalProductsCache);
  const [loading, setLoading] = useState(false);

  const refreshProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.products) && data.products.length > 0) {
          globalProductsCache = data.products;
          setProductsList(data.products);
          if (typeof window !== "undefined") {
            localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(data.products));
          }
          return;
        }
      }
    } catch {}
    initializeCache();
    setProductsList(globalProductsCache);
    setLoading(false);
  }, []);

  useEffect(() => {
    initializeCache();
    setProductsList(globalProductsCache);

    const handleUpdate = (event: CustomEvent<Product[]>) => {
      if (event.detail && Array.isArray(event.detail)) {
        globalProductsCache = event.detail;
        setProductsList(event.detail);
      }
    };

    window.addEventListener(EVENT_PRODUCTS_UPDATED as any, handleUpdate);
    return () => {
      window.removeEventListener(EVENT_PRODUCTS_UPDATED as any, handleUpdate);
    };
  }, []);

  const notifyUpdate = (updatedList: Product[]) => {
    globalProductsCache = updatedList;
    setProductsList(updatedList);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(updatedList));
      } catch {}
      window.dispatchEvent(
        new CustomEvent(EVENT_PRODUCTS_UPDATED, { detail: updatedList })
      );
    }
  };

  return {
    products: productsList,
    loading,
    refreshProducts,
    notifyUpdate,
  };
}
