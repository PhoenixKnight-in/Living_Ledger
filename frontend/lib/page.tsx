import { HomeHeader } from "@/components/home-header"
import { BalanceCard } from "@/components/balance-card"
import { QuickActions } from "@/components/quick-actions"
import { FeatureCards } from "@/components/feature-cards"
import { RecentActivity } from "@/components/recent-activity"
import { FloatingMascot } from "@/components/mascot"
import { SmartFinancialCoach } from "@/components/smart-financial-coach"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <HomeHeader />
        <div className="space-y-6">
          <BalanceCard />
          <SmartFinancialCoach balance={42850} monthlyIncome={28500} monthlyExpenses={14350} savingsGoal={100000} />
          <QuickActions />
          <FeatureCards />
          <RecentActivity />
        </div>
      </div>
      <FloatingMascot />
    </div>
  )
}
