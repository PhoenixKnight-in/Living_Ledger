"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Crown, Pizza, ShoppingBag, Coffee, Heart, Brain, Target } from "lucide-react"
import { FineraMascot } from "../finera-mascot"
import { useState } from "react"

export function PlayfulInsights() {
  const balance = 42850
  const [selectedInsight, setSelectedInsight] = useState<number | null>(null)

  const insights = [
    {
      icon: Crown,
      title: "You've earned a King's treasure! 🏰",
      description: "Your savings increased by 15% this month. Keep it up, royal spender!",
      advice: "Consider investing some of this treasure in mutual funds or fixed deposits for even better returns!",
      type: "achievement",
      color: "bg-neon-yellow/10 text-neon-yellow border-neon-yellow/20",
      mascotMessage: "You're absolutely crushing it! I'm so proud! 👑✨",
    },
    {
      icon: Pizza,
      title: "Oops! 🍕 You spent too much on food",
      description: "Food expenses are 36% of your budget. Maybe try cooking at home?",
      advice: "Try meal prepping on Sundays! You could save ₹2000+ monthly and eat healthier too!",
      type: "warning",
      color: "bg-neon-pink/10 text-neon-pink border-neon-pink/20",
      mascotMessage: "I love food too, but let's find a balance! Your wallet will thank you! 🍳💰",
    },
    {
      icon: Coffee,
      title: "Coffee Champion ☕",
      description: "You've bought coffee 12 times this week. That's dedication!",
      advice: "Maybe invest in a good coffee machine? You'll save money and get better coffee at home!",
      type: "fun",
      color: "bg-neon-purple/10 text-neon-purple border-neon-purple/20",
      mascotMessage: "I admire your caffeine commitment! But maybe we can optimize this habit? ☕💡",
    },
    {
      icon: ShoppingBag,
      title: "Smart Shopper 🛍️",
      description: "You saved ₹500 by using discount codes this month!",
      advice: "You're a savings ninja! Keep looking for deals and cashback offers to maximize your savings!",
      type: "success",
      color: "bg-neon-green/10 text-neon-green border-neon-green/20",
      mascotMessage: "You're getting smarter with money! I'm learning from you! 🛍️🧠",
    },
    {
      icon: Brain,
      title: "Knowledge Investor 📚",
      description: "You spent ₹2,500 on education this month!",
      advice: "Investing in yourself is the best investment! Consider setting up a dedicated learning fund.",
      type: "achievement",
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      mascotMessage: "Your brain is getting richer! Knowledge is the ultimate wealth! 🧠💎",
    },
    {
      icon: Heart,
      title: "Health Hero 💪",
      description: "You prioritized health with ₹1,800 spending!",
      advice: "Health is wealth! Consider tracking your fitness expenses to optimize your wellness budget.",
      type: "success",
      color: "bg-red-500/10 text-red-500 border-red-500/20",
      mascotMessage: "Taking care of yourself is the smartest investment! Keep it up! ❤️💪",
    },
  ]

  return (
    <Card className="p-4 bg-gradient-to-br from-neon-cyan/5 to-neon-purple/5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Your Financial Story</h3>
        <div className="scale-75">
          <FineraMascot balance={balance} context="analytics" />
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <Card
            key={insight.title}
            className={`p-4 border-2 card-hover cursor-pointer transition-all duration-300 ${insight.color} ${
              selectedInsight === index ? "scale-105 shadow-lg" : ""
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setSelectedInsight(selectedInsight === index ? null : index)}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-current/10">
                <insight.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                <p className="text-xs opacity-80 mb-2">{insight.description}</p>

                {selectedInsight === index && (
                  <div className="mt-3 p-3 bg-background/50 rounded-lg border border-current/20">
                    <p className="text-xs font-medium mb-2">💡 FINERA's Advice:</p>
                    <p className="text-xs opacity-90 mb-2">{insight.advice}</p>
                    <div className="p-2 bg-current/5 rounded-lg">
                      <p className="text-xs font-medium italic">"{insight.mascotMessage}"</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-2">
                  <Badge variant="outline" className="text-xs capitalize">
                    {insight.type}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-6 px-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedInsight(selectedInsight === index ? null : index)
                    }}
                  >
                    {selectedInsight === index ? "Less" : "More"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-neon-green/10 to-neon-cyan/10 rounded-xl border border-neon-green/20">
        <div className="flex items-center gap-3 mb-2">
          <Target className="w-5 h-5 text-neon-green" />
          <h4 className="font-semibold text-neon-green">Your Financial Journey Score</h4>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-neon-green">8.5/10</p>
            <p className="text-xs text-foreground/60">Excellent progress!</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-neon-green">Keep growing! 🌱</p>
            <p className="text-xs text-foreground/60">You're on the right track!</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
