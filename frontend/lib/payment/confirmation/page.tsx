"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Home, Receipt, BookOpen } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FineraMascot } from "@/components/finera-mascot"

export default function PaymentConfirmationPage() {
  const [showAnimation, setShowAnimation] = useState(false)
  const balance = 41850 // Updated balance after payment

  // Mock transaction data - in real app this would come from URL params or state
  const transaction = {
    recipient: "Sarah Johnson",
    amount: 1000,
    category: "food",
    note: "Coffee",
    emoji: "☕",
    id: "TXN123456789",
  }

  useEffect(() => {
    setShowAnimation(true)
  }, [])

  const getCategoryMessage = () => {
    switch (transaction.category) {
      case "food":
        return "Great choice! Enjoy your meal! 🍽️✨"
      case "education":
        return "Investing in knowledge - you're awesome! 🧠💡"
      case "health":
        return "Taking care of yourself is the best investment! 💪❤️"
      case "entertainment":
        return "You deserve some fun time! 🎉🎬"
      case "gifts":
        return "Spreading joy and kindness! 💝🌟"
      default:
        return "Money well spent! 💫"
    }
  }

  const getCategoryEmoji = () => {
    const categoryEmojis = {
      food: "🍔",
      education: "📚",
      health: "🏥",
      entertainment: "🎬",
      fashion: "👕",
      transport: "🚗",
      bills: "💡",
      gifts: "🎁",
      other: "📦",
    }
    return categoryEmojis[transaction.category as keyof typeof categoryEmojis] || "💳"
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <Card className="p-8 text-center space-y-6 bg-gradient-to-br from-neon-green/5 to-neon-cyan/5">
          <div className="flex justify-center">
            <FineraMascot balance={balance} state="success" />
          </div>

          {/* Success Animation */}
          <div
            className={`transition-all duration-1000 ${showAnimation ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
          >
            <div className="relative mx-auto w-24 h-24 mb-6">
              <CheckCircle className="w-24 h-24 text-neon-green animate-pulse-glow" />
              <div className="absolute inset-0 animate-ping">
                <CheckCircle className="w-24 h-24 text-neon-green opacity-20" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-neon-green">Payment Sent! 🎉</h1>
            <p className="text-muted-foreground">Your money is on its way</p>
          </div>

          <Card className="p-4 bg-neon-green/10 border border-neon-green/20">
            <p className="text-neon-green font-medium text-sm">{getCategoryMessage()}</p>
          </Card>

          {/* Transaction Details */}
          <Card className="p-4 bg-muted/30">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">To</span>
                <span className="font-semibold">{transaction.recipient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-bold text-lg">₹{transaction.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="flex items-center gap-1">
                  {getCategoryEmoji()}
                  <span className="capitalize">{transaction.category}</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Note</span>
                <span>
                  {transaction.note} {transaction.emoji}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-mono text-sm">#{transaction.id}</span>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button variant="outline" className="w-full rounded-2xl bg-transparent">
              <Receipt className="mr-2 h-4 w-4" />
              View Receipt
            </Button>

            <Link href="/diary">
              <Button
                variant="outline"
                className="w-full rounded-2xl bg-transparent border-neon-pink/30 hover:bg-neon-pink/10"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                View in My Diary
              </Button>
            </Link>

            <Link href="/">
              <Button className="w-full rounded-2xl">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            {transaction.recipient} will receive a notification about this payment
          </p>
        </Card>
      </div>
    </div>
  )
}
