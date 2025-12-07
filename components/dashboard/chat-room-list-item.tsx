"use client"

import { type ChatRoom, useChat } from "@/context/chat-context"
import { formatDistanceToNow } from "date-fns"
import { ChatLongPressMenu } from "@/components/chat/chat-long-press-menu"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface ChatRoomListItemProps {
  room: ChatRoom
}

export function ChatRoomListItem({ room }: ChatRoomListItemProps) {
  const { joinRoom } = useChat()
  const { toast } = useToast()
  const [isPinned, setIsPinned] = useState(false)

  const handlePin = () => {
    setIsPinned(!isPinned)
    toast({
      title: isPinned ? "Unpinned" : "Pinned",
      description: `Chat "${room.name}" has been ${isPinned ? "unpinned" : "pinned"}.`,
    })
  }

  const handleArchive = () => {
    toast({
      title: "Archived",
      description: `Chat "${room.name}" has been archived.`,
    })
  }

  const handleMute = () => {
    toast({
      title: "Muted",
      description: `Notifications muted for "${room.name}".`,
    })
  }

  const handleCreateGroup = () => {
    toast({
      title: "Group Created",
      description: `New group with users from "${room.name}" created.`,
    })
  }

  const handleRestrict = () => {
    toast({
      title: "Restricted",
      description: `User restricted from "${room.name}".`,
    })
  }

  const handleBlock = () => {
    toast({
      title: "Blocked",
      description: `User blocked from "${room.name}".`,
    })
  }

  const handleDelete = () => {
    toast({
      title: "Deleted",
      description: `Chat "${room.name}" has been deleted.`,
    })
  }

  return (
    <ChatLongPressMenu
      onPin={handlePin}
      onArchive={handleArchive}
      onMute={handleMute}
      onCreateGroup={handleCreateGroup}
      onRestrict={handleRestrict}
      onBlock={handleBlock}
      onDelete={handleDelete}
    >
      <button
        onClick={() => joinRoom(room.id)}
        className="w-full px-6 py-4 hover:bg-muted/50 transition-colors text-left group"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {"#" + room.name}
              </h3>
              {isPinned && <span className="text-xs font-semibold text-primary">📌</span>}
            </div>
            {room.description && <p className="text-sm text-muted-foreground truncate mt-1">{room.description}</p>}
            {room.lastMessage && <p className="text-xs text-muted-foreground truncate mt-2">{room.lastMessage}</p>}
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              {room.activeUsers}
            </div>
            {room.lastMessageTime && (
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(room.lastMessageTime, { addSuffix: true })}
              </span>
            )}
          </div>
        </div>
      </button>
    </ChatLongPressMenu>
  )
}
