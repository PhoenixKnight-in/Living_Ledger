"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Smile, Send, Tag, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { FineraMascot } from "../finera-mascot"

interface Contact {
  id: string
  name: string
  avatar: string
  initials: string
}

interface SendMoneyFormProps {
  contact: Contact
}

export function SendMoneyForm({ contact }: SendMoneyFormProps) {
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [selectedEmoji, setSelectedEmoji] = useState("")
  const [category, setCategory] = useState("")
  const balance = 42850

  const quickAmounts = [100, 500, 1000, 2000]
  const popularEmojis = ["🍔", "☕", "🎬", "🛒", "🍕", "🎮", "🚗", "💝"]

  const spendingCategories = [
    { value: "food", label: "🍔 Food & Dining", emoji: "🍔" },
    { value: "entertainment", label: "🎬 Entertainment", emoji: "🎬" },
    { value: "education", label: "📚 Education", emoji: "📚" },
    { value: "health", label: "🏥 Health & Fitness", emoji: "🏥" },
    { value: "fashion", label: "👕 Fashion & Shopping", emoji: "👕" },
    { value: "transport", label: "🚗 Transportation", emoji: "🚗" },
    { value: "bills", label: "💡 Bills & Utilities", emoji: "💡" },
    { value: "gifts", label: "🎁 Gifts & Donations", emoji: "🎁" },
    { value: "travel", label: "✈️ Travel", emoji: "✈️" },
    { value: "other", label: "📦 Other", emoji: "📦" },
  ]

  const handleSend = () => {
    // Store transaction with category for financial diary
    const transaction = {
      amount: Number.parseFloat(amount),
      recipient: contact.name,
      category,
      note,
      emoji: selectedEmoji,
      timestamp: new Date().toISOString(),
    }
    console.log("Sending transaction:", transaction)
  }

  const getCategoryMessage = () => {
    const amountNum = Number.parseFloat(amount) || 0

    switch (category) {
      case "education":
        return amountNum > 1000
          ? "Wow! Big investment in knowledge! Your future self will thank you! 🧠✨"
          : "Great choice! Every rupee spent on learning is worth it! 📚💡"
      case "health":
        return amountNum > 2000
          ? "Taking care of yourself is priceless! Health is wealth! 💪❤️"
          : "Smart move! Your body and mind deserve this investment! 🏥✨"
      case "food":
        return amountNum > 1000
          ? "That's quite a feast! Hope it's worth every bite! 🍽️😋"
          : "Enjoy your meal! Food is fuel for your amazing journey! 🍔⚡"
      case "entertainment":
        return amountNum > 1500
          ? "Living it up! You deserve some fun, but don't forget your savings! 🎉💰"
          : "Time to have some fun! You've earned this break! 🎬🍿"
      case "gifts":
        return "How thoughtful of you! Spreading joy makes the world brighter! 💝🌟"
      case "bills":
        return "Responsible adult mode activated! Paying bills like a boss! 💡👑"
      case "transport":
        return "Getting around in style! Safe travels ahead! 🚗✨"
      case "fashion":
        return amountNum > 2000
          ? "Fashion statement incoming! Looking good is feeling good! 👕💫"
          : "A little retail therapy never hurt anyone! You'll look amazing! 🛍️✨"
      case "travel":
        return "Adventure awaits! Create memories that last a lifetime! ✈️🌍"
      default:
        return ""
    }
  }

  const getSpendingAlert = () => {
    const amountNum = Number.parseFloat(amount) || 0
    const percentageOfBalance = (amountNum / balance) * 100

    if (percentageOfBalance > 20) {
      return {
        type: "warning",
        message: "This is a big chunk of your balance! Are you sure?",
        icon: AlertTriangle,
        color: "text-yellow-500",
      }
    } else if (percentageOfBalance > 10) {
      return {
        type: "caution",
        message: "This is a significant amount. Double-check if needed!",
        icon: AlertTriangle,
        color: "text-orange-500",
      }
    } else if (amountNum > 0) {
      return {
        type: "good",
        message: "Looks reasonable for your budget!",
        icon: CheckCircle,
        color: "text-green-500",
      }
    }
    return null
  }

  const spendingAlert = getSpendingAlert()

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <FineraMascot
          balance={balance}
          context="payment"
          recentSpending={Number.parseFloat(amount) || 0}
          spendingCategory={category}
        />
      </div>

      {/* Contact Info */}
      <Card className="p-6 text-center">
        <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-primary/20 animate-float">
          <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
          <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
            {contact.initials}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">{contact.name}</h2>
        <p className="text-muted-foreground">Ready to receive payment</p>
      </Card>

      {/* Amount Input */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Enter Amount</h3>
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-muted-foreground">
            ₹
          </span>
          <Input
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-10 text-2xl font-bold text-center border-2 rounded-2xl h-16 focus:border-primary transition-colors"
          />
        </div>

        {spendingAlert && (
          <div
            className={`mb-4 p-3 rounded-xl border flex items-center gap-2 ${
              spendingAlert.type === "warning"
                ? "bg-yellow-500/10 border-yellow-500/20"
                : spendingAlert.type === "caution"
                  ? "bg-orange-500/10 border-orange-500/20"
                  : "bg-green-500/10 border-green-500/20"
            }`}
          >
            <spendingAlert.icon className={`w-4 h-4 ${spendingAlert.color}`} />
            <p className={`text-sm font-medium ${spendingAlert.color}`}>{spendingAlert.message}</p>
          </div>
        )}

        <div className="grid grid-cols-4 gap-2">
          {quickAmounts.map((quickAmount) => (
            <Button
              key={quickAmount}
              variant="outline"
              size="sm"
              className="rounded-xl bg-transparent interactive-button"
              onClick={() => setAmount(quickAmount.toString())}
            >
              ₹{quickAmount}
            </Button>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Tag className="h-4 w-4" />
          What's this for?
        </h3>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="rounded-2xl border-2 focus:border-primary">
            <SelectValue placeholder="Select spending category" />
          </SelectTrigger>
          <SelectContent>
            {spendingCategories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {category && (
          <div className="mt-3 p-3 bg-neon-green/10 rounded-xl border border-neon-green/20">
            <p className="text-sm text-neon-green font-medium">{getCategoryMessage()}</p>
          </div>
        )}
      </Card>

      {/* Note & Emoji */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Add a Note</h3>
        <div className="space-y-4">
          <div className="relative">
            <Input
              placeholder="Add a personal message..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="pr-12 rounded-2xl border-2 focus:border-primary transition-colors"
            />
            <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Smile className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {popularEmojis.map((emoji) => (
              <Button
                key={emoji}
                variant={selectedEmoji === emoji ? "default" : "outline"}
                size="sm"
                className="rounded-full w-10 h-10 p-0 text-lg card-hover interactive-button"
                onClick={() => setSelectedEmoji(selectedEmoji === emoji ? "" : emoji)}
              >
                {emoji}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Send Button */}
      <div className="space-y-4">
        <Link href="/payment/confirmation">
          <Button
            className="w-full h-14 text-lg font-semibold rounded-2xl animate-pulse-glow interactive-button"
            disabled={!amount || Number.parseFloat(amount) <= 0 || !category}
            onClick={handleSend}
          >
            <Send className="mr-2 h-5 w-5" />
            Send ₹{amount || "0"} {selectedEmoji}
          </Button>
        </Link>

        <p className="text-center text-muted-foreground text-sm">Money will be sent instantly from your account</p>
      </div>
    </div>
  )
}
