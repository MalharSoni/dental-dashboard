import { NextResponse } from 'next/server';
import { realSheetsService } from '@/lib/google-sheets-api';

export async function GET() {
  try {
    const stats = await realSheetsService.getDashboardStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}