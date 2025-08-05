import { NextResponse } from 'next/server';
import { realSheetsService } from '@/lib/google-sheets-api';

export async function GET() {
  try {
    const voicemails = await realSheetsService.getVoicemails();
    return NextResponse.json(voicemails);
  } catch (error) {
    console.error('Error fetching voicemails:', error);
    return NextResponse.json(
      { error: 'Failed to fetch voicemails' },
      { status: 500 }
    );
  }
}