"use client"

import { useState, useEffect } from "react"
import { Sparkles, Zap } from "lucide-react"

interface MascotProps {
  mood?: "happy" | "excited" | "thinking" | "celebrating"
  message?: string
  size?: "sm" | "md" | "lg"
  position?: "left" | "right" | "center"
}

export function Mascot({ mood = "happy", message, size = "md", position = "center" }: MascotProps) {
  const [currentMood, setCurrentMood] = useState(mood)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    if (message) {
      setShowMessage(true)
      const timer = setTimeout(() => setShowMessage(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  }

  const positionClasses = {
    left: "justify-start",
    right: "justify-end",
    center: "justify-center",
  }

  const getMascotEmoji = () => {
    switch (currentMood) {
      case "excited":
        return "🚀"
      case "thinking":
        return "🤔"
      case "celebrating":
        return "🎉"
      default:
        return "💎"
    }
  }

  const getMoodColor = () => {
    switch (currentMood) {
      case "excited":
        return "from-neon-cyan to-neon-purple"
      case "thinking":
        return "from-neon-purple to-neon-pink"
      case "celebrating":
        return "from-neon-yellow to-neon-green"
      default:
        return "from-neon-cyan to-neon-purple"
    }
  }

  return (
    <div className={`flex ${positionClasses[position]} items-center gap-3`}>
      <div className="relative">
        {/* Mascot Character */}
        <div
          className={`
            ${sizeClasses[size]} 
            bg-gradient-to-br ${getMoodColor()} 
            rounded-full 
            flex items-center justify-center 
            text-2xl
            animate-mascot-bounce
            cursor-pointer
            hover:scale-110
            transition-transform
            shadow-lg
            animate-neon-pulse
          `}
          onClick={() => {
            const moods: Array<typeof mood> = ["happy", "excited", "thinking", "celebrating"]
            const randomMood = moods[Math.floor(Math.random() * moods.length)]
            setCurrentMood(randomMood)
          }}
        >
          {getMascotEmoji()}

          {/* Floating particles */}
          <div className="absolute -top-1 -right-1">
            <Sparkles className="w-3 h-3 text-neon-yellow animate-pulse" />
          </div>
          <div className="absolute -bottom-1 -left-1">
            <Zap className="w-3 h-3 text-neon-cyan animate-pulse" />
          </div>
        </div>

        {/* Message Bubble */}
        {showMessage && message && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-card border border-neon-cyan/30 rounded-lg px-3 py-2 shadow-lg animate-in slide-in-from-bottom-2">
              <p className="text-xs text-foreground whitespace-nowrap">{message}</p>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-card"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function FloatingMascot() {
  const [messages] = useState([
    "Looking good! 💪",
    "Your savings are growing! 📈",
    "Time to invest? 🤔",
    "Great spending habits! ⭐",
    "You're on fire! 🔥",
  ])

  const [currentMessage, setCurrentMessage] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      setCurrentMessage(randomMessage)
    }, 8000)

    return () => clearInterval(interval)
  }, [messages])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Mascot mood="happy" message={currentMessage} size="lg" />
    </div>
  )
}
