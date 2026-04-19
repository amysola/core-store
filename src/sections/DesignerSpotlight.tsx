import { useEffect, useState } from 'react'
import sonyBlack from '../assets/products/sony_wh1000xm6_black.webp'
import sonyBlue from '../assets/products/sony_wh1000xm6_blue.webp'
import sonyPink from '../assets/products/sony_wh1000xm6_pink.webp'
import sonyWhite from '../assets/products/sony_wh1000xm6_white.webp'

const SLIDES = [
  {
    src: sonyWhite,
    color: 'White',
    dot: '#e4e4e7',
    labelClass: 'text-zinc-500',
    messageClass: 'text-zinc-800',
    nameClass: 'text-zinc-600',
    message: 'Clarity in light tones.',
  },
  {
    src: sonyBlack,
    color: 'Black',
    dot: '#27272a',
    labelClass: 'text-zinc-500',
    messageClass: 'text-zinc-900',
    nameClass: 'text-zinc-700',
    message: 'Depth in every shade.',
  },
  {
    src: sonyBlue,
    color: 'Blue',
    dot: '#3d5a8c',
    labelClass: 'text-blue-900/70',
    messageClass: 'text-blue-950',
    nameClass: 'text-blue-900/80',
    message: 'Cool notes, warm sound.',
  },
  {
    src: sonyPink,
    color: 'Pink',
    dot: '#d4a5b8',
    labelClass: 'text-rose-900/65',
    messageClass: 'text-rose-950',
    nameClass: 'text-rose-900/75',
    message: 'Color that follows the beat.',
  },
] as const

const ROTATE_MS = 3800

export function DesignerSpotlight() {
  const [i, setI] = useState(0)
  const theme = SLIDES[i]!

  useEffect(() => {
    const t = window.setInterval(() => {
      setI((n) => (n + 1) % SLIDES.length)
    }, ROTATE_MS)
    return () => window.clearInterval(t)
  }, [])

  return (
    <section
      className="mt-6 scroll-mt-24 sm:mt-8"
      aria-labelledby="designer-spotlight-heading"
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:items-stretch lg:gap-6">
        <div className="relative flex min-h-0 w-full flex-col overflow-hidden rounded-[1.5rem] border border-white/60 bg-gradient-to-br from-zinc-100 via-white to-zinc-200 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.18)] lg:h-full lg:max-w-none">
          <div className="relative z-10 shrink-0 px-4 pb-1 pt-4 sm:px-5 sm:pt-5">
            <p
              className={`text-[0.6rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 sm:text-[0.65rem] ${theme.labelClass}`}
            >
              Image in color
            </p>
            <p
              className={`mt-1 text-sm font-semibold tracking-tight transition-colors duration-500 sm:text-base ${theme.messageClass}`}
            >
              {theme.message}
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <span
                className="size-2 rounded-full ring-2 ring-white/80 shadow-sm transition-colors duration-500"
                style={{ backgroundColor: theme.dot }}
                aria-hidden
              />
              <span
                className={`text-xs font-medium transition-colors duration-500 ${theme.nameClass}`}
              >
                {theme.color}
              </span>
            </div>
          </div>

          <div className="relative z-0 flex min-h-[9.5rem] flex-1 items-center justify-center px-2 pb-4 pt-1 sm:min-h-[11rem] sm:px-3 sm:pb-5">
            <div className="relative h-[9rem] w-full sm:h-[10.5rem] lg:h-[11rem]">
              {SLIDES.map((slide, idx) => (
                <img
                  key={slide.color}
                  src={slide.src}
                  alt={`Sony WH-1000XM6 — ${slide.color}`}
                  width={640}
                  height={640}
                  className={`absolute inset-0 m-auto h-full w-full max-h-full max-w-full object-contain object-center drop-shadow-[0_24px_50px_rgba(15,23,42,0.22)] transition-opacity duration-700 ease-out ${
                    idx === i ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="glass-panel flex min-h-0 flex-col justify-center rounded-[1.5rem] p-6 sm:p-8 lg:h-full lg:p-9">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-zinc-400 sm:text-[0.65rem]">
            About Core
          </p>
          <h2
            id="designer-spotlight-heading"
            className="mt-2 font-serif text-xl font-medium leading-snug tracking-tight text-zinc-900 sm:text-2xl"
          >
            The best gear, one coherent setup.
            <span className="block text-zinc-500">No compromise on what sits on your desk.</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-600">
            Core is a specialty store built around a simple promise: we stock only
            standout tech—the products that lead their category—so you can assemble a
            complete, harmonious setup without second-guessing every purchase. Less
            noise, fewer returns, and a workspace you can rely on.
          </p>
        </div>
      </div>
    </section>
  )
}
