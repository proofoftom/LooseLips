"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Lock, Eye, MoreHorizontal, Calendar, Bot, User, FileText, MessageSquare, Database } from "lucide-react"

type Memory = {
  id: string
  title: string
  type: "Conversation" | "Document" | "Journal" | "Research"
  created: string
  access: "Private" | "Shared" | "Archived"
  size: string
  agents: string[]
}

const memories: Memory[] = [
  {
    id: "mem-001",
    title: "Meeting with AI Agent Alpha",
    type: "Conversation",
    created: "2023-04-12",
    access: "Private",
    size: "128 KB",
    agents: ["Alpha"],
  },
  {
    id: "mem-002",
    title: "Project Moonshot Planning",
    type: "Document",
    created: "2023-04-11",
    access: "Shared",
    size: "256 KB",
    agents: ["Beta", "Gamma"],
  },
  {
    id: "mem-003",
    title: "Personal Journal Entry",
    type: "Journal",
    created: "2023-04-09",
    access: "Private",
    size: "64 KB",
    agents: [],
  },
  {
    id: "mem-004",
    title: "Research on Quantum Computing",
    type: "Research",
    created: "2023-04-05",
    access: "Shared",
    size: "512 KB",
    agents: ["Gamma"],
  },
  {
    id: "mem-005",
    title: "Brainstorming Session",
    type: "Conversation",
    created: "2023-04-01",
    access: "Archived",
    size: "96 KB",
    agents: ["Alpha", "Beta"],
  },
  {
    id: "mem-006",
    title: "Financial Planning Notes",
    type: "Document",
    created: "2023-03-28",
    access: "Private",
    size: "128 KB",
    agents: [],
  },
  {
    id: "mem-007",
    title: "Weekly Reflection",
    type: "Journal",
    created: "2023-03-25",
    access: "Private",
    size: "48 KB",
    agents: [],
  },
  {
    id: "mem-008",
    title: "AI Ethics Discussion",
    type: "Conversation",
    created: "2023-03-20",
    access: "Shared",
    size: "320 KB",
    agents: ["Alpha", "Beta", "Gamma"],
  },
]

interface MemoriesTableProps {
  filterType?: "private" | "shared" | "archived"
}

export function MemoriesTable({ filterType }: MemoriesTableProps) {
  const [selectedMemories, setSelectedMemories] = useState<string[]>([])

  const filteredMemories = filterType
    ? memories.filter((memory) => memory.access.toLowerCase() === filterType)
    : memories

  const toggleMemory = (id: string) => {
    setSelectedMemories((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const toggleAll = () => {
    if (selectedMemories.length === filteredMemories.length) {
      setSelectedMemories([])
    } else {
      setSelectedMemories(filteredMemories.map((memory) => memory.id))
    }
  }

  const getTypeIcon = (type: Memory["type"]) => {
    switch (type) {
      case "Conversation":
        return <MessageSquare className="h-4 w-4" />
      case "Document":
        return <FileText className="h-4 w-4" />
      case "Journal":
        return <Database className="h-4 w-4" />
      case "Research":
        return <FileText className="h-4 w-4" />
      default:
        return <Database className="h-4 w-4" />
    }
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedMemories.length === filteredMemories.length && filteredMemories.length > 0}
                onCheckedChange={toggleAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Access</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Agents</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMemories.map((memory) => (
            <TableRow key={memory.id} className="group">
              <TableCell>
                <Checkbox
                  checked={selectedMemories.includes(memory.id)}
                  onCheckedChange={() => toggleMemory(memory.id)}
                  aria-label={`Select ${memory.title}`}
                />
              </TableCell>
              <TableCell className="font-medium">{memory.title}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {getTypeIcon(memory.type)}
                  <span className="ml-2">{memory.type}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  {memory.created}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    memory.access === "Private" ? "secondary" : memory.access === "Shared" ? "outline" : "default"
                  }
                >
                  {memory.access === "Private" ? <Lock className="mr-1 h-3 w-3" /> : <Eye className="mr-1 h-3 w-3" />}
                  {memory.access}
                </Badge>
              </TableCell>
              <TableCell>{memory.size}</TableCell>
              <TableCell>
                <div className="flex -space-x-2">
                  {memory.agents.length === 0 ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                      <User className="h-3 w-3 text-primary-foreground" />
                    </div>
                  ) : (
                    memory.agents.map((agent, index) => (
                      <div
                        key={index}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-muted"
                        title={agent}
                      >
                        <Bot className="h-3 w-3" />
                      </div>
                    ))
                  )}
                </div>
              </TableCell>
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
                    <DropdownMenuItem>View Memory</DropdownMenuItem>
                    <DropdownMenuItem>Edit Access</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredMemories.length === 0 && (
        <div className="flex h-[200px] w-full items-center justify-center">
          <p className="text-muted-foreground">No memories found</p>
        </div>
      )}
    </div>
  )
}
