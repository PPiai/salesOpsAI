import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Singleton pattern para evitar múltiplas instâncias
let supabaseInstance: ReturnType<typeof createClient> | null = null

export const getSupabase = () => {
  if (!supabaseInstance && supabaseUrl && supabaseAnonKey) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseInstance
}

// Para compatibilidade com código existente
export const supabase = getSupabase()

// Tipos para autenticação
export type AuthUser = {
  id: string
  email?: string
  user_metadata?: Record<string, any>
}

// Helper para verificar se o usuário está autenticado
export const getCurrentUser = async () => {
  const client = getSupabase()
  if (!client) return null

  const {
    data: { user },
  } = await client.auth.getUser()
  return user
}

// Helper para logout
export const signOut = async () => {
  const client = getSupabase()
  if (!client) return { error: new Error("Supabase não configurado") }

  return await client.auth.signOut()
}
