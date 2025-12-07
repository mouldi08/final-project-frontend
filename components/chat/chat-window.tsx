"use client"

import { useChat } from "@/context/chat-context"
import { ChatHeader } from "./chat-header"
import { MessageList } from "./message-list"
import { MessageInputBar } from "./message-input-bar"
import { ActiveUsersPanel } from "./active-users-panel"
import { useState } from "react"

export function ChatWindow() {
  const { activeRoom } = useChat()
  const [isUsersOpen, setIsUsersOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  if (!activeRoom) return null

  return (
    <div className="flex h-full bg-background relative">
      <div className="flex-1 flex flex-col">
        <ChatHeader
          room={activeRoom}
          onOpenUsers={() => setIsUsersOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
        <MessageList />
        <MessageInputBar />
      </div>
      <ActiveUsersPanel isOpen={isUsersOpen} onClose={() => setIsUsersOpen(false)} />
    </div>
  )
}
