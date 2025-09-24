"use client"

import { Card } from "@/components/ui/card"
import { XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts"

export function SpendingTrends() {
  const data = [
    { day: "Mon", amount: 450 },
    { day: "Tue", amount: 320 },
    { day: "Wed", amount: 680 },
    { day: "Thu", amount: 290 },
    { day: "Fri", amount: 890 },
    { day: "Sat", amount: 1200 },
    { day: "Sun", amount: 410 },
  ]

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Weekly Spending Trend</h3>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis hide />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              fill="url(#colorSpending)"
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Your spending peaked on <span className="font-semibold text-foreground">Saturday</span> with ₹1,200
        </p>
      </div>
    </Card>
  )
}
