"use client"

import { useActionState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, User, Lock, Loader2 } from "lucide-react"
import { signIn } from "@/lib/auth"
import { useState } from "react"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className="w-full h-11 font-medium transition-all duration-200 hover:scale-[1.02] bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Entrando...
        </>
      ) : (
        "Entrar"
      )}
    </Button>
  )
}

export default function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [state, formAction] = useActionState(signIn, null)

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard")
    }
  }, [state, router])

  return (
    <Card className="w-full shadow-xl border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
          Login
        </CardTitle>
        <CardDescription className="text-center text-gray-400">
          Digite suas credenciais para acessar o Sales Ops AI
        </CardDescription>
      </CardHeader>

      <form action={formAction}>
        <CardContent className="space-y-5">
          {state?.error && (
            <Alert variant="destructive" className="border-red-500/20 bg-red-500/10">
              <AlertDescription className="text-red-400">{state.error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium text-white">
              Usuário
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Digite seu usuário"
                className="pl-10 h-11 transition-all duration-200 focus:ring-2 focus:ring-red-500/20 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-white">
              Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                className="pl-10 pr-10 h-11 transition-all duration-200 focus:ring-2 focus:ring-red-500/20 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                required
                autoComplete="current-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-6">
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  )
}
