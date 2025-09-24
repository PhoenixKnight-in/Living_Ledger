"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown } from "lucide-react"

export function AssetCategories() {
  const categories = [
    {
      name: "Stocks",
      value: "₹75,240",
      percentage: 60,
      change: "+8.5%",
      trend: "up",
      color: "bg-primary",
      emoji: "📈",
    },
    {
      name: "Crypto",
      value: "₹32,100",
      percentage: 25,
      change: "+12.3%",
      trend: "up",
      color: "bg-warning",
      emoji: "₿",
    },
    {
      name: "Mutual Funds",
      value: "₹18,500",
      percentage: 15,
      change: "+4.2%",
      trend: "up",
      color: "bg-success",
      emoji: "📊",
    },
  ]

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Asset Categories</h3>
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={category.name} className="space-y-2" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{category.emoji}</span>
                <span className="font-medium text-sm">{category.name}</span>
              </div>
              <div className="text-right">
                <span className="font-semibold text-sm">{category.value}</span>
                <div className="flex items-center gap-1 text-success">
                  {category.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  <span className="text-xs">{category.change}</span>
                </div>
              </div>
            </div>
            <Progress value={category.percentage} className="h-2" />
          </div>
        ))}
      </div>
    </Card>
  )
}
