"use client"

import { useState } from "react"
import { Plus, Filter, Bot, User, Brain } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AgentsTable } from "@/components/agents-table"
import { CreateAgentDialog } from "@/components/create-agent-dialog"

export default function AgentsPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [agents, setAgents] = useState([
    {
      id: "agent-001",
      name: "Alpha",
      type: "ai",
      model: "gpt-4o",
      address: "0x1a2b3c4d5e6f7g8h9i0j",
      accessLevel: "limited",
      status: "Active",
      lastAccess: "2023-04-12",
      memoryCount: 42,
      storageProvider: "ipfs",
      description: "General purpose assistant for memory management",
    },
    {
      id: "agent-002",
      name: "Beta",
      type: "ai",
      model: "claude-3",
      address: "0x9i8h7g6f5e4d3c2b1a0",
      accessLevel: "readonly",
      status: "Active",
      lastAccess: "2023-04-10",
      memoryCount: 28,
      storageProvider: "ipfs",
      description: "Research assistant with read-only access",
    },
    {
      id: "agent-003",
      name: "You",
      type: "human",
      address: "0x1a2...3b4c",
      accessLevel: "full",
      status: "Active",
      lastAccess: "2023-04-13",
      memoryCount: 128,
      storageProvider: "ipfs",
      description: "Human user with full access",
    },
  ])

  const handleAgentCreated = (newAgent: any) => {
    setAgents((prev) => [...prev, newAgent])
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">AI Agents</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" onClick={() => setCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Agent
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.length}</div>
            <p className="text-xs text-muted-foreground">
              {agents.filter((a) => a.type === "ai").length} AI, {agents.filter((a) => a.type === "human").length} human
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Providers</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(agents.map((a) => a.storageProvider)).size}</div>
            <p className="text-xs text-muted-foreground">Active providers in use</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.filter((a) => a.status === "Active").length}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Access</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.reduce((acc, agent) => acc + agent.memoryCount, 0)}</div>
            <p className="text-xs text-muted-foreground">Total memory accesses</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Agents</TabsTrigger>
          <TabsTrigger value="ai">AI Agents</TabsTrigger>
          <TabsTrigger value="human">Human Users</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Agent Management</CardTitle>
              <CardDescription>Manage your AI agents and their access to memories</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <AgentsTable agents={agents} setAgents={setAgents} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>AI Agents</CardTitle>
              <CardDescription>Manage your AI agents</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <AgentsTable agents={agents.filter((agent) => agent.type === "ai")} setAgents={setAgents} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="human" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Human Users</CardTitle>
              <CardDescription>Manage human users</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <AgentsTable agents={agents.filter((agent) => agent.type === "human")} setAgents={setAgents} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateAgentDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onAgentCreated={handleAgentCreated}
      />
    </div>
  )
}
