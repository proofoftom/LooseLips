import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Shield, Clock, Users } from "lucide-react"

export function MemoryStats() {
  const stats = [
    {
      title: "Total Memories",
      value: "128",
      icon: Database,
      description: "12 new this month",
      change: "+8%",
      changeType: "positive",
    },
    {
      title: "Encrypted",
      value: "100%",
      icon: Shield,
      description: "All memories secured",
      change: "0%",
      changeType: "neutral",
    },
    {
      title: "Avg. Retention",
      value: "2.5 yrs",
      icon: Clock,
      description: "Permanent storage",
      change: "+0.5 yrs",
      changeType: "positive",
    },
    {
      title: "Authorized Agents",
      value: "3",
      icon: Users,
      description: "2 AI, 1 human",
      change: "+1",
      changeType: "positive",
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
            <div
              className={`mt-1 text-xs ${
                stat.changeType === "positive"
                  ? "text-green-500"
                  : stat.changeType === "negative"
                    ? "text-red-500"
                    : "text-muted-foreground"
              }`}
            >
              {stat.change}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
