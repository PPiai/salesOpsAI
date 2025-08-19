import { getUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import LoginForm from "@/components/login-form"

export default async function LoginPage() {
  const user = await getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="https://lh3.googleusercontent.com/proxy/sirPhoJhvKS9Vi-8lHbzScplbpIF7P3yPWlGKkGs5M7ydL5XVpmt3v_4w8rUT0yR2cWX-3eWuwvzl7xVaIbn_PbnrbEt-mc=s88-w88-h88-c-k-no"
            alt="Sales Ops AI"
            className="w-16 h-16 mx-auto mb-4 rounded-full"
          />
          <h1 className="text-3xl font-bold text-white mb-2">Sales Ops AI</h1>
          <p className="text-gray-400">Faça login para acessar seu assistente</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
