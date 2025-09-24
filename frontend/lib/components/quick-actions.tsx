"use client"

import { Send, QrCode, Plus, ArrowDownLeft, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export function QuickActions() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const actions = [
    {
      icon: Send,
      label: "Send",
      gradient: "from-neon-purple to-neon-pink",
      href: "/payment",
      emoji: "💸",
    },
    {
      icon: ArrowDownLeft,
      label: "Request",
      gradient: "from-neon-green to-neon-cyan",
      href: "/request",
      emoji: "💰",
    },
    {
      icon: QrCode,
      label: "Scan",
      gradient: "from-neon-yellow to-neon-green",
      href: "/scan",
      emoji: "📱",
    },
    {
      icon: Plus,
      label: "Add Money",
      gradient: "from-neon-cyan to-neon-purple",
      href: "/add-money",
      emoji: "💎",
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <Link key={action.label} href={action.href}>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-2 h-auto p-4 card-hover interactive-button relative group"
            style={{ animationDelay: `${index * 0.1}s` }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`bg-gradient-to-br ${action.gradient} p-3 rounded-2xl relative overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-lg`}
            >
              <action.icon className="h-6 w-6 text-white relative z-10" />

              {/* Animated sparkle effect on hover */}
              {hoveredIndex === index && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white/50 animate-pulse" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-1">
              <span className="text-xs font-medium group-hover:text-neon-cyan transition-colors">{action.label}</span>
              <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">{action.emoji}</span>
            </div>
          </Button>
        </Link>
      ))}
    </div>
  )
}
