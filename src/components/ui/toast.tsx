"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

type ToastType = "success" | "error" | "info";

export type Toast = {
  id: string;
  title?: string;
  description?: string;
  type?: ToastType;
  durationMs?: number;
};

type ToastContextValue = {
  notify: (toast: Omit<Toast, "id">) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    ({ title, description, type = "info", durationMs = 3000 }: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).slice(2);
      const t: Toast = { id, title, description, type, durationMs };
      setToasts((prev) => [...prev, t]);
      window.setTimeout(() => remove(id), durationMs);
    },
    [remove]
  );

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className="pointer-events-none fixed inset-0 z-[200] flex items-start justify-end p-4">
          <div className="flex w-full max-w-sm flex-col gap-2">
            <AnimatePresence initial={false}>
              {toasts.map((t) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={[
                    "pointer-events-auto rounded-md border p-3 shadow-lg backdrop-blur-sm",
                    t.type === "success" && "border-emerald-300/40 bg-emerald-50/80 dark:bg-emerald-950/40",
                    t.type === "error" && "border-red-300/40 bg-red-50/80 dark:bg-red-950/40",
                    t.type === "info" && "border-slate-300/40 bg-white/80 dark:bg-neutral-900/60",
                  ].filter(Boolean).join(" ")}
                  role="status"
                >
                  {t.title && (
                    <div className="text-sm font-medium leading-none">{t.title}</div>
                  )}
                  {t.description && (
                    <div className="mt-1 text-sm text-muted-foreground">{t.description}</div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}




