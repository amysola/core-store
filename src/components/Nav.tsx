import { Search, ShoppingBag } from 'lucide-react'

type NavProps = {
  search: string
  onSearchChange: (value: string) => void
  cartCount: number
  onOpenCart: () => void
}

export function Nav({ search, onSearchChange, cartCount, onOpenCart }: NavProps) {
  return (
    <header className="glass-panel !rounded-full mb-5 flex flex-nowrap items-center gap-2 px-3 py-1.5 sm:gap-3 sm:px-5 sm:py-2">
      <a
        href="#"
        className="flex shrink-0 items-baseline gap-0.5 whitespace-nowrap no-underline"
      >
        <span className="text-lg font-bold leading-none tracking-tight text-zinc-900 sm:text-xl">
          Core
        </span>
      </a>

      <div className="glass-pill flex min-w-0 flex-1 items-center gap-1.5 py-1 pl-2.5 pr-1 sm:gap-2 sm:pl-3 sm:pr-1.5">
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="min-w-0 flex-1 border-0 bg-transparent text-sm leading-tight text-zinc-800 outline-none placeholder:text-zinc-400"
        />
        <button
          type="button"
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white transition-transform hover:scale-105 active:scale-95 sm:size-9"
          aria-label="Search"
        >
          <Search className="size-3.5" strokeWidth={2.25} />
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={onOpenCart}
          className="glass-pill relative flex size-9 items-center justify-center text-zinc-800 transition-colors hover:bg-white/80"
          aria-label="Open cart"
        >
          <ShoppingBag className="size-[1.05rem]" strokeWidth={2} />
          {cartCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-[#d4f06d] text-[9px] font-bold text-zinc-900 ring-2 ring-white">
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
