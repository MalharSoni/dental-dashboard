"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  TrendingUp
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back! Here's what's happening at your practice today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Appointments Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAppointments}</div>
            <p className="text-xs text-muted-foreground">
              {todayAppointments.filter(a => a.status === 'completed').length} completed
            </p>
          </CardContent>
        </Card>

        {/* Calls Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCalls}</div>
            <p className="text-xs text-muted-foreground">
              {stats.missedCalls} missed
            </p>
          </CardContent>
        </Card>

        {/* Revenue Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.todayRevenue)}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from yesterday
            </p>
          </CardContent>
        </Card>

        {/* AI Activity Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Tasks Today</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.aiTasksToday}</div>
            <p className="text-xs text-muted-foreground">
              {stats.aiSuccessRate}% success rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Calls */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCalls.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No recent calls</p>
              ) : (
                recentCalls.map((call) => (
                  <div key={call.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      {call.status === 'missed' ? (
                        <PhoneOff className="h-5 w-5 text-red-500" />
                      ) : call.status === 'voicemail' ? (
                        <Voicemail className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <Phone className="h-5 w-5 text-green-500" />
                      )}
                      <div>
                        <p className="font-medium">{call.caller_name}</p>
                        <p className="text-sm text-gray-500">{call.phone_number}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm capitalize">{call.status}</span>
                      <p className="text-xs text-gray-500">{formatTime(call.timestamp)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Today's Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No appointments today</p>
              ) : (
                todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      {appointment.status === 'completed' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : appointment.status === 'cancelled' ? (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-blue-500" />
                      )}
                      <div>
                        <p className="font-medium">{appointment.patient_name}</p>
                        <p className="text-sm text-gray-500">{appointment.appointment_type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm capitalize">{appointment.status}</span>
                      <p className="text-xs text-gray-500">{appointment.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => window.location.href = '/dashboard/appointments'}>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Appointment
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/dashboard/call-logs'}>
              <Phone className="mr-2 h-4 w-4" />
              View Call Logs
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/dashboard/voicemails'}>
              <Voicemail className="mr-2 h-4 w-4" />
              Check Voicemails
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/dashboard/ai-agents'}>
              <Bot className="mr-2 h-4 w-4" />
              AI Agents
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}