import { ArrowLeft, Settings, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function LimitsHeader() {
  return (
    <header className="space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-balance">Spending Limits</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Plus className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Stay on track with your</span>
        <span className="font-semibold text-foreground">financial goals</span>
      </div>
    </header>
  )
}
