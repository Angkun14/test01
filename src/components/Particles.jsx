import React, { useEffect } from 'react'

export default function Particles() {
  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.id = 'particles-canvas'
    document.body.appendChild(canvas)
    const ctx = canvas.getContext('2d')

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const sparkles = Array.from({ length: 65 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.3 + 0.15,
      vx: (Math.random() - 0.5) * 0.22,
      vy: -(Math.random() * 0.32 + 0.07),
      opacity: Math.random() * 0.5 + 0.08,
      hue: Math.random() > 0.55 ? '220,140,160' : Math.random() > 0.5 ? '232,205,160' : '200,110,140',
    }))
    const blobs = Array.from({ length: 14 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 6 + 2,
      vx: (Math.random() - 0.5) * 0.13,
      vy: -(Math.random() * 0.18 + 0.04),
      opacity: Math.random() * 0.1 + 0.03,
    }))

    let raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      blobs.forEach(p => {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r)
        g.addColorStop(0, `rgba(220,140,160,${p.opacity})`)
        g.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
        p.x += p.vx; p.y += p.vy
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width }
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
      })
      sparkles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.hue},${p.opacity})`
        ctx.fill()
        p.x += p.vx; p.y += p.vy
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width }
        if (p.x < -5) p.x = canvas.width + 5
        if (p.x > canvas.width + 5) p.x = -5
      })
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); canvas.remove() }
  }, [])
  return null
}
