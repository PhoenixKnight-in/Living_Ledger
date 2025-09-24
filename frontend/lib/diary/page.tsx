"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Calendar, Award } from "lucide-react"
import Link from "next/link"
import { FineraMascot } from "@/components/finera-mascot"

export default function FinancialDiaryPage() {
  const balance = 42850

  // Mock data for financial diary
  const monthlySpending = {
    food: { amount: 8500, budget: 10000, transactions: 24 },
    entertainment: { amount: 3200, budget: 5000, transactions: 8 },
    education: { amount: 2500, budget: 3000, transactions: 3 },
    health: { amount: 1800, budget: 2000, transactions: 5 },
    fashion: { amount: 4200, budget: 4000, transactions: 6 },
    transport: { amount: 2100, budget: 3000, transactions: 12 },
    bills: { amount: 5500, budget: 6000, transactions: 8 },
    gifts: { amount: 1200, budget: 2000, transactions: 4 },
  }

  const categoryEmojis = {
    food: "🍔",
    entertainment: "🎬",
    education: "📚",
    health: "🏥",
    fashion: "👕",
    transport: "🚗",
    bills: "💡",
    gifts: "🎁",
  }

  const getInsightMessage = (category: string, data: any) => {
    const percentage = (data.amount / data.budget) * 100

    if (category === "education" || category === "health") {
      return percentage > 80 ? "Excellent! Keep investing in yourself! 🌟" : "Consider investing more in this area! 💪"
    }

    if (percentage > 100) {
      return "Oops! You went over budget this month! 😅"
    } else if (percentage > 80) {
      return "Almost at your limit! Be careful! ⚠️"
    } else if (percentage < 50) {
      return "Great job staying under budget! 🎉"
    }

    return "You're doing well! Keep it up! 😊"
  }

  const totalSpent = Object.values(monthlySpending).reduce((sum, cat) => sum + cat.amount, 0)
  const totalBudget = Object.values(monthlySpending).reduce((sum, cat) => sum + cat.budget, 0)

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent">
          Financial Diary
        </h1>
        <div className="w-10" />
      </div>

      {/* Mascot with diary message */}
      <div className="flex justify-center">
        <div className="text-center">
          <FineraMascot balance={balance} />
          <p className="text-sm mt-2 text-foreground/80 font-medium">Let's review your spending story! 📖✨</p>
        </div>
      </div>

      {/* Monthly Overview */}
      <Card className="p-6 bg-gradient-to-br from-neon-purple/10 to-neon-cyan/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">This Month's Story</h2>
          <Badge variant="secondary" className="bg-neon-green/20 text-neon-green">
            <Calendar className="h-3 w-3 mr-1" />
            September 2024
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-4 bg-background/50 rounded-xl">
            <p className="text-2xl font-bold text-neon-pink">₹{totalSpent.toLocaleString()}</p>
            <p className="text-sm text-foreground/60">Total Spent</p>
          </div>
          <div className="text-center p-4 bg-background/50 rounded-xl">
            <p className="text-2xl font-bold text-neon-green">₹{(totalBudget - totalSpent).toLocaleString()}</p>
            <p className="text-sm text-foreground/60">Saved</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Budget Progress</span>
            <span>{Math.round((totalSpent / totalBudget) * 100)}%</span>
          </div>
          <Progress value={(totalSpent / totalBudget) * 100} className="h-2" />
        </div>
      </Card>

      {/* Category Breakdown */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Spending Categories</h2>

        {Object.entries(monthlySpending).map(([category, data]) => {
          const percentage = (data.amount / data.budget) * 100
          const isGoodCategory = category === "education" || category === "health"

          return (
            <Card key={category} className="p-4 card-hover">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{categoryEmojis[category as keyof typeof categoryEmojis]}</span>
                  <div>
                    <h3 className="font-semibold capitalize">{category}</h3>
                    <p className="text-sm text-foreground/60">{data.transactions} transactions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{data.amount.toLocaleString()}</p>
                  <p className="text-sm text-foreground/60">of ₹{data.budget.toLocaleString()}</p>
                </div>
              </div>

              <Progress
                value={Math.min(percentage, 100)}
                className={`h-2 mb-2 ${percentage > 100 ? "bg-red-100" : ""}`}
              />

              <div className="flex items-center justify-between">
                <p className="text-xs text-foreground/80">{getInsightMessage(category, data)}</p>
                <Badge
                  variant={
                    percentage > 100 ? "destructive" : isGoodCategory && percentage > 80 ? "default" : "secondary"
                  }
                  className="text-xs"
                >
                  {Math.round(percentage)}%
                </Badge>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Achievements */}
      <Card className="p-6 bg-gradient-to-br from-neon-yellow/10 to-neon-green/10">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-neon-yellow" />
          This Month's Achievements
        </h2>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-background/50 rounded-xl">
            <span className="text-2xl">🎓</span>
            <div>
              <p className="font-medium">Knowledge Investor</p>
              <p className="text-sm text-foreground/60">Spent ₹2,500 on education - Keep learning!</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-background/50 rounded-xl">
            <span className="text-2xl">💪</span>
            <div>
              <p className="font-medium">Health Champion</p>
              <p className="text-sm text-foreground/60">Prioritized health with ₹1,800 spending</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-background/50 rounded-xl">
            <span className="text-2xl">🎯</span>
            <div>
              <p className="font-medium">Budget Master</p>
              <p className="text-sm text-foreground/60">Stayed under budget in 6 out of 8 categories!</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
