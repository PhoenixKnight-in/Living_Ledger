import { ArrowLeft, Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function AnalyticsHeader() {
  return (
    <header className="space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-balance bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent">
              Financial Status
            </h1>
            <Image src="/finera-logo.jpg" alt="FINERA" width={20} height={20} className="opacity-50" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Calendar className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Showing data for</span>
        <span className="font-semibold text-foreground">December 2024</span>
      </div>
    </header>
  )
}
