"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"
import { TrendingUp, Target, Lightbulb, Star, AlertCircle, Brain, Heart, Zap } from "lucide-react"
import { FineraMascot } from "./finera-mascot"

interface FinancialCoachProps {
  balance: number
  monthlyIncome: number
  monthlyExpenses: number
  savingsGoal?: number
}

export function SmartFinancialCoach({
  balance,
  monthlyIncome = 28500,
  monthlyExpenses = 14350,
  savingsGoal = 100000,
}: FinancialCoachProps) {
  const [currentTip, setCurrentTip] = useState(0)
  const [showDetailedAdvice, setShowDetailedAdvice] = useState(false)

  const savingsRate = ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100
  const monthsToGoal = Math.ceil((savingsGoal - balance) / (monthlyIncome - monthlyExpenses))

  const personalizedTips = [
    {
      icon: TrendingUp,
      category: "Savings Optimization",
      title: "Boost Your Savings Rate",
      message: `Your current savings rate is ${savingsRate.toFixed(1)}%. Great job! Let's aim for 25%+`,
      action: "Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings",
      priority: savingsRate < 20 ? "high" : "medium",
      color: "text-green-500",
    },
    {
      icon: Target,
      category: "Goal Achievement",
      title: "Savings Goal Progress",
      message: `You're ${((balance / savingsGoal) * 100).toFixed(1)}% towards your ₹${savingsGoal.toLocaleString()} goal!`,
      action: `At current rate, you'll reach it in ${monthsToGoal} months. Want to speed up?`,
      priority: "medium",
      color: "text-blue-500",
    },
    {
      icon: Lightbulb,
      category: "Smart Spending",
      title: "Expense Optimization",
      message: "I noticed you spend a lot on food. Nothing wrong with good food!",
      action: "Try meal prepping once a week. You could save ₹2000+ monthly!",
      priority: "medium",
      color: "text-yellow-500",
    },
    {
      icon: Brain,
      category: "Investment Wisdom",
      title: "Make Your Money Work",
      message: "Your balance is healthy! Time to make it grow faster.",
      action: "Consider SIP in mutual funds or fixed deposits for better returns",
      priority: balance > 30000 ? "high" : "low",
      color: "text-purple-500",
    },
    {
      icon: Heart,
      category: "Financial Wellness",
      title: "Balance is Key",
      message: "You're doing great with money management!",
      action: "Don't forget to enjoy life while saving. Treat yourself occasionally!",
      priority: "low",
      color: "text-pink-500",
    },
  ]

  const highPriorityTips = personalizedTips.filter((tip) => tip.priority === "high")
  const currentTipData = personalizedTips[currentTip]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % personalizedTips.length)
    }, 8000) // Change tip every 8 seconds

    return () => clearInterval(interval)
  }, [personalizedTips.length])

  return (
    <Card className="p-6 bg-gradient-to-br from-neon-cyan/5 to-neon-purple/5 border-2 border-neon-cyan/20">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Zap className="w-5 h-5 text-neon-cyan" />
            Your Financial Coach
          </h3>
          <p className="text-sm text-foreground/60">Personalized insights just for you</p>
        </div>
        <div className="scale-75">
          <FineraMascot balance={balance} context="analytics" />
        </div>
      </div>

      {/* Current Tip Display */}
      <Card className="p-4 mb-4 bg-gradient-to-r from-background/50 to-card/50 border border-neon-cyan/20">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-full bg-current/10 ${currentTipData.color}`}>
            <currentTipData.icon className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-xs">
                {currentTipData.category}
              </Badge>
              {currentTipData.priority === "high" && <AlertCircle className="w-3 h-3 text-red-500" />}
            </div>
            <h4 className="font-semibold text-sm mb-1">{currentTipData.title}</h4>
            <p className="text-xs text-foreground/80 mb-2">{currentTipData.message}</p>

            {showDetailedAdvice && (
              <div className="mt-3 p-3 bg-neon-green/10 rounded-lg border border-neon-green/20">
                <p className="text-xs font-medium text-neon-green">💡 Action Plan:</p>
                <p className="text-xs text-neon-green/90 mt-1">{currentTipData.action}</p>
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="mt-2 h-6 px-2 text-xs"
              onClick={() => setShowDetailedAdvice(!showDetailedAdvice)}
            >
              {showDetailedAdvice ? "Less Details" : "Show Action Plan"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Progress Indicators */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-background/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-foreground/60">Savings Rate</span>
            <span className="text-xs font-bold text-green-500">{savingsRate.toFixed(1)}%</span>
          </div>
          <Progress value={Math.min(savingsRate, 100)} className="h-2" />
        </div>

        <div className="p-3 bg-background/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-foreground/60">Goal Progress</span>
            <span className="text-xs font-bold text-blue-500">{((balance / savingsGoal) * 100).toFixed(1)}%</span>
          </div>
          <Progress value={(balance / savingsGoal) * 100} className="h-2" />
        </div>
      </div>

      {/* High Priority Alerts */}
      {highPriorityTips.length > 0 && (
        <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm font-semibold text-red-500">Priority Actions</span>
          </div>
          <div className="space-y-1">
            {highPriorityTips.map((tip, index) => (
              <p key={index} className="text-xs text-red-500/90">
                • {tip.title}: {tip.action}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Tip Navigation */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-1">
          {personalizedTips.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentTip ? "bg-neon-cyan" : "bg-foreground/20"
              }`}
              onClick={() => setCurrentTip(index)}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-foreground/60">
          <Star className="w-3 h-3" />
          <span>
            Tip {currentTip + 1} of {personalizedTips.length}
          </span>
        </div>
      </div>
    </Card>
  )
}
