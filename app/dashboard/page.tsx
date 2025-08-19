import { getUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import FlowiseChat from "@/components/flowise-chat"

export default async function DashboardPage() {
  const user = await getUser()

  // If no user, redirect to login
  if (!user) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Header preto com botão Sair */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-black z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <img
            src="https://lh3.googleusercontent.com/proxy/sirPhoJhvKS9Vi-8lHbzScplbpIF7P3yPWlGKkGs5M7ydL5XVpmt3v_4w8rUT0yR2cWX-3eWuwvzl7xVaIbn_PbnrbEt-mc=s88-w88-h88-c-k-no"
            alt="Sales Ops AI"
            className="w-8 h-8 rounded-full"
          />
          <h1 className="text-white font-semibold text-lg">Sales Ops AI</h1>
        </div>
        
        <form action={signOut}>
          <Button
            type="submit"
            variant="outline"
            size="sm"
            className="border-gray-700 text-gray-300 hover:bg-red-600 hover:text-white hover:border-red-600 bg-transparent backdrop-blur-sm"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </form>
      </div>

      {/* Chat ocupando toda a tela com margin-top para compensar o header */}
      <div className="w-full h-screen pt-16">
        <FlowiseChat />
      </div>
    </div>
  )
}
