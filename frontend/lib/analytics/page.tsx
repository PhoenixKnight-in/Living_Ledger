import { AnalyticsHeader } from "@/components/analytics/analytics-header"
import { SpendingOverview } from "@/components/analytics/spending-overview"
import { CategoryBreakdown } from "@/components/analytics/category-breakdown"
import { SpendingTrends } from "@/components/analytics/spending-trends"
import { PlayfulInsights } from "@/components/analytics/playful-insights"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <AnalyticsHeader />
        <div className="space-y-6">
          <SpendingOverview />
          <CategoryBreakdown />
          <SpendingTrends />
          <PlayfulInsights />
        </div>
      </div>
    </div>
  )
}
