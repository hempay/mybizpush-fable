import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

interface Toast {
  id: number;
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

const ToastContext = createContext<{
  toast: (t: Omit<Toast, "id">) => void;
}>({ toast: () => {} });

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const toast = useCallback((t: Omit<Toast, "id">) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 4500);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[10000] flex flex-col gap-3 max-w-sm w-[calc(100%-3rem)]">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded-xl border px-5 py-4 backdrop-blur-xl shadow-2xl animate-toast-in ${
              t.variant === "destructive"
                ? "border-red-500/40 bg-red-950/80"
                : "border-magenta/40 bg-ink-3/90"
            }`}
          >
            <p className="font-display font-semibold text-sm text-bone">
              {t.title}
            </p>
            {t.description && (
              <p className="text-xs text-ash mt-1 leading-relaxed">
                {t.description}
              </p>
            )}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-toast-in { animation: toast-in 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </ToastContext.Provider>
  );
}
