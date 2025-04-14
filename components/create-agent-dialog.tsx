"use client"

import { useState } from "react"
import { Bot, Brain, Database, Shield, Sparkles } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface CreateAgentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAgentCreated: (agent: any) => void
}

export function CreateAgentDialog({ open, onOpenChange, onAgentCreated }: CreateAgentDialogProps) {
  const [step, setStep] = useState(1)
  const [agentData, setAgentData] = useState({
    name: "",
    type: "ai",
    model: "gpt-4o",
    description: "",
    accessLevel: "limited",
    storageProvider: "ipfs",
    encryptionEnabled: true,
  })

  const handleChange = (field: string, value: string | boolean) => {
    setAgentData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = () => {
    // In a real app, this would create the agent with the selected storage provider
    onAgentCreated({
      ...agentData,
      id: `agent-${Date.now()}`,
      status: "Active",
      address: "0x" + Math.random().toString(16).substring(2, 10) + "...",
      lastAccess: new Date().toISOString().split("T")[0],
      memoryCount: 0,
    })
    onOpenChange(false)
    setStep(1)
    setAgentData({
      name: "",
      type: "ai",
      model: "gpt-4o",
      description: "",
      accessLevel: "limited",
      storageProvider: "ipfs",
      encryptionEnabled: true,
    })
  }

  const storageProviders = [
    {
      id: "ipfs",
      name: "IPFS/Filecoin",
      description: "Decentralized storage on the InterPlanetary File System and Filecoin network",
      icon: Database,
      features: ["Permanent storage", "Content-addressed", "Decentralized"],
    },
    {
      id: "recall",
      name: "Recall Network",
      description: "Unstoppable intelligence network for storing, sharing and trading knowledge on-chain",
      icon: Brain,
      features: ["Agent-centric", "Knowledge trading", "On-chain storage"],
    },
    {
      id: "storacha",
      name: "Storacha AI",
      description: "Self-sovereign data for multi-agent deployment with enhanced privacy",
      icon: Sparkles,
      features: ["Multi-agent optimized", "Self-sovereign", "Privacy-focused"],
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Agent</DialogTitle>
          <DialogDescription>
            Configure a new AI agent to securely interact with your encrypted memories.
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Agent Name</Label>
              <Input
                id="name"
                value={agentData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter agent name"
              />
            </div>

            <div className="space-y-2">
              <Label>Agent Type</Label>
              <RadioGroup
                value={agentData.type}
                onValueChange={(value) => handleChange("type", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ai" id="ai" />
                  <Label htmlFor="ai" className="flex items-center">
                    <Bot className="mr-2 h-4 w-4" />
                    AI Agent
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="human" id="human" />
                  <Label htmlFor="human">Human User</Label>
                </div>
              </RadioGroup>
            </div>

            {agentData.type === "ai" && (
              <div className="space-y-2">
                <Label htmlFor="model">AI Model</Label>
                <Select value={agentData.model} onValueChange={(value) => handleChange("model", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="claude-3">Claude 3</SelectItem>
                    <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                    <SelectItem value="llama-3">Llama 3</SelectItem>
                    <SelectItem value="custom">Custom Model</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={agentData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe this agent's purpose and capabilities"
                rows={3}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Access Level</Label>
              <RadioGroup
                value={agentData.accessLevel}
                onValueChange={(value) => handleChange("accessLevel", value)}
                className="space-y-2"
              >
                <div className="flex items-start space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="full" id="full" className="mt-1" />
                  <div>
                    <Label htmlFor="full" className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-destructive" />
                      Full Access
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Agent can read, write, and modify all memories without restrictions
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="limited" id="limited" className="mt-1" />
                  <div>
                    <Label htmlFor="limited" className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-yellow-500" />
                      Limited Access
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Agent can read all memories but only modify specific categories
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="readonly" id="readonly" className="mt-1" />
                  <div>
                    <Label htmlFor="readonly" className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-green-500" />
                      Read-Only
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Agent can only read memories but cannot create or modify them
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Storage Provider</Label>
              <Tabs
                defaultValue={agentData.storageProvider}
                onValueChange={(value) => handleChange("storageProvider", value)}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="ipfs">IPFS/Filecoin</TabsTrigger>
                  <TabsTrigger value="recall">Recall Network</TabsTrigger>
                  <TabsTrigger value="storacha">Storacha AI</TabsTrigger>
                </TabsList>
                {storageProviders.map((provider) => (
                  <TabsContent key={provider.id} value={provider.id} className="space-y-4 pt-4">
                    <div className="flex items-start space-x-4 rounded-md border p-4">
                      <div className="mt-0.5 rounded-full bg-primary/10 p-2">
                        <provider.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">{provider.name}</h4>
                        <p className="text-sm text-muted-foreground">{provider.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {provider.features.map((feature, index) => (
                            <Badge key={index} variant="secondary">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {provider.id === "recall" && (
                      <div className="rounded-md bg-muted p-3">
                        <div className="flex items-center space-x-2">
                          <img
                            src="https://sjc.microlink.io/Ssf_IoiKeaHSzoTUN04fDor_L5uu_BNCVzq1DNDu_HuUlBzqejiTUY4RI-QzxiIXD7K8PsfjK3NMcsbVyIBeLw.jpeg"
                            alt="Recall Network"
                            className="h-8 w-8 rounded-md object-cover"
                          />
                          <div>
                            <h4 className="text-sm font-medium">Recall Network</h4>
                            <p className="text-xs text-muted-foreground">Unstoppable intelligence network for agents</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {provider.id === "storacha" && (
                      <div className="rounded-md bg-muted p-3">
                        <div className="flex items-center space-x-2">
                          <img
                            src="https://sjc.microlink.io/Di5R5gd-w_sIzIv9uXZJnoVo976vRTrnQUreo1QxdHpsy56S-2a7wDmVNrdB-xITbFRXF2nOIHWkX1BkZ4Z7Jw.jpeg"
                            alt="Storacha AI"
                            className="h-8 w-8 rounded-md object-cover"
                          />
                          <div>
                            <h4 className="text-sm font-medium">Storacha AI</h4>
                            <p className="text-xs text-muted-foreground">
                              Self-sovereign data for multi-agent deployment
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            <div className="space-y-2 pt-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="encryption">End-to-End Encryption</Label>
                <div className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-8 rounded-full p-1 transition-colors ${
                      agentData.encryptionEnabled ? "bg-green-500" : "bg-gray-300"
                    }`}
                    onClick={() => handleChange("encryptionEnabled", !agentData.encryptionEnabled)}
                  >
                    <div
                      className={`h-2 w-2 rounded-full bg-white transition-transform ${
                        agentData.encryptionEnabled ? "translate-x-4" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Encrypt all memories with AES-256 before storing on{" "}
                {storageProviders.find((p) => p.id === agentData.storageProvider)?.name}
              </p>
            </div>
          </div>
        )}

        <DialogFooter className="flex items-center justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          <div className="flex items-center space-x-2">
            <div className="text-sm text-muted-foreground">Step {step} of 3</div>
            {step < 3 ? (
              <Button onClick={handleNext} disabled={step === 1 && !agentData.name}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit}>Create Agent</Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
