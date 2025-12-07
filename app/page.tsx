"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (token) {
      window.location.href = "/dashboard"
    } else {
      setIsLoading(false)
    }

    // Check backend connection only in development (client-side check)
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5000'
      fetch(`${backendUrl}/health`)
        .then(res => res.text())
        .then(data => console.log('Backend status:', data))
        .catch(() => {
          // Silently fail - backend might not be running
        })
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-card flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 rounded-full border-4 border-muted border-t-primary animate-spin" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  )
}
