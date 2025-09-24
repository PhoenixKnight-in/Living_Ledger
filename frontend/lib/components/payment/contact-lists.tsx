"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Zap, Heart, Crown } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export function ContactsList() {
  const [hoveredContact, setHoveredContact] = useState<number | null>(null)

  const [favorites] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      phone: "+91 98765 43210",
      avatar: "/diverse-woman-portrait.png",
      initials: "SJ",
      lastPaid: "Coffee ☕",
      gradient: "from-neon-pink/20 to-neon-purple/20",
      borderColor: "border-neon-pink/30",
    },
    {
      id: 2,
      name: "Mom",
      phone: "+91 98765 43211",
      avatar: "/loving-mother.png",
      initials: "M",
      lastPaid: "Groceries 🛒",
      gradient: "from-neon-green/20 to-neon-cyan/20",
      borderColor: "border-neon-green/30",
    },
    {
      id: 3,
      name: "Raj Patel",
      phone: "+91 98765 43212",
      avatar: "/man.jpg",
      initials: "RP",
      lastPaid: "Lunch 🍽️",
      gradient: "from-neon-yellow/20 to-neon-green/20",
      borderColor: "border-neon-yellow/30",
    },
  ])

  const [recentContacts] = useState([
    {
      id: 4,
      name: "Priya Sharma",
      phone: "+91 98765 43213",
      avatar: "/diverse-woman-portrait.png",
      initials: "PS",
      lastPaid: "Movie 🎬",
      gradient: "from-neon-cyan/10 to-neon-purple/10",
    },
    {
      id: 5,
      name: "Alex Kumar",
      phone: "+91 98765 43214",
      avatar: "/man.jpg",
      initials: "AK",
      lastPaid: "Dinner 🍕",
      gradient: "from-neon-purple/10 to-neon-pink/10",
    },
    {
      id: 6,
      name: "Lisa Chen",
      phone: "+91 98765 43215",
      avatar: "/diverse-woman-portrait.png",
      initials: "LC",
      lastPaid: "Uber 🚗",
      gradient: "from-neon-green/10 to-neon-cyan/10",
    },
    {
      id: 7,
      name: "Mike Wilson",
      phone: "+91 98765 43216",
      avatar: "/man.jpg",
      initials: "MW",
      lastPaid: "Gaming 🎮",
      gradient: "from-neon-yellow/10 to-neon-green/10",
    },
  ])

  return (
    <div className="space-y-6">
      {/* Favorites */}
      <Card className="p-4 bg-gradient-to-br from-card to-muted/20 border-2 border-transparent hover:border-neon-cyan/20 transition-all duration-300">
        <div className="flex items-center gap-2 mb-4">
          <Star className="h-5 w-5 text-neon-yellow fill-neon-yellow" />
          <h3 className="font-semibold bg-gradient-to-r from-neon-yellow to-neon-green bg-clip-text text-transparent">
            Favorites
          </h3>
          <Crown className="h-4 w-4 text-neon-yellow animate-pulse" />
        </div>
        <div className="space-y-3">
          {favorites.map((contact, index) => (
            <Link key={contact.id} href={`/payment/send/${contact.id}`}>
              <div
                className={`flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r ${contact.gradient} hover:scale-[1.02] transition-all duration-300 cursor-pointer group border-2 ${contact.borderColor} relative overflow-hidden`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredContact(contact.id)}
                onMouseLeave={() => setHoveredContact(null)}
              >
                <Avatar className="h-12 w-12 ring-2 ring-neon-cyan/30 group-hover:ring-neon-cyan/60 transition-all duration-300 group-hover:scale-110">
                  <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                  <AvatarFallback className="bg-gradient-to-br from-neon-cyan to-neon-purple text-white font-semibold">
                    {contact.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <p className="font-semibold group-hover:text-neon-cyan transition-colors">{contact.name}</p>
                  <p className="text-muted-foreground text-sm">Last: {contact.lastPaid}</p>
                </div>

                <Button
                  size="sm"
                  className="rounded-full bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple interactive-button shadow-lg"
                >
                  Pay
                </Button>

                {hoveredContact === contact.id && (
                  <div className="absolute top-2 right-2">
                    <Zap className="h-3 w-3 text-neon-cyan animate-pulse" />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Card>

      {/* Recent Contacts */}
      <Card className="p-4 bg-gradient-to-br from-card to-muted/20 border-2 border-transparent hover:border-neon-purple/20 transition-all duration-300">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="h-5 w-5 text-neon-pink" />
          <h3 className="font-semibold bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
            Recent Contacts
          </h3>
        </div>
        <div className="space-y-3">
          {recentContacts.map((contact, index) => (
            <Link key={contact.id} href={`/payment/send/${contact.id}`}>
              <div
                className={`flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r ${contact.gradient} hover:scale-[1.01] transition-all duration-300 cursor-pointer group border border-transparent hover:border-neon-purple/30`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Avatar className="h-10 w-10 group-hover:scale-105 transition-transform duration-300">
                  <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                  <AvatarFallback className="bg-muted text-muted-foreground font-semibold group-hover:bg-neon-purple/20 group-hover:text-neon-purple transition-colors">
                    {contact.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <p className="font-medium group-hover:text-neon-purple transition-colors">{contact.name}</p>
                  <p className="text-muted-foreground text-xs">Last: {contact.lastPaid}</p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-transparent border-neon-purple/30 hover:bg-neon-purple/10 hover:border-neon-purple interactive-button"
                >
                  Send
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  )
}
