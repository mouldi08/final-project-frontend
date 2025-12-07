"use client"

import { useChat } from "@/context/chat-context"
import { Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ActiveUsersPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function ActiveUsersPanel({ isOpen, onClose }: ActiveUsersPanelProps) {
  const { activeUsers, activeRoom } = useChat()

  const mockUsers = [
    {
      id: "user1",
      name: "Alex Johnson",
      avatar: "https://avatar.vercel.sh/alex",
      isOnline: true,
      lastSeen: new Date(),
    },
    {
      id: "user2",
      name: "Sarah Chen",
      avatar: "https://avatar.vercel.sh/sarah",
      isOnline: true,
      lastSeen: new Date(),
    },
    {
      id: "user3",
      name: "Mike Davis",
      avatar: "https://avatar.vercel.sh/mike",
      isOnline: false,
      lastSeen: new Date(Date.now() - 5 * 60000),
    },
    {
      id: "user4",
      name: "Emma Wilson",
      avatar: "https://avatar.vercel.sh/emma",
      isOnline: true,
      lastSeen: new Date(),
    },
  ]

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />

      {/* Panel */}
      <div
        className={`fixed md:relative top-0 right-0 h-screen md:h-auto md:flex md:flex-col w-full md:w-72 bg-card border-l border-border z-40 transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full md:hidden"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border md:hidden">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Users className="w-4 h-4" />
            Active Users
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Users className="w-4 h-4" />
            {activeUsers.length} Online
          </h3>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-border">
            {mockUsers.map((user) => (
              <div key={user.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Online Status Indicator */}
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                        user.isOnline ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.isOnline
                        ? "Online"
                        : `Last seen ${Math.floor((Date.now() - user.lastSeen.getTime()) / 60000)}m ago`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
