"use client";

import React from "react";
import { 
  LayoutDashboard, 
  Calendar, 
  Phone, 
  Voicemail, 
  Bot, 
  Settings,
  Bell,
  Search,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Appointments', href: '/dashboard/appointments', icon: Calendar },
  { name: 'Call Logs', href: '/dashboard/call-logs', icon: Phone },
  { name: 'Voicemails', href: '/dashboard/voicemails', icon: Voicemail },
  { name: 'AI Agents', href: '/dashboard/ai-agents', icon: Bot },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Modern Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 shadow-xl">
        {/* Logo Section */}
        <div className="flex items-center h-16 px-6 border-b border-gray-200/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">SmilePoint</h1>
              <p className="text-xs text-gray-500">Dental Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-700 hover:bg-gray-100/80 hover:text-blue-600'
                }`}
              >
                <item.icon 
                  className={`w-5 h-5 ${
                    isActive ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'
                  }`} 
                />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Dr. Smith</p>
                <p className="text-xs text-gray-500">Dental Practice</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 flex items-center justify-between px-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search patients, appointments..." 
                className="pl-10 w-80 bg-gray-50/50 border-gray-200/50"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <div className="max-w-7xl mx-auto animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}