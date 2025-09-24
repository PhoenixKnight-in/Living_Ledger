"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

export function TopPerformers() {
  const performers = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      value: "₹15,240",
      change: "+15.8%",
      trend: "up",
      logo: "🍎",
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      value: "₹22,100",
      change: "+28.5%",
      trend: "up",
      logo: "₿",
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      value: "₹8,950",
      change: "+12.3%",
      trend: "up",
      logo: "🚗",
    },
    {
      symbol: "RELIANCE",
      name: "Reliance Industries",
      value: "₹12,500",
      change: "-2.1%",
      trend: "down",
      logo: "🏭",
    },
  ]

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Top Performers</h3>
      <div className="space-y-3">
        {performers.map((stock, index) => (
          <div
            key={stock.symbol}
            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-muted/50 transition-all duration-300 card-hover"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-2xl">{stock.logo}</div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{stock.symbol}</p>
              <p className="text-muted-foreground text-xs">{stock.name}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm">{stock.value}</p>
              <div className={`flex items-center gap-1 ${stock.trend === "up" ? "text-success" : "text-destructive"}`}>
                {stock.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span className="text-xs font-medium">{stock.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
