import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const poem = [
  { th: 'ไม่ว่าเวลาจะผ่านไปเท่าไหร่',   en: 'No matter how much time passes' },
  { th: 'ฉันจะยังคงรักเธออยู่เสมอ',       en: 'I will always love you' },
  { th: 'เหมือนกับวันแรกที่เราพบกัน',     en: 'Just like the first day we met' },
]

export default function FinalSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section ref={ref}
      className="relative min-h-screen flex items-center justify-center section-pad overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #180a14 0%, #220e18 45%, #0d0608 100%)' }}
    >
      <div className="absolute inset-0 blob-center" />
      <div className="absolute inset-0 blob-2" />
      <div className="absolute top-0 left-0 right-0 h-px"
           style={{ background: 'linear-gradient(90deg, transparent, rgba(232,205,160,0.18), rgba(220,140,160,0.18), transparent)' }} />

      {/* Decorative petals */}
      {[
        { em: '🌸', top: '8%', left: '6%', size: 110, delay: 0 },
        { em: '🌹', top: '10%', right: '7%', size: 90, delay: 0.3 },
        { em: '🌷', bottom: '12%', left: '50%', size: 70, delay: 0.6 },
      ].map((p, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, rotate: i % 2 === 0 ? -20 : 20 }}
          animate={inView ? { opacity: 0.065, rotate: 0 } : {}}
          transition={{ duration: 3.5, delay: p.delay }}
          className="absolute pointer-events-none select-none"
          style={{ top: p.top, left: p.left, right: p.right, bottom: p.bottom, fontSize: p.size, filter: 'blur(1px)' }}
        >{p.em}</motion.div>
      ))}

      <div className="relative z-10 max-w-xl mx-auto text-center">

        {/* Year label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 2.5 }}
          className="section-label mb-16 tracking-[0.42em]"
        >
          2025 &nbsp;·&nbsp; Forever &amp; Always
        </motion.p>

        {/* Gold ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex items-center justify-center gap-5 mb-8"
        >
          <div style={{ width: 50, height: '1px', background: 'linear-gradient(to right, transparent, rgba(232,205,160,0.4))' }} />
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            style={{ color: 'rgba(232,205,160,0.5)', fontSize: 13 }}
          >✦</motion.span>
          <div style={{ width: 50, height: '1px', background: 'linear-gradient(to left, transparent, rgba(232,205,160,0.4))' }} />
        </motion.div>

        {/* Big script name */}
        <motion.h2
          initial={{ opacity: 0, y: 55, filter: 'blur(15px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="font-script text-shimmer glow-text mb-6"
          style={{ fontSize: 'clamp(4.5rem, 15vw, 9.5rem)', lineHeight: 1.0 }}
        >
          Kloy Jai
        </motion.h2>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
          className="mb-14"
        >
          <p className="font-display italic font-light"
             style={{ fontSize: 'clamp(1.2rem, 3.8vw, 1.9rem)', color: 'rgba(220,140,160,0.6)' }}>
            สุขสันต์วันเกิด 🌸
          </p>
          <p className="font-italic-serif italic mt-2"
             style={{ fontSize: 'clamp(0.82rem, 2vw, 1rem)', color: 'rgba(232,205,160,0.28)' }}>
            Happy Birthday, my love
          </p>
        </motion.div>

        {/* Heart divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.6, delay: 1.1 }}
          className="flex items-center gap-5 justify-center mb-14"
        >
          <div style={{ width: 70, height: '1px', background: 'linear-gradient(to right, transparent, rgba(220,140,160,0.35))' }} />
          <motion.span
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: 'rgba(220,140,160,0.55)', fontSize: 20 }}
          >♡</motion.span>
          <div style={{ width: 70, height: '1px', background: 'linear-gradient(to left, transparent, rgba(220,140,160,0.35))' }} />
        </motion.div>

        {/* Poem */}
        <div className="space-y-7">
          {poem.map(({ th, en }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 2, delay: 1.5 + i * 0.25 }}
            >
              <p className="font-display italic font-light"
                 style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', color: 'rgba(240,230,232,0.45)' }}>
                {th}
              </p>
              <p className="font-body uppercase mt-1.5"
                 style={{ fontSize: '9px', letterSpacing: '0.18em', color: 'rgba(220,140,160,0.18)' }}>
                {en}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating decorations */}
      {['🌸','✨','🌷','💕','🌹','🌙','🌺','💫'].map((em, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{ left: `${5 + i * 12}%`, top: `${8 + (i % 4) * 22}%`, fontSize: `${8 + (i % 3) * 5}px`, opacity: 0.1 }}
          animate={{ y: [0, -20, 0], x: [0, i % 2 === 0 ? 6 : -6, 0], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 6 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        >{em}</motion.div>
      ))}
    </section>
  )
}
