"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, RefreshCw, Sun, Moon, User, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { data: session } = authClient.useSession()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push('/login')
  }

  if (!mounted) {
    return null
  }

  const currentTime = new Date()
  const hour = currentTime.getHours()
  const greeting = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening'

  return (
    <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex-1 flex items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="ml-4 text-sm text-gray-500">
          Good {greeting}, Doctor
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme('light')}
            className={`p-1 h-8 w-8 ${theme === 'light' ? 'bg-white shadow-sm' : ''}`}
          >
            <Sun className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme('dark')}
            className={`p-1 h-8 w-8 ${theme === 'dark' ? 'bg-white shadow-sm' : ''}`}
          >
            <Moon className="h-4 w-4" />
          </Button>
        </div>

        {/* Notifications */}
        <Button variant="outline" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </Button>

        {/* Refresh */}
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                <AvatarFallback>
                  {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session?.user?.name || "Guest User"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.user?.email || ""}
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}