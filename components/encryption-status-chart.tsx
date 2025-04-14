"use client"

import { useEffect, useRef } from "react"
import { Lock, ShieldAlert, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function EncryptionStatusChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Mock data for encryption status
  const encryptionData = {
    encrypted: { count: 124, percentage: 96.9, color: "#10b981" }, // green
    partiallyEncrypted: { count: 3, percentage: 2.3, color: "#f59e0b" }, // amber
    unencrypted: { count: 1, percentage: 0.8, color: "#ef4444" }, // red
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Draw donut chart
    const drawDonutChart = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background
      ctx.fillStyle = "rgba(15, 23, 42, 0.3)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const outerRadius = Math.min(centerX, centerY) - 40
      const innerRadius = outerRadius * 0.6

      let startAngle = 0

      Object.entries(encryptionData).forEach(([status, data]) => {
        const portion = data.percentage / 100
        const endAngle = startAngle + portion * 2 * Math.PI

        // Draw arc
        ctx.beginPath()
        ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle)
        ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true)
        ctx.closePath()

        ctx.fillStyle = data.color
        ctx.fill()

        // Add stroke
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
        ctx.lineWidth = 2
        ctx.stroke()

        // Calculate position for label
        const midAngle = startAngle + (endAngle - startAngle) / 2
        const labelRadius = (outerRadius + innerRadius) / 2
        const labelX = centerX + Math.cos(midAngle) * labelRadius
        const labelY = centerY + Math.sin(midAngle) * labelRadius

        // Draw percentage label if segment is large enough
        if (portion > 0.05) {
          ctx.fillStyle = "white"
          ctx.font = "bold 14px sans-serif"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(`${Math.round(data.percentage)}%`, labelX, labelY)
        }

        startAngle = endAngle
      })

      // Draw center text
      ctx.fillStyle = "white"
      ctx.font = "bold 18px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("Security", centerX, centerY - 10)
      ctx.font = "14px sans-serif"
      ctx.fillText("Status", centerX, centerY + 10)

      // Draw legend
      const legendItems = [
        { status: "encrypted", label: "Fully Encrypted", icon: ShieldCheck },
        { status: "partiallyEncrypted", label: "Partially Encrypted", icon: ShieldAlert },
        { status: "unencrypted", label: "Unencrypted", icon: ShieldAlert },
      ]

      const legendX = 20
      let legendY = 20

      ctx.font = "12px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"

      legendItems.forEach((item) => {
        const data = encryptionData[item.status as keyof typeof encryptionData]

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

    drawDonutChart()

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = canvasRef.current.offsetWidth
      canvasRef.current.height = canvasRef.current.offsetHeight
      drawDonutChart()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="relative h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-2 right-2 flex space-x-2">
        <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
          <Lock className="mr-1 h-3 w-3" />
          End-to-End Encrypted
        </Badge>
      </div>
    </div>
  )
}
