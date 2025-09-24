"use client"

import { Card } from "@/components/ui/card"
import { CreditCard, PieChart, TrendingUp, Target, Zap, BookOpen } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function FeatureCards() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const features = [
    {
      icon: CreditCard,
      title: "Payments",
      description: "Send money to contacts",
      gradient: "from-neon-purple/20 to-neon-pink/20",
      iconColor: "text-neon-purple",
      href: "/payment",
      emoji: "💳",
      stats: "12 sent today",
    },
    {
      icon: PieChart,
      title: "Analytics",
      description: "Track your spending",
      gradient: "from-neon-green/20 to-neon-cyan/20",
      iconColor: "text-neon-green",
      href: "/analytics",
      emoji: "📊",
      stats: "↗️ 15% saved",
    },
    {
      icon: TrendingUp,
      title: "Investments",
      description: "Grow your wealth",
      gradient: "from-neon-yellow/20 to-neon-green/20",
      iconColor: "text-neon-yellow",
      href: "/investments",
      emoji: "📈",
      stats: "+₹2,340 today",
    },
    {
      icon: Target,
      title: "Goals",
      description: "Set spending limits",
      gradient: "from-neon-cyan/20 to-neon-purple/20",
      iconColor: "text-neon-cyan",
      href: "/limits",
      emoji: "🎯",
      stats: "3 goals active",
    },
    {
      icon: BookOpen,
      title: "My Diary",
      description: "Personal spending story",
      gradient: "from-neon-pink/20 to-neon-yellow/20",
      iconColor: "text-neon-pink",
      href: "/diary",
      emoji: "📖",
      stats: "8 categories tracked",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {features.slice(0, 4).map((feature, index) => (
        <Link key={feature.title} href={feature.href}>
          <Card
            className={`p-4 card-hover cursor-pointer bg-gradient-to-br ${feature.gradient} border-2 border-transparent hover:border-neon-cyan/30 relative overflow-hidden group`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onMouseEnter={() => setHoveredCard(feature.title)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Zap className="h-3 w-3 text-neon-cyan animate-pulse" />
            </div>

            <div
              className={`${feature.iconColor} p-3 rounded-xl w-fit mb-3 bg-card/50 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}
            >
              <feature.icon className="h-6 w-6" />
            </div>

            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold group-hover:text-neon-cyan transition-colors">{feature.title}</h3>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm">{feature.emoji}</span>
            </div>

            <p className="text-muted-foreground text-sm mb-2">{feature.description}</p>

            <div
              className={`text-xs font-medium ${feature.iconColor} opacity-0 group-hover:opacity-100 transition-opacity`}
            >
              {feature.stats}
            </div>

            {hoveredCard === feature.title && (
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-neon-purple/5 pointer-events-none" />
            )}
          </Card>
        </Link>
      ))}

      <div className="col-span-2">
        <Link href={features[4].href}>
          <Card
            className={`p-4 card-hover cursor-pointer bg-gradient-to-r ${features[4].gradient} border-2 border-transparent hover:border-neon-pink/30 relative overflow-hidden group`}
            onMouseEnter={() => setHoveredCard(features[4].title)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center gap-4">
              <div
                className={`${features[4].iconColor} p-3 rounded-xl bg-card/50 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}
              >
                <BookOpen className="h-6 w-6" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold group-hover:text-neon-pink transition-colors">{features[4].title}</h3>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                    {features[4].emoji}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">{features[4].description}</p>
              </div>

              <div
                className={`text-xs font-medium ${features[4].iconColor} opacity-0 group-hover:opacity-100 transition-opacity`}
              >
                {features[4].stats}
              </div>
            </div>

            {hoveredCard === features[4].title && (
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/5 to-neon-yellow/5 pointer-events-none" />
            )}
          </Card>
        </Link>
      </div>
    </div>
  )
}
