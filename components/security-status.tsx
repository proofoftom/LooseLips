import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, CheckCircle, Lock } from "lucide-react"

export function SecurityStatus() {
  const securityItems = [
    {
      title: "Encryption Status",
      status: "Secure",
      icon: Lock,
      description: "All memories are encrypted with AES-256",
      progress: 100,
      variant: "success",
    },
    {
      title: "Access Control",
      status: "Configured",
      icon: Shield,
      description: "3 authorized agents with conditional access",
      progress: 100,
      variant: "success",
    },
    {
      title: "IPFS Storage",
      status: "Distributed",
      icon: CheckCircle,
      description: "All memories stored on decentralized network",
      progress: 100,
      variant: "success",
    },
    {
      title: "Key Management",
      status: "Secure",
      icon: Lock,
      description: "Lit Protocol managing encryption keys",
      progress: 100,
      variant: "success",
    },
    {
      title: "Wallet Connection",
      status: "Connected",
      icon: CheckCircle,
      description: "MetaMask wallet connected and verified",
      progress: 100,
      variant: "success",
    },
    {
      title: "Vulnerability Scan",
      status: "Warning",
      icon: AlertTriangle,
      description: "Last scan: 30 days ago",
      progress: 60,
      variant: "warning",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {securityItems.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon
              className={`h-4 w-4 ${
                item.variant === "success"
                  ? "text-green-500"
                  : item.variant === "warning"
                    ? "text-yellow-500"
                    : item.variant === "danger"
                      ? "text-red-500"
                      : "text-muted-foreground"
              }`}
            />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <Badge
                variant={
                  item.variant === "success" ? "default" : item.variant === "warning" ? "outline" : "destructive"
                }
              >
                {item.status}
              </Badge>
              <span className="text-xs text-muted-foreground">{item.progress}%</span>
            </div>
            <Progress
              value={item.progress}
              className={`h-2 ${
                item.variant === "success"
                  ? "bg-green-500/20"
                  : item.variant === "warning"
                    ? "bg-yellow-500/20"
                    : "bg-red-500/20"
              }`}
            />
            <p className="mt-2 text-xs text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
