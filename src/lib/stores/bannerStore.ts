import { useState, useEffect, useCallback } from "react";
import { PromoBanner } from "@/lib/types/productTypes";
import { initialBanner } from "@/data/initialData";

const BANNER_STORAGE_KEY = "prospera_promo_banner_v1";
const EVENT_BANNER_UPDATED = "prospera_banner_updated";

export function getStoredBanner(): PromoBanner {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(BANNER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.imageUrl === "string") {
          return parsed;
        }
      }
    } catch {}
  }
  return initialBanner;
}

export function useBanner() {
  const [banner, setBanner] = useState<PromoBanner>(getStoredBanner);
  const [loading, setLoading] = useState(false);

  const refreshBanner = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/banner");
      if (res.ok) {
        const data = await res.json();
        if (data.banner) {
          setBanner(data.banner);
          if (typeof window !== "undefined") {
            localStorage.setItem(BANNER_STORAGE_KEY, JSON.stringify(data.banner));
          }
          return;
        }
      }
    } catch {}
    setBanner(getStoredBanner());
    setLoading(false);
  }, []);

  useEffect(() => {
    setBanner(getStoredBanner());

    const handleUpdate = (event: CustomEvent<PromoBanner>) => {
      if (event.detail) {
        setBanner(event.detail);
      }
    };

    window.addEventListener(EVENT_BANNER_UPDATED as any, handleUpdate);
    return () => {
      window.removeEventListener(EVENT_BANNER_UPDATED as any, handleUpdate);
    };
  }, []);

  const notifyBannerUpdate = (updatedBanner: PromoBanner) => {
    setBanner(updatedBanner);
    if (typeof window !== "undefined") {
      localStorage.setItem(BANNER_STORAGE_KEY, JSON.stringify(updatedBanner));
      window.dispatchEvent(
        new CustomEvent(EVENT_BANNER_UPDATED, { detail: updatedBanner })
      );
    }
  };

  return {
    banner,
    loading,
    refreshBanner,
    notifyBannerUpdate,
  };
}
