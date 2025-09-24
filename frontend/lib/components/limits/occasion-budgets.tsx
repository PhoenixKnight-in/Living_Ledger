"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Calendar, Gift, Utensils, Gamepad2 } from "lucide-react"

export function OccasionBudgets() {
  const occasions = [
    {
      name: "Weekend Fun",
      allocated: 2000,
      spent: 1500,
      percentage: 75,
      icon: Gamepad2,
      emoji: "🎉",
      daysLeft: 2,
      status: "safe",
    },
    {
      name: "Birthday Party",
      allocated: 5000,
      spent: 3200,
      percentage: 64,
      icon: Gift,
      emoji: "🎂",
      daysLeft: 12,
      status: "safe",
    },
    {
      name: "Date Night",
      allocated: 3000,
      spent: 2800,
      percentage: 93,
      icon: Utensils,
      emoji: "💕",
      daysLeft: 5,
      status: "warning",
    },
    {
      name: "Festival Shopping",
      allocated: 8000,
      spent: 1200,
      percentage: 15,
      icon: Calendar,
      emoji: "🪔",
      daysLeft: 25,
      status: "safe",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "text-success"
      case "warning":
        return "text-warning"
      case "over":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Occasion Budgets</h3>
      <div className="space-y-4">
        {occasions.map((occasion, index) => (
          <div key={occasion.name} className="space-y-3 card-hover" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-full">
                  <span className="text-lg">{occasion.emoji}</span>
                </div>
                <div>
                  <p className="font-medium text-sm">{occasion.name}</p>
                  <p className="text-xs text-muted-foreground">in {occasion.daysLeft} days</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold text-sm ${getStatusColor(occasion.status)}`}>
                  ₹{(occasion.allocated - occasion.spent).toLocaleString()} left
                </p>
                <p className="text-xs text-muted-foreground">
                  ₹{occasion.spent.toLocaleString()} / ₹{occasion.allocated.toLocaleString()}
                </p>
              </div>
            </div>
            <Progress value={occasion.percentage} className="h-2" />
          </div>
        ))}
      </div>
    </Card>
  )
}
