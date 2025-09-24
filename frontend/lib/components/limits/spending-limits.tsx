"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react"

export function SpendingLimits() {
  const limits = [
    {
      category: "Food & Dining",
      spent: 5240,
      limit: 6000,
      percentage: 87,
      status: "warning",
      emoji: "🍔",
      daysLeft: 8,
    },
    {
      category: "Entertainment",
      spent: 2890,
      limit: 4000,
      percentage: 72,
      status: "safe",
      emoji: "🎬",
      daysLeft: 8,
    },
    {
      category: "Shopping",
      spent: 3100,
      limit: 2500,
      percentage: 124,
      status: "over",
      emoji: "🛒",
      daysLeft: 8,
    },
    {
      category: "Transportation",
      spent: 1200,
      limit: 3000,
      percentage: 40,
      status: "safe",
      emoji: "🚗",
      daysLeft: 8,
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "safe":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-warning" />
      case "over":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      default:
        return null
    }
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case "safe":
        return "bg-success"
      case "warning":
        return "bg-warning"
      case "over":
        return "bg-destructive"
      default:
        return "bg-primary"
    }
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Monthly Spending Limits</h3>
      <div className="space-y-4">
        {limits.map((limit, index) => (
          <div key={limit.category} className="space-y-3" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{limit.emoji}</span>
                <div>
                  <p className="font-medium text-sm">{limit.category}</p>
                  <p className="text-xs text-muted-foreground">{limit.daysLeft} days left</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-2">
                {getStatusIcon(limit.status)}
                <div>
                  <p className={`font-semibold text-sm ${getStatusColor(limit.status)}`}>
                    ₹{limit.spent.toLocaleString()} / ₹{limit.limit.toLocaleString()}
                  </p>
                  <p className={`text-xs ${getStatusColor(limit.status)}`}>{limit.percentage}%</p>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <Progress value={Math.min(limit.percentage, 100)} className="h-2" />
              {limit.status === "over" && (
                <div className="w-full bg-destructive/20 h-1 rounded-full">
                  <div
                    className="h-full bg-destructive rounded-full"
                    style={{ width: `${((limit.percentage - 100) / limit.percentage) * 100}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
