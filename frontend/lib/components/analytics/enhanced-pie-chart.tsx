"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card } from "@/components/ui/card"
import { useState } from "react"

interface PieChartData {
  name: string
  value: number
  color: string
  emoji: string
}

interface EnhancedPieChartProps {
  title: string
  data: PieChartData[]
  period: "daily" | "weekly" | "monthly"
}

export function EnhancedPieChart({ title, data, period }: EnhancedPieChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(null)
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-card/95 backdrop-blur-sm p-3 rounded-lg border border-neon-cyan/20 shadow-lg">
          <p className="text-sm font-medium flex items-center gap-2">
            <span className="text-lg">{data.emoji}</span>
            {data.name}
          </p>
          <p className="text-lg font-bold text-neon-cyan">₹{data.value.toLocaleString()}</p>
          <p className="text-xs text-foreground/60">{((data.value / data.total) * 100).toFixed(1)}% of total</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="p-4 card-hover">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="flex items-center gap-1 text-xs text-foreground/60 bg-muted/50 px-2 py-1 rounded-full">
          <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
          {period}
        </div>
      </div>

      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke={activeIndex === index ? "#ffffff" : "transparent"}
                  strokeWidth={activeIndex === index ? 2 : 0}
                  style={{
                    filter: activeIndex === index ? "brightness(1.2)" : "brightness(1)",
                    transform: activeIndex === index ? "scale(1.05)" : "scale(1)",
                    transformOrigin: "center",
                    transition: "all 0.2s ease",
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-lg">{item.emoji}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <span className="text-sm font-semibold">₹{item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
