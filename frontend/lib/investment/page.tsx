import { InvestmentHeader } from "@/components/investments/investment-header"
import { PortfolioOverview } from "@/components/investments/portfolio-overview"
import { AssetCategories } from "@/components/investments/asset-categories"
import { InvestmentInsights } from "@/components/investments/investment-insights"
import { TopPerformers } from "@/components/investments/top-performers"

export default function InvestmentsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <InvestmentHeader />
        <div className="space-y-6">
          <PortfolioOverview />
          <AssetCategories />
          <TopPerformers />
          <InvestmentInsights />
        </div>
      </div>
    </div>
  )
}
