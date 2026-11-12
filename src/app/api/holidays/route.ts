import { NextResponse } from 'next/server';
import { getClosedDays } from '@/lib/holidays';

/** Refresh once a day so the list keeps rolling forward without any manual yearly update. */
export const revalidate = 86400;

export async function GET() {
  try {
    return NextResponse.json({ closedDays: getClosedDays() });
  } catch (error) {
    console.error('Could not work out festival closures', error);
    // the site then simply falls back to the normal weekly hours
    return NextResponse.json({ closedDays: [] }, { status: 200 });
  }
}
