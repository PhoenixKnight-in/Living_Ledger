"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Rocket, Glasses as Sunglasses, Target, TrendingUp } from "lucide-react"

export function InvestmentInsights() {
  const insights = [
    {
      icon: Rocket,
      title: "Your crypto rocket is 🚀 ready for launch!",
      description: "Bitcoin is up 28.5% this month. Your portfolio is soaring to the moon!",
      type: "bullish",
      color: "bg-success/10 text-success border-success/20",
    },
    {
      icon: Sunglasses,
      title: "Your stocks are chilling like 😎",
      description: "Apple and Tesla are performing steadily. Cool and collected investments!",
      type: "stable",
      color: "bg-primary/10 text-primary border-primary/20",
    },
    {
      icon: Target,
      title: "Diversification Master 🎯",
      description: "Perfect balance across stocks, crypto, and mutual funds. You're a pro!",
      type: "achievement",
      color: "bg-warning/10 text-warning border-warning/20",
    },
    {
      icon: TrendingUp,
      title: "Wealth Builder 💰",
      description: "Your portfolio grew by ₹8,240 this month. Keep up the momentum!",
      type: "growth",
      color: "bg-accent/10 text-accent border-accent/20",
    },
  ]

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Investment Insights</h3>
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <Card
            key={insight.title}
            className={`p-4 border-2 card-hover ${insight.color}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-current/10 animate-pulse-glow">
                <insight.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                <p className="text-xs opacity-80">{insight.description}</p>
                <Badge variant="outline" className="mt-2 text-xs capitalize">
                  {insight.type}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}
