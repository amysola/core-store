import { useCallback, useEffect, useRef, useState } from 'react'
import { GripVertical } from 'lucide-react'
import rtxOff from '../assets/halflife2_rtx_off.webp'
import rtxOn from '../assets/halflife2_rtx_on.webp'

export function RayTracingCompare() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const [pos, setPos] = useState(50)

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = Math.min(Math.max(0, clientX - r.left), r.width)
    setPos(r.width > 0 ? (x / r.width) * 100 : 50)
  }, [])

  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (!dragging.current) return
      setFromClientX(e.clientX)
    }
    function onUp(e: PointerEvent) {
      dragging.current = false
      try {
        wrapRef.current?.releasePointerCapture(e.pointerId)
      } catch {
        /* not captured */
      }
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [setFromClientX])

  function startDrag(e: React.PointerEvent) {
    dragging.current = true
    wrapRef.current?.setPointerCapture(e.pointerId)
    setFromClientX(e.clientX)
  }

  return (
    <section
      className="mt-14 scroll-mt-28"
      aria-labelledby="rtx-compare-heading"
    >
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#76b900]">
          NVIDIA RTX
        </p>
        <h2
          id="rtx-compare-heading"
          className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl"
        >
          See what ray tracing unlocks
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          Full ray-traced lighting, global illumination, and reflections transform
          classic scenes. Drag the slider to compare RTX Off vs RTX On — same moment
          in Half-Life 2 RTX, two different worlds.
        </p>
      </div>

      <div
        ref={wrapRef}
        className="glass-panel relative aspect-[16/9] w-full cursor-ew-resize select-none overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]"
        onPointerDown={(e) => {
          if (e.button !== 0) return
          startDrag(e)
        }}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-label="Compare RTX off and RTX on"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault()
            setPos((p) => Math.max(0, p - 2))
          }
          if (e.key === 'ArrowRight') {
            e.preventDefault()
            setPos((p) => Math.min(100, p + 2))
          }
          if (e.key === 'Home') {
            e.preventDefault()
            setPos(0)
          }
          if (e.key === 'End') {
            e.preventDefault()
            setPos(100)
          }
        }}
      >
        <img
          src={rtxOff}
          alt=""
          className="pointer-events-none absolute inset-0 size-full object-cover"
          width={1920}
          height={1080}
          draggable={false}
        />
        <img
          src={rtxOn}
          alt=""
          className="pointer-events-none absolute inset-0 size-full object-cover"
          width={1920}
          height={1080}
          draggable={false}
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        />

        <div
          className="pointer-events-none absolute inset-y-0 w-1 bg-[#76b900] shadow-[0_0_12px_rgba(118,185,0,0.6)]"
          style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#76b900] text-white shadow-lg ring-4 ring-white/90"
          style={{ left: `${pos}%` }}
          aria-hidden
        >
          <GripVertical className="size-6" strokeWidth={2.25} />
        </div>

        <div className="pointer-events-none absolute left-3 top-3 rounded-lg bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm sm:left-4 sm:top-4">
          RTX Off
        </div>
        <div className="pointer-events-none absolute right-3 top-3 rounded-lg bg-black/55 px-2.5 py-1 text-xs font-semibold text-[#76b900] backdrop-blur-sm sm:right-4 sm:top-4">
          RTX On
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-zinc-500">
        Drag or use ← → keys to move the divider
      </p>
    </section>
  )
}
