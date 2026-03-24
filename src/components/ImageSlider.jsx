import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const slides = [
  { src: '/media/photo1.jpg', caption: 'ความทรงจำที่สวยงาม',  sub: 'A beautiful memory',    flower: '🌸' },
  { src: '/media/photo2.jpg', caption: 'ช่วงเวลาแห่งความสุข', sub: 'Moments of happiness',  flower: '🌺' },
  { src: '/media/photo3.jpg', caption: 'รอยยิ้มของเธอ',        sub: 'Your beautiful smile',  flower: '🌷' },
  { src: '/media/photo4.jpg', caption: 'ใกล้ชิดกัน',           sub: 'Close together',         flower: '🌹' },
  { src: '/media/photo5.jpg', caption: 'ตลอดไปและนิรันดร์',    sub: 'Forever and always',     flower: '🌸' },
]
const FALLBACKS = [
  'linear-gradient(135deg,#2a1020,#401530)',
  'linear-gradient(135deg,#180e1f,#251228)',
  'linear-gradient(135deg,#1a1518,#2a2018)',
  'linear-gradient(135deg,#0f1518,#122020)',
  'linear-gradient(135deg,#180e1f,#301230)',
]

export default function ImageSlider({ onNext }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const [imgErrors, setImgErrors] = useState({})
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const go = useCallback((idx, dir) => {
    setDirection(dir)
    setCurrent((idx + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => go(current + 1, 1), 4800)
    return () => clearInterval(t)
  }, [current, paused, go])

  const variants = {
    enter: d => ({ x: d > 0 ? '100%' : '-100%', opacity: 0, scale: 1.05 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: d => ({ x: d > 0 ? '-100%' : '100%', opacity: 0, scale: 0.95 }),
  }

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center section-pad overflow-hidden"
             style={{ background: 'linear-gradient(180deg, #0d0608 0%, #160a10 50%, #0d0608 100%)' }}>
      <div className="absolute inset-0 blob-1" />

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div style={{ width: 40, height: '1px', background: 'linear-gradient(to right, transparent, rgba(232,205,160,0.35))' }} />
            <span style={{ color: 'rgba(232,205,160,0.4)', fontSize: 11 }}>🌷</span>
            <div style={{ width: 40, height: '1px', background: 'linear-gradient(to left, transparent, rgba(232,205,160,0.35))' }} />
          </div>
          <p className="section-label mb-4">✦ &nbsp; Memories &nbsp; ✦</p>
          <h2 className="font-display font-light italic"
              style={{ fontSize: 'clamp(1.7rem, 5.5vw, 3rem)', color: 'rgba(240,230,232,0.85)' }}>
            ภาพแห่งความทรงจำ
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative overflow-hidden rounded-2xl"
          style={{
            aspectRatio: '4/3',
            boxShadow: '0 0 0 1px rgba(220,140,160,0.1), 0 20px 70px rgba(0,0,0,0.7), 0 0 70px rgba(220,140,160,0.06)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px z-10"
               style={{ background: 'linear-gradient(90deg, transparent, rgba(220,140,160,0.4), rgba(232,205,160,0.3), transparent)' }} />

          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragStart={() => setPaused(true)}
              onDragEnd={(e, info) => {
                setPaused(false)
                if (info.offset.x < -55) go(current + 1, 1)
                else if (info.offset.x > 55) go(current - 1, -1)
              }}
              className="absolute inset-0 w-full h-full touch-pan-y"
              style={{ cursor: 'grab' }}
              whileDrag={{ cursor: 'grabbing' }}
            >
              {!imgErrors[current] ? (
                <img
                  src={slides[current].src} alt={slides[current].caption}
                  className="w-full h-full object-cover"
                  onError={() => setImgErrors(p => ({ ...p, [current]: true }))}
                  draggable={false}
                  style={{ filter: 'brightness(0.85) saturate(0.88)' }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center"
                     style={{ background: FALLBACKS[current] }}>
                  <div className="text-center space-y-3">
                    <div className="text-5xl opacity-25">{slides[current].flower}</div>
                    <p className="section-label opacity-60">photo{current + 1}.jpg</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0"
                   style={{ background: 'linear-gradient(to top, rgba(13,6,8,0.85) 0%, rgba(13,6,8,0.1) 50%, transparent 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 px-8 pb-7">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="opacity-40 text-sm">{slides[current].flower}</span>
                  <p className="font-display italic font-light"
                     style={{ fontSize: 'clamp(1rem, 3vw, 1.4rem)', color: 'rgba(240,230,232,0.92)' }}>
                    {slides[current].caption}
                  </p>
                </div>
                <p className="font-body uppercase"
                   style={{ fontSize: '9px', letterSpacing: '0.16em', color: 'rgba(220,140,160,0.35)', paddingLeft: 28 }}>
                  {slides[current].sub}
                </p>
              </div>
              <div className="absolute top-4 right-5 font-body"
                   style={{ fontSize: '9px', letterSpacing: '0.22em', color: 'rgba(220,140,160,0.25)' }}>
                {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          {[{ s: 'left-3', d: -1, l: '‹' }, { s: 'right-3', d: 1, l: '›' }].map(({ s, d, l }) => (
            <button key={s}
              onClick={() => { go(current + d, d); setPaused(true) }}
              className={`absolute ${s} top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 touch-manipulation`}
              style={{
                background: 'rgba(13,6,8,0.5)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(220,140,160,0.12)',
                color: 'rgba(220,140,160,0.4)',
                fontSize: '1.3rem',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(220,140,160,0.9)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(220,140,160,0.4)'}
            >{l}</button>
          ))}
        </motion.div>

        {/* Dots */}
        <div className="flex justify-center gap-2.5 mt-5">
          {slides.map((_, i) => (
            <button key={i} onClick={() => go(i, i > current ? 1 : -1)}
              className="transition-all duration-500 rounded-full"
              style={{
                width: i === current ? '22px' : '5px',
                height: '5px',
                background: i === current ? 'rgba(220,140,160,0.65)' : 'rgba(220,140,160,0.18)',
              }}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button type="button" className="btn-next" onClick={e => { e.stopPropagation(); onNext() }}>
            <span>ดูแกลเลอรี่</span>
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}>↓</motion.span>
          </button>
        </div>
      </div>
    </section>
  )
}
