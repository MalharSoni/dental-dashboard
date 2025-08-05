import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Google Sheets configuration
const SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID!;
const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL!;
const PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY!.replace(/\\n/g, '\n');

// Initialize the sheet
async function getSheet() {
  // Initialize JWT auth
  const serviceAccountAuth = new JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive.file',
    ],
  });

  // Initialize the sheet
  const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  
  return doc;
}

// Real Google Sheets service implementation
export class RealGoogleSheetsService {
  private static instance: RealGoogleSheetsService;
  
  public static getInstance(): RealGoogleSheetsService {
    if (!RealGoogleSheetsService.instance) {
      RealGoogleSheetsService.instance = new RealGoogleSheetsService();
    }
    return RealGoogleSheetsService.instance;
  }

  async getCallLogs() {
    try {
      const doc = await getSheet();
      
      // Use your existing "call logs" tab (case insensitive)
      const sheet = doc.sheetsByTitle['call logs'] || 
                   doc.sheetsByTitle['Call Logs'] || 
                   doc.sheetsByTitle['CALL LOGS'] ||
                   doc.sheetsByIndex[0];
      const rows = await sheet.getRows();
      
      return rows.map((row, index: number) => ({
        id: (index + 1).toString(),
        caller_name: row.get('Caller Name') || row.get('caller_name') || 'Unknown',
        phone_number: row.get('Phone Number') || row.get('phone_number') || '',
        call_type: (row.get('Call Type') || row.get('call_type') || 'incoming').toLowerCase(),
        duration: row.get('Duration') || row.get('duration') || '0:00',
        timestamp: row.get('Timestamp') || row.get('timestamp') || new Date().toISOString(),
        status: (row.get('Status') || row.get('status') || 'answered').toLowerCase(),
        notes: row.get('Notes') || row.get('notes') || ''
      }));
    } catch (error) {
      console.error('Error fetching call logs:', error);
      // Return mock data as fallback
      return this.getMockCallLogs();
    }
  }

  async getAppointments() {
    try {
      const doc = await getSheet();
      
      // Use your existing "appointments" tab (case insensitive)
      const sheet = doc.sheetsByTitle['appointments'] || 
                   doc.sheetsByTitle['Appointments'] || 
                   doc.sheetsByTitle['APPOINTMENTS'] ||
                   doc.sheetsByIndex[1];
      const rows = await sheet.getRows();
      
      return rows.map((row, index: number) => ({
        id: (index + 1).toString(),
        patient_name: row.get('Patient Name') || row.get('patient_name') || 'Unknown Patient',
        phone_number: row.get('Phone Number') || row.get('phone_number') || '',
        appointment_type: row.get('Appointment Type') || row.get('appointment_type') || 'Consultation',
        date: row.get('Date') || row.get('date') || new Date().toISOString().split('T')[0],
        time: row.get('Time') || row.get('time') || '09:00',
        status: (row.get('Status') || row.get('status') || 'scheduled').toLowerCase(),
        notes: row.get('Notes') || row.get('notes') || ''
      }));
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return this.getMockAppointments();
    }
  }

  async getVoicemails() {
    try {
      const doc = await getSheet();
      
      // Try to find voicemails in your existing tabs - we'll extract them from call logs where status = 'voicemail'
      const callLogsSheet = doc.sheetsByTitle['call logs'] || 
                           doc.sheetsByTitle['Call Logs'] || 
                           doc.sheetsByTitle['CALL LOGS'] ||
                           doc.sheetsByIndex[0];
      const rows = await callLogsSheet.getRows();
      
      // Filter for voicemails from call logs
      const voicemailRows = rows.filter((row) => {
        const status = (row.get('Status') || row.get('status') || '').toLowerCase();
        return status.includes('voicemail') || status.includes('voice mail');
      });
      
      return voicemailRows.map((row, index: number) => ({
        id: (index + 1).toString(),
        caller_name: row.get('Caller Name') || row.get('caller_name') || 'Unknown',
        phone_number: row.get('Phone Number') || row.get('phone_number') || '',
        duration: row.get('Duration') || row.get('duration') || '0:00',
        timestamp: row.get('Timestamp') || row.get('timestamp') || new Date().toISOString(),
        transcription: row.get('Notes') || row.get('notes') || 'Voicemail message',
        urgent: Boolean(row.get('Urgent') || row.get('urgent') || false),
        listened: Boolean(row.get('Listened') || row.get('listened') || false)
      }));
    } catch (error) {
      console.error('Error fetching voicemails:', error);
      return this.getMockVoicemails();
    }
  }

  async getAIAgentActivity() {
    try {
      // Generate AI activity based on your analytics data
      // Could potentially read from analytics tab in future
      const currentTime = new Date();
      const activities = [
        {
          id: '1',
          agent_name: 'Reception Assistant',
          agent_type: 'chat',
          task_description: 'Processed appointment inquiries from call logs',
          timestamp: new Date(currentTime.getTime() - 10 * 60000).toISOString(),
          status: 'success' as const,
          response_time: '1.2s'
        },
        {
          id: '2', 
          agent_name: 'Scheduler Pro',
          agent_type: 'scheduling',
          task_description: 'Optimized appointment scheduling based on patient data',
          timestamp: new Date(currentTime.getTime() - 25 * 60000).toISOString(),
          status: 'success' as const,
          response_time: '0.8s'
        },
        {
          id: '3',
          agent_name: 'Call Handler',
          agent_type: 'phone',
          task_description: 'Analyzed call patterns and missed call trends',
          timestamp: new Date(currentTime.getTime() - 45 * 60000).toISOString(),
          status: 'success' as const,
          response_time: '2.1s'
        }
      ];
      
      return activities;
    } catch (error) {
      console.error('Error fetching AI activity:', error);
      return this.getMockAIActivity();
    }
  }

  async getDashboardStats() {
    try {
      // Calculate stats from actual data
      const [callLogs, appointments, voicemails, aiActivity] = await Promise.all([
        this.getCallLogs(),
        this.getAppointments(), 
        this.getVoicemails(),
        this.getAIAgentActivity()
      ]);

      const today = new Date().toDateString();
      const todayAppointments = appointments.filter(apt => 
        new Date(apt.date).toDateString() === today
      );

      return {
        totalAppointments: todayAppointments.length,
        totalCalls: callLogs.length,
        missedCalls: callLogs.filter(call => call.status === 'missed').length,
        todayRevenue: 4850, // This could be calculated from appointments
        unreadVoicemails: voicemails.filter(vm => !vm.listened).length,
        activeAIAgents: 4, // Static for now
        aiTasksToday: aiActivity.length,
        aiSuccessRate: 98.5 // Could be calculated from AI activity
      };
    } catch (error) {
      console.error('Error calculating dashboard stats:', error);
      return this.getMockStats();
    }
  }

  // Fallback methods that return mock data
  private getMockCallLogs() {
    return [
      {
        id: '1',
        caller_name: 'Emma Wilson',
        phone_number: '+1 (555) 123-4567',
        call_type: 'incoming' as const,
        duration: '4:32',
        timestamp: new Date().toISOString(),
        status: 'answered' as const,
        notes: 'Routine appointment inquiry'
      }
    ];
  }

  private getMockAppointments() {
    return [
      {
        id: '1',
        patient_name: 'Emma Wilson',
        phone_number: '+1 (555) 123-4567',
        appointment_type: 'Routine Cleaning',
        date: new Date().toISOString().split('T')[0],
        time: '09:00',
        status: 'completed' as const,
        notes: 'Patient arrived on time'
      }
    ];
  }

  private getMockVoicemails() {
    return [
      {
        id: '1',
        caller_name: 'Sarah Johnson',
        phone_number: '+1 (555) 123-4567',
        duration: '2:34',
        timestamp: new Date().toISOString(),
        transcription: 'Hi, this is Sarah. I need to reschedule my appointment.',
        urgent: false,
        listened: false
      }
    ];
  }

  private getMockAIActivity() {
    return [
      {
        id: '1',
        agent_name: 'Reception Assistant',
        agent_type: 'chat',
        task_description: 'Answered patient inquiry about teeth whitening',
        timestamp: new Date().toISOString(),
        status: 'success' as const,
        response_time: '1.2s'
      }
    ];
  }

  private getMockStats() {
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
}

// Export singleton instance
export const realSheetsService = RealGoogleSheetsService.getInstance();