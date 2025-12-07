"use client"

import { useChat } from "@/context/chat-context"
import { ChatRoomListItem } from "./chat-room-list-item"
import { AIAssistantButton } from "@/components/chat/ai-assistant-button"
import { AppMenu } from "@/components/menu/app-menu"

export function ChatRoomList() {
  const { rooms } = useChat()

  return (
    <div className="flex flex-col h-full bg-background relative">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-foreground">Chat Rooms</h2>
              <div className="md:hidden">
                <AppMenu />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Select a room to start chatting</p>
          </div>
        </div>
      </div>

      {/* Room List */}
      <div className="flex-1 overflow-y-auto">
        {rooms.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-muted-foreground">No chat rooms available</p>
              <p className="text-sm text-muted-foreground/75 mt-2">Create one to get started</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {rooms.map((room) => (
              <ChatRoomListItem key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>

      <AIAssistantButton />
    </div>
  )
}
