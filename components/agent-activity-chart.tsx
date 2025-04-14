"use client"

import { useEffect, useRef } from "react"
import { Bot, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface AgentActivityChartProps {
  timeRange: string
}

export function AgentActivityChart({ timeRange }: AgentActivityChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Mock data for agents
  const agents = [
    { id: "agent-001", name: "Alpha", type: "ai", color: "#6366f1" },
    { id: "agent-002", name: "Beta", type: "ai", color: "#8b5cf6" },
    { id: "agent-003", name: "You", type: "human", color: "#ec4899" },
    { id: "agent-004", name: "Gamma", type: "ai", color: "#10b981" },
  ]

  // Generate mock data for the chart
  const generateActivityData = () => {
    const days = timeRange === "7d" ? 7 : timeRange === "14d" ? 14 : timeRange === "30d" ? 30 : 90
    const data: Record<string, Record<string, number>> = {}

    // Initialize days
    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (days - 1 - i))
      const dateKey = date.toISOString().split("T")[0]

      data[dateKey] = {}
      agents.forEach((agent) => {
        data[dateKey][agent.id] = 0
      })
    }

    // Generate random activity
    for (let i = 0; i < 300; i++) {
      const dayOffset = Math.floor(Math.random() * days)
      const date = new Date()
      date.setDate(date.getDate() - (days - 1 - dayOffset))
      const dateKey = date.toISOString().split("T")[0]

      const agentId = agents[Math.floor(Math.random() * agents.length)].id

      if (data[dateKey]) {
        data[dateKey][agentId] = (data[dateKey][agentId] || 0) + 1
      }
    }

    return data
  }

  const activityData = generateActivityData()

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Draw activity chart
    const drawActivityChart = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background
      ctx.fillStyle = "rgba(15, 23, 42, 0.3)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Determine date range
      const days = timeRange === "7d" ? 7 : timeRange === "14d" ? 14 : timeRange === "30d" ? 30 : 90

      // Calculate chart dimensions
      const padding = { top: 40, right: 20, bottom: 40, left: 60 }
      const chartWidth = canvas.width - padding.left - padding.right
      const chartHeight = canvas.height - padding.top - padding.bottom

      // Find max value for scaling
      let maxValue = 0
      Object.values(activityData).forEach((dayData) => {
        const dayTotal = Object.values(dayData).reduce((sum, count) => sum + count, 0)
        maxValue = Math.max(maxValue, dayTotal)
      })

      // Add some headroom
      maxValue = Math.ceil(maxValue * 1.1)

      // Draw axes
      ctx.strokeStyle = "rgba(148, 163, 184, 0.3)"
      ctx.lineWidth = 1

      // Y-axis
      ctx.beginPath()
      ctx.moveTo(padding.left, padding.top)
      ctx.lineTo(padding.left, canvas.height - padding.bottom)
      ctx.stroke()

      // X-axis
      ctx.beginPath()
      ctx.moveTo(padding.left, canvas.height - padding.bottom)
      ctx.lineTo(canvas.width - padding.right, canvas.height - padding.bottom)
      ctx.stroke()

      // Draw Y-axis labels and grid lines
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "right"
      ctx.textBaseline = "middle"

      const yTickCount = 5
      for (let i = 0; i <= yTickCount; i++) {
        const y = padding.top + (chartHeight * (yTickCount - i)) / yTickCount
        const value = Math.round((i / yTickCount) * maxValue)

        // Grid line
        ctx.beginPath()
        ctx.moveTo(padding.left, y)
        ctx.lineTo(canvas.width - padding.right, y)
        ctx.strokeStyle = "rgba(148, 163, 184, 0.1)"
        ctx.stroke()

        // Label
        ctx.fillText(value.toString(), padding.left - 10, y)
      }

      // Draw X-axis labels and grid lines
      ctx.textAlign = "center"
      ctx.textBaseline = "top"

      const dateKeys = Object.keys(activityData).sort()
      const barWidth = chartWidth / dateKeys.length

      dateKeys.forEach((dateKey, i) => {
        const x = padding.left + i * barWidth + barWidth / 2

        // Grid line
        ctx.beginPath()
        ctx.moveTo(x, padding.top)
        ctx.lineTo(x, canvas.height - padding.bottom)
        ctx.strokeStyle = "rgba(148, 163, 184, 0.1)"
        ctx.stroke()

        // Only show some date labels to avoid crowding
        const skipFactor = days <= 7 ? 1 : days <= 14 ? 2 : days <= 30 ? 3 : 7
        if (i % skipFactor === 0) {
          const date = new Date(dateKey)
          const label = `${date.getDate()}/${date.getMonth() + 1}`
          ctx.fillText(label, x, canvas.height - padding.bottom + 10)
        }
      })

      // Draw stacked bars
      dateKeys.forEach((dateKey, i) => {
        const x = padding.left + i * barWidth
        let yOffset = canvas.height - padding.bottom

        agents.forEach((agent) => {
          const value = activityData[dateKey][agent.id] || 0
          const barHeight = (value / maxValue) * chartHeight

          // Skip if no activity
          if (barHeight === 0) return

          // Draw bar
          ctx.fillStyle = agent.color
          ctx.fillRect(x + 2, yOffset - barHeight, barWidth - 4, barHeight)

          // Add border
          ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
          ctx.lineWidth = 1
          ctx.strokeRect(x + 2, yOffset - barHeight, barWidth - 4, barHeight)

          // Update offset for next bar in stack
          yOffset -= barHeight
        })
      })

      // Draw legend
      const legendX = canvas.width - 150
      let legendY = 20

      ctx.font = "12px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"

      agents.forEach((agent) => {
        // Color box
        ctx.fillStyle = agent.color
        ctx.fillRect(legendX, legendY - 8, 16, 16)

        // Stroke
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
        ctx.lineWidth = 1
        ctx.strokeRect(legendX, legendY - 8, 16, 16)

        // Label
        ctx.fillStyle = "white"
        ctx.fillText(agent.name, legendX + 25, legendY)

        legendY += 25
      })
    }

    drawActivityChart()

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = canvasRef.current.offsetWidth
      canvasRef.current.height = canvasRef.current.offsetHeight
      drawActivityChart()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [timeRange, activityData])

  return (
    <div className="relative h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-2 left-2 flex space-x-2">
        <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
          <Bot className="mr-1 h-3 w-3" />
          AI Agents
        </Badge>
        <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
          <User className="mr-1 h-3 w-3" />
          Human Users
        </Badge>
      </div>
    </div>
  )
}
