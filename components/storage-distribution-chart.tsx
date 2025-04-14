"use client"

import { useEffect, useRef } from "react"
import { Database, Brain, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface StorageDistributionChartProps {
  timeRange: string
}

export function StorageDistributionChart({ timeRange }: StorageDistributionChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Mock data for storage distribution
  const storageData = {
    ipfs: { count: 73, size: 819200, color: "#3b82f6" }, // blue
    recall: { count: 37, size: 409600, color: "#10b981" }, // green
    storacha: { count: 18, size: 204800, color: "#8b5cf6" }, // purple
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Draw pie chart
    const drawPieChart = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background
      ctx.fillStyle = "rgba(15, 23, 42, 0.3)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(centerX, centerY) - 40

      const total = Object.values(storageData).reduce((sum, data) => sum + data.size, 0)

      let startAngle = 0

      Object.entries(storageData).forEach(([provider, data]) => {
        const portion = data.size / total
        const endAngle = startAngle + portion * 2 * Math.PI

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, startAngle, endAngle)
        ctx.closePath()

        ctx.fillStyle = data.color
        ctx.fill()

        // Add stroke
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
        ctx.lineWidth = 2
        ctx.stroke()

        // Calculate position for label
        const midAngle = startAngle + (endAngle - startAngle) / 2
        const labelRadius = radius * 0.7
        const labelX = centerX + Math.cos(midAngle) * labelRadius
        const labelY = centerY + Math.sin(midAngle) * labelRadius

        // Draw percentage label if segment is large enough
        if (portion > 0.05) {
          ctx.fillStyle = "white"
          ctx.font = "bold 14px sans-serif"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(`${Math.round(portion * 100)}%`, labelX, labelY)
        }

        startAngle = endAngle
      })

      // Draw legend
      const legendItems = [
        { provider: "ipfs", label: "IPFS/Filecoin", icon: "📦" },
        { provider: "recall", label: "Recall Network", icon: "🧠" },
        { provider: "storacha", label: "Storacha AI", icon: "✨" },
      ]

      const legendX = 20
      let legendY = 20

      ctx.font = "12px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"

      legendItems.forEach((item) => {
        const data = storageData[item.provider as keyof typeof storageData]

        // Color box
        ctx.fillStyle = data.color
        ctx.fillRect(legendX, legendY - 8, 16, 16)

        // Stroke
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
        ctx.lineWidth = 1
        ctx.strokeRect(legendX, legendY - 8, 16, 16)

        // Label
        ctx.fillStyle = "white"
        ctx.fillText(`${item.label} (${data.count})`, legendX + 25, legendY)

        legendY += 25
      })
    }

    drawPieChart()

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = canvasRef.current.offsetWidth
      canvasRef.current.height = canvasRef.current.offsetHeight
      drawPieChart()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [timeRange])

  return (
    <div className="relative h-[240px]">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-2 right-2 flex space-x-2">
        <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
          <Database className="mr-1 h-3 w-3 text-blue-500" />
          IPFS
        </Badge>
        <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
          <Brain className="mr-1 h-3 w-3 text-green-500" />
          Recall
        </Badge>
        <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
          <Sparkles className="mr-1 h-3 w-3 text-purple-500" />
          Storacha
        </Badge>
      </div>
    </div>
  )
}
