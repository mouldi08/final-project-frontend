"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, User, Lock, Eye, Volume2, ImageIcon, HelpCircle, FileText } from "lucide-react"
import { useState } from "react"
import { AvatarCreationModal } from "./avatar-creation-modal"

interface MenuSettingsPanelProps {
  submenu: string
  onBack: () => void
}

export function MenuSettingsPanel({ submenu, onBack }: MenuSettingsPanelProps) {
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false)

  const renderSettingsContent = () => {
    switch (submenu) {
      case "settings":
        return (
          <>
            <div className="p-6 border-b border-border flex items-center gap-3">
              <button onClick={onBack} className="p-1 hover:bg-muted rounded">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              <h2 className="text-xl font-bold text-foreground">Settings</h2>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-1">
                <button
                  onClick={() => setIsAvatarModalOpen(true)}
                  className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-3"
                >
                  <User className="w-4 h-4 text-primary" />
                  <span>Avatar Creation</span>
                </button>

                <button className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-3">
                  <Eye className="w-4 h-4 text-primary" />
                  <span>Privacy & Safety</span>
                </button>

                <button className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-primary" />
                  <span>Notifications & Sounds</span>
                </button>

                <button className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-3">
                  <ImageIcon className="w-4 h-4 text-primary" />
                  <span>Photos & Media</span>
                </button>

                <button className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-primary" />
                  <span>Accessibility</span>
                </button>

                <button className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-3">
                  <Lock className="w-4 h-4 text-primary" />
                  <span>Password & Security</span>
                </button>

                <button className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-3">
                  <FileText className="w-4 h-4 text-primary" />
                  <span>Legal & Policies</span>
                </button>
              </div>
            </ScrollArea>
          </>
        )
      default:
        return null
    }
  }

  return (
    <>
      {renderSettingsContent()}
      <AvatarCreationModal isOpen={isAvatarModalOpen} onClose={() => setIsAvatarModalOpen(false)} />
    </>
  )
}
