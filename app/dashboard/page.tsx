"use client"

import { useAuth } from "@/context/auth-context"
import { useChat } from "@/context/chat-context"
import { useEffect, useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { ChatRoomList } from "@/components/dashboard/chat-room-list"
import { CreateRoomModal } from "@/components/dashboard/create-room-modal"
import { ChatWindow } from "@/components/chat/chat-window"
import { AIAssistantButton } from "@/components/chat/ai-assistant-button"

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { activeRoom, leaveRoom } = useChat()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    if (!user) {
    //  window.location.href = "/"
    }
  }, [user])

  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-40 left-0 top-0 h-screen transition-transform md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          user={user}
          onLogout={logout}
          onCreateRoom={() => setIsCreateModalOpen(true)}
          onCloseSidebar={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header with Back Button */}
        {activeRoom && (
          <div className="md:hidden h-12 border-b border-border bg-card flex items-center px-4">
            <button
              onClick={leaveRoom}
              className="text-foreground hover:bg-muted p-2 rounded"
              title="Back to chat rooms"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative">
          {activeRoom ? <ChatWindow /> : <ChatRoomList />}
          {!activeRoom && <AIAssistantButton />}
        </div>
      </div>

      <CreateRoomModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  )
}
