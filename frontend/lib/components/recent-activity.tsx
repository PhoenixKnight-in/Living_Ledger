"use client"

import { Card } from "@/components/ui/card"
import { ArrowDownLeft, Coffee, Gamepad2, Music, Sparkles, TrendingUp, TrendingDown, BookOpen } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function RecentActivity() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const activities = [
    {
      icon: Coffee,
      title: "Coffee with Sarah",
      amount: "-₹450",
      time: "2 hours ago",
      type: "expense",
      emoji: "☕",
      gradient: "from-neon-yellow/20 to-neon-pink/20",
      category: "food",
      categoryLabel: "Food & Drinks",
    },
    {
      icon: ArrowDownLeft,
      title: "Received from Mom",
      amount: "+₹2,000",
      time: "5 hours ago",
      type: "income",
      emoji: "💝",
      gradient: "from-neon-green/20 to-neon-cyan/20",
      category: "gifts",
      categoryLabel: "Transfer",
    },
    {
      icon: Gamepad2,
      title: "Gaming subscription",
      amount: "-₹599",
      time: "1 day ago",
      type: "expense",
      emoji: "🎮",
      gradient: "from-neon-purple/20 to-neon-cyan/20",
      category: "entertainment",
      categoryLabel: "Entertainment",
    },
    {
      icon: Music,
      title: "Spotify Premium",
      amount: "-₹119",
      time: "2 days ago",
      type: "expense",
      emoji: "🎵",
      gradient: "from-neon-cyan/20 to-neon-purple/20",
      category: "entertainment",
      categoryLabel: "Subscriptions",
    },
  ]

  const getCategoryEmoji = (category: string) => {
    const categoryEmojis = {
      food: "🍔",
      entertainment: "🎬",
      education: "📚",
      health: "🏥",
      fashion: "👕",
      transport: "🚗",
      bills: "💡",
      gifts: "🎁",
      other: "📦",
    }
    return categoryEmojis[category as keyof typeof categoryEmojis] || "💳"
  }

  return (
    <Card className="p-4 bg-gradient-to-br from-card to-muted/20 border-2 border-transparent hover:border-neon-cyan/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
          Recent Activity
        </h3>
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-neon-yellow animate-pulse" />
          <Link href="/diary">
            <Button variant="ghost" size="sm" className="text-xs text-neon-pink hover:text-neon-pink/80">
              <BookOpen className="h-3 w-3 mr-1" />
              View All
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${activity.gradient} hover:scale-[1.02] transition-all duration-300 cursor-pointer group border border-transparent hover:border-neon-cyan/30`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="bg-card/80 backdrop-blur-sm p-3 rounded-full group-hover:scale-110 transition-transform duration-300 relative">
              <span className="text-lg">{activity.emoji}</span>
              {hoveredIndex === index && (
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="h-3 w-3 text-neon-cyan animate-pulse" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <p className="font-medium text-sm group-hover:text-neon-cyan transition-colors">{activity.title}</p>
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground text-xs">{activity.time}</p>
                <span className="text-xs text-neon-purple/60">•</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs">{getCategoryEmoji(activity.category)}</span>
                  <p className="text-xs text-neon-purple/80">{activity.categoryLabel}</p>
                </div>
              </div>
            </div>

            <div className="text-right flex items-center gap-1">
              {activity.type === "income" ? (
                <TrendingUp className="h-3 w-3 text-neon-green" />
              ) : (
                <TrendingDown className="h-3 w-3 text-neon-pink" />
              )}
              <p
                className={`font-semibold text-sm ${
                  activity.type === "income" ? "text-neon-green" : "text-neon-pink"
                } group-hover:scale-110 transition-transform`}
              >
                {activity.amount}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-neon-cyan/20">
        <p className="text-xs text-center text-muted-foreground">
          All transactions are automatically categorized for your diary ✨
        </p>
      </div>
    </Card>
  )
}
