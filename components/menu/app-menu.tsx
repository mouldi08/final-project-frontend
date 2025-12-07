"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Menu, Settings, Zap, Users, Archive, Flag, HelpCircle, LogOut, Moon, Sun } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useTheme } from "@/context/theme-context"
import { useState } from "react"
import { MenuSettingsPanel } from "./menu-settings-panel"

interface AppMenuProps {
  onOpenSettings?: () => void
}

export function AppMenu({ onOpenSettings }: AppMenuProps) {
  const { logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  const handleOpenSettings = (submenu: string) => {
    setActiveSubmenu(submenu)
  }

  const handleCloseSettings = () => {
    setActiveSubmenu(null)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-foreground">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0 flex flex-col bg-card transition-colors duration-300">
        {activeSubmenu ? (
          <MenuSettingsPanel submenu={activeSubmenu} onBack={handleCloseSettings} />
        ) : (
          <>
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Menu</h2>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-1">
                {/* Theme Toggle */}
                <div className="px-4 py-3 mb-2 flex items-center justify-between bg-muted rounded-lg transition-colors">
                  <span className="text-sm font-medium text-foreground">
                    {theme === "light" ? "☀️ Light Mode" : "🌙 Dark Mode"}
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="p-2 hover:bg-background rounded-lg transition-colors"
                    aria-label="Toggle dark mode"
                  >
                    {theme === "light" ? (
                      <Moon className="w-4 h-4 text-foreground" />
                    ) : (
                      <Sun className="w-4 h-4 text-foreground" />
                    )}
                  </button>
                </div>

                {/* Settings */}
                <button
                  onClick={() => handleOpenSettings("settings")}
                  className="w-full px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-3"
                >
                  <Settings className="w-4 h-4 text-primary" />
                  <span>Settings</span>
                </button>

                <Separator className="my-2" />

                {/* Main Menu Items */}
                <button className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-3">
                  <Zap className="w-4 h-4 text-accent" />
                  <span>Marketplace</span>
                </button>

                <button className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-3">
                  <Users className="w-4 h-4 text-accent" />
                  <span>Message Requests</span>
                </button>

                <button className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-3">
                  <Archive className="w-4 h-4 text-accent" />
                  <span>Archive</span>
                </button>

                <button className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-3">
                  <Users className="w-4 h-4 text-accent" />
                  <span>Friend Requests</span>
                </button>

                <button className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-3">
                  <Zap className="w-4 h-4 text-accent" />
                  <span>AI Studio Chat</span>
                </button>

                <Separator className="my-2" />

                {/* Support */}
                <button className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-3">
                  <Flag className="w-4 h-4 text-accent" />
                  <span>Report Technical Problem</span>
                </button>

                <button className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-accent" />
                  <span>Help</span>
                </button>
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="p-4 border-t border-border space-y-2">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors flex items-center gap-3"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
