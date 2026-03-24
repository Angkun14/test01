import React, { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    // Only show on pointer: fine (desktop)
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = document.createElement('div')
    dot.className = 'custom-cursor'
    const ring = document.createElement('div')
    ring.className = 'custom-cursor-ring'
    document.body.appendChild(dot)
    document.body.appendChild(ring)

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12

      dot.style.left = `${pos.current.x - 4}px`
      dot.style.top = `${pos.current.y - 4}px`
      ring.style.left = `${ringPos.current.x - 16}px`
      ring.style.top = `${ringPos.current.y - 16}px`

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      dot.remove()
      ring.remove()
    }
  }, [])

  return null
}
