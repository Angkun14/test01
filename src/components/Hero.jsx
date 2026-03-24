import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const PETALS = ['🌸','🌺','🌷','🌹','✿']

export default function Hero({ onNext }) {
  const [loaded, setLoaded] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 })

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      mouseX.set((e.clientX - cx) / cx * 18)
      mouseY.set((e.clientY - cy) / cy * 12)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden vignette"
      onClick={onNext}
      style={{ cursor: 'pointer', background: 'linear-gradient(160deg, #180810 0%, #220e18 45%, #0d0608 100%)' }}
    >
      {/* BG Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/media/bg-video.mp4"
        autoPlay muted loop playsInline
        style={{ filter: 'brightness(0.14) saturate(0.5) hue-rotate(-5deg)', transform: 'scale(1.06)' }}
      />

      {/* Parallax orbs */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute pointer-events-none"
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.85, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{
          width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(180,55,95,0.22) 0%, rgba(220,140,160,0.08) 50%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          position: 'absolute', top: '40vh', left: '50vw',
        }} />
      </motion.div>
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute pointer-events-none"
      >
        <div style={{
          width: 900, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(140,40,75,0.12) 0%, transparent 65%)',
          transform: 'translate(-50%, -50%)',
          position: 'absolute', top: '50vh', left: '50vw',
          filter: 'blur(2px)',
        }} />
      </motion.div>

      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={loaded ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="absolute top-0 left-0 right-0 origin-left"
        style={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(220,140,160,0.6) 30%, rgba(232,205,160,0.5) 60%, transparent 100%)' }}
      />

      {/* Corner ornaments */}
      {[
        { cls: 'top-7 left-7', bt: 'borderTop', bl: 'borderLeft' },
        { cls: 'top-7 right-16 md:right-20', bt: 'borderTop', bl: 'borderRight' },
        { cls: 'bottom-7 left-7', bt: 'borderBottom', bl: 'borderLeft' },
        { cls: 'bottom-7 right-7', bt: 'borderBottom', bl: 'borderRight' },
      ].map(({ cls }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={loaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: 2.2 + i * 0.08 }}
          className={`absolute w-8 h-8 ${cls}`}
          style={{
            borderTop: i < 2 ? '1px solid rgba(220,140,160,0.2)' : 'none',
            borderBottom: i >= 2 ? '1px solid rgba(220,140,160,0.2)' : 'none',
            borderLeft: (i === 0 || i === 2) ? '1px solid rgba(220,140,160,0.2)' : 'none',
            borderRight: (i === 1 || i === 3) ? '1px solid rgba(220,140,160,0.2)' : 'none',
          }}
        />
      ))}

      {/* Floating petals */}
      {PETALS.map((p, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            left: `${10 + i * 18}%`,
            top: `${15 + (i % 3) * 22}%`,
            fontSize: `${14 + (i % 3) * 6}px`,
            opacity: 0,
          }}
          animate={loaded ? {
            opacity: [0, 0.2, 0.08, 0.2],
            y: [0, -28, -10, -28],
            rotate: [0, i % 2 === 0 ? 18 : -18, 0],
          } : {}}
          transition={{ duration: 7 + i * 0.9, repeat: Infinity, ease: 'easeInOut', delay: 2 + i * 0.5 }}
        >{p}</motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">

        {/* Top ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={loaded ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="flex items-center gap-4 mb-10"
        >
          <div style={{ width: 50, height: '1px', background: 'linear-gradient(to right, transparent, rgba(232,205,160,0.45))' }} />
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ color: 'rgba(232,205,160,0.45)', fontSize: 11 }}
          >✦</motion.span>
          <div style={{ width: 50, height: '1px', background: 'linear-gradient(to left, transparent, rgba(232,205,160,0.45))' }} />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={loaded ? { opacity: 1, letterSpacing: '0.44em' } : {}}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          className="section-label mb-9"
        >A love letter · For you</motion.p>

        {/* Main name — Playfair script shimmer */}
        <motion.h1
          initial={{ opacity: 0, y: 55, filter: 'blur(18px)' }}
          animate={loaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
          className="font-script text-shimmer glow-text mb-4"
          style={{ fontSize: 'clamp(5rem, 18vw, 12rem)', lineHeight: 1.0, letterSpacing: '-0.01em' }}
        >
          Kloy Jai
        </motion.h1>

        {/* Sub text */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 1.7 }}
          className="mb-3"
        >
          <p className="font-display italic font-normal"
             style={{ fontSize: 'clamp(0.95rem, 3vw, 1.45rem)', color: 'rgba(220,140,160,0.55)', letterSpacing: '0.06em' }}>
            วันเกิดของเธอ &nbsp;·&nbsp; วันที่สวยที่สุด
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 2, delay: 2.1 }}
          className="font-italic-serif italic"
          style={{ fontSize: 'clamp(0.75rem, 2vw, 0.95rem)', color: 'rgba(232,205,160,0.28)', letterSpacing: '0.1em' }}
        >
          The most beautiful day of the year
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 2.6 }}
          className="flex flex-col items-center gap-4 mt-16"
        >
          <p className="section-label">แตะเพื่อเริ่มต้น</p>
          <motion.div
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.15, 0.7, 0.15] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', height: 56, background: 'linear-gradient(to bottom, rgba(220,140,160,0.7), transparent)' }}
          />
        </motion.div>
      </div>

      {/* Bottom marquee band */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 2, delay: 2.8 }}
        className="absolute bottom-0 left-0 right-0 overflow-hidden py-3"
        style={{ borderTop: '1px solid rgba(220,140,160,0.06)' }}
      >
        <div className="marquee-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="section-label mx-8 opacity-40">
              Happy Birthday &nbsp;·&nbsp; Kloy Jai &nbsp;·&nbsp; 🌸 &nbsp;·&nbsp; สุขสันต์วันเกิด &nbsp;·&nbsp; Forever &amp; Always &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
