import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const lines = [
  { th: 'ถึงคนที่ฉันรักที่สุดในโลก',      en: 'To the one I love most in this world',       delay: 0.1 },
  { th: 'วันนี้เป็นวันของเธอ',              en: 'Today belongs entirely to you',               delay: 0.28 },
  { th: 'วันที่ท้องฟ้าเลือกให้เธอมาเกิด',  en: 'The day the sky chose to bring you into being', delay: 0.46 },
  { th: 'และฉันก็โชคดีมากที่ได้รู้จักเธอ', en: 'And I am endlessly lucky to know you',        delay: 0.64 },
]

export default function Message({ onNext }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center section-pad overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0608 0%, #160a10 50%, #0d0608 100%)' }}
      onClick={onNext}
    >
      <div className="absolute inset-0 blob-1" />
      <div className="absolute inset-0 blob-2" />

      {/* Large decorative — top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
        animate={inView ? { opacity: 0.07, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-4 right-0 text-[180px] pointer-events-none select-none"
        style={{ filter: 'blur(2px)' }}
      >🌸</motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: 0.05, scale: 1 } : {}}
        transition={{ duration: 3, delay: 0.3 }}
        className="absolute bottom-10 -left-4 text-[130px] pointer-events-none select-none"
        style={{ filter: 'blur(1px)' }}
      >🌷</motion.div>

      <div className="relative z-10 max-w-2xl mx-auto w-full">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-5">✦ &nbsp; A Message For You &nbsp; ✦</p>
          <div style={{ width: 60, height: '1px', margin: '0 auto', background: 'linear-gradient(90deg, transparent, rgba(232,205,160,0.35), transparent)' }} />
        </motion.div>

        {/* Lines */}
        <div className="space-y-12 md:space-y-16 mb-20 text-center">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 + line.delay }}
            >
              <p className="font-display font-light italic leading-snug"
                 style={{ fontSize: 'clamp(1.3rem, 4.2vw, 2rem)', color: 'rgba(240,230,232,0.9)' }}>
                {line.th}
              </p>
              <p className="font-body mt-2 uppercase"
                 style={{ fontSize: '9px', letterSpacing: '0.22em', color: 'rgba(220,140,160,0.25)' }}>
                {line.en}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quote card */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
        >
          {/* Gold divider */}
          <div className="flex items-center gap-4 justify-center mb-10">
            <div style={{ width: 48, height: '1px', background: 'linear-gradient(to right, transparent, rgba(232,205,160,0.35))' }} />
            <motion.span
              animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ color: 'rgba(232,205,160,0.5)', fontSize: 12 }}
            >✦</motion.span>
            <div style={{ width: 48, height: '1px', background: 'linear-gradient(to left, transparent, rgba(232,205,160,0.35))' }} />
          </div>

          <div className="glass-card rounded-2xl px-8 py-9 md:px-12 md:py-11 mx-auto max-w-lg relative overflow-hidden">
            {/* Inner glow top */}
            <div className="absolute top-0 left-0 right-0 h-px"
                 style={{ background: 'linear-gradient(90deg, transparent, rgba(220,140,160,0.4), rgba(232,205,160,0.3), transparent)' }} />

            <p className="section-label mb-6 text-center">from my heart</p>
            <blockquote
              className="font-display italic font-light leading-loose text-center"
              style={{ fontSize: 'clamp(1rem, 2.8vw, 1.22rem)', color: 'rgba(245,235,232,0.6)', lineHeight: 2 }}
            >
              "เธอคือแสงสว่างในวันที่มืดที่สุดของฉัน<br/>
              ยิ้มของเธอทำให้ทุกอย่างมีความหมาย<br/>
              ขอให้วันเกิดปีนี้เต็มไปด้วยความสุข<br/>
              เหมือนความรู้สึกที่ฉันมีให้เธอทุกวัน"
            </blockquote>

            <div className="absolute bottom-0 left-0 right-0 h-px"
                 style={{ background: 'linear-gradient(90deg, transparent, rgba(232,205,160,0.2), transparent)' }} />
          </div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.8, delay: 2.4 }}
            className="text-center mt-10"
          >
            <p className="font-script text-gold glow-gold"
               style={{ fontSize: 'clamp(2.2rem, 6vw, 3.2rem)' }}>
              ด้วยรักทั้งหมด
            </p>
          </motion.div>
        </motion.div>

        {/* Continue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 3 }}
          className="text-center mt-14"
        >
          <button type="button" className="btn-next" onClick={e => { e.stopPropagation(); onNext() }}>
            <span>แตะเพื่อดูต่อ</span>
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}>↓</motion.span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
