"use client"

import { useEffect, useState } from "react"

interface OnlineStatusBadgeProps {
  isOnline: boolean
  lastSeen?: Date
}

export function OnlineStatusBadge({ isOnline, lastSeen }: OnlineStatusBadgeProps) {
  const [timeAgo, setTimeAgo] = useState("")

  useEffect(() => {
    if (isOnline) return

    const updateTimeAgo = () => {
      if (lastSeen) {
        const diff = Math.floor((Date.now() - lastSeen.getTime()) / 1000)
        if (diff < 60) {
          setTimeAgo("just now")
        } else if (diff < 3600) {
          setTimeAgo(`${Math.floor(diff / 60)}m ago`)
        } else if (diff < 86400) {
          setTimeAgo(`${Math.floor(diff / 3600)}h ago`)
        } else {
          setTimeAgo(`${Math.floor(diff / 86400)}d ago`)
        }
      }
    }

    updateTimeAgo()
    const interval = setInterval(updateTimeAgo, 60000)

    return () => clearInterval(interval)
  }, [isOnline, lastSeen])

  return (
    <div className="flex items-center gap-2 text-xs">
      <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`} />
      <span className="text-muted-foreground">{isOnline ? "Online" : `Last seen ${timeAgo}`}</span>
    </div>
  )
}
