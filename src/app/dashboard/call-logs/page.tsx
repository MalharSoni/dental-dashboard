"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Phone, 
  PhoneOff, 
  PhoneCall,
  Search,
  Download,
  Play,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

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

export default function CallLogsPage() {
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('today');

  useEffect(() => {
    fetchCallLogs();
  }, []);

  useEffect(() => {
    filterLogs();
  }, [callLogs, searchTerm, statusFilter, dateFilter]);

  const fetchCallLogs = async () => {
    try {
      const res = await fetch('/api/call-logs');
      if (res.ok) {
        const data = await res.json();
        setCallLogs(data);
      }
    } catch (error) {
      console.error('Error fetching call logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterLogs = () => {
    let filtered = [...callLogs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.caller_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.phone_number.includes(searchTerm)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(log => log.status === statusFilter);
    }

    // Date filter (simplified for demo)
    if (dateFilter === 'today') {
      const today = new Date().toDateString();
      filtered = filtered.filter(log => 
        new Date(log.timestamp).toDateString() === today
      );
    }

    setFilteredLogs(filtered);
  };

  const formatDuration = (duration: string) => {
    return duration || '0:00';
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string, callType: string) => {
    if (status === 'missed') {
      return <PhoneOff className="h-5 w-5 text-white" />;
    } else if (callType === 'outgoing') {
      return <PhoneCall className="h-5 w-5 text-white" />;
    } else {
      return <Phone className="h-5 w-5 text-white" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered':
        return 'bg-gradient-to-br from-green-500 to-emerald-500';
      case 'missed':
        return 'bg-gradient-to-br from-red-500 to-pink-500';
      case 'voicemail':
        return 'bg-gradient-to-br from-yellow-500 to-orange-500';
      default:
        return 'bg-gradient-to-br from-gray-500 to-gray-600';
    }
  };

  const stats = {
    total: filteredLogs.length,
    answered: filteredLogs.filter(log => log.status === 'answered').length,
    missed: filteredLogs.filter(log => log.status === 'missed').length,
    voicemails: filteredLogs.filter(log => log.status === 'voicemail').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading call logs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Call <span className="text-gradient">Logs</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Track and analyze all your practice communications
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-grid">
        <div className="card-modern group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-gray-600">Total Calls</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Phone className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <p className="text-sm text-green-600 font-medium">+15% this week</p>
            </div>
          </CardContent>
        </div>

        <div className="card-modern group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-gray-600">Answered</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.answered}</div>
            <p className="text-sm text-gray-500">{stats.total > 0 ? Math.round((stats.answered / stats.total) * 100) : 0}% success rate</p>
          </CardContent>
        </div>

        <div className="card-modern group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-gray-600">Missed</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.missed}</div>
            <p className="text-sm text-red-500 font-medium">Requires attention</p>
          </CardContent>
        </div>

        <div className="card-modern group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-gray-600">Voicemails</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Play className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.voicemails}</div>
            <p className="text-sm text-yellow-600 font-medium">Pending review</p>
          </CardContent>
        </div>
      </div>

      {/* Filters */}
      <div className="card-modern">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by name or phone number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl border-gray-200/50 bg-gray-50/50"
                />
              </div>
            </div>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200/50 bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200/50 bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="answered">Answered</option>
              <option value="missed">Missed</option>
              <option value="voicemail">Voicemail</option>
            </select>
          </div>
        </CardContent>
      </div>

      {/* Call Logs List */}
      <div className="card-modern">
        <CardHeader className="border-b border-gray-100/50">
          <CardTitle className="text-xl font-bold text-gray-900">Recent Calls</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-16">
              <Phone className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg">No call logs found</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100/50">
              {filteredLogs.map((log) => (
                <div key={log.id} className="p-6 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-cyan-50/30 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${getStatusColor(log.status)}`}>
                        {getStatusIcon(log.status, log.call_type)}
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{log.caller_name}</h3>
                        <p className="text-gray-500">{log.phone_number}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                            log.status === 'answered' ? 'status-success' :
                            log.status === 'missed' ? 'status-error' : 'status-warning'
                          }`}>
                            {log.status}
                          </span>
                          <span className="text-xs text-gray-500 capitalize">
                            {log.call_type} call
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2 text-gray-500 mb-2">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">{formatDuration(log.duration)}</span>
                      </div>
                      <p className="text-sm text-gray-500">{formatTime(log.timestamp)}</p>
                      {log.status === 'voicemail' && (
                        <Button size="sm" variant="outline" className="mt-2 rounded-lg">
                          <Play className="h-3 w-3 mr-1" />
                          Play
                        </Button>
                      )}
                    </div>
                  </div>

                  {log.notes && (
                    <div className="mt-4 pl-18">
                      <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-100">
                        <p className="text-sm text-gray-700">{log.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </div>
    </div>
  );
}