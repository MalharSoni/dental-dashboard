"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Phone, 
  DollarSign, 
  PhoneOff, 
  Voicemail,
  Bot,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Activity
} from "lucide-react";

interface DashboardStats {
  totalAppointments: number;
  totalCalls: number;
  missedCalls: number;
  todayRevenue: number;
  unreadVoicemails: number;
  activeAIAgents: number;
  aiTasksToday: number;
  aiSuccessRate: number;
}

interface CallLog {
  id: string;
  caller_name: string;
  phone_number: string;
  call_type: 'incoming' | 'outgoing' | 'missed';
  duration: string;
  timestamp: string;
  status: 'answered' | 'missed' | 'voicemail';
  notes: string;
}

interface Appointment {
  id: string;
  patient_name: string;
  phone_number: string;
  appointment_type: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAppointments: 0,
    totalCalls: 0,
    missedCalls: 0,
    todayRevenue: 0,
    unreadVoicemails: 0,
    activeAIAgents: 0,
    aiTasksToday: 0,
    aiSuccessRate: 0
  });
  const [recentCalls, setRecentCalls] = useState<CallLog[]>([]);
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard stats
      const statsRes = await fetch('/api/dashboard/stats');
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      // Fetch recent calls
      const callsRes = await fetch('/api/call-logs?limit=5');
      if (callsRes.ok) {
        const callsData = await callsRes.json();
        setRecentCalls(callsData);
      }

      // Fetch today's appointments
      const today = new Date().toISOString().split('T')[0];
      const appointmentsRes = await fetch(`/api/appointments?date=${today}`);
      if (appointmentsRes.ok) {
        const appointmentsData = await appointmentsRes.json();
        setTodayAppointments(appointmentsData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Good morning, <span className="text-gradient">Dr. Smith</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Here&apos;s what&apos;s happening at your practice today
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-gray-500">SmilePoint Dental</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-grid">
        {/* Appointments Card */}
        <div className="card-modern group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-gray-600">Today&apos;s Appointments</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalAppointments}</div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <p className="text-sm text-green-600 font-medium">+12% from yesterday</p>
            </div>
          </CardContent>
        </div>

        {/* Calls Card */}
        <div className="card-modern group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-gray-600">Total Calls</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Phone className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalCalls}</div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              <p className="text-sm text-orange-600 font-medium">{stats.missedCalls} missed calls</p>
            </div>
          </CardContent>
        </div>

        {/* Revenue Card */}
        <div className="card-modern group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-gray-600">Today&apos;s Revenue</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-gray-900 mb-1">{formatCurrency(stats.todayRevenue)}</div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <p className="text-sm text-green-600 font-medium">+8.2% from last week</p>
            </div>
          </CardContent>
        </div>

        {/* AI Activity Card */}
        <div className="card-modern group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-gray-600">AI Tasks Today</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.aiTasksToday}</div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-500" />
              <p className="text-sm text-green-600 font-medium">{stats.aiSuccessRate}% success rate</p>
            </div>
          </CardContent>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Calls */}
        <div className="card-modern">
          <CardHeader className="border-b border-gray-100/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-900">Recent Calls</CardTitle>
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentCalls.length === 0 ? (
                <div className="text-center py-12">
                  <Phone className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">No recent calls</p>
                </div>
              ) : (
                recentCalls.map((call) => (
                  <div key={call.id} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50/80 to-white hover:from-blue-50/80 hover:to-cyan-50/80 transition-all duration-200 border border-gray-100/50">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        call.status === 'missed' 
                          ? 'bg-gradient-to-br from-red-500 to-pink-500' 
                          : call.status === 'voicemail'
                          ? 'bg-gradient-to-br from-yellow-500 to-orange-500'
                          : 'bg-gradient-to-br from-green-500 to-emerald-500'
                      }`}>
                        {call.status === 'missed' ? (
                          <PhoneOff className="h-5 w-5 text-white" />
                        ) : call.status === 'voicemail' ? (
                          <Voicemail className="h-5 w-5 text-white" />
                        ) : (
                          <Phone className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{call.caller_name}</p>
                        <p className="text-sm text-gray-500">{call.phone_number}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        call.status === 'answered' ? 'status-success' :
                        call.status === 'missed' ? 'status-error' : 'status-warning'
                      }`}>
                        {call.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{formatTime(call.timestamp)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </div>

        {/* Today's Appointments */}
        <div className="card-modern">
          <CardHeader className="border-b border-gray-100/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-900">Today&apos;s Schedule</CardTitle>
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {todayAppointments.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">No appointments scheduled</p>
                </div>
              ) : (
                todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50/80 to-white hover:from-blue-50/80 hover:to-cyan-50/80 transition-all duration-200 border border-gray-100/50">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        appointment.status === 'completed' 
                          ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                          : appointment.status === 'cancelled'
                          ? 'bg-gradient-to-br from-red-500 to-pink-500'
                          : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                      }`}>
                        {appointment.status === 'completed' ? (
                          <CheckCircle2 className="h-5 w-5 text-white" />
                        ) : appointment.status === 'cancelled' ? (
                          <AlertCircle className="h-5 w-5 text-white" />
                        ) : (
                          <Clock className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{appointment.patient_name}</p>
                        <p className="text-sm text-gray-500">{appointment.appointment_type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        appointment.status === 'completed' ? 'status-success' :
                        appointment.status === 'cancelled' ? 'status-error' : 'status-info'
                      }`}>
                        {appointment.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{appointment.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card-modern">
        <CardHeader className="border-b border-gray-100/50">
          <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              onClick={() => window.location.href = '/dashboard/appointments'}
              className="btn-primary h-14 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              <Calendar className="mr-3 h-5 w-5" />
              <div className="text-left">
                <p className="font-semibold">Schedule</p>
                <p className="text-xs opacity-90">New Appointment</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/dashboard/call-logs'}
              className="h-14 rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
            >
              <Phone className="mr-3 h-5 w-5" />
              <div className="text-left">
                <p className="font-semibold">Call Logs</p>
                <p className="text-xs opacity-70">View History</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/dashboard/voicemails'}
              className="h-14 rounded-xl border-yellow-200 text-yellow-600 hover:bg-yellow-50 hover:border-yellow-300 relative"
            >
              <Voicemail className="mr-3 h-5 w-5" />
              <div className="text-left">
                <p className="font-semibold">Voicemails</p>
                <p className="text-xs opacity-70">Check Messages</p>
              </div>
              {stats.unreadVoicemails > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {stats.unreadVoicemails}
                </span>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/dashboard/ai-agents'}
              className="h-14 rounded-xl border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300"
            >
              <Bot className="mr-3 h-5 w-5" />
              <div className="text-left">
                <p className="font-semibold">AI Agents</p>
                <p className="text-xs opacity-70">View Activity</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </div>
    </div>
  );
}