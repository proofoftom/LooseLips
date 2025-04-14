"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Brain, MessageSquare, Database, Settings, Shield, LogOut, User, Lock, Bot } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { WalletConnect } from "@/components/wallet-connect"

export function AppSidebar() {
  const pathname = usePathname()
  const [walletConnected, setWalletConnected] = useState(false)

  const routes = [
    {
      title: "Dashboard",
      icon: Brain,
      href: "/",
    },
    {
      title: "Chat",
      icon: MessageSquare,
      href: "/chat",
    },
    {
      title: "Memories",
      icon: Database,
      href: "/memories",
    },
    {
      title: "Agents",
      icon: Bot,
      href: "/agents",
    },
    {
      title: "Access Control",
      icon: Shield,
      href: "/access",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ]

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="flex flex-col items-center justify-center p-4">
        <div className="flex items-center space-x-2">
          <Lock className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">LooseLips</span>
        </div>
        <SidebarTrigger className="absolute right-2 top-4 md:hidden" />
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton asChild isActive={pathname === route.href} tooltip={route.title}>
                <Link href={route.href}>
                  <route.icon className="h-5 w-5" />
                  <span>{route.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <WalletConnect
          onConnect={() => setWalletConnected(true)}
          onDisconnect={() => setWalletConnected(false)}
          connected={walletConnected}
        />

        <SidebarSeparator className="my-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">User</p>
              <p className="text-xs text-muted-foreground truncate w-32">
                {walletConnected ? "0x1a2...3b4c" : "Not connected"}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
