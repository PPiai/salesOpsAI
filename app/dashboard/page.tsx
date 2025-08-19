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
      {/* Botão Sair posicionado onde você marcou */}
      <div className="fixed top-14 right-4 z-[1001]">
        <form action={signOut}>
          <Button
            type="submit"
            variant="outline"
            size="sm"
            className="border-gray-700 text-white-300 hover:bg-red-600 hover:text-red hover:border-red-600 bg-black backdrop-blur-sm"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </form>
      </div>

      <div className="w-full h-screen">
        <FlowiseChat />
      </div>
    </div>
  )
}
