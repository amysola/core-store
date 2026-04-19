import rawCatalog from '../data/catalog.json'

const assetGlob = import.meta.glob<{ default: string }>(
  '../assets/**/*.webp',
  { eager: true },
)

const imageByRelPath = new Map<string, string>()
for (const [key, mod] of Object.entries(assetGlob)) {
  const i = key.indexOf('assets/')
  if (i !== -1) imageByRelPath.set(key.slice(i + 'assets/'.length), mod.default)
}

function imageUrl(rel: string): string {
  const u = imageByRelPath.get(rel)
  if (!u) throw new Error(`Missing image: ${rel}`)
  return u
}

export type Product = {
  id: string
  name: string
  category: string
  spec: string
  price: number
}

export type ShowcaseVariant = {
  id: string
  label: string
  hex: string
  ringClass?: string
  image: string
}

export type ShowcaseProduct = Product & {
  showcase: { variants: ShowcaseVariant[] }
}

type Row = {
  id: string
  name: string
  category: string
  spec: string
  price: number
  variants: {
    id: string
    label: string
    hex: string
    img: string
    ring?: string
  }[]
}

const rows = rawCatalog as Row[]

export const SHOWCASE_PRODUCTS: ShowcaseProduct[] = rows.map((p) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  spec: p.spec,
  price: p.price,
  showcase: {
    variants: p.variants.map((v) => ({
      id: v.id,
      label: v.label,
      hex: v.hex,
      ringClass: v.ring,
      image: imageUrl(v.img),
    })),
  },
}))

export const PRODUCTS: Product[] = SHOWCASE_PRODUCTS.map(
  ({ id, name, category, spec, price }) => ({
    id,
    name,
    category,
    spec,
    price,
  }),
)
