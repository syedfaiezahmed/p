import { useState, useEffect, useCallback } from "react";
import { AiSettingsState } from "@/lib/types/productTypes";
import { initialAiSettings } from "@/data/initialData";

const AI_STORAGE_KEY = "prospera_ai_settings_v1";
const EVENT_AI_UPDATED = "prospera_ai_updated";

export function getStoredAiSettings(): AiSettingsState {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(AI_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.aiName === "string") {
          return parsed;
        }
      }
    } catch {}
  }
  return initialAiSettings;
}

export function useAiSettings() {
  const [aiSettings, setAiSettings] = useState<AiSettingsState>(getStoredAiSettings);
  const [loading, setLoading] = useState(false);

  const refreshAiSettings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai-settings");
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setAiSettings(data.settings);
          if (typeof window !== "undefined") {
            localStorage.setItem(AI_STORAGE_KEY, JSON.stringify(data.settings));
          }
          return;
        }
      }
    } catch {}
    setAiSettings(getStoredAiSettings());
    setLoading(false);
  }, []);

  useEffect(() => {
    setAiSettings(getStoredAiSettings());

    const handleUpdate = (event: CustomEvent<AiSettingsState>) => {
      if (event.detail) {
        setAiSettings(event.detail);
      }
    };

    window.addEventListener(EVENT_AI_UPDATED as any, handleUpdate);
    return () => {
      window.removeEventListener(EVENT_AI_UPDATED as any, handleUpdate);
    };
  }, []);

  const notifyAiUpdate = (updatedSettings: AiSettingsState) => {
    setAiSettings(updatedSettings);
    if (typeof window !== "undefined") {
      localStorage.setItem(AI_STORAGE_KEY, JSON.stringify(updatedSettings));
      window.dispatchEvent(
        new CustomEvent(EVENT_AI_UPDATED, { detail: updatedSettings })
      );
    }
  };

  return {
    aiSettings,
    loading,
    refreshAiSettings,
    notifyAiUpdate,
  };
}
