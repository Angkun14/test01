import React from 'react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative py-24 px-6 overflow-hidden"
            style={{ borderTop: '1px solid rgba(220,140,160,0.06)', background: '#0d0608' }}>
      <div className="absolute inset-0"
           style={{ background: 'radial-gradient(ellipse 55% 90% at 50% 100%, rgba(180,55,95,0.07) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-sm mx-auto text-center space-y-6">
        {/* Flower row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="flex justify-center gap-3"
        >
          {['🌸','🌷','🌸'].map((f, i) => (
            <motion.span key={i}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
              style={{ opacity: 0.3, fontSize: 15 }}
            >{f}</motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.2 }}
          className="font-script text-shimmer"
          style={{ fontSize: 'clamp(2rem, 6vw, 2.8rem)' }}
        >Kloy Jai</motion.p>

        {/* Gold divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="flex items-center justify-center gap-3"
        >
          <div style={{ width: 36, height: '1px', background: 'linear-gradient(to right, transparent, rgba(232,205,160,0.35))' }} />
          <span style={{ color: 'rgba(232,205,160,0.38)', fontSize: 9 }}>✦</span>
          <div style={{ width: 36, height: '1px', background: 'linear-gradient(to left, transparent, rgba(232,205,160,0.35))' }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.4 }}
          className="font-display italic font-light"
          style={{ fontSize: '0.8rem', color: 'rgba(220,140,160,0.22)', letterSpacing: '0.08em' }}
        >ทำด้วยรัก &nbsp;·&nbsp; Made with love 🌸</motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.6 }}
          className="section-label opacity-30"
        >© 2025 &nbsp;·&nbsp; Forever Yours</motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.8 }}
          className="flex justify-center gap-3 pt-1"
        >
          {[0,1,2].map(i => (
            <motion.div key={i}
              className="w-1 h-1 rounded-full"
              style={{ background: 'rgba(220,140,160,0.2)' }}
              animate={{ opacity: [0.15, 0.6, 0.15] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.45 }}
            />
          ))}
        </motion.div>
      </div>
    </footer>
  )
}
