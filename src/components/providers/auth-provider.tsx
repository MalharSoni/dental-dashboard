"use client"

import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={router.push}
      Link={Link}
    >
      {children}
    </AuthUIProvider>
  )
}