"use client"

import { type ChatRoom, useChat } from "@/context/chat-context"
import { ChevronLeft, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ChatSettingsPanel } from "./chat-settings-panel"

interface ChatHeaderProps {
  room: ChatRoom
  onOpenUsers: () => void
  onOpenSettings: () => void
}

export function ChatHeader({ room, onOpenUsers, onOpenSettings }: ChatHeaderProps) {
  const { leaveRoom, activeUsers } = useChat()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <>
      <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={leaveRoom}
            className="text-foreground"
            title="Back to chat rooms"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div>
            <h1 className="font-semibold text-foreground">{"#" + room.name}</h1>
            {room.description && <p className="text-xs text-muted-foreground hidden md:block">{room.description}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground px-3 py-2 bg-muted/50 rounded-lg">
            <Users className="w-4 h-4" />
            <span>{activeUsers.length} online</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsSettingsOpen(true)} className="text-foreground">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <ChatSettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} room={room} />
    </>
  )
}
