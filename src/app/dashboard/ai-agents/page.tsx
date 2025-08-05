"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Bot, 
  Settings, 
  Activity, 
  Zap, 
  MessageSquare, 
  Phone, 
  Calendar, 
  Users,
  Search,
  Plus,
  TrendingUp,
  Clock,
  BrainCircuit,
  Sparkles,
  Target,
  Gauge
} from "lucide-react";

interface AIAgent {
  id: string;
  name: string;
  type: 'reception' | 'call_handler' | 'scheduler' | 'patient_care' | 'analytics';
  status: 'active' | 'training' | 'paused' | 'error';
  description: string;
  tasks_today: number;
  success_rate: number;
  avg_response_time: string;
  last_activity: string;
  capabilities: string[];
  metrics: {
    messages_handled?: number;
    calls_handled?: number;
    appointments_scheduled?: number;
    care_instructions_sent?: number;
    satisfaction_score?: number;
  };
}

interface AIActivity {
  id: string;
  agent_name: string;
  task_description: string;
  status: 'success' | 'error' | 'pending';
  timestamp: string;
  duration?: string;
}

export default function AIAgentsPage() {
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [activity, setActivity] = useState<AIActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAIData();
  }, []);

  const fetchAIData = async () => {
    try {
      // Mock data for demo - replace with actual API calls
      const mockAgents: AIAgent[] = [
        {
          id: '1',
          name: 'Reception Assistant',
          type: 'reception',
          status: 'active',
          description: 'Handles patient inquiries, appointment scheduling, and basic information requests via chat and phone.',
          tasks_today: 47,
          success_rate: 98,
          avg_response_time: '1.2s',
          last_activity: '2 minutes ago',
          capabilities: ['Chat Support', 'Appointment Booking', 'FAQ Responses', 'Basic Triage'],
          metrics: {
            messages_handled: 47,
            satisfaction_score: 4.8
          }
        },
        {
          id: '2',
          name: 'Call Handler Pro',
          type: 'call_handler',
          status: 'active',
          description: 'Manages incoming calls, routes emergencies, takes messages, and provides basic practice information.',
          tasks_today: 23,
          success_rate: 95,
          avg_response_time: '0.8s',
          last_activity: '5 minutes ago',
          capabilities: ['Call Routing', 'Emergency Detection', 'Message Taking', 'After-hours Support'],
          metrics: {
            calls_handled: 23,
            satisfaction_score: 4.7
          }
        },
        {
          id: '3',
          name: 'Scheduler Pro',
          type: 'scheduler',
          status: 'active',
          description: 'Optimizes appointment scheduling, sends reminders, handles cancellations and rescheduling requests.',
          tasks_today: 32,
          success_rate: 99,
          avg_response_time: '0.5s',
          last_activity: '1 minute ago',
          capabilities: ['Smart Scheduling', 'Reminder Automation', 'Conflict Resolution', 'No-show Prediction'],
          metrics: {
            appointments_scheduled: 18,
            satisfaction_score: 4.9
          }
        },
        {
          id: '4',
          name: 'Patient Care Assistant',
          type: 'patient_care',
          status: 'training',
          description: 'Provides post-treatment care instructions, medication reminders, and follow-up communications.',
          tasks_today: 12,
          success_rate: 87,
          avg_response_time: '2.1s',
          last_activity: '15 minutes ago',
          capabilities: ['Care Instructions', 'Medication Reminders', 'Follow-up Scheduling', 'Health Education'],
          metrics: {
            care_instructions_sent: 15,
            satisfaction_score: 4.6
          }
        }
      ];

      const mockActivity: AIActivity[] = [
        {
          id: '1',
          agent_name: 'Reception Assistant',
          task_description: 'Scheduled appointment for Sarah Johnson - Cleaning on March 15th',
          status: 'success',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          duration: '45s'
        },
        {
          id: '2',
          agent_name: 'Call Handler Pro',
          task_description: 'Handled emergency call and escalated to Dr. Smith',
          status: 'success',
          timestamp: new Date(Date.now() - 600000).toISOString(),
          duration: '2m 15s'
        },
        {
          id: '3',
          agent_name: 'Scheduler Pro',
          task_description: 'Sent appointment reminder to Michael Chen',
          status: 'success',
          timestamp: new Date(Date.now() - 900000).toISOString(),
          duration: '12s'
        }
      ];

      setAgents(mockAgents);
      setActivity(mockActivity);
    } catch (error) {
      console.error('Error fetching AI data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-gradient-to-br from-green-500 to-emerald-500';
      case 'training':
        return 'bg-gradient-to-br from-yellow-500 to-orange-500';
      case 'paused':
        return 'bg-gradient-to-br from-gray-500 to-gray-600';
      case 'error':
        return 'bg-gradient-to-br from-red-500 to-pink-500';
      default:
        return 'bg-gradient-to-br from-gray-500 to-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reception':
        return MessageSquare;
      case 'call_handler':
        return Phone;
      case 'scheduler':
        return Calendar;
      case 'patient_care':
        return Users;
      case 'analytics':
        return Activity;
      default:
        return Bot;
    }
  };

  const stats = {
    totalAgents: agents.length,
    activeAgents: agents.filter(a => a.status === 'active').length,
    totalTasks: agents.reduce((sum, agent) => sum + agent.tasks_today, 0),
    avgSuccessRate: Math.round(agents.reduce((sum, agent) => sum + agent.success_rate, 0) / agents.length),
    timeSaved: '12.5h'
  };

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return time.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading AI agents...</p>
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
              AI <span className="text-gradient">Agents</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Manage your intelligent automation assistants
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="btn-primary rounded-xl shadow-lg shadow-blue-500/25">
              <Plus className="mr-2 h-4 w-4" />
              Create Agent
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-grid">
        <div className="card-modern group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-gray-600">Active Agents</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.activeAgents}</div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <p className="text-sm text-green-600 font-medium">Running 24/7</p>
            </div>
          </CardContent>
        </div>

        <div className="card-modern group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-gray-600">Tasks Today</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalTasks}</div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <p className="text-sm text-green-600 font-medium">+23% from yesterday</p>
            </div>
          </CardContent>
        </div>

        <div className="card-modern group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-gray-600">Success Rate</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Target className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.avgSuccessRate}%</div>
            <p className="text-sm text-gray-500">Last 30 days</p>
          </CardContent>
        </div>

        <div className="card-modern group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-gray-600">Time Saved</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
              <Clock className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.timeSaved}</div>
            <p className="text-sm text-orange-600 font-medium">This week</p>
          </CardContent>
        </div>
      </div>

      {/* Search */}
      <div className="card-modern">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search AI agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl border-gray-200/50 bg-gray-50/50"
            />
          </div>
        </CardContent>
      </div>

      {/* AI Agents Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {agents
          .filter(agent => 
            agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((agent) => {
            const IconComponent = getTypeIcon(agent.type);
            return (
              <div key={agent.id} className="card-modern group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 to-cyan-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${getStatusColor(agent.status)}`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-900 mb-1">{agent.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            agent.status === 'active' ? 'bg-green-500' :
                            agent.status === 'training' ? 'bg-yellow-500' :
                            agent.status === 'paused' ? 'bg-gray-500' : 'bg-red-500'
                          }`} />
                          <span className={`text-sm font-medium capitalize ${
                            agent.status === 'active' ? 'text-green-600' :
                            agent.status === 'training' ? 'text-yellow-600' :
                            agent.status === 'paused' ? 'text-gray-600' : 'text-red-600'
                          }`}>
                            {agent.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-lg">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10 space-y-6">
                  <p className="text-gray-600 leading-relaxed">{agent.description}</p>
                  
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-gray-50/80 to-blue-50/30 rounded-xl p-4 border border-gray-100/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Gauge className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-semibold text-gray-700">Performance</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{agent.success_rate}%</div>
                      <p className="text-xs text-gray-500">Success rate</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-gray-50/80 to-green-50/30 rounded-xl p-4 border border-gray-100/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-semibold text-gray-700">Tasks Today</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{agent.tasks_today}</div>
                      <p className="text-xs text-gray-500">Completed</p>
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <BrainCircuit className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-semibold text-gray-700">Capabilities</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {agent.capabilities.map((capability, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                          {capability}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100/50">
                    <div className="text-center">
                      <div className="text-sm font-bold text-gray-900">{agent.avg_response_time}</div>
                      <div className="text-xs text-gray-500">Avg Response</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-gray-900">{agent.metrics.satisfaction_score}/5</div>
                      <div className="text-xs text-gray-500">Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-gray-900">{agent.last_activity}</div>
                      <div className="text-xs text-gray-500">Last Active</div>
                    </div>
                  </div>
                </CardContent>
              </div>
            );
          })}
      </div>

      {/* Recent Activity */}
      <div className="card-modern">
        <CardHeader className="border-b border-gray-100/50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-900">Recent AI Activity</CardTitle>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-blue-600 font-medium">Live Feed</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100/50">
            {activity.map((item) => (
              <div key={item.id} className="p-6 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-cyan-50/30 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'success' ? 'bg-green-500' :
                      item.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                    }`} />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900">{item.agent_name}</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                          item.status === 'success' ? 'status-success' :
                          item.status === 'error' ? 'status-error' : 'status-warning'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-gray-600">{item.task_description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{formatTime(item.timestamp)}</p>
                    {item.duration && (
                      <p className="text-xs text-gray-400 mt-1">{item.duration}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
    </div>
  );
}