import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PLAYLIST = [
  { url: 'https://youtu.be/sRT1-LplOPs?si=fTqnJ4mpSy-BnN82', title: 'เพลงที่ 1' },
  { url: 'https://youtu.be/Ufv5CvoV91k?si=xT0GxIpit6qsPJyJ', title: 'เพลงที่ 2' },
]

function extractYTId(url) {
  try {
    const u = new URL(url)
    if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('?')[0]
    if (u.pathname.startsWith('/shorts/')) return u.pathname.split('/shorts/')[1].split('?')[0]
    return u.searchParams.get('v') || ''
  } catch { return url }
}

let ytApiLoaded = false
let ytApiReady = false
const ytReadyCallbacks = []

function loadYouTubeAPI() {
  if (ytApiLoaded) {
    if (ytApiReady) { ytReadyCallbacks.forEach(cb => cb()); ytReadyCallbacks.length = 0 }
    return
  }
  ytApiLoaded = true
  const tag = document.createElement('script')
  tag.src = 'https://www.youtube.com/iframe_api'
  document.head.appendChild(tag)
  const prev = window.onYouTubeIframeAPIReady
  window.onYouTubeIframeAPIReady = () => {
    ytApiReady = true
    if (prev) prev()
    ytReadyCallbacks.forEach(cb => cb())
    ytReadyCallbacks.length = 0
  }
}

function onYTReady(cb) {
  if (ytApiReady && window.YT && window.YT.Player) { cb() }
  else { ytReadyCallbacks.push(cb); loadYouTubeAPI() }
}

export default function MusicPlayer({ onMusicStart }) {
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const [showHint, setShowHint] = useState(true)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const playerDivRef = useRef(null)
  const ytRef = useRef(null)
  const playingRef = useRef(false)

  useEffect(() => { playingRef.current = playing }, [playing])

  const initPlayer = useCallback((videoId) => {
    if (!playerDivRef.current) return
    if (ytRef.current) { try { ytRef.current.destroy() } catch {} ytRef.current = null }
    setReady(false)
    ytRef.current = new window.YT.Player(playerDivRef.current, {
      videoId,
      playerVars: { autoplay: 0, controls: 0, loop: 0, rel: 0, modestbranding: 1 },
      events: {
        onReady: () => setReady(true),
        onStateChange: (e) => {
          setPlaying(e.data === window.YT.PlayerState.PLAYING)
          if (e.data === window.YT.PlayerState.ENDED) {
            setTrackIndex(prev => (prev + 1) % PLAYLIST.length)
          }
        },
      },
    })
  }, [])

  useEffect(() => {
    onYTReady(() => initPlayer(extractYTId(PLAYLIST[0].url)))
    return () => { if (ytRef.current) { try { ytRef.current.destroy() } catch {} ytRef.current = null } }
  }, [])

  useEffect(() => {
    if (!ytRef.current) return
    const videoId = extractYTId(PLAYLIST[trackIndex].url)
    if (playingRef.current) { ytRef.current.loadVideoById?.({ videoId }) }
    else { ytRef.current.cueVideoById?.({ videoId }) }
  }, [trackIndex])

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 5000)
    return () => clearTimeout(t)
  }, [])

  const toggle = () => {
    if (!ready || !ytRef.current) return
    if (playing) {
      ytRef.current.pauseVideo()
    } else {
      ytRef.current.playVideo()
      if (!hasStarted) {
        setHasStarted(true)
        onMusicStart?.()
      }
    }
  }

  const goNext = () => setTrackIndex(i => (i + 1) % PLAYLIST.length)
  const goPrev = () => setTrackIndex(i => (i - 1 + PLAYLIST.length) % PLAYLIST.length)
  const playTrack = (index) => {
    setTrackIndex(index)
    setShowPlaylist(false)
    setTimeout(() => { ytRef.current?.playVideo?.() }, 200)
    if (!hasStarted) { setHasStarted(true); onMusicStart?.() }
  }

  const currentTrack = PLAYLIST[trackIndex]

  return (
    <>
      <div className="fixed -bottom-96 -left-96 w-1 h-1 overflow-hidden opacity-0 pointer-events-none" aria-hidden="true">
        <div ref={playerDivRef} />
      </div>

      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex flex-col items-end gap-2">

        {/* Hint */}
        <AnimatePresence>
          {showHint && !playing && (
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              className="font-body text-right"
              style={{ fontSize: '9px', letterSpacing: '0.28em', color: 'rgba(220,140,160,0.5)', textTransform: 'uppercase' }}
            >
              {!hasStarted ? 'กดเล่นเพลงเพื่อเริ่ม ♪' : 'เปิดเพลง ♪'}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Now playing */}
        <AnimatePresence>
          {playing && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              style={{ fontSize: '9px', letterSpacing: '0.18em', color: 'rgba(220,140,160,0.6)', textTransform: 'uppercase', maxWidth: 150 }}
              className="font-body truncate"
            >♪ {currentTrack.title}</motion.div>
          )}
        </AnimatePresence>

        {/* Control row */}
        <div className="flex items-center gap-1.5">
          <motion.button onClick={goPrev} whileTap={{ scale: 0.82 }}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ background: 'rgba(220,140,160,0.06)', border: '1px solid rgba(220,140,160,0.1)', color: 'rgba(220,140,160,0.5)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(220,140,160,0.9)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(220,140,160,0.5)'}
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
          </motion.button>

          {/* Main Play button */}
          <motion.button
            onClick={toggle}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.06 }}
            disabled={!ready}
            animate={!hasStarted && ready ? { scale: [1, 1.09, 1] } : {}}
            transition={!hasStarted && ready ? { duration: 1.9, repeat: Infinity, ease: 'easeInOut' } : {}}
            className="relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-500"
            style={{
              backdropFilter: 'blur(16px)',
              border: playing
                ? '1px solid rgba(220,140,160,0.4)'
                : !hasStarted && ready
                  ? '1px solid rgba(220,140,160,0.32)'
                  : '1px solid rgba(220,140,160,0.12)',
              background: playing
                ? 'rgba(220,140,160,0.18)'
                : !hasStarted && ready
                  ? 'rgba(220,140,160,0.1)'
                  : 'rgba(220,140,160,0.04)',
              boxShadow: playing
                ? '0 0 24px rgba(220,140,160,0.35), 0 0 50px rgba(220,140,160,0.15)'
                : !hasStarted && ready
                  ? '0 0 18px rgba(220,140,160,0.25)'
                  : 'none',
              opacity: !ready ? 0.5 : 1,
              cursor: !ready ? 'wait' : 'pointer',
            }}
            aria-label={playing ? 'หยุดเพลง' : 'เล่นเพลง'}
          >
            {playing ? (
              <svg viewBox="0 0 24 24" className="w-5 h-5" style={{ color: 'rgba(220,140,160,0.9)' }} fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1"/>
                <rect x="14" y="4" width="4" height="16" rx="1"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-5 h-5" style={{ color: !hasStarted && ready ? 'rgba(220,140,160,0.9)' : 'rgba(220,140,160,0.7)' }} fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
            {playing && (
              <motion.div className="absolute inset-0 rounded-full border border-blush/25"
                animate={{ scale: [1, 1.45, 1], opacity: [0.55, 0, 0.55] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            {!hasStarted && ready && !playing && (
              <motion.div className="absolute inset-0 rounded-full border"
                style={{ borderColor: 'rgba(220,140,160,0.3)' }}
                animate={{ scale: [1, 1.55, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </motion.button>

          <motion.button onClick={goNext} whileTap={{ scale: 0.82 }}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ background: 'rgba(220,140,160,0.06)', border: '1px solid rgba(220,140,160,0.1)', color: 'rgba(220,140,160,0.5)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(220,140,160,0.9)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(220,140,160,0.5)'}
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zm2-8.14 5.02 3.64-5.02 3.64V9.86zM16 6h2v12h-2z"/>
            </svg>
          </motion.button>

          <motion.button
            onClick={() => setShowPlaylist(v => !v)}
            whileTap={{ scale: 0.82 }}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: showPlaylist ? 'rgba(220,140,160,0.15)' : 'rgba(220,140,160,0.06)',
              border: showPlaylist ? '1px solid rgba(220,140,160,0.3)' : '1px solid rgba(220,140,160,0.1)',
              color: showPlaylist ? 'rgba(220,140,160,0.9)' : 'rgba(220,140,160,0.5)',
            }}
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
            </svg>
          </motion.button>
        </div>

        {/* Sound wave */}
        <AnimatePresence>
          {playing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-end gap-0.5 h-4 pr-1">
              {[1, 2.2, 3, 2.2, 1].map((h, i) => (
                <motion.div key={i}
                  className="w-0.5 rounded-full"
                  style={{ background: 'rgba(220,140,160,0.55)' }}
                  animate={{ height: ['3px', `${h * 4}px`, '3px'] }}
                  transition={{ duration: 0.7 + i * 0.08, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Playlist dropdown */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.94 }}
              transition={{ duration: 0.22 }}
              className="rounded-xl overflow-hidden min-w-[170px] glass-card"
            >
              {PLAYLIST.map((track, i) => (
                <button key={track.url} onClick={() => playTrack(i)}
                  className="w-full text-left px-4 py-3 flex items-center gap-2.5 transition-all duration-200"
                  style={{
                    fontSize: '9px',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: i === trackIndex ? 'rgba(220,140,160,0.9)' : 'rgba(220,140,160,0.45)',
                    background: i === trackIndex ? 'rgba(220,140,160,0.1)' : 'transparent',
                    fontFamily: "'Jost', sans-serif",
                  }}
                  onMouseEnter={e => { if (i !== trackIndex) e.currentTarget.style.background = 'rgba(220,140,160,0.05)' }}
                  onMouseLeave={e => { if (i !== trackIndex) e.currentTarget.style.background = 'transparent' }}
                >
                  <span style={{ color: i === trackIndex ? 'rgba(220,140,160,0.7)' : 'rgba(220,140,160,0.2)', fontSize: 10 }}>
                    {i === trackIndex && playing ? '♪' : `${i + 1}`}
                  </span>
                  {track.title}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
