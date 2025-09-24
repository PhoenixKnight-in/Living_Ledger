"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, DollarSign, Calendar, Clock, BarChart3 } from "lucide-react"
import { EnhancedPieChart } from "./enhanced-pie-chart"
import { useState } from "react"

export function SpendingOverview() {
  const [selectedPeriod, setSelectedPeriod] = useState<"daily" | "weekly" | "monthly">("weekly")

  const stats = [
    {
      title: "Total Spent",
      amount: "₹14,350",
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      title: "This Week",
      amount: "₹3,240",
      change: "-8%",
      trend: "down",
      icon: TrendingDown,
      color: "text-success",
    },
    {
      title: "Average Daily",
      amount: "₹463",
      change: "+5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-warning",
    },
  ]

  const pieChartData = {
    daily: [
      { name: "Food", value: 450, color: "#10b981", emoji: "🍔" },
      { name: "Transport", value: 120, color: "#3b82f6", emoji: "🚗" },
      { name: "Coffee", value: 80, color: "#f59e0b", emoji: "☕" },
      { name: "Snacks", value: 60, color: "#ef4444", emoji: "🍿" },
    ],
    weekly: [
      { name: "Food & Dining", value: 2240, color: "#10b981", emoji: "🍔" },
      { name: "Transportation", value: 840, color: "#3b82f6", emoji: "🚗" },
      { name: "Entertainment", value: 560, color: "#f59e0b", emoji: "🎬" },
      { name: "Shopping", value: 420, color: "#ef4444", emoji: "🛒" },
      { name: "Bills", value: 180, color: "#8b5cf6", emoji: "💡" },
    ],
    monthly: [
      { name: "Food & Dining", value: 5240, color: "#10b981", emoji: "🍔" },
      { name: "Transportation", value: 3120, color: "#3b82f6", emoji: "🚗" },
      { name: "Entertainment", value: 2890, color: "#f59e0b", emoji: "🎬" },
      { name: "Shopping", value: 2100, color: "#ef4444", emoji: "🛒" },
      { name: "Bills & Utilities", value: 1000, color: "#8b5cf6", emoji: "💡" },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="p-4 card-hover" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.amount}</p>
              </div>
              <div className="text-right">
                <div className={`flex items-center gap-1 ${stat.trend === "up" ? "text-primary" : "text-success"}`}>
                  {stat.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
                <div className={`${stat.color} p-2 rounded-full w-fit ml-auto mt-2`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-neon-cyan" />
            Spending Breakdown
          </h3>
          <div className="flex gap-1 bg-muted/50 p-1 rounded-lg">
            {(["daily", "weekly", "monthly"] as const).map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className="text-xs capitalize"
              >
                {period === "daily" && <Clock className="w-3 h-3 mr-1" />}
                {period === "weekly" && <Calendar className="w-3 h-3 mr-1" />}
                {period === "monthly" && <BarChart3 className="w-3 h-3 mr-1" />}
                {period}
              </Button>
            ))}
          </div>
        </div>

        <EnhancedPieChart
          title={`${selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Spending`}
          data={pieChartData[selectedPeriod]}
          period={selectedPeriod}
        />
      </Card>
    </div>
  )
}
