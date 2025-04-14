"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Plus, Lock, Shield, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Message = {
  id: string
  content: string
  sender: "user" | "agent"
  timestamp: Date
  encrypted: boolean
  agentName?: string
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your secure AI assistant. How can I help you today?",
      sender: "agent",
      timestamp: new Date(),
      encrypted: true,
      agentName: "Alpha",
    },
  ])
  const [input, setInput] = useState("")
  const [selectedAgent, setSelectedAgent] = useState("alpha")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
      encrypted: true,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAgentResponse(input, selectedAgent),
        sender: "agent",
        timestamp: new Date(),
        encrypted: true,
        agentName: selectedAgent === "alpha" ? "Alpha" : selectedAgent === "beta" ? "Beta" : "Gamma",
      }

      setMessages((prev) => [...prev, agentMessage])
    }, 1000)
  }

  const getAgentResponse = (message: string, agent: string): string => {
    // Simple mock responses based on agent and message content
    if (message.toLowerCase().includes("memory") || message.toLowerCase().includes("remember")) {
      return `I've securely stored that memory for you. It's been encrypted and saved to IPFS with access controls in place.`
    } else if (message.toLowerCase().includes("security") || message.toLowerCase().includes("secure")) {
      return `Your memories are protected with AES-256 encryption and blockchain-based access controls. Only you and your authorized agents can access this data.`
    } else if (message.toLowerCase().includes("access") || message.toLowerCase().includes("permission")) {
      return `I can help you manage access permissions. Currently, you have 3 authorized agents with conditional access based on Lit Protocol's encryption key management.`
    } else {
      return `I've processed your message securely. Is there anything specific about your memories or security settings you'd like to discuss?`
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-4 flex justify-between items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center space-x-2">
          <Select value={selectedAgent} onValueChange={setSelectedAgent}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Agent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alpha">Agent Alpha</SelectItem>
              <SelectItem value="beta">Agent Beta</SelectItem>
              <SelectItem value="gamma">Agent Gamma</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className="ml-2">
            <Lock className="h-3 w-3 mr-1" />
            End-to-End Encrypted
          </Badge>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Shield className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Secure Connection Active</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div
                className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full ${
                  message.sender === "user" ? "ml-2 bg-primary" : "mr-2 bg-muted"
                }`}
              >
                {message.sender === "user" ? (
                  <User className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <Bot className="h-4 w-4 text-foreground" />
                )}
              </div>
              <div>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  {message.content}
                </div>
                <div
                  className={`mt-1 flex items-center text-xs text-muted-foreground ${
                    message.sender === "user" ? "justify-end" : ""
                  }`}
                >
                  {message.sender === "agent" && message.agentName && <span className="mr-2">{message.agentName}</span>}
                  <span>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {message.encrypted && <Lock className="ml-1 h-3 w-3" />}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a secure message..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <Lock className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-xs text-muted-foreground">End-to-end encrypted</span>
          </div>
          <div className="text-xs text-muted-foreground">Memories stored on IPFS/Filecoin</div>
        </div>
      </div>
    </div>
  )
}
