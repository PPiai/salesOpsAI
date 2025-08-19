"use server"

import { createClient } from "./supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function authenticateUser(username: string, password: string) {
  // Usuário de teste: admin / 123456
  if (username === "admin" && password === "123456") {
    const cookieStore = cookies()
    cookieStore.set("user_session", JSON.stringify({ id: 1, username: "admin" }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    })
    return { success: true, user: { id: 1, username: "admin" } }
  }

  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("users")
      .select("id, username, password_hash")
      .eq("username", username)
      .single()

    if (error || !data) {
      return { success: false, error: "Usuário ou senha inválidos" }
    }

    if (data.password_hash === password) {
      const cookieStore = cookies()
      cookieStore.set("user_session", JSON.stringify({ id: data.id, username: data.username }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 dias
      })
      return { success: true, user: data }
    }
  } catch (error) {
    console.log("[v0] Erro na autenticação Supabase:", error)
  }

  return { success: false, error: "Usuário ou senha inválidos" }
}

export async function signIn(prevState: any, formData: FormData) {
  const username = formData.get("username")?.toString()
  const password = formData.get("password")?.toString()

  if (!username || !password) {
    return { error: "Usuário e senha são obrigatórios" }
  }

  const result = await authenticateUser(username, password)

  if (result.success) {
    redirect("/dashboard")
  }

  return { error: result.error }
}

export async function signOut() {
  const cookieStore = cookies()
  cookieStore.delete("user_session")
  redirect("/login")
}

export async function getUser() {
  const cookieStore = cookies()
  const session = cookieStore.get("user_session")

  if (!session) {
    return null
  }

  try {
    return JSON.parse(session.value)
  } catch {
    return null
  }
}
