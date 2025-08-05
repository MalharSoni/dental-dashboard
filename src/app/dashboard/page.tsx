"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Phone, 
  Users, 
  DollarSign, 
  PhoneOff, 
  Voicemail,
  Bot,
  CheckCircle2,
  Clock,
  AlertCircle
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'answered':
        return 'bg-green-100 text-green-800';
      case 'missed':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'scheduled':
      case 'voicemail':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Here's what's happening at your practice today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCalls}</div>
            <p className="text-xs text-muted-foreground">
              {stats.missedCalls} missed calls
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.todayRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              From completed appointments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Agent Activity</CardTitle>
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
            <CardTitle className="flex items-center justify-between">
              Recent Calls
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/call-logs'}>
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCalls.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No recent calls</p>
              ) : (
                recentCalls.map((call) => (
                  <div key={call.id} className="flex items-center justify-between">
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
                      <Badge className={getStatusColor(call.status)}>
                        {call.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{formatTime(call.timestamp)}</p>
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
            <CardTitle className="flex items-center justify-between">
              Today's Appointments
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/appointments'}>
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No appointments today</p>
              ) : (
                todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between">
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
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{appointment.time}</p>
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
            <Button onClick={() => window.location.href = '/appointments'}>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Appointment
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/call-logs'}>
              <Phone className="mr-2 h-4 w-4" />
              View Call Logs
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/voicemails'}>
              <Voicemail className="mr-2 h-4 w-4" />
              Check Voicemails
              {stats.unreadVoicemails > 0 && (
                <Badge className="ml-2 bg-red-500">{stats.unreadVoicemails}</Badge>
              )}
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/ai-agents'}>
              <Bot className="mr-2 h-4 w-4" />
              AI Agents
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}