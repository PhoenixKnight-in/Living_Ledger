"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

export function PortfolioOverview() {
  const [animatedValue, setAnimatedValue] = useState(0)
  const targetValue = 125840

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = targetValue / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= targetValue) {
        setAnimatedValue(targetValue)
        clearInterval(timer)
      } else {
        setAnimatedValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [targetValue])

  return (
    <Card className="p-6 bg-gradient-to-br from-success to-success/80 text-white card-hover animate-float">
      <div className="space-y-4">
        <div>
          <p className="text-white/80 text-sm">Total Portfolio Value</p>
          <h2 className="text-3xl font-bold">₹{animatedValue.toLocaleString()}</h2>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-white" />
            <span className="font-semibold">+₹8,240</span>
            <span className="text-white/80 text-sm">(+7.02%)</span>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-xs">Today's Change</p>
            <p className="font-semibold text-sm">+₹1,240</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
          <div>
            <p className="text-white/60 text-xs">Invested</p>
            <p className="text-white font-semibold">₹98,500</p>
          </div>
          <div>
            <p className="text-white/60 text-xs">Returns</p>
            <p className="text-white font-semibold">₹27,340</p>
          </div>
          <div>
            <p className="text-white/60 text-xs">P&L</p>
            <p className="text-white font-semibold">+27.8%</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
