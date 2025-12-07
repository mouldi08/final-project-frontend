"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Camera, Upload } from "lucide-react"
import { useState } from "react"

interface AvatarCreationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AvatarCreationModal({ isOpen, onClose }: AvatarCreationModalProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>("")

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setAvatarUrl(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTakePhoto = () => {
    // In a real app, this would open the device camera
    alert("Camera access would be requested here")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle className="text-foreground">Create Avatar</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Avatar Preview */}
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full bg-muted border-4 border-primary flex items-center justify-center overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl || "/placeholder.svg"} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-muted-foreground text-sm">No image selected</span>
              )}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="block">
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 bg-transparent"
                onClick={() => document.querySelector('input[type="file"]')?.click()}
              >
                <Upload className="w-4 h-4" />
                <span>Upload from Gallery</span>
              </Button>
            </label>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 bg-transparent"
              onClick={handleTakePhoto}
            >
              <Camera className="w-4 h-4" />
              <span>Take a Photo</span>
            </Button>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={onClose}>
              Save Avatar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
