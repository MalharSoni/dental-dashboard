import { NextResponse } from 'next/server';
import { realSheetsService } from '@/lib/google-sheets-api';

export async function GET() {
  try {
    const aiActivity = await realSheetsService.getAIAgentActivity();
    return NextResponse.json(aiActivity);
  } catch (error) {
    console.error('Error fetching AI agent activity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch AI agent activity' },
      { status: 500 }
    );
  }
}