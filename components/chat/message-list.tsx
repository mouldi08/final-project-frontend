"use client"

import { useChat } from "@/context/chat-context"
import { MessageBubble } from "./message-bubble"
import { TypingIndicator } from "./typing-indicator"
import { useEffect, useRef } from "react"

export function MessageList() {
  const { messages, typingUsers } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, typingUsers])

  // Group messages by date
  const groupedMessages = messages.reduce(
    (acc, msg) => {
      const date = msg.timestamp.toLocaleDateString()
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(msg)
      return acc
    },
    {} as Record<string, typeof messages>,
  )

  const mockTypingUsers = [
    { id: "user1", name: "Alex Johnson", avatar: "https://avatar.vercel.sh/alex" },
    { id: "user2", name: "Sarah Chen", avatar: "https://avatar.vercel.sh/sarah" },
  ]

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {Object.entries(groupedMessages).map(([date, msgs]) => (
        <div key={date}>
          <div className="flex items-center justify-center my-4">
            <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
              {date === new Date().toLocaleDateString() ? "Today" : date}
            </div>
          </div>
          <div className="space-y-3">
            {msgs.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>
        </div>
      ))}

      {typingUsers.length > 0 && (
        <div className="flex gap-3 mt-4">
          <div className="flex-shrink-0">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-muted" />
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-semibold text-muted-foreground">
              {mockTypingUsers.find((u) => u.id === typingUsers[0])?.name || "Someone"} is typing...
            </p>
            <div className="mt-1">
              <TypingIndicator />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}
