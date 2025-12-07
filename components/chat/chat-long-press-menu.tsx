"use client"

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import type { ReactNode } from "react"
import { Pin, Archive, Bell, Users, AlertCircle, Lock, Trash2 } from "lucide-react"

interface ChatLongPressMenuProps {
  children: ReactNode
  onPin?: () => void
  onArchive?: () => void
  onMute?: () => void
  onCreateGroup?: () => void
  onRestrict?: () => void
  onBlock?: () => void
  onDelete?: () => void
}

export function ChatLongPressMenu({
  children,
  onPin,
  onArchive,
  onMute,
  onCreateGroup,
  onRestrict,
  onBlock,
  onDelete,
}: ChatLongPressMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48 bg-card border-border">
        <ContextMenuItem onClick={onPin} className="flex items-center gap-2 cursor-pointer">
          <Pin className="w-4 h-4" />
          <span>Pin</span>
        </ContextMenuItem>

        <ContextMenuItem onClick={onArchive} className="flex items-center gap-2 cursor-pointer">
          <Archive className="w-4 h-4" />
          <span>Archive</span>
        </ContextMenuItem>

        <ContextMenuItem onClick={onMute} className="flex items-center gap-2 cursor-pointer">
          <Bell className="w-4 h-4" />
          <span>Mute</span>
        </ContextMenuItem>

        <ContextMenuItem onClick={onCreateGroup} className="flex items-center gap-2 cursor-pointer">
          <Users className="w-4 h-4" />
          <span>Create Group</span>
        </ContextMenuItem>

        <div className="my-1 border-t border-border" />

        <ContextMenuItem onClick={onRestrict} className="flex items-center gap-2 cursor-pointer">
          <AlertCircle className="w-4 h-4" />
          <span>Restrict</span>
        </ContextMenuItem>

        <ContextMenuItem onClick={onBlock} className="flex items-center gap-2 cursor-pointer">
          <Lock className="w-4 h-4" />
          <span>Block</span>
        </ContextMenuItem>

        <ContextMenuItem onClick={onDelete} className="flex items-center gap-2 cursor-pointer text-destructive">
          <Trash2 className="w-4 h-4" />
          <span>Delete Chat</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
