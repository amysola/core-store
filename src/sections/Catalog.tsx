import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { ShowcaseProduct } from './catalogData'
import { SHOWCASE_PRODUCTS } from './catalogData'

function formatPrice(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}

function ProductCard({
  product,
  onAddToCart,
}: {
  product: ShowcaseProduct
  onAddToCart: (id: string) => void
}) {
  const { showcase } = product
  const [active, setActive] = useState(0)
  const variant = showcase.variants[active] ?? showcase.variants[0]

  return (
    <article className="group flex flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-[0_24px_70px_-28px_rgba(15,23,42,0.18)] ring-1 ring-zinc-100/80 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_32px_80px_-24px_rgba(15,23,42,0.22)] sm:rounded-[3rem]">
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-zinc-50/80 to-white">
        <img
          src={variant.image}
          alt={`${product.name} — ${variant.label}`}
          className="h-full w-full object-contain object-center p-5 transition-opacity duration-300 sm:p-6"
          width={640}
          height={640}
        />
        {/* Light fade at bottom only — keeps product visible */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/50 from-0% via-white/[0.08] via-[32%] to-transparent to-[55%]"
          aria-hidden
        />
        <button
          type="button"
          onClick={() => onAddToCart(product.id)}
          className="absolute right-4 top-4 z-10 flex size-12 items-center justify-center rounded-full bg-white text-zinc-900 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.2)] ring-1 ring-zinc-100 transition-transform hover:scale-105 active:scale-95 sm:right-5 sm:top-5"
          aria-label={`Add ${product.name} to cart`}
        >
          <ArrowUpRight className="size-5" strokeWidth={2} />
        </button>
      </div>

      <div className="flex flex-col px-6 pb-7 pt-2 sm:px-8 sm:pb-8">
        <div className="mb-5 flex flex-wrap gap-2.5">
          {showcase.variants.map((v, i) => {
            const selected = i === active
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setActive(i)}
                title={v.label}
                className={`size-9 rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.35)] ring-2 ring-offset-2 ring-offset-white transition-transform hover:scale-105 ${
                  selected
                    ? 'ring-zinc-900 scale-105'
                    : 'ring-transparent hover:ring-zinc-300'
                } ${v.ringClass ?? ''}`}
                style={{ backgroundColor: v.hex }}
                aria-label={`Color ${v.label}`}
                aria-pressed={selected}
              />
            )
          })}
        </div>

        <h3 className="text-2xl font-bold leading-tight tracking-tight text-zinc-900">
          {product.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">
          {product.spec}
        </p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="text-lg font-bold tabular-nums text-zinc-900">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={() => onAddToCart(product.id)}
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}

type CatalogProps = {
  search: string
  onAddToCart: (productId: string) => void
}

export function Catalog({ search, onAddToCart }: CatalogProps) {
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return SHOWCASE_PRODUCTS
    return SHOWCASE_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.spec.toLowerCase().includes(q),
    )
  }, [search])

  return (
    <section id="catalog" className="mt-14 scroll-mt-28">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
            Catalog
          </h2>
          <p className="text-sm text-zinc-500">
            {filtered.length === SHOWCASE_PRODUCTS.length
              ? 'Featured gear · colorways in stock'
              : `${filtered.length} product${filtered.length === 1 ? '' : 's'} match your search`}
          </p>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-[2rem] border border-zinc-200/80 bg-white/50 px-6 py-12 text-center text-sm text-zinc-500 backdrop-blur-sm">
          No products match “{search.trim()}”. Try another search.
        </p>
      ) : (
        <ul className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:gap-12">
          {filtered.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} onAddToCart={onAddToCart} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
