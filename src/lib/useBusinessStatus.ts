'use client';

import { useEffect, useState } from 'react';
import { siteConfig } from '@/data/siteConfig';

export interface BusinessStatus {
  isOpen: boolean;
  /** e.g. "Open now · closes 7:00 PM" or "Closed · opens tomorrow at 10:00 AM" */
  statusText: string;
  /** current time in Ahmedabad, e.g. "3:42 PM" */
  clockText: string;
}

const WEEKDAY_INDEX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
const WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const formatHour = (hour: number): string => {
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const twelveHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${twelveHour}:00 ${suffix}`;
};

/** Works out whether the press is open right now, using Ahmedabad time whatever the visitor's timezone is. */
export function computeBusinessStatus(now: Date): BusinessStatus {
  const { timeZone, openWeekdays, openHour, closeHour } = siteConfig.businessHours;

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now);
  const readPart = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
  const weekday = WEEKDAY_INDEX[readPart('weekday')] ?? 0;
  const hour = Number(readPart('hour')) % 24;

  const clockText = new Intl.DateTimeFormat('en-IN', { timeZone, hour: 'numeric', minute: '2-digit', hour12: true })
    .format(now)
    .toUpperCase();

  const isOpenDay = (openWeekdays as readonly number[]).includes(weekday);
  const isOpen = isOpenDay && hour >= openHour && hour < closeHour;

  if (isOpen) {
    return { isOpen, clockText, statusText: `Open now · closes ${formatHour(closeHour)}` };
  }

  if (isOpenDay && hour < openHour) {
    return { isOpen, clockText, statusText: `Closed · opens today at ${formatHour(openHour)}` };
  }

  for (let daysAhead = 1; daysAhead <= 7; daysAhead += 1) {
    const nextWeekday = (weekday + daysAhead) % 7;
    if ((openWeekdays as readonly number[]).includes(nextWeekday)) {
      const dayLabel = daysAhead === 1 ? 'tomorrow' : WEEKDAY_NAMES[nextWeekday];
      return { isOpen, clockText, statusText: `Closed · opens ${dayLabel} at ${formatHour(openHour)}` };
    }
  }
  return { isOpen, clockText, statusText: 'Closed right now' };
}

/** Live open / closed status. Returns null until mounted so server and client markup match. */
export function useBusinessStatus(): BusinessStatus | null {
  const [status, setStatus] = useState<BusinessStatus | null>(null);

  useEffect(() => {
    const refreshStatus = () => setStatus(computeBusinessStatus(new Date()));
    refreshStatus();
    const timer = window.setInterval(refreshStatus, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return status;
}
