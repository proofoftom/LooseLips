"use client"

import { useState } from "react"
import { Wallet, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface WalletConnectProps {
  onConnect: () => void
  onDisconnect: () => void
  connected: boolean
}

export function WalletConnect({ onConnect, onDisconnect, connected }: WalletConnectProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleConnect = (type: string) => {
    // In a real app, this would connect to the actual wallet
    console.log(`Connecting to ${type}...`)
    onConnect()
    setDialogOpen(false)
  }

  const handleDisconnect = () => {
    onDisconnect()
  }

  if (!connected) {
    return (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full" variant="outline">
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect Wallet</DialogTitle>
            <DialogDescription>
              Connect your wallet to secure your memories with blockchain technology.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button
              variant="outline"
              className="flex justify-between items-center"
              onClick={() => handleConnect("MetaMask")}
            >
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-orange-500 mr-2"></div>
                MetaMask
              </div>
              <Badge variant="outline" className="ml-auto">
                Popular
              </Badge>
            </Button>
            <Button
              variant="outline"
              className="flex justify-between items-center"
              onClick={() => handleConnect("WalletConnect")}
            >
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-blue-500 mr-2"></div>
                WalletConnect
              </div>
              <Badge variant="outline" className="ml-auto">
                Universal
              </Badge>
            </Button>
            <Button
              variant="outline"
              className="flex justify-between items-center"
              onClick={() => handleConnect("Coinbase")}
            >
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-blue-700 mr-2"></div>
                Coinbase Wallet
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full">
          <Wallet className="mr-2 h-4 w-4" />
          <span className="truncate">0x1a2...3b4c</span>
          <ChevronDown className="ml-auto h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem className="cursor-pointer" onClick={() => {}}>
          View on Explorer
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => {}}>
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-destructive" onClick={handleDisconnect}>
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
