import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const photos = [
  { src: '/media/gallery1.jpg', label: 'ความสุข',  flower: '🌸', bg: 'from-rose-950/80 to-pink-950/80' },
  { src: '/media/gallery2.jpg', label: 'ความรัก',  flower: '🌹', bg: 'from-red-950/80 to-rose-950/80' },
  { src: '/media/gallery3.jpg', label: 'ความฝัน',  flower: '🌷', bg: 'from-fuchsia-950/80 to-rose-950/80' },
  { src: '/media/gallery4.jpg', label: 'ความหวัง', flower: '🌺', bg: 'from-pink-950/80 to-rose-950/80' },
  { src: '/media/gallery5.jpg', label: 'ยิ้ม',      flower: '🌸', bg: 'from-rose-950/80 to-fuchsia-950/80' },
  { src: '/media/gallery6.jpg', label: 'ด้วยกัน',  flower: '🌹', bg: 'from-pink-950/80 to-red-950/80' },
  { src: '/media/gallery7.jpg', label: 'ตลอดไป',   flower: '🌷', bg: 'from-rose-950/80 to-pink-950/80' },
  { src: '/media/gallery8.jpg', label: 'ทุกวัน',   flower: '🌺', bg: 'from-fuchsia-950/80 to-rose-950/80' },
]

function GalleryItem({ photo, index, inView }) {
  const [err, setErr] = useState(false)
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 24 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 * index }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative overflow-hidden rounded-xl cursor-pointer"
      style={{
        aspectRatio: '1/1',
        border: `1px solid ${hov ? 'rgba(220,140,160,0.3)' : 'rgba(220,140,160,0.07)'}`,
        transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
        boxShadow: hov ? '0 0 30px rgba(220,140,160,0.15), 0 8px 30px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.4)',
      }}
    >
      {!err ? (
        <img
          src={photo.src} alt={photo.label}
          className="w-full h-full object-cover"
          onError={() => setErr(true)}
          style={{
            filter: hov ? 'brightness(1) saturate(1.05)' : 'brightness(0.75) saturate(0.65)',
            transform: hov ? 'scale(1.08)' : 'scale(1)',
            transition: 'filter 0.7s ease, transform 0.8s ease',
          }}
        />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${photo.bg} flex items-center justify-center`}>
          <div className="text-center space-y-2">
            <div className="text-4xl opacity-20">{photo.flower}</div>
            <span className="section-label opacity-60">{photo.label}</span>
          </div>
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 transition-opacity duration-600"
           style={{
             background: 'linear-gradient(to top, rgba(13,6,8,0.92) 0%, rgba(13,6,8,0.2) 45%, transparent 100%)',
             opacity: hov ? 1 : 0.8,
           }} />

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4"
           style={{ transform: hov ? 'translateY(0)' : 'translateY(4px)', transition: 'transform 0.4s ease' }}>
        <p className="font-display italic"
           style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', color: hov ? 'rgba(245,235,232,0.95)' : 'rgba(220,140,160,0.6)', transition: 'color 0.4s ease' }}>
          {photo.flower} {photo.label}
        </p>
      </div>

      {/* Hover shimmer line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        animate={{ opacity: hov ? 1 : 0 }}
        style={{ background: 'linear-gradient(90deg, transparent, rgba(220,140,160,0.5), rgba(232,205,160,0.4), transparent)', transition: 'opacity 0.4s ease' }}
      />
    </motion.div>
  )
}

export default function Gallery({ onNext, onSurprise }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-6%' })

  return (
    <section ref={ref} className="relative min-h-screen py-28 md:py-36 px-6 overflow-hidden"
             style={{ background: 'linear-gradient(180deg, #0d0608 0%, #140810 50%, #0d0608 100%)' }}>
      <div className="absolute inset-0 blob-1" />
      <div className="absolute inset-0 blob-2" />

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 0.06, scale: 1 } : {}}
        transition={{ duration: 3 }}
        className="absolute top-10 right-6 text-[140px] pointer-events-none select-none"
        style={{ filter: 'blur(1px)' }}
      >🌹</motion.div>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="section-label mb-5">✦ &nbsp; Gallery &nbsp; ✦</p>
          <h2 className="font-display font-light italic mb-3"
              style={{ fontSize: 'clamp(1.8rem, 5.5vw, 3rem)', color: 'rgba(240,230,232,0.85)' }}>
            แกลเลอรี่ความทรงจำ
          </h2>
          <p className="font-body uppercase"
             style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(220,140,160,0.22)' }}>
            A gallery of our most precious moments
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div style={{ width: 40, height: '1px', background: 'linear-gradient(to right, transparent, rgba(232,205,160,0.35))' }} />
            <span style={{ color: 'rgba(232,205,160,0.4)', fontSize: 11 }}>✦</span>
            <div style={{ width: 40, height: '1px', background: 'linear-gradient(to left, transparent, rgba(232,205,160,0.35))' }} />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-3">
          {photos.map((p, i) => (
            <GalleryItem key={i} photo={p} index={i} inView={inView} />
          ))}
        </div>

        {/* Surprise + continue */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="text-center mt-18 space-y-5 mt-16"
        >
          <p className="section-label">🌸 &nbsp; มีบางอย่างพิเศษรออยู่ &nbsp; 🌸</p>
          <motion.button
            onClick={onSurprise}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center gap-3 px-9 py-4 rounded-full"
            style={{
              border: '1px solid rgba(220,140,160,0.22)',
              background: 'rgba(220,140,160,0.05)',
              backdropFilter: 'blur(12px)',
              color: 'rgba(220,140,160,0.55)',
              fontFamily: "'Jost', sans-serif",
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              transition: 'all 0.5s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'rgba(220,140,160,0.95)'; e.currentTarget.style.background = 'rgba(220,140,160,0.1)'; e.currentTarget.style.borderColor = 'rgba(220,140,160,0.38)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(220,140,160,0.55)'; e.currentTarget.style.background = 'rgba(220,140,160,0.05)'; e.currentTarget.style.borderColor = 'rgba(220,140,160,0.22)' }}
          >
            <span>🌸</span>
            <span>เซอร์ไพรส์สำหรับเธอ</span>
            <span>🌸</span>
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ scale: [1, 1.14, 1], opacity: [0.35, 0, 0.35] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ border: '1px solid rgba(220,140,160,0.2)' }}
            />
          </motion.button>

          <div className="pt-2">
            <button type="button" className="btn-next" onClick={e => { e.stopPropagation(); onNext() }}>
              <span>ต่อไป</span>
              <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}>↓</motion.span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
