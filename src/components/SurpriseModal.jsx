import React from 'react'
import { motion } from 'framer-motion'

const wishes = [
  { flower: '🌸', th: 'ขอให้มีสุขภาพแข็งแรง',        en: 'May you always be healthy' },
  { flower: '🌹', th: 'ขอให้ความฝันทุกอย่างเป็นจริง', en: 'May all your dreams come true' },
  { flower: '🌷', th: 'ขอให้มีรักที่ยิ่งใหญ่ตลอดไป', en: 'May love surround you always' },
  { flower: '🌺', th: 'ขอให้ทุกคืนผ่านไปอย่างสงบ',   en: 'May every night bring you peace' },
  { flower: '✨',  th: 'ขอให้ชีวิตส่องแสงเหมือนดาว',  en: 'May your life shine like the stars' },
]

export default function SurpriseModal({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: 'rgba(5,2,4,0.9)', backdropFilter: 'blur(28px)' }} />
      <div className="absolute inset-0"
           style={{ background: 'radial-gradient(ellipse 65% 65% at 50% 40%, rgba(180,55,95,0.14) 0%, transparent 70%)' }} />

      <motion.div
        initial={{ scale: 0.86, opacity: 0, y: 38 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.86, opacity: 0, y: 38 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl glass-card"
      >
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
             style={{ background: 'linear-gradient(90deg, transparent, rgba(220,140,160,0.55), rgba(232,205,160,0.4), transparent)' }} />

        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ background: 'rgba(220,140,160,0.07)', border: '1px solid rgba(220,140,160,0.12)', color: 'rgba(220,140,160,0.35)', fontSize: 12 }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(220,140,160,0.8)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(220,140,160,0.35)'}
        >✕</button>

        <div className="p-8 md:p-10">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center mb-8">
            <div className="flex justify-center gap-2.5 mb-5">
              {['🌸','🌹','🌷','🌺','🌸'].map((f, i) => (
                <motion.span key={i}
                  animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.2 + i * 0.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
                  style={{ fontSize: 17 }}
                >{f}</motion.span>
              ))}
            </div>
            <p className="font-script text-shimmer" style={{ fontSize: 'clamp(2.2rem, 9vw, 3.2rem)' }}>
              Happy Birthday
            </p>
            <p className="font-display italic font-light mt-1"
               style={{ fontSize: 'clamp(0.95rem, 2.8vw, 1.2rem)', color: 'rgba(220,140,160,0.45)' }}>
              Kloy Jai 🌸
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <div style={{ width: 32, height: '1px', background: 'linear-gradient(to right, transparent, rgba(232,205,160,0.35))' }} />
              <span style={{ color: 'rgba(232,205,160,0.4)', fontSize: 10 }}>✦</span>
              <div style={{ width: 32, height: '1px', background: 'linear-gradient(to left, transparent, rgba(232,205,160,0.35))' }} />
            </div>
          </motion.div>

          {/* Wishes */}
          <div className="space-y-2.5 mb-8">
            {wishes.map((w, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-4 p-3.5 rounded-xl glass-light"
              >
                <span className="flex-shrink-0 mt-0.5 text-base">{w.flower}</span>
                <div>
                  <p className="font-display italic font-light"
                     style={{ fontSize: 'clamp(0.88rem, 2.4vw, 1rem)', color: 'rgba(240,230,232,0.78)' }}>
                    {w.th}
                  </p>
                  <p className="font-body uppercase mt-0.5"
                     style={{ fontSize: '9px', letterSpacing: '0.14em', color: 'rgba(220,140,160,0.25)' }}>
                    {w.en}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="rounded-xl p-6 text-center mb-6 glass-light"
          >
            <p className="section-label mb-3">🌸 &nbsp; from my heart &nbsp; 🌸</p>
            <p className="font-display italic font-light leading-relaxed"
               style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', color: 'rgba(245,235,232,0.6)' }}>
              "เธอคือของขวัญที่ดีที่สุด<br/>ที่ชีวิตมอบให้ฉัน"
            </p>
            <p className="font-italic-serif italic mt-3"
               style={{ fontSize: '0.8rem', color: 'rgba(232,205,160,0.25)', letterSpacing: '0.05em' }}>
              "You are the greatest gift life has given me"
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-full font-body uppercase transition-all duration-500"
              style={{ border: '1px solid rgba(220,140,160,0.2)', background: 'rgba(220,140,160,0.06)', color: 'rgba(220,140,160,0.5)', fontSize: 10, letterSpacing: '0.22em' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'rgba(220,140,160,0.92)'; e.currentTarget.style.background = 'rgba(220,140,160,0.12)'; e.currentTarget.style.borderColor = 'rgba(220,140,160,0.38)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(220,140,160,0.5)'; e.currentTarget.style.background = 'rgba(220,140,160,0.06)'; e.currentTarget.style.borderColor = 'rgba(220,140,160,0.2)' }}
            >🌸 &nbsp; ขอบคุณที่เป็นเธอ &nbsp; 🌸</motion.button>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px rounded-b-2xl"
             style={{ background: 'linear-gradient(90deg, transparent, rgba(232,205,160,0.15), transparent)' }} />
      </motion.div>
    </motion.div>
  )
}
