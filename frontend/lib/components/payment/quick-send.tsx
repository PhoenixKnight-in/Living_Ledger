"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function QuickSend() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)

  const quickAmounts = [100, 500, 1000, 2000, 5000]

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Quick Send</h3>
      <div className="grid grid-cols-3 gap-3">
        {quickAmounts.map((amount) => (
          <Button
            key={amount}
            variant={selectedAmount === amount ? "default" : "outline"}
            className="rounded-2xl font-semibold card-hover"
            onClick={() => setSelectedAmount(amount)}
          >
            ₹{amount}
          </Button>
        ))}
        <Button
          variant="outline"
          className="rounded-2xl font-semibold card-hover bg-transparent"
          onClick={() => setSelectedAmount(0)}
        >
          Custom
        </Button>
      </div>
    </Card>
  )
}
