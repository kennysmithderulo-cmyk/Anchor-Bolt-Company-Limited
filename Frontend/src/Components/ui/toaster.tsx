import { useEffect, useState } from "react"

type ToastItem = {
  id: string
  title?: string
  description?: string
}

const TOAST_EVENT = "anchor-bolt:toast"

export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  useEffect(() => {
    const handleToast = (event: Event) => {
      const detail = (event as CustomEvent<ToastItem>).detail
      if (!detail?.id) return

      setToasts((current) => [...current, detail])

      setTimeout(() => {
        setToasts((current) =>
          current.filter((toast) => toast.id !== detail.id)
        )
      }, 5000)
    }

    window.addEventListener(TOAST_EVENT, handleToast)
    return () => window.removeEventListener(TOAST_EVENT, handleToast)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="rounded-lg border bg-background p-4 shadow-lg"
        >
          {toast.title && (
            <div className="font-semibold text-foreground">{toast.title}</div>
          )}
          {toast.description && (
            <div className="text-sm text-muted-foreground">
              {toast.description}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export function showToast(title: string, description?: string) {
  window.dispatchEvent(
    new CustomEvent<ToastItem>(TOAST_EVENT, {
      detail: {
        id: crypto.randomUUID(),
        title,
        description,
      },
    })
  )
}

export default Toaster