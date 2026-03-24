import React, { useState, useRef, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from './components/Hero'
import Message from './components/Message'
import VideoSection from './components/VideoSection'
import ImageSlider from './components/ImageSlider'
import Gallery from './components/Gallery'
import SurpriseModal from './components/SurpriseModal'
import FinalSection from './components/FinalSection'
import Footer from './components/Footer'
import MusicPlayer from './components/MusicPlayer'
import Cursor from './components/Cursor'
import Particles from './components/Particles'

const SECTIONS = ['hero', 'message', 'video', 'slider', 'gallery', 'final', 'footer']

export default function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [musicStarted, setMusicStarted] = useState(false)
  const sectionRefs = useRef([])
  const touchStartY = useRef(null)
  const touchStartX = useRef(null)
  const lastNavigateTime = useRef(0)

  const navigateTo = useCallback((index) => {
    if (!musicStarted) return
    const now = Date.now()
    if (transitioning || now - lastNavigateTime.current < 800) return
    if (index < 0 || index >= SECTIONS.length) return
    lastNavigateTime.current = now
    setTransitioning(true)
    setCurrentSection(index)
    const target = sectionRefs.current[index]
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => setTransitioning(false), 800)
  }, [transitioning, musicStarted])

  const goNext = useCallback(() => navigateTo(currentSection + 1), [currentSection, navigateTo])
  const goPrev = useCallback(() => navigateTo(currentSection - 1), [currentSection, navigateTo])

  useEffect(() => {
    const handleKey = (e) => {
      if (modalOpen) return
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev, modalOpen])

  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }
    const handleTouchEnd = (e) => {
      if (modalOpen) return
      if (touchStartY.current === null) return
      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      const deltaX = touchStartX.current - e.changedTouches[0].clientX
      const threshold = 50
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        if (deltaY > threshold) goNext()
        else if (deltaY < -threshold) goPrev()
      } else {
        if (deltaX > threshold) goNext()
        else if (deltaX < -threshold) goPrev()
      }
      touchStartY.current = null
      touchStartX.current = null
    }
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [goNext, goPrev, modalOpen])

  useEffect(() => {
    const observers = []
    sectionRefs.current.forEach((ref, idx) => {
      if (!ref) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting && entry.intersectionRatio > 0.5) setCurrentSection(idx) },
        { threshold: 0.5 }
      )
      obs.observe(ref)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <div className="relative grain vignette" style={{ background: '#0d0608' }}>
      <Cursor />
      <Particles />
      <MusicPlayer onMusicStart={() => setMusicStarted(true)} />

      {/* Music gate hint */}
      <AnimatePresence>
        {!musicStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.9 } }}
            className="fixed inset-0 z-[300] pointer-events-none flex items-end justify-center"
            style={{ paddingBottom: '38%' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ delay: 2.8, duration: 1.4 }}
              className="flex flex-col items-center gap-3"
            >
              <motion.p
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                className="section-label tracking-[0.44em]"
              >♪ &nbsp; กรุณาเปิดเพลงก่อนเริ่มต้น &nbsp; ♪</motion.p>
              <motion.div
                animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.15, 0.4, 0.15] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: 80, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(220,140,160,0.5), transparent)' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress dots */}
      <div className="fixed right-4 md:right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5">
        {SECTIONS.slice(0, -1).map((_, i) => (
          <button
            key={i}
            onClick={() => navigateTo(i)}
            aria-label={`Section ${i + 1}`}
            className="rounded-full transition-all duration-600"
            style={{
              width: i === currentSection ? '6px' : '4px',
              height: i === currentSection ? '6px' : '4px',
              background: i === currentSection
                ? 'rgba(220,140,160,0.9)'
                : 'rgba(220,140,160,0.18)',
              boxShadow: i === currentSection
                ? '0 0 10px rgba(220,140,160,0.7), 0 0 20px rgba(220,140,160,0.3)'
                : 'none',
              border: 'none',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Sections */}
      <div ref={el => sectionRefs.current[0] = el}><Hero onNext={goNext} /></div>
      <div ref={el => sectionRefs.current[1] = el}><Message onNext={goNext} /></div>
      <div ref={el => sectionRefs.current[2] = el}><VideoSection onNext={goNext} /></div>
      <div ref={el => sectionRefs.current[3] = el}><ImageSlider onNext={goNext} /></div>
      <div ref={el => sectionRefs.current[4] = el}><Gallery onNext={goNext} onSurprise={() => setModalOpen(true)} /></div>
      <div ref={el => sectionRefs.current[5] = el}><FinalSection /></div>
      <div ref={el => sectionRefs.current[6] = el}><Footer /></div>

      <AnimatePresence>
        {modalOpen && <SurpriseModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}
