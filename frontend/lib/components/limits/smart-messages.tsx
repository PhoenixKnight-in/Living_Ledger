"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Popcorn, PartyPopper, ShoppingBag, AlertTriangle } from "lucide-react"

export function SmartMessages() {
  const messages = [
    {
      icon: PartyPopper,
      title: "You have ₹500 left for weekend fun 🎉",
      description: "Perfect for that movie night or gaming session you planned!",
      type: "celebration",
      color: "bg-success/10 text-success border-success/20",
      priority: "high",
    },
    {
      icon: Popcorn,
      title: "Enough saved for your Netflix binge 🍿",
      description: "Your entertainment budget is looking good this month!",
      type: "entertainment",
      color: "bg-primary/10 text-primary border-primary/20",
      priority: "medium",
    },
    {
      icon: ShoppingBag,
      title: "Shopping alert! You're over budget 🛒",
      description: "You've spent ₹600 more than planned. Consider waiting until next month.",
      type: "warning",
      color: "bg-destructive/10 text-destructive border-destructive/20",
      priority: "high",
    },
    {
      icon: AlertTriangle,
      title: "Food budget running low 🍔",
      description: "Only ₹760 left for dining out. Time to cook at home?",
      type: "caution",
      color: "bg-warning/10 text-warning border-warning/20",
      priority: "medium",
    },
  ]

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Smart Messages</h3>
      <div className="space-y-4">
        {messages.map((message, index) => (
          <Card
            key={message.title}
            className={`p-4 border-2 card-hover ${message.color}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-current/10 animate-pulse-glow">
                <message.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">{message.title}</h4>
                <p className="text-xs opacity-80 mb-2">{message.description}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs capitalize">
                    {message.type}
                  </Badge>
                  <Badge
                    variant={message.priority === "high" ? "destructive" : "secondary"}
                    className="text-xs capitalize"
                  >
                    {message.priority}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}
