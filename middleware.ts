import { NextResponse, type NextRequest } from "next/server"
import { getUser } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const user = await getUser()

  // Proteger rota do dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard") && !user) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Redirecionar usuários logados da página de login
  if (request.nextUrl.pathname === "/" && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
