import { PaymentHeader } from "@/components/payment/payment-header"
import { ContactsList } from "@/components/payment/contacts-list"
import { QuickSend } from "@/components/payment/quick-send"
import { FloatingMascot } from "@/components/mascot"

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <PaymentHeader />
        <div className="space-y-6">
          <QuickSend />
          <ContactsList />
        </div>
      </div>
      <FloatingMascot />
    </div>
  )
}
