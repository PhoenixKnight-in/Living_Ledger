"use client"

import { ArrowLeft, Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mascot } from "@/components/mascot"
import Link from "next/link"
import { useState } from "react"

export function PaymentHeader() {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="interactive-button">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-balance bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
            Send Money
          </h1>
        </div>
        <Mascot mood="excited" size="sm" position="right" />
      </div>

      <div className="relative">
        <Search
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors ${
            searchFocused ? "text-neon-cyan" : "text-muted-foreground"
          }`}
        />
        <Input
          placeholder="Search contacts..."
          className={`pl-10 rounded-2xl border-2 transition-all duration-300 bg-card/50 backdrop-blur-sm ${
            searchFocused ? "border-neon-cyan shadow-lg shadow-neon-cyan/20" : "border-border hover:border-neon-cyan/50"
          }`}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        {searchFocused && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Sparkles className="h-4 w-4 text-neon-cyan animate-pulse" />
          </div>
        )}
      </div>
    </header>
  )
}
