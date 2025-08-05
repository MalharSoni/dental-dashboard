import { NextRequest, NextResponse } from 'next/server';
import { realSheetsService } from '@/lib/google-sheets-api';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');
    
    let callLogs = await realSheetsService.getCallLogs();
    
    // Apply limit if specified
    if (limit) {
      callLogs = callLogs.slice(0, parseInt(limit));
    }
    
    return NextResponse.json(callLogs);
  } catch (error) {
    console.error('Error fetching call logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch call logs' },
      { status: 500 }
    );
  }
}