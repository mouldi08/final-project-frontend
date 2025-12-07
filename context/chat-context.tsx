"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: Date
  status: "sent" | "delivered" | "read"
}

export interface ChatRoom {
  id: string
  name: string
  description?: string
  icon?: string
  activeUsers: number
  lastMessage?: string
  lastMessageTime?: Date
  members: string[]
}

export interface ChatSettings {
  theme: "default" | "dark" | "ocean" | "forest" | "sunset"
  customNickname?: string
  readReceipts: boolean
  typingIndicator: boolean
}

interface ChatContextType {
  rooms: ChatRoom[]
  activeRoom: ChatRoom | null
  messages: Message[]
  activeUsers: string[]
  typingUsers: string[]
  chatSettings: Record<string, ChatSettings>
  setActiveRoom: (room: ChatRoom | null) => void
  sendMessage: (content: string) => void
  createRoom: (name: string, description?: string) => void
  joinRoom: (roomId: string) => void
  leaveRoom: () => void
  simulateIncomingMessage: () => void
  simulateTyping: () => void
  updateChatSettings: (roomId: string, settings: Partial<ChatSettings>) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

// Mock data
const mockRooms: ChatRoom[] = [
  {
    id: "1",
    name: "General",
    description: "General discussion",
    activeUsers: 12,
    lastMessage: "Welcome to the chat!",
    lastMessageTime: new Date(Date.now() - 5 * 60000),
    members: [],
  },
  {
    id: "2",
    name: "Technology",
    description: "Tech discussions",
    activeUsers: 8,
    lastMessage: "Check out the new React 19 features",
    lastMessageTime: new Date(Date.now() - 15 * 60000),
    members: [],
  },
  {
    id: "3",
    name: "Random",
    description: "Off-topic chat",
    activeUsers: 5,
    lastMessage: "Anyone watching the game tonight?",
    lastMessageTime: new Date(Date.now() - 30 * 60000),
    members: [],
  },
]

const mockIncomingMessages = [
  "That sounds great!",
  "I totally agree 👍",
  "Let me check that out",
  "Amazing work everyone!",
  "Thanks for the update",
  "Looking forward to it",
  "Count me in!",
  "Brilliant idea",
]

const mockUsers = [
  { id: "user1", name: "Alex Johnson", avatar: "https://avatar.vercel.sh/alex" },
  { id: "user2", name: "Sarah Chen", avatar: "https://avatar.vercel.sh/sarah" },
  { id: "user3", name: "Mike Davis", avatar: "https://avatar.vercel.sh/mike" },
]

const defaultChatSettings: ChatSettings = {
  theme: "default",
  readReceipts: true,
  typingIndicator: true,
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [rooms, setRooms] = useState<ChatRoom[]>(mockRooms)
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "user1",
      senderName: "Alex Johnson",
      senderAvatar: "https://avatar.vercel.sh/alex",
      content: "Hey everyone! Welcome to the chat",
      timestamp: new Date(Date.now() - 60 * 60000),
      status: "read",
    },
    {
      id: "2",
      senderId: "user2",
      senderName: "Sarah Chen",
      senderAvatar: "https://avatar.vercel.sh/sarah",
      content: "Thanks for having us!",
      timestamp: new Date(Date.now() - 55 * 60000),
      status: "read",
    },
  ])
  const [activeUsers, setActiveUsers] = useState(["user1", "user2", "user3"])
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const [chatSettings, setChatSettings] = useState<Record<string, ChatSettings>>(
    mockRooms.reduce((acc, room) => ({ ...acc, [room.id]: defaultChatSettings }), {}),
  )

  useEffect(() => {
    if (!activeRoom) return

    const messageInterval = setInterval(() => {
      simulateIncomingMessage()
    }, 8000)

    return () => clearInterval(messageInterval)
  }, [activeRoom])

  const sendMessage = (content: string) => {
    if (!activeRoom) return

    const newMessage: Message = {
      id: Math.random().toString(36).substring(7),
      senderId: "current-user",
      senderName: "You",
      senderAvatar: "https://avatar.vercel.sh/you",
      content,
      timestamp: new Date(),
      status: "sent",
    }

    setMessages([...messages, newMessage])

    setTimeout(() => {
      setMessages((prev) => prev.map((m) => (m.id === newMessage.id ? { ...m, status: "delivered" } : m)))
    }, 300)

    setTimeout(() => {
      setMessages((prev) => prev.map((m) => (m.id === newMessage.id ? { ...m, status: "read" } : m)))
    }, 600)
  }

  const simulateIncomingMessage = () => {
    const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)]
    const randomMessage = mockIncomingMessages[Math.floor(Math.random() * mockIncomingMessages.length)]

    setTypingUsers([randomUser.id])

    setTimeout(() => {
      const newMessage: Message = {
        id: Math.random().toString(36).substring(7),
        senderId: randomUser.id,
        senderName: randomUser.name,
        senderAvatar: randomUser.avatar,
        content: randomMessage,
        timestamp: new Date(),
        status: "read",
      }

      setMessages((prev) => [...prev, newMessage])
      setTypingUsers([])
    }, 2000)
  }

  const simulateTyping = () => {
    const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)]
    setTypingUsers([randomUser.id])

    setTimeout(() => {
      setTypingUsers([])
    }, 3000)
  }

  const createRoom = (name: string, description?: string) => {
    const newRoom: ChatRoom = {
      id: Math.random().toString(36).substring(7),
      name,
      description,
      activeUsers: 1,
      members: ["current-user"],
    }
    setRooms([...rooms, newRoom])
    setChatSettings((prev) => ({ ...prev, [newRoom.id]: defaultChatSettings }))
  }

  const joinRoom = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId)
    if (room) {
      setActiveRoom(room)
      setMessages([])
    }
  }

  const leaveRoom = () => {
    setActiveRoom(null)
    setMessages([])
  }

  const updateChatSettings = (roomId: string, settings: Partial<ChatSettings>) => {
    setChatSettings((prev) => ({
      ...prev,
      [roomId]: { ...prev[roomId], ...settings },
    }))
  }

  return (
    <ChatContext.Provider
      value={{
        rooms,
        activeRoom,
        messages,
        activeUsers,
        typingUsers,
        chatSettings,
        setActiveRoom,
        sendMessage,
        createRoom,
        joinRoom,
        leaveRoom,
        simulateIncomingMessage,
        simulateTyping,
        updateChatSettings,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
