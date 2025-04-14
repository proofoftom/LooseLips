"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Bot, User, Shield, Calendar, Database, Brain, Sparkles, Lock } from "lucide-react"

interface AgentDetailsDialogProps {
  agent: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AgentDetailsDialog({ agent, open, onOpenChange }: AgentDetailsDialogProps) {
  const getStorageIcon = (provider: string) => {
    switch (provider) {
      case "ipfs":
        return <Database className="h-5 w-5" />
      case "recall":
        return <Brain className="h-5 w-5" />
      case "storacha":
        return <Sparkles className="h-5 w-5" />
      default:
        return <Database className="h-5 w-5" />
    }
  }

  const getStorageName = (provider: string) => {
    switch (provider) {
      case "ipfs":
        return "IPFS/Filecoin"
      case "recall":
        return "Recall Network"
      case "storacha":
        return "Storacha AI"
      default:
        return "Unknown"
    }
  }

  const getStorageDescription = (provider: string) => {
    switch (provider) {
      case "ipfs":
        return "Decentralized storage on the InterPlanetary File System and Filecoin network"
      case "recall":
        return "Unstoppable intelligence network for storing, sharing and trading knowledge on-chain"
      case "storacha":
        return "Self-sovereign data for multi-agent deployment with enhanced privacy"
      default:
        return "Unknown storage provider"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Agent Details</DialogTitle>
          <DialogDescription>Detailed information about this agent</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-start space-x-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              {agent.type === "ai" ? (
                <Bot className="h-6 w-6 text-primary" />
              ) : (
                <User className="h-6 w-6 text-primary" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium">{agent.name}</h3>
              <p className="text-sm text-muted-foreground">{agent.description || "No description provided"}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant={agent.status === "Active" ? "default" : "secondary"}>{agent.status}</Badge>
                {agent.type === "ai" && agent.model && <Badge variant="outline">{agent.model}</Badge>}
                <Badge
                  variant={
                    agent.accessLevel === "full"
                      ? "destructive"
                      : agent.accessLevel === "limited"
                        ? "secondary"
                        : "outline"
                  }
                >
                  <Shield className="mr-1 h-3 w-3" />
                  {agent.accessLevel === "full"
                    ? "Full Access"
                    : agent.accessLevel === "limited"
                      ? "Limited Access"
                      : "Read-Only"}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium">Contract Address</h4>
              <p className="mt-1 font-mono text-sm">{agent.address}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium">Last Access</h4>
              <p className="mt-1 flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                {agent.lastAccess}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium">Memory Access Count</h4>
              <p className="mt-1 text-sm">{agent.memoryCount} memories accessed</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Storage Configuration</h4>
            <div className="rounded-md border p-4">
              <div className="flex items-start space-x-3">
                <div className="mt-0.5 rounded-full bg-primary/10 p-2">{getStorageIcon(agent.storageProvider)}</div>
                <div>
                  <h5 className="font-medium">{getStorageName(agent.storageProvider)}</h5>
                  <p className="text-sm text-muted-foreground">{getStorageDescription(agent.storageProvider)}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-green-500" />
                    <span className="text-sm">End-to-end encrypted with Lit Protocol</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
