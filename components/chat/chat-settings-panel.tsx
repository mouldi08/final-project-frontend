"use client"

import { type ChatRoom, useChat, type ChatSettings } from "@/context/chat-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ChatSettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  room: ChatRoom
}

export function ChatSettingsPanel({ isOpen, onClose, room }: ChatSettingsPanelProps) {
  const { chatSettings, updateChatSettings } = useChat()
  const { toast } = useToast()
  const settings = chatSettings[room.id]

  if (!isOpen || !settings) return null

  const themes: Array<{ id: ChatSettings["theme"]; label: string; color: string }> = [
    { id: "default", label: "Default", color: "bg-primary" },
    { id: "dark", label: "Dark", color: "bg-slate-700" },
    { id: "ocean", label: "Ocean", color: "bg-blue-600" },
    { id: "forest", label: "Forest", color: "bg-green-600" },
    { id: "sunset", label: "Sunset", color: "bg-orange-500" },
  ]

  const handleThemeChange = (theme: ChatSettings["theme"]) => {
    updateChatSettings(room.id, { theme })
    toast({
      title: "Theme Updated",
      description: `Chat theme changed to ${theme}`,
    })
  }

  const handleNicknameChange = (nickname: string) => {
    updateChatSettings(room.id, { customNickname: nickname })
  }

  const handleClearHistory = () => {
    toast({
      title: "Chat History Cleared",
      description: "All messages have been deleted from this chat.",
    })
  }

  const handleToggle = (setting: "readReceipts" | "typingIndicator", value: boolean) => {
    updateChatSettings(room.id, { [setting]: value })
    toast({
      title: `${setting === "readReceipts" ? "Read Receipts" : "Typing Indicator"} ${value ? "Enabled" : "Disabled"}`,
    })
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />}

      {/* Settings Panel */}
      <div
        className={`fixed md:absolute bottom-0 right-0 w-full md:w-96 h-screen md:h-auto md:top-16 bg-card border-l border-border z-50 overflow-y-auto transition-transform md:translate-x-0 md:flex md:flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
          <h2 className="font-semibold text-foreground">Chat Settings</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Themes Section */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Themes</h3>
            <div className="grid grid-cols-5 gap-2">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`w-full aspect-square rounded-lg ${theme.color} transition-all ${
                    settings.theme === theme.id ? "ring-2 ring-offset-2 ring-primary" : ""
                  }`}
                  title={theme.label}
                />
              ))}
            </div>
          </div>

          {/* Custom Nickname Section */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Custom Nickname</h3>
            <Input
              type="text"
              placeholder="Enter nickname for this chat"
              value={settings.customNickname || ""}
              onChange={(e) => handleNicknameChange(e.target.value)}
              className="bg-muted border-border"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {settings.customNickname ? `Showing as: "${settings.customNickname}"` : "No custom nickname set"}
            </p>
          </div>

          {/* Toggles Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground mb-3">Notifications</h3>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <label className="text-sm text-foreground cursor-pointer">Read Receipts</label>
              <button
                onClick={() => handleToggle("readReceipts", !settings.readReceipts)}
                className={`w-10 h-6 rounded-full transition-colors ${
                  settings.readReceipts ? "bg-primary" : "bg-muted"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.readReceipts ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <label className="text-sm text-foreground cursor-pointer">Typing Indicator</label>
              <button
                onClick={() => handleToggle("typingIndicator", !settings.typingIndicator)}
                className={`w-10 h-6 rounded-full transition-colors ${
                  settings.typingIndicator ? "bg-primary" : "bg-muted"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.typingIndicator ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Clear History Section */}
          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3">Danger Zone</h3>
            <Button onClick={handleClearHistory} variant="destructive" className="w-full">
              Clear Chat History
            </Button>
            <p className="text-xs text-muted-foreground mt-2">This action cannot be undone</p>
          </div>
        </div>
      </div>
    </>
  )
}
