"use client"

import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FineraMascot } from "@/components/finera-mascot"
import Image from "next/image"

export function HomeHeader() {
  const balance = 42850

  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <FineraMascot balance={balance} className="scale-75" />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-balance bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              Good morning, Alex!
            </h1>
            <Image src="/finera-logo.jpg" alt="FINERA" width={24} height={24} className="opacity-60" />
          </div>
          <p className="text-muted-foreground text-sm">Ready to manage your FINERA finances?</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative interactive-button">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-neon-cyan rounded-full animate-neon-pulse"></span>
        </Button>
        <Button variant="ghost" size="icon" className="interactive-button">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
