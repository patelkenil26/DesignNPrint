'use client';

import { useEffect, useState } from 'react';
import { siteConfig } from '@/data/siteConfig';
import type { ClosedDay } from '@/lib/holidays';

export interface BusinessStatus {
  isOpen: boolean;
  /** e.g. "Open now · closes 7:00 PM" or "Closed today for Diwali · opens tomorrow at 10:00 AM" */
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

/** `YYYY-MM-DD` for the date `daysAhead` days after the given `YYYY-MM-DD`. */
const shiftDateKey = (dateKey: string, daysAhead: number): string =>
  new Date(Date.parse(`${dateKey}T00:00:00Z`) + daysAhead * 86_400_000).toISOString().slice(0, 10);

/**
 * Works out whether the press is open right now, using Ahmedabad time whatever the visitor's timezone is.
 * `closedDays` are festival holidays (Diwali, Uttarayan …) — the press is shut on those even on a normal working weekday.
 */
export function computeBusinessStatus(now: Date, closedDays: readonly ClosedDay[] = []): BusinessStatus {
  const { timeZone, openWeekdays, openHour, closeHour } = siteConfig.businessHours;

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now);
  const readPart = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
  const weekday = WEEKDAY_INDEX[readPart('weekday')] ?? 0;
  const hour = Number(readPart('hour')) % 24;
  const todayKey = `${readPart('year')}-${readPart('month')}-${readPart('day')}`;

  const clockText = new Intl.DateTimeFormat('en-IN', { timeZone, hour: 'numeric', minute: '2-digit', hour12: true })
    .format(now)
    .toUpperCase();

  const holidayNameByDate = new Map(closedDays.map(({ date, label }) => [date, label]));
  const isWorkingDay = (daysAhead: number): boolean =>
    (openWeekdays as readonly number[]).includes((weekday + daysAhead) % 7) &&
    !holidayNameByDate.has(shiftDateKey(todayKey, daysAhead));

  const todayHoliday = holidayNameByDate.get(todayKey);
  const tomorrowHoliday = holidayNameByDate.get(shiftDateKey(todayKey, 1));
  const isOpenDay = isWorkingDay(0);
  const isOpen = isOpenDay && hour >= openHour && hour < closeHour;

  if (isOpen) {
    const tomorrowNote = tomorrowHoliday ? ` · closed tomorrow for ${tomorrowHoliday}` : '';
    return { isOpen, clockText, statusText: `Open now · closes ${formatHour(closeHour)}${tomorrowNote}` };
  }

  if (isOpenDay && hour < openHour) {
    return { isOpen, clockText, statusText: `Closed · opens today at ${formatHour(openHour)}` };
  }

  const closedPrefix = todayHoliday ? `Closed today for ${todayHoliday}` : 'Closed';
  for (let daysAhead = 1; daysAhead <= 21; daysAhead += 1) {
    if (isWorkingDay(daysAhead)) {
      const dayLabel = daysAhead === 1 ? 'tomorrow' : WEEKDAY_NAMES[(weekday + daysAhead) % 7];
      return { isOpen, clockText, statusText: `${closedPrefix} · opens ${dayLabel} at ${formatHour(openHour)}` };
    }
  }
  return { isOpen, clockText, statusText: todayHoliday ? closedPrefix : 'Closed right now' };
}

/** Festival closures, fetched once per page load. Stays empty (normal weekly hours) if they can't be loaded. */
function useClosedDays(): ClosedDay[] {
  const [closedDays, setClosedDays] = useState<ClosedDay[]>([]);

  useEffect(() => {
    let isCancelled = false;
    const loadClosedDays = async () => {
      try {
        const response = await fetch('/api/holidays');
        if (!response.ok) throw new Error(`Holiday request failed (${response.status})`);
        const data: { closedDays?: ClosedDay[] } = await response.json();
        if (!isCancelled) setClosedDays(data.closedDays ?? []);
      } catch (error) {
        console.warn('Festival closures unavailable, showing normal hours', error);
      }
    };
    void loadClosedDays();
    return () => {
      isCancelled = true;
    };
  }, []);

  return closedDays;
}

/** Live open / closed status. Returns null until mounted so server and client markup match. */
export function useBusinessStatus(): BusinessStatus | null {
  const [status, setStatus] = useState<BusinessStatus | null>(null);
  const closedDays = useClosedDays();

  useEffect(() => {
    const refreshStatus = () => setStatus(computeBusinessStatus(new Date(), closedDays));
    refreshStatus();
    const timer = window.setInterval(refreshStatus, 30_000);
    return () => window.clearInterval(timer);
  }, [closedDays]);

  return status;
}
