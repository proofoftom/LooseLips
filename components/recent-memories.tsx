import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Lock, Eye, Calendar } from "lucide-react"

export function RecentMemories() {
  const memories = [
    {
      id: "mem-1",
      title: "Meeting with AI Agent Alpha",
      timestamp: "2 hours ago",
      type: "Conversation",
      access: "Private",
      agent: {
        name: "Alpha",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "mem-2",
      title: "Project Moonshot Planning",
      timestamp: "Yesterday",
      type: "Document",
      access: "Shared",
      agent: {
        name: "Beta",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "mem-3",
      title: "Personal Journal Entry",
      timestamp: "3 days ago",
      type: "Journal",
      access: "Private",
      agent: {
        name: "You",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "mem-4",
      title: "Research on Quantum Computing",
      timestamp: "1 week ago",
      type: "Research",
      access: "Shared",
      agent: {
        name: "Gamma",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
  ]

  return (
    <div className="space-y-4">
      {memories.map((memory) => (
        <div
          key={memory.id}
          className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={memory.agent.image || "/placeholder.svg"} alt={memory.agent.name} />
              <AvatarFallback>{memory.agent.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{memory.title}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                {memory.timestamp}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{memory.type}</Badge>
            <Badge variant={memory.access === "Private" ? "secondary" : "outline"}>
              {memory.access === "Private" ? <Lock className="mr-1 h-3 w-3" /> : <Eye className="mr-1 h-3 w-3" />}
              {memory.access}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}
