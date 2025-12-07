"use client"

import type { User } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { LogOut, Plus, MessageSquare, Settings, Camera } from "lucide-react"
import Image from "next/image"
import { AppMenu } from "@/components/menu/app-menu"
import { useState } from "react"

interface SidebarProps {
  user: User
  onLogout: () => void
  onCreateRoom: () => void
  onCloseSidebar?: () => void
}

export function Sidebar({ user, onLogout, onCreateRoom, onCloseSidebar }: SidebarProps) {
  const [showStoryMenu, setShowStoryMenu] = useState(false)

  const handleLogout = () => {
    onLogout()
    window.location.href = "/"
  }

  const handleCreateRoom = () => {
    onCreateRoom()
    onCloseSidebar?.()
  }

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-primary" />
          <span className="hidden sm:inline">ChatApp</span>
        </h1>
        <div className="hidden md:block">
          <AppMenu />
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 group">
            <Image
              src={user.avatar || "/placeholder.svg"}
              alt={user.username}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setShowStoryMenu(true)}
              className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              title="Post a story"
            >
              <Camera className="w-3 h-3" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{user.username}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 space-y-2 border-b border-border">
        <Button
          onClick={handleCreateRoom}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Room</span>
          <span className="sm:hidden">New</span>
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-hidden flex flex-col">
        <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Menu</div>
        <div className="flex-1 overflow-y-auto">
          <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted/50 transition-colors flex items-center gap-2">
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            <span className="hidden sm:inline">Direct Messages</span>
          </button>
          <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted/50 transition-colors flex items-center gap-2">
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            <span className="hidden sm:inline">Saved Messages</span>
          </button>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-muted/50 gap-2">
          <Settings className="w-4 h-4 flex-shrink-0" />
          <span className="hidden sm:inline">Settings</span>
        </Button>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-destructive hover:bg-destructive/10 gap-2"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </div>
  )
}
