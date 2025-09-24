"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function CategoryBreakdown() {
  const categories = [
    {
      name: "Food & Dining",
      amount: "₹5,240",
      percentage: 36,
      color: "bg-primary",
      emoji: "🍔",
    },
    {
      name: "Transportation",
      amount: "₹3,120",
      percentage: 22,
      color: "bg-success",
      emoji: "🚗",
    },
    {
      name: "Entertainment",
      amount: "₹2,890",
      percentage: 20,
      color: "bg-warning",
      emoji: "🎬",
    },
    {
      name: "Shopping",
      amount: "₹2,100",
      percentage: 15,
      color: "bg-accent",
      emoji: "🛒",
    },
    {
      name: "Bills & Utilities",
      amount: "₹1,000",
      percentage: 7,
      color: "bg-muted",
      emoji: "💡",
    },
  ]

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Spending by Category</h3>
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={category.name} className="space-y-2" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{category.emoji}</span>
                <span className="font-medium text-sm">{category.name}</span>
              </div>
              <div className="text-right">
                <span className="font-semibold text-sm">{category.amount}</span>
                <span className="text-muted-foreground text-xs ml-2">{category.percentage}%</span>
              </div>
            </div>
            <Progress value={category.percentage} className="h-2" />
          </div>
        ))}
      </div>
    </Card>
  )
}
