"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  Clock, 
  User, 
  Plus, 
  Phone,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Search,
  TrendingUp,
  CalendarCheck,
  UserCheck,
  CalendarX,
  MoreVertical,
  Edit,
  Mail,
  MapPin
} from "lucide-react";

interface Appointment {
  id: string;
  patient_name: string;
  phone_number: string;
  email?: string;
  appointment_type: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes: string;
  provider: string;
  location: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [appointments, searchTerm, statusFilter, dateFilter]);

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments');
      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      } else {
        // Mock data for demo
        const mockData: Appointment[] = [
          {
            id: '1',
            patient_name: 'Sarah Johnson',
            phone_number: '+1 (555) 123-4567',
            email: 'sarah.johnson@email.com',
            appointment_type: 'Regular Cleaning',
            date: new Date().toISOString().split('T')[0],
            time: '09:00',
            duration: 60,
            status: 'scheduled',
            notes: 'Patient prefers morning appointments',
            provider: 'Dr. Smith',
            location: 'Room 1'
          },
          {
            id: '2',
            patient_name: 'Michael Chen',
            phone_number: '+1 (555) 987-6543',
            email: 'michael.chen@email.com',
            appointment_type: 'Root Canal',
            date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            time: '14:30',
            duration: 90,
            status: 'scheduled',
            notes: 'Follow-up from previous consultation',
            provider: 'Dr. Smith',
            location: 'Room 2'
          },
          {
            id: '3',
            patient_name: 'Emma Wilson',
            phone_number: '+1 (555) 456-7890',
            email: 'emma.wilson@email.com',
            appointment_type: 'Consultation',
            date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
            time: '11:00',
            duration: 30,
            status: 'completed',
            notes: 'New patient consultation completed',
            provider: 'Dr. Smith',
            location: 'Room 1'
          }
        ];
        setAppointments(mockData);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAppointments = () => {
    let filtered = [...appointments];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(apt =>
        apt.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.phone_number.includes(searchTerm) ||
        apt.appointment_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (apt.email && apt.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(apt => apt.status === statusFilter);
    }

    // Date filter
    if (dateFilter === 'today') {
      const today = new Date().toDateString();
      filtered = filtered.filter(apt => 
        new Date(apt.date).toDateString() === today
      );
    } else if (dateFilter === 'upcoming') {
      const today = new Date();
      filtered = filtered.filter(apt => 
        new Date(apt.date) >= today && apt.status === 'scheduled'
      );
    }

    // Sort by date and time
    filtered.sort((a, b) => {
      const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
      if (dateCompare !== 0) return dateCompare;
      return a.time.localeCompare(b.time);
    });

    setFilteredAppointments(filtered);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-white" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-white" />;
      case 'no-show':
        return <AlertCircle className="h-5 w-5 text-white" />;
      default:
        return <Clock className="h-5 w-5 text-white" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-gradient-to-br from-green-500 to-emerald-500';
      case 'cancelled':
        return 'bg-gradient-to-br from-red-500 to-pink-500';
      case 'no-show':
        return 'bg-gradient-to-br from-orange-500 to-yellow-500';
      default:
        return 'bg-gradient-to-br from-blue-500 to-cyan-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric'
      });
    }
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const stats = {
    total: filteredAppointments.length,
    scheduled: filteredAppointments.filter(apt => apt.status === 'scheduled').length,
    completed: filteredAppointments.filter(apt => apt.status === 'completed').length,
    cancelled: filteredAppointments.filter(apt => apt.status === 'cancelled').length,
    noShow: filteredAppointments.filter(apt => apt.status === 'no-show').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointments...</p>
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
              Appoint<span className="text-gradient">ments</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Manage your patient appointments and schedule
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="btn-primary rounded-xl shadow-lg shadow-blue-500/25">
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-grid">
        <div className="card-modern group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-gray-600">Total Appointments</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <p className="text-sm text-green-600 font-medium">+8% this week</p>
            </div>
          </CardContent>
        </div>

        <div className="card-modern group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-gray-600">Scheduled</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <CalendarCheck className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.scheduled}</div>
            <p className="text-sm text-purple-600 font-medium">Upcoming appointments</p>
          </CardContent>
        </div>

        <div className="card-modern group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-gray-600">Completed</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <UserCheck className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.completed}</div>
            <p className="text-sm text-gray-500">{stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}% completion rate</p>
          </CardContent>
        </div>

        <div className="card-modern group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-gray-600">Cancelled</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
              <CalendarX className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.cancelled + stats.noShow}</div>
            <p className="text-sm text-red-500 font-medium">Requires follow-up</p>
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
                  placeholder="Search by patient name, phone, email, or appointment type..."
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
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="upcoming">Upcoming</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200/50 bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no-show">No Show</option>
            </select>
          </div>
        </CardContent>
      </div>

      {/* Appointments List */}
      <div className="card-modern">
        <CardHeader className="border-b border-gray-100/50">
          <CardTitle className="text-xl font-bold text-gray-900">Appointments Schedule</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg">No appointments found</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or create a new appointment</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100/50">
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="p-6 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-cyan-50/30 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${getStatusColor(appointment.status)}`}>
                        {getStatusIcon(appointment.status)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900 text-lg">{appointment.patient_name}</h3>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                            appointment.status === 'scheduled' ? 'status-info' :
                            appointment.status === 'completed' ? 'status-success' :
                            appointment.status === 'cancelled' ? 'status-error' : 'status-warning'
                          }`}>
                            {appointment.status.replace('-', ' ')}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone className="h-4 w-4" />
                            <span>{appointment.phone_number}</span>
                          </div>
                          {appointment.email && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Mail className="h-4 w-4" />
                              <span>{appointment.email}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{appointment.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <User className="h-4 w-4" />
                            <span>{appointment.provider}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2 font-medium text-gray-900">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            <span>{appointment.appointment_type}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>{formatDate(appointment.date)} at {formatTime(appointment.time)}</span>
                          </div>
                          <div className="text-gray-500">
                            <span>{appointment.duration} min</span>
                          </div>
                        </div>
                        
                        {appointment.notes && (
                          <div className="mt-3 p-3 bg-gray-50/80 rounded-lg border border-gray-100">
                            <p className="text-sm text-gray-700">{appointment.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="rounded-lg">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-lg p-2">
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </div>
    </div>
  );
}