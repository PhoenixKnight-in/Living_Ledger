"use client"

import { Eye, EyeOff, TrendingUp, Sparkles, AlertTriangle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { FineraMascot } from "./finera-mascot"
import Image from "next/image"

export function BalanceCard() {
  const [showBalance, setShowBalance] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const balance = 42850

  const getBalanceStatus = () => {
    if (balance < 500) return "critical"
    if (balance < 2000) return "low"
    if (balance < 10000) return "moderate"
    if (balance > 50000) return "excellent"
    return "good"
  }

  const getBalanceTheme = () => {
    const status = getBalanceStatus()
    switch (status) {
      case "critical":
        return {
          gradient: "from-red-500/20 to-orange-500/20",
          border: "border-red-500/30",
          textColor: "from-red-400 to-orange-400",
          icon: AlertTriangle,
          message: "Critical - Need immediate attention",
        }
      case "low":
        return {
          gradient: "from-yellow-500/20 to-orange-500/20",
          border: "border-yellow-500/30",
          textColor: "from-yellow-400 to-orange-400",
          icon: AlertTriangle,
          message: "Low balance - Consider adding funds",
        }
      case "excellent":
        return {
          gradient: "from-green-500/20 to-emerald-500/20",
          border: "border-green-500/30",
          textColor: "from-green-400 to-emerald-400",
          icon: Star,
          message: "Excellent - Great financial health!",
        }
      default:
        return {
          gradient: "from-neon-purple/20 to-neon-cyan/20",
          border: "border-neon-cyan/30",
          textColor: "from-neon-cyan to-neon-green",
          icon: TrendingUp,
          message: "Good balance - Keep it up!",
        }
    }
  }

  const theme = getBalanceTheme()

  return (
    <Card
      className={`p-6 bg-gradient-to-br ${theme.gradient} card-hover animate-float border-2 ${theme.border} relative overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-4 right-4 z-20">
        <Image
          src="/finera-logo.jpg"
          alt="FINERA"
          width={40}
          height={40}
          className="opacity-30 hover:opacity-60 transition-opacity"
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 left-20 animate-pulse">
          <Sparkles
            className={`w-4 h-4 ${getBalanceStatus() === "excellent" ? "text-green-400/40" : "text-neon-yellow/30"}`}
          />
        </div>
        <div className="absolute bottom-4 left-4 animate-pulse delay-1000">
          <Sparkles
            className={`w-3 h-3 ${getBalanceStatus() === "critical" ? "text-red-400/40" : "text-neon-cyan/30"}`}
          />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500">
          <Sparkles className="w-2 h-2 text-neon-pink/30" />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div>
          <p className="text-foreground/80 text-sm">Total Balance</p>
          <div className="flex items-center gap-2">
            <h2
              className={`text-3xl font-bold bg-gradient-to-r ${theme.textColor} bg-clip-text text-transparent transition-all duration-300 ${isHovered ? "scale-105" : ""}`}
            >
              {showBalance ? `₹${balance.toLocaleString()}` : "₹••,•••"}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-foreground/60 hover:text-neon-cyan interactive-button"
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-foreground/60 mt-1 flex items-center gap-1">
            <theme.icon className="w-3 h-3" />
            {theme.message}
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-neon-green">
            <TrendingUp className="h-4 w-4 animate-pulse" />
            <span className="text-sm font-medium">+12.5%</span>
          </div>
          <p className="text-foreground/60 text-xs">This month</p>
        </div>
      </div>

      <div className="flex items-center justify-center mb-4">
        <FineraMascot balance={balance} context="home" />
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neon-cyan/20 relative z-10">
        <div className="group cursor-pointer">
          <p className="text-foreground/60 text-xs group-hover:text-neon-green transition-colors">Income</p>
          <p className="text-foreground font-semibold group-hover:scale-105 transition-transform">₹28,500</p>
        </div>
        <div className="group cursor-pointer">
          <p className="text-foreground/60 text-xs group-hover:text-neon-pink transition-colors">Expenses</p>
          <p className="text-foreground font-semibold group-hover:scale-105 transition-transform">₹14,350</p>
        </div>
      </div>
    </Card>
  )
}
