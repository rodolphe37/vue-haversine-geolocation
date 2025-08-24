import type { TLocationHistory } from "../types";

const KEY = "geo-history";

export const loadFromLocalStorage = async (): Promise<TLocationHistory | null> => {
  const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
  return raw ? (JSON.parse(raw) as TLocationHistory) : null;
};

export const saveToLocalStorage = async (h: TLocationHistory): Promise<void> => {
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(h));
  }
};
