"use client"

import type { Message } from "@/context/chat-context"
import Image from "next/image"
import { Check, CheckCheck, Volume2, Play } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isCurrentUser = message.senderId === "current-user"
  const isMediaMessage = message.content.includes("[Voice Message") || message.content.includes("[Video Message")

  return (
    <div className={`flex gap-3 ${isCurrentUser ? "flex-row-reverse" : ""} items-end max-w-xs sm:max-w-md`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="relative w-8 h-8 rounded-full overflow-hidden">
          <Image
            src={message.senderAvatar || "/placeholder.svg"}
            alt={message.senderName}
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xs font-semibold text-foreground">{message.senderName}</p>
          <p className="text-xs text-muted-foreground">{formatDistanceToNow(message.timestamp, { addSuffix: true })}</p>
        </div>

        {/* Message Bubble */}
        <div
          className={`px-4 py-2 rounded-2xl ${
            isCurrentUser
              ? "bg-primary text-primary-foreground rounded-br-none"
              : "bg-muted text-foreground rounded-bl-none"
          } break-words`}
        >
          {isMediaMessage ? (
            <div className="flex items-center gap-2">
              {message.content.includes("[Voice Message") ? (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span className="text-sm font-medium">{message.content}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span className="text-sm font-medium">{message.content}</span>
                </>
              )}
            </div>
          ) : (
            <p className="text-sm">{message.content}</p>
          )}
        </div>

        {/* Status Indicator */}
        {isCurrentUser && (
          <div className="mt-1 flex items-center gap-1">
            {message.status === "sent" && <Check className="w-3 h-3 text-muted-foreground" />}
            {message.status === "delivered" && <CheckCheck className="w-3 h-3 text-muted-foreground" />}
            {message.status === "read" && <CheckCheck className="w-3 h-3 text-primary" />}
          </div>
        )}
      </div>
    </div>
  )
}
