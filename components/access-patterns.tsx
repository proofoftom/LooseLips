"use client"

import { useEffect, useRef } from "react"

export function AccessPatterns() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Draw futuristic access pattern visualization
    const drawVisualization = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background
      ctx.fillStyle = "rgba(15, 23, 42, 0.3)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Grid lines
      ctx.strokeStyle = "rgba(148, 163, 184, 0.1)"
      ctx.lineWidth = 1

      // Vertical grid lines
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal grid lines
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw data points
      const dataPoints = generateMockDataPoints(canvas.width, canvas.height)

      // Draw connections between points
      ctx.strokeStyle = "rgba(99, 102, 241, 0.4)"
      ctx.lineWidth = 1

      for (let i = 0; i < dataPoints.length; i++) {
        for (let j = i + 1; j < dataPoints.length; j++) {
          const distance = Math.sqrt(
            Math.pow(dataPoints[i].x - dataPoints[j].x, 2) + Math.pow(dataPoints[i].y - dataPoints[j].y, 2),
          )

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(dataPoints[i].x, dataPoints[i].y)
            ctx.lineTo(dataPoints[j].x, dataPoints[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw points
      dataPoints.forEach((point) => {
        // Glow effect
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.size * 2)
        gradient.addColorStop(0, point.color)
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.size * 2, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.fillStyle = point.color
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Animate
      requestAnimationFrame(drawVisualization)
    }

    drawVisualization()

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = canvasRef.current.offsetWidth
      canvasRef.current.height = canvasRef.current.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="w-full h-[300px] relative">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

// Helper function to generate mock data points
function generateMockDataPoints(width: number, height: number) {
  const points = []
  const colors = [
    "rgba(99, 102, 241, 0.8)", // Indigo
    "rgba(79, 70, 229, 0.8)", // Violet
    "rgba(139, 92, 246, 0.8)", // Purple
    "rgba(236, 72, 153, 0.8)", // Pink
  ]

  for (let i = 0; i < 30; i++) {
    points.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    })
  }

  return points
}
