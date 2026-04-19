import { ArrowUpRight, Cpu } from 'lucide-react'
import rtxImage from '../assets/products/RTX5090.webp'

export function Hero() {
  return (
    <section
      className="glass-panel relative w-full overflow-hidden p-5 sm:p-6 lg:p-7"
      aria-labelledby="hero-heading"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-6 lg:gap-8">
        <div className="flex min-w-0 flex-1 basis-0 flex-col">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/70 bg-white/55 px-2.5 py-1 text-[0.7rem] font-medium text-zinc-600 shadow-sm backdrop-blur-md sm:px-3 sm:text-xs">
            <Cpu className="size-3 text-zinc-500 sm:size-3.5" strokeWidth={2} />
            GeForce RTX
          </div>

          <h1
            id="hero-heading"
            className="mt-3 text-2xl font-bold leading-[1.12] tracking-tight text-zinc-900 sm:mt-4 sm:text-[1.75rem] md:text-[1.9rem] lg:text-[2.05rem]"
          >
            Reimagine the world you create.
          </h1>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-5 md:mt-5">
            <p
              className="pointer-events-none hidden shrink-0 select-none font-bold leading-none text-transparent sm:block"
              style={{ WebkitTextStroke: '1px rgba(24,24,27,0.12)' }}
              aria-hidden
            >
              <span className="text-[clamp(2rem,5vw,3rem)]">01</span>
            </p>
            <div className="min-w-0 flex-1 pb-0.5">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-px flex-1 max-w-[80px] bg-zinc-300/90 sm:max-w-[100px]" />
                <span className="flex size-5 items-center justify-center rounded-full border border-zinc-200 bg-white/70 text-zinc-500 sm:size-6">
                  <ArrowUpRight className="size-3 rotate-90 sm:size-3.5" strokeWidth={2} />
                </span>
              </div>
              <p className="text-sm font-bold text-zinc-900 sm:text-[0.95rem]">
                Performance without compromise
              </p>
              <p className="mt-1 max-w-sm text-xs leading-relaxed text-zinc-500 sm:text-sm">
                Flagship NVIDIA GPUs fuse real-time ray tracing, AI-driven
                upscaling, and serious compute—fluid gameplay and cinematic
                renders from one card.
              </p>
            </div>
          </div>

          <a
            href="#catalog"
            className="mt-4 inline-flex w-full max-w-[260px] items-center justify-between gap-2 rounded-full bg-[#d4f06d] py-2 pl-5 pr-1 text-sm font-semibold text-zinc-900 shadow-[0_10px_32px_-10px_rgba(180,220,60,0.5)] transition-transform hover:scale-[1.02] active:scale-[0.99] sm:mt-5"
          >
            View All Products
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
              <ArrowUpRight className="size-[1rem]" strokeWidth={2.25} />
            </span>
          </a>
        </div>

        <div className="relative flex min-h-[130px] w-full shrink-0 flex-1 basis-0 items-center justify-center md:min-h-[160px] md:max-w-[min(100%,380px)] lg:min-h-[170px]">
          <div
            className="absolute left-[8%] top-[8%] size-8 rounded-full bg-zinc-300/90 shadow-lg ring-2 ring-white/50"
            aria-hidden
          />
          <div
            className="absolute right-[10%] top-[12%] size-6 rounded-full bg-slate-700/90 shadow-lg ring-2 ring-white/40"
            aria-hidden
          />
          <div
            className="absolute bottom-[18%] left-[4%] size-4 rounded-full bg-zinc-400/80 shadow-md ring-2 ring-white/60"
            aria-hidden
          />

          <div
            className="absolute inset-0 -z-0 bg-gradient-to-br from-sky-100/35 via-transparent to-violet-100/30 blur-xl"
            aria-hidden
          />

          <img
            src={rtxImage}
            alt="NVIDIA GeForce RTX 5090"
            className="relative z-[1] max-h-[min(100%,160px)] w-auto max-w-full object-contain drop-shadow-[0_16px_36px_rgba(15,23,42,0.16)] sm:max-h-[min(100%,180px)] md:max-h-[min(100%,200px)]"
            width={640}
            height={480}
          />
        </div>
      </div>
    </section>
  )
}
