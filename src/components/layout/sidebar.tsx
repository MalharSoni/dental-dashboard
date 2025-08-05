"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Calendar, 
  Phone, 
  Voicemail, 
  Bot,
  Settings
} from "lucide-react"

const navigation = [
  {
    name: "Overview",
    href: "/overview",
    icon: LayoutDashboard,
  },
  {
    name: "Appointments",
    href: "/appointments", 
    icon: Calendar,
  },
  {
    name: "Call Logs",
    href: "/call-logs",
    icon: Phone,
  },
  {
    name: "Voicemails", 
    href: "/voicemails",
    icon: Voicemail,
  },
  {
    name: "AI Agents",
    href: "/ai-agents",
    icon: Bot,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-white text-lg font-bold">🦷</span>
          </div>
          <div className="ml-3">
            <h1 className="text-xl font-bold text-gray-900">SmilePoint</h1>
            <p className="text-sm text-gray-500">Dental Practice</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-primary/10 text-primary border-r-4 border-primary"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn(
                  "mr-4 h-5 w-5 flex-shrink-0",
                  isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-500"
                )}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="flex-shrink-0 border-t border-gray-200 p-4">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-white">DR</span>
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Dr. Sarah Johnson
            </p>
            <p className="text-xs text-gray-500 truncate">Senior Dentist</p>
          </div>
          <div className="flex-shrink-0">
            <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}