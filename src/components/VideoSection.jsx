import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function VideoSection({ onNext }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-12%' })
  const stopTouch = e => e.stopPropagation()

  return (
    <section ref={ref}
      className="relative min-h-screen flex items-center justify-center section-pad overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0608 0%, #140810 60%, #0d0608 100%)' }}
    >
      <div className="absolute inset-0 blob-center" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.07 } : {}}
        transition={{ duration: 2.5 }}
        className="absolute top-14 left-5 text-[90px] pointer-events-none select-none"
        style={{ filter: 'blur(1px)' }}
      >🌺</motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.06 } : {}}
        transition={{ duration: 2.5, delay: 0.4 }}
        className="absolute bottom-16 right-6 text-[75px] pointer-events-none select-none"
        style={{ filter: 'blur(1px)' }}
      >🌸</motion.div>

      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div style={{ width: 40, height: '1px', background: 'linear-gradient(to right, transparent, rgba(232,205,160,0.35))' }} />
            <span style={{ color: 'rgba(220,140,160,0.4)', fontSize: 12 }}>🌸</span>
            <div style={{ width: 40, height: '1px', background: 'linear-gradient(to left, transparent, rgba(232,205,160,0.35))' }} />
          </div>
          <p className="section-label mb-5">Our Story</p>
          <h2 className="font-display font-light italic"
              style={{ fontSize: 'clamp(1.7rem, 5.5vw, 3rem)', color: 'rgba(240,230,232,0.85)' }}>
            ช่วงเวลาที่สวยงาม
          </h2>
          <p className="font-body uppercase mt-2"
             style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(220,140,160,0.22)' }}>
            Beautiful moments, captured in time
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            paddingBottom: '56.25%', height: 0,
            boxShadow: '0 0 0 1px rgba(220,140,160,0.12), 0 16px 70px rgba(0,0,0,0.7), 0 0 65px rgba(220,140,160,0.07)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px z-10"
               style={{ background: 'linear-gradient(90deg, transparent, rgba(220,140,160,0.45), rgba(232,205,160,0.35), transparent)' }} />
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/media/bg-video.mp4"
            controls playsInline poster=""
            style={{ filter: 'saturate(0.92)' }}
            onTouchStart={stopTouch} onTouchEnd={stopTouch} onTouchMove={stopTouch}
          />
          <div className="absolute inset-0 rounded-2xl pointer-events-none"
               style={{ boxShadow: 'inset 0 0 90px rgba(13,6,8,0.4)' }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 1 }}
          className="text-center font-display italic mt-5"
          style={{ fontSize: '0.75rem', color: 'rgba(220,140,160,0.25)', letterSpacing: '0.14em' }}
        >
          วางไว้ในใจ ตลอดไป &nbsp;·&nbsp; Forever in my heart
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.4 }}
          className="text-center mt-12"
        >
          <button type="button" className="btn-next" onClick={e => { e.stopPropagation(); onNext() }}>
            <span>ต่อไป</span>
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}>↓</motion.span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
