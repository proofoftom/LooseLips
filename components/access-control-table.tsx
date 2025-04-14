"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bot, User, MoreHorizontal, Shield, Calendar, Key } from "lucide-react"

type Agent = {
  id: string
  name: string
  type: "AI" | "Human"
  address: string
  accessLevel: "Full" | "Limited" | "Read-Only"
  status: "Active" | "Inactive"
  lastAccess: string
  memoryCount: number
}

const agents: Agent[] = [
  {
    id: "agent-001",
    name: "Alpha",
    type: "AI",
    address: "0x1a2b3c4d5e6f7g8h9i0j",
    accessLevel: "Limited",
    status: "Active",
    lastAccess: "2023-04-12",
    memoryCount: 42,
  },
  {
    id: "agent-002",
    name: "Beta",
    type: "AI",
    address: "0x9i8h7g6f5e4d3c2b1a0",
    accessLevel: "Read-Only",
    status: "Active",
    lastAccess: "2023-04-10",
    memoryCount: 28,
  },
  {
    id: "agent-003",
    name: "You",
    type: "Human",
    address: "0x1a2...3b4c",
    accessLevel: "Full",
    status: "Active",
    lastAccess: "2023-04-13",
    memoryCount: 128,
  },
  {
    id: "agent-004",
    name: "Gamma",
    type: "AI",
    address: "0x5e4d3c2b1a9i8h7g6f0",
    accessLevel: "Limited",
    status: "Inactive",
    lastAccess: "2023-04-01",
    memoryCount: 15,
  },
]

export function AccessControlTable() {
  const [agentStatuses, setAgentStatuses] = useState<Record<string, boolean>>(
    agents.reduce(
      (acc, agent) => ({
        ...acc,
        [agent.id]: agent.status === "Active",
      }),
      {},
    ),
  )

  const toggleAgentStatus = (id: string) => {
    setAgentStatuses((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Agent</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Contract Address</TableHead>
            <TableHead>Access Level</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Access</TableHead>
            <TableHead>Memory Count</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agents.map((agent) => (
            <TableRow key={agent.id} className="group">
              <TableCell className="font-medium">{agent.name}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {agent.type === "AI" ? <Bot className="mr-2 h-4 w-4" /> : <User className="mr-2 h-4 w-4" />}
                  {agent.type}
                </div>
              </TableCell>
              <TableCell className="font-mono text-xs">{agent.address}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    agent.accessLevel === "Full" ? "default" : agent.accessLevel === "Limited" ? "secondary" : "outline"
                  }
                >
                  <Shield className="mr-1 h-3 w-3" />
                  {agent.accessLevel}
                </Badge>
              </TableCell>
              <TableCell>
                <Switch
                  checked={agentStatuses[agent.id]}
                  onCheckedChange={() => toggleAgentStatus(agent.id)}
                  disabled={agent.type === "Human"}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  {agent.lastAccess}
                </div>
              </TableCell>
              <TableCell>{agent.memoryCount}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Key className="mr-2 h-4 w-4" />
                      Edit Access Keys
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Shield className="mr-2 h-4 w-4" />
                      Change Access Level
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Revoke Access</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
