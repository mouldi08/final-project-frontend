"use client"

import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import { useState } from "react"
import { AIAssistantPanel } from "./ai-assistant-panel"

export function AIAssistantButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
        title="AI Assistant"
      >
        <Zap className="w-6 h-6" />
      </Button>
      <AIAssistantPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
