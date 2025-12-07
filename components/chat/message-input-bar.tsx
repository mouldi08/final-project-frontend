"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChat } from "@/context/chat-context"
import { Send, Smile, Mic, Video, X, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function MessageInputBar() {
  const [message, setMessage] = useState("")
  const [mediaMode, setMediaMode] = useState<"text" | "voice" | "video">("text")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const recordingIntervalRef = useRef<NodeJS.Timeout>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { sendMessage } = useChat()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) {
      return
    }

    sendMessage(message)
    setMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  const handleStartRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)

    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1)
    }, 1000)
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current)
    }

    const minutes = Math.floor(recordingTime / 60)
    const seconds = recordingTime % 60
    const duration = `${minutes}:${seconds.toString().padStart(2, "0")}`

    if (mediaMode === "voice") {
      sendMessage(`[Voice Message - ${duration}]`)
    } else if (mediaMode === "video") {
      sendMessage(`[Video Message - ${duration}]`)
    }

    setMediaMode("text")
    setRecordingTime(0)

    toast({
      title: "Message Sent",
      description: `${mediaMode === "voice" ? "Voice" : "Video"} message sent successfully.`,
    })
  }

  const handleCancelRecording = () => {
    setIsRecording(false)
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current)
    }
    setMediaMode("text")
    setRecordingTime(0)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const fileName = file.name
      sendMessage(`[Image Message - ${fileName}]`)
      toast({
        title: "Image Sent",
        description: `${fileName} has been shared.`,
      })
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  if (isRecording) {
    return (
      <div className="h-auto border-t border-border bg-card p-4">
        <div className="flex items-center justify-center gap-4 bg-destructive/10 rounded-lg p-4">
          <div className="flex-1 flex items-center justify-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
            <span className="text-sm font-semibold text-foreground">
              {mediaMode === "voice" ? "Recording voice message" : "Recording video message"}
            </span>
          </div>
          <span className="text-sm font-mono text-foreground font-semibold">
            {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, "0")}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleStopRecording}
            className="text-primary hover:text-primary/90"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" />
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancelRecording}
            className="text-destructive hover:text-destructive/90"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-auto border-t border-border bg-card p-4">
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        {/* Emoji Button */}
        <Button type="button" variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Smile className="w-5 h-5" />
        </Button>

        {/* Text Input */}
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder={
              mediaMode === "text"
                ? "Type a message..."
                : mediaMode === "voice"
                  ? "Hold to record voice..."
                  : "Hold to record video..."
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={mediaMode !== "text"}
            className="pr-10"
          />
        </div>

        {/* Hidden file input for image upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          aria-label="Upload image"
        />

        {/* Media Buttons */}
        {mediaMode === "text" && (
          <div className="flex gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="text-muted-foreground hover:text-foreground hidden sm:inline-flex"
              title="Send image"
            >
              <ImageIcon className="w-5 h-5" />
            </Button>

            {/* Voice Message Button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onMouseDown={() => {
                setMediaMode("voice")
                handleStartRecording()
              }}
              onTouchStart={() => {
                setMediaMode("voice")
                handleStartRecording()
              }}
              className="text-muted-foreground hover:text-foreground relative group"
              title="Press and hold to record voice message"
            >
              <Mic className="w-5 h-5" />
            </Button>

            {/* Video Message Button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onMouseDown={() => {
                setMediaMode("video")
                handleStartRecording()
              }}
              onTouchStart={() => {
                setMediaMode("video")
                handleStartRecording()
              }}
              className="text-muted-foreground hover:text-foreground relative group"
              title="Press and hold to record video message"
            >
              <Video className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Send Button */}
        {mediaMode === "text" && (
          <Button
            type="submit"
            disabled={!message.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">Send</span>
          </Button>
        )}
      </form>
    </div>
  )
}
