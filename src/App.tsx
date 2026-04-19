import { useMemo, useState } from 'react'
import { Hero } from './sections/Hero'
import { Nav } from './components/Nav'
import { Cart } from './components/Cart'
import { DesignerSpotlight } from './sections/DesignerSpotlight'
import { RayTracingCompare } from './sections/RayTracingCompare'
import { Catalog } from './sections/Catalog'
import type { Product } from './sections/catalogData'
import { PRODUCTS } from './sections/catalogData'

function formatPrice(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}

export default function App() {
  const [cart, setCart] = useState<Record<string, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [search, setSearch] = useState('')

  const cartLines = useMemo(() => {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const p = PRODUCTS.find((x) => x.id === id)
        if (!p || qty <= 0) return null
        return { product: p, qty }
      })
      .filter(Boolean) as { product: Product; qty: number }[]
  }, [cart])

  const cartCount = cartLines.reduce((s, l) => s + l.qty, 0)
  const subtotal = cartLines.reduce((s, l) => s + l.product.price * l.qty, 0)

  function addToCart(id: string) {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }))
    setCartOpen(true)
  }

  function setQty(id: string, qty: number) {
    setCart((c) => {
      const next = { ...c }
      if (qty <= 0) delete next[id]
      else next[id] = qty
      return next
    })
  }

  return (
    <>
      <div className="min-h-svh pb-10">
        <div className="mx-auto max-w-[1280px] px-4 pt-5 sm:px-6 lg:px-8">
          <Nav
            search={search}
            onSearchChange={setSearch}
            cartCount={cartCount}
            onOpenCart={() => setCartOpen(true)}
          />

          <div className="mt-5 flex flex-col gap-5">
            <Hero />
          </div>

          <DesignerSpotlight />

          <RayTracingCompare />

          <Catalog search={search} onAddToCart={addToCart} />

          <footer className="mt-14 flex flex-col gap-4 border-t border-zinc-200/80 pt-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-medium text-zinc-700">core.</p>
            <p>© {new Date().getFullYear()} Core. All rights reserved.</p>
          </footer>
        </div>
      </div>

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={cartLines}
        subtotal={subtotal}
        formatPrice={formatPrice}
        onSetQty={setQty}
      />
    </>
  )
}
