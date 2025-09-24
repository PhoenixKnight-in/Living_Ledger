import { LimitsHeader } from "@/components/limits/limits-header"
import { SpendingLimits } from "@/components/limits/spending-limits"
import { OccasionBudgets } from "@/components/limits/occasion-budgets"
import { SmartMessages } from "@/components/limits/smart-messages"
import { QuickActions as LimitActions } from "@/components/limits/limit-actions"

export default function LimitsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <LimitsHeader />
        <div className="space-y-6">
          <SpendingLimits />
          <OccasionBudgets />
          <SmartMessages />
          <LimitActions />
        </div>
      </div>
    </div>
  )
}
