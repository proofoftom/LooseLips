import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Brain, Sparkles } from "lucide-react"

interface StorageProviderCardProps {
  provider: "ipfs" | "recall" | "storacha"
  className?: string
}

export function StorageProviderCard({ provider, className }: StorageProviderCardProps) {
  const providers = {
    ipfs: {
      name: "IPFS/Filecoin",
      description: "Decentralized storage on the InterPlanetary File System and Filecoin network",
      icon: Database,
      color: "text-blue-500",
      features: ["Permanent storage", "Content-addressed", "Decentralized"],
    },
    recall: {
      name: "Recall Network",
      description: "Unstoppable intelligence network for storing, sharing and trading knowledge on-chain",
      icon: Brain,
      color: "text-green-500",
      features: ["Agent-centric", "Knowledge trading", "On-chain storage"],
    },
    storacha: {
      name: "Storacha AI",
      description: "Self-sovereign data for multi-agent deployment with enhanced privacy",
      icon: Sparkles,
      color: "text-purple-500",
      features: ["Multi-agent optimized", "Self-sovereign", "Privacy-focused"],
    },
  }

  const providerInfo = providers[provider]
  const Icon = providerInfo.icon

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <Icon className={`h-5 w-5 ${providerInfo.color}`} />
          <CardTitle className="text-base">{providerInfo.name}</CardTitle>
        </div>
        <CardDescription>{providerInfo.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {providerInfo.features.map((feature, index) => (
            <Badge key={index} variant="outline">
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
