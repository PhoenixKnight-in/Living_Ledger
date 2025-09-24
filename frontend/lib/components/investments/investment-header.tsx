import { ArrowLeft, TrendingUp, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function InvestmentHeader() {
  return (
    <header className="space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-balance">Investments</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="animate-pulse-glow">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1 text-success">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">Live</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Last updated:</span>
        <span className="font-semibold text-foreground">2 minutes ago</span>
      </div>
    </header>
  )
}
