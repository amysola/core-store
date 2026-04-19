import { useEffect } from 'react'
import { X } from 'lucide-react'
import type { Product } from '../sections/catalogData'

export type CartLine = { product: Product; qty: number }

type CartProps = {
  open: boolean
  onClose: () => void
  lines: CartLine[]
  subtotal: number
  formatPrice: (n: number) => string
  onSetQty: (id: string, qty: number) => void
}

export function Cart({
  open,
  onClose,
  lines,
  subtotal,
  formatPrice,
  onSetQty,
}: CartProps) {
  
  // Lock body scroll & handle Escape key when open
  useEffect(() => {
    if (!open) return
    
    // Disable scrolling
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    window.addEventListener('keydown', onKey)
    return () => {
      // Re-enable scrolling on close
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div
      className={`fixed inset-0 z-50 h-[100dvh] transition-[visibility] duration-300 ease-out motion-reduce:transition-none ${
        open ? 'visible' : 'invisible'
      }`}
      aria-hidden={!open}
    >
      <div className="relative flex h-full justify-end p-3">
        {/* Backdrop */}
        <button
          type="button"
          className={`absolute inset-0 cursor-default border-0 bg-zinc-950/40 backdrop-blur-sm transition-opacity duration-300 ease-out motion-reduce:transition-none ${
            open ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          aria-label="Close cart"
          onClick={onClose}
        />
        
        {/* Panel */}
        <aside
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-title"
          inert={!open ? true : undefined}
          className={`glass-panel relative z-10 flex h-full w-full max-w-md shrink-0 flex-col overflow-hidden !rounded-[1.75rem] shadow-2xl !bg-white/[0.82] transition-transform duration-300 ease-out motion-reduce:transition-none ${
            open ? 'translate-x-0' : 'pointer-events-none translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-zinc-200/70 px-5 py-4">
            <h2 id="cart-title" className="text-lg font-bold text-zinc-900">
              Your cart
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-white/70 hover:text-zinc-900"
              aria-label="Close"
            >
              <X className="size-5" strokeWidth={2.25} />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
            {lines.length === 0 ? (
              <p className="text-sm text-zinc-500">Your cart is empty.</p>
            ) : (
              <ul className="space-y-3">
                {lines.map(({ product: p, qty }) => (
                  <li
                    key={p.id}
                    className="flex gap-4 rounded-2xl border border-zinc-200/70 bg-white/50 p-4 backdrop-blur-sm"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-zinc-900">{p.name}</p>
                      <p className="text-xs text-zinc-500">{p.category}</p>
                      <p className="mt-2 text-sm tabular-nums text-zinc-600">
                        {formatPrice(p.price)} × {qty}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <input
                        type="number"
                        min={0}
                        value={qty}
                        onChange={(e) => {
                          const v = Number.parseInt(e.target.value, 10)
                          onSetQty(p.id, Number.isFinite(v) ? Math.max(0, v) : 0)
                        }}
                        className="w-14 rounded-xl border border-zinc-200 bg-white/80 px-2 py-1.5 text-center text-sm text-zinc-900"
                      />
                      <button
                        type="button"
                        onClick={() => onSetQty(p.id, 0)}
                        className="text-xs font-medium text-zinc-500 underline-offset-2 hover:text-zinc-800 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-zinc-200/70 p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">Subtotal</span>
              <span className="font-bold tabular-nums text-zinc-900">
                {formatPrice(subtotal)}
              </span>
            </div>
            <button
              type="button"
              disabled={lines.length === 0}
              className="mt-4 w-full rounded-full bg-zinc-900 py-3.5 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-35 hover:enabled:opacity-90"
            >
              Checkout
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}