import { SendMoneyForm } from "@/components/payment/send-money-form"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SendMoneyPage({ params }: { params: { id: string } }) {
  // Mock contact data - in real app this would come from API
  const contact = {
    id: params.id,
    name: "Sarah Johnson",
    avatar: "/diverse-woman-portrait.png",
    initials: "SJ",
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <header className="flex items-center gap-4 mb-8">
          <Link href="/payment">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-balance">Send to {contact.name}</h1>
        </header>

        <SendMoneyForm contact={contact} />
      </div>
    </div>
  )
}
