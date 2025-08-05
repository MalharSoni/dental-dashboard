"use client";

import React, { useEffect, useState } from 'react';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'answered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'missed':
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'scheduled':
      case 'voicemail':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto"></div>
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Appointments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalAppointments}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                {todayAppointments.filter(a => a.status === 'completed').length} completed
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* Calls Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Calls</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalCalls}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                {stats.missedCalls} missed
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{formatCurrency(stats.todayRevenue)}</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5% from yesterday
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        {/* AI Activity Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">AI Tasks Today</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.aiTasksToday}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                {stats.aiSuccessRate}% success rate
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Bot className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Calls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Calls</h2>
              <button 
                onClick={() => window.location.href = '/dashboard/call-logs'}
                className="text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 font-medium"
              >
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentCalls.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">No recent calls</p>
              ) : (
                recentCalls.map((call) => (
                  <div key={call.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {call.status === 'missed' ? (
                          <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
                            <PhoneOff className="h-5 w-5 text-red-600 dark:text-red-400" />
                          </div>
                        ) : call.status === 'voicemail' ? (
                          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                            <Voicemail className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                          </div>
                        ) : (
                          <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                            <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{call.caller_name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{call.phone_number}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(call.status)}`}>
                        {call.status}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatTime(call.timestamp)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Appointments</h2>
              <button 
                onClick={() => window.location.href = '/dashboard/appointments'}
                className="text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 font-medium"
              >
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {todayAppointments.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">No appointments today</p>
              ) : (
                todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {appointment.status === 'completed' ? (
                          <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                        ) : appointment.status === 'cancelled' ? (
                          <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
                            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                          </div>
                        ) : (
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{appointment.patient_name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.appointment_type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{appointment.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => window.location.href = '/dashboard/appointments'}
            className="inline-flex items-center px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Appointment
          </button>
          <button 
            onClick={() => window.location.href = '/dashboard/call-logs'}
            className="inline-flex items-center px-4 py-2 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg font-medium transition-colors"
          >
            <Phone className="mr-2 h-4 w-4" />
            View Call Logs
          </button>
          <button 
            onClick={() => window.location.href = '/dashboard/voicemails'}
            className="inline-flex items-center px-4 py-2 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg font-medium transition-colors relative"
          >
            <Voicemail className="mr-2 h-4 w-4" />
            Check Voicemails
            {stats.unreadVoicemails > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {stats.unreadVoicemails}
              </span>
            )}
          </button>
          <button 
            onClick={() => window.location.href = '/dashboard/ai-agents'}
            className="inline-flex items-center px-4 py-2 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg font-medium transition-colors"
          >
            <Bot className="mr-2 h-4 w-4" />
            AI Agents
          </button>
        </div>
      </div>
    </div>
  );
}