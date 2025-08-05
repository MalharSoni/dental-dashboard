import { NextRequest, NextResponse } from 'next/server';
import { realSheetsService } from '@/lib/google-sheets-api';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    
    let appointments = await realSheetsService.getAppointments();
    
    // Filter by date if specified
    if (date) {
      appointments = appointments.filter(apt => apt.date === date);
    }
    
    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}