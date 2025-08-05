// Extract the sheet ID from the URL
// const SHEET_ID = '1t5WNH7g7Osjzh-wS2FnZJtywSFLa2Gak_w5QspggKtI';

// Types for our data
export interface CallLogEntry {
  id: string;
  caller_name: string;
  phone_number: string;
  call_type: 'incoming' | 'outgoing';
  duration: string;
  timestamp: string;
  status: 'answered' | 'missed' | 'voicemail';
  notes?: string;
}

export interface AppointmentEntry {
  id: string;
  patient_name: string;
  phone_number: string;
  appointment_type: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
}

export interface VoicemailEntry {
  id: string;
  caller_name: string;
  phone_number: string;
  duration: string;
  timestamp: string;
  transcription?: string;
  urgent: boolean;
  listened: boolean;
}

export interface AIAgentEntry {
  id: string;
  agent_name: string;
  agent_type: string;
  task_description: string;
  timestamp: string;
  status: 'success' | 'error' | 'in_progress';
  response_time?: string;
}

import { realSheetsService } from './google-sheets-api';

// Smart service that uses real Google Sheets API when configured, falls back to mock data
export class GoogleSheetsService {
  private static instance: GoogleSheetsService;
  
  public static getInstance(): GoogleSheetsService {
    if (!GoogleSheetsService.instance) {
      GoogleSheetsService.instance = new GoogleSheetsService();
    }
    return GoogleSheetsService.instance;
  }

  private isConfigured(): boolean {
    return !!(process.env.GOOGLE_SHEETS_CLIENT_EMAIL && 
              process.env.GOOGLE_SHEETS_PRIVATE_KEY && 
              process.env.GOOGLE_SHEETS_SHEET_ID);
  }

  async getCallLogs(): Promise<CallLogEntry[]> {
    if (this.isConfigured()) {
      try {
        return await realSheetsService.getCallLogs();
      } catch (error) {
        console.warn('Failed to fetch from Google Sheets, using mock data:', error);
      }
    }
    
    // Fallback to mock data
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      {
        id: '1',
        caller_name: 'Emma Wilson',
        phone_number: '+1 (555) 123-4567',
        call_type: 'incoming',
        duration: '4:32',
        timestamp: '2024-08-05T10:30:00Z',
        status: 'answered',
        notes: 'Routine appointment inquiry'
      },
      {
        id: '2',
        caller_name: 'Michael Chen',
        phone_number: '+1 (555) 234-5678',
        call_type: 'outgoing',
        duration: '2:15',
        timestamp: '2024-08-05T09:45:00Z',
        status: 'answered',
        notes: 'Follow-up call'
      },
      {
        id: '3',
        caller_name: 'Unknown',
        phone_number: '+1 (555) 345-6789',
        call_type: 'incoming',
        duration: '0:00',
        timestamp: '2024-08-05T08:30:00Z',
        status: 'missed'
      }
    ];
  }

  async getAppointments(): Promise<AppointmentEntry[]> {
    if (this.isConfigured()) {
      try {
        return await realSheetsService.getAppointments();
      } catch (error) {
        console.warn('Failed to fetch appointments from Google Sheets, using mock data:', error);
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: '1',
        patient_name: 'Emma Wilson',
        phone_number: '+1 (555) 123-4567',
        appointment_type: 'Routine Cleaning',
        date: '2024-08-05',
        time: '09:00',
        status: 'completed',
        notes: 'Patient arrived on time'
      },
      {
        id: '2',
        patient_name: 'Michael Chen',
        phone_number: '+1 (555) 234-5678',
        appointment_type: 'Dental Filling',
        date: '2024-08-05',
        time: '10:30',
        status: 'scheduled',
        notes: 'Cavity in lower molar'
      },
      {
        id: '3',
        patient_name: 'Lisa Rodriguez',
        phone_number: '+1 (555) 456-7890',
        appointment_type: 'Consultation',
        date: '2024-08-05',
        time: '14:00',
        status: 'scheduled',
        notes: 'New patient consultation'
      }
    ];
  }

  async getVoicemails(): Promise<VoicemailEntry[]> {
    if (this.isConfigured()) {
      try {
        return await realSheetsService.getVoicemails();
      } catch (error) {
        console.warn('Failed to fetch voicemails from Google Sheets, using mock data:', error);
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: '1',
        caller_name: 'Sarah Johnson',
        phone_number: '+1 (555) 123-4567',
        duration: '2:34',
        timestamp: '2024-08-05T10:00:00Z',
        transcription: 'Hi, this is Sarah. I need to reschedule my appointment for tomorrow.',
        urgent: false,
        listened: false
      },
      {
        id: '2',
        caller_name: 'Robert Miller',
        phone_number: '+1 (555) 234-5678',
        duration: '1:12',
        timestamp: '2024-08-05T09:00:00Z',
        transcription: 'This is urgent! I have severe tooth pain and need an emergency appointment.',
        urgent: true,
        listened: false
      }
    ];
  }

  async getAIAgentActivity(): Promise<AIAgentEntry[]> {
    if (this.isConfigured()) {
      try {
        return await realSheetsService.getAIAgentActivity();
      } catch (error) {
        console.warn('Failed to fetch AI activity from Google Sheets, using mock data:', error);
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: '1',
        agent_name: 'Reception Assistant',
        agent_type: 'chat',
        task_description: 'Answered patient inquiry about teeth whitening',
        timestamp: '2024-08-05T10:28:00Z',
        status: 'success',
        response_time: '1.2s'
      },
      {
        id: '2',
        agent_name: 'Scheduler Pro',
        agent_type: 'scheduling',
        task_description: 'Scheduled appointment for new patient',
        timestamp: '2024-08-05T10:25:00Z',
        status: 'success',
        response_time: '0.8s'
      },
      {
        id: '3',
        agent_name: 'Call Handler',
        agent_type: 'phone',
        task_description: 'Handled emergency call and escalated to doctor',
        timestamp: '2024-08-05T10:18:00Z',
        status: 'success',
        response_time: '2.1s'
      }
    ];
  }

  async getDashboardStats() {
    if (this.isConfigured()) {
      try {
        return await realSheetsService.getDashboardStats();
      } catch (error) {
        console.warn('Failed to fetch dashboard stats from Google Sheets, using mock data:', error);
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      totalAppointments: 24,
      totalCalls: 156,
      missedCalls: 3,
      todayRevenue: 4850,
      unreadVoicemails: 5,
      activeAIAgents: 4,
      aiTasksToday: 142,
      aiSuccessRate: 98.5
    };
  }

  // Placeholder for actual Google Sheets integration
  async connectToGoogleSheets(sheetId: string) {
    try {
      // This would connect to the actual Google Sheets API
      // For now, we'll use mock data
      console.log(`Connecting to Google Sheet: ${sheetId}`);
      return true;
    } catch (error) {
      console.error('Failed to connect to Google Sheets:', error);
      return false;
    }
  }
}

// Export singleton instance
export const sheetsService = GoogleSheetsService.getInstance();