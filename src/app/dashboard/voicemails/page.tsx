"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Voicemail, 
  Play, 
  Pause,
  Download,
  Search,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Volume2,
  MoreVertical
} from "lucide-react";

interface VoicemailMessage {
  id: string;
  caller_name: string;
  phone_number: string;
  duration: string;
  timestamp: string;
  status: 'new' | 'played' | 'archived';
  transcription: string;
  audio_url: string;
  priority: 'high' | 'medium' | 'low';
}

export default function VoicemailsPage() {
  const [voicemails, setVoicemails] = useState<VoicemailMessage[]>([]);
  const [filteredVoicemails, setFilteredVoicemails] = useState<VoicemailMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('today');
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    fetchVoicemails();
  }, []);

  useEffect(() => {
    filterVoicemails();
  }, [voicemails, searchTerm, statusFilter, dateFilter]);

  const fetchVoicemails = async () => {
    try {
      const res = await fetch('/api/voicemails');
      if (res.ok) {
        const data = await res.json();
        setVoicemails(data);
      } else {
        // Mock data for demo
        const mockData: VoicemailMessage[] = [
          {
            id: '1',
            caller_name: 'Sarah Johnson',
            phone_number: '+1 (555) 123-4567',
            duration: '2:45',
            timestamp: new Date().toISOString(),
            status: 'new',
            transcription: 'Hi, this is Sarah. I need to reschedule my appointment for tomorrow. Please call me back when you get a chance. Thank you!',
            audio_url: '/voicemails/sarah-johnson.mp3',
            priority: 'high'
          },
          {
            id: '2',
            caller_name: 'Michael Chen',
            phone_number: '+1 (555) 987-6543',
            duration: '1:30',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            status: 'played',
            transcription: 'Hello, I wanted to confirm my cleaning appointment next week. My number is 555-987-6543. Thanks.',
            audio_url: '/voicemails/michael-chen.mp3',
            priority: 'medium'
          },
          {
            id: '3',
            caller_name: 'Emma Wilson',
            phone_number: '+1 (555) 456-7890',
            duration: '0:55',
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            status: 'new',
            transcription: 'Hi, I have a dental emergency. Could someone please call me back as soon as possible?',
            audio_url: '/voicemails/emma-wilson.mp3',
            priority: 'high'
          }
        ];
        setVoicemails(mockData);
      }
    } catch (error) {
      console.error('Error fetching voicemails:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterVoicemails = () => {
    let filtered = [...voicemails];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(vm =>
        vm.caller_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vm.phone_number.includes(searchTerm) ||
        vm.transcription.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(vm => vm.status === statusFilter);
    }

    // Date filter (simplified for demo)
    if (dateFilter === 'today') {
      const today = new Date().toDateString();
      filtered = filtered.filter(vm => 
        new Date(vm.timestamp).toDateString() === today
      );
    }

    setFilteredVoicemails(filtered);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-gradient-to-br from-blue-500 to-cyan-500';
      case 'played':
        return 'bg-gradient-to-br from-green-500 to-emerald-500';
      case 'archived':
        return 'bg-gradient-to-br from-gray-500 to-gray-600';
      default:
        return 'bg-gradient-to-br from-gray-500 to-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const togglePlayback = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  const markAsPlayed = (id: string) => {
    setVoicemails(prev => prev.map(vm => 
      vm.id === id ? { ...vm, status: 'played' } : vm
    ));
  };

  const stats = {
    total: filteredVoicemails.length,
    new: filteredVoicemails.filter(vm => vm.status === 'new').length,
    played: filteredVoicemails.filter(vm => vm.status === 'played').length,
    archived: filteredVoicemails.filter(vm => vm.status === 'archived').length,
    highPriority: filteredVoicemails.filter(vm => vm.priority === 'high').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading voicemails...</p>
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
              Voice<span className="text-gradient">mails</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Manage and review patient voicemail messages
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
            <CardTitle className="text-sm font-semibold text-gray-600">Total Messages</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Voicemail className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <p className="text-sm text-green-600 font-medium">+5% this week</p>
            </div>
          </CardContent>
        </div>

        <div className="card-modern group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-gray-600">New Messages</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
              <Volume2 className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.new}</div>
            <p className="text-sm text-orange-600 font-medium">Requires attention</p>
          </CardContent>
        </div>

        <div className="card-modern group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-gray-600">Played</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.played}</div>
            <p className="text-sm text-gray-500">{stats.total > 0 ? Math.round((stats.played / stats.total) * 100) : 0}% processed</p>
          </CardContent>
        </div>

        <div className="card-modern group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-gray-600">High Priority</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.highPriority}</div>
            <p className="text-sm text-red-500 font-medium">Urgent responses needed</p>
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
                  placeholder="Search by name, phone, or transcription..."
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
              <option value="new">New</option>
              <option value="played">Played</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </CardContent>
      </div>

      {/* Voicemails List */}
      <div className="card-modern">
        <CardHeader className="border-b border-gray-100/50">
          <CardTitle className="text-xl font-bold text-gray-900">Recent Voicemails</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredVoicemails.length === 0 ? (
            <div className="text-center py-16">
              <Voicemail className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg">No voicemails found</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100/50">
              {filteredVoicemails.map((vm) => (
                <div key={vm.id} className="p-6 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-cyan-50/30 transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${getStatusColor(vm.status)}`}>
                        <Voicemail className="h-6 w-6 text-white" />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-gray-900 text-lg">{vm.caller_name}</h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold capitalize ${getPriorityColor(vm.priority)}`}>
                            {vm.priority}
                          </span>
                        </div>
                        <p className="text-gray-500 mb-2">{vm.phone_number}</p>
                        <div className="flex items-center gap-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                            vm.status === 'new' ? 'status-info' :
                            vm.status === 'played' ? 'status-success' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {vm.status}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDuration(vm.duration)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-3">{formatTime(vm.timestamp)}</p>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="rounded-lg"
                          onClick={() => {
                            togglePlayback(vm.id);
                            if (vm.status === 'new') markAsPlayed(vm.id);
                          }}
                        >
                          {playingId === vm.id ? (
                            <Pause className="h-3 w-3 mr-1" />
                          ) : (
                            <Play className="h-3 w-3 mr-1" />
                          )}
                          {playingId === vm.id ? 'Pause' : 'Play'}
                        </Button>
                        <Button size="sm" variant="ghost" className="rounded-lg p-2">
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Transcription */}
                  <div className="ml-18 bg-gradient-to-r from-gray-50/80 to-blue-50/30 rounded-xl p-4 border border-gray-100/50">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-semibold text-gray-700">Transcription</h4>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Volume2 className="h-3 w-3" />
                        AI Generated
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{vm.transcription}</p>
                  </div>

                  {/* Audio Player (Mock) */}
                  {playingId === vm.id && (
                    <div className="ml-18 mt-4 bg-white rounded-xl p-4 border border-blue-200/50 shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 relative overflow-hidden">
                          <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse" style={{width: '35%'}}></div>
                        </div>
                        <span className="text-xs font-mono text-gray-500">0:45 / {vm.duration}</span>
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