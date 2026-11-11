import { Observer, getUpcomingFestivals } from '@ishubhamx/panchangam-js';
import { fixedYearlyHolidays, holidayRules, manualHolidayOverrides } from '@/data/holidayRules';
import { siteConfig } from '@/data/siteConfig';

export interface ClosedDay {
  /** calendar date in Ahmedabad, `YYYY-MM-DD` */
  date: string;
  /** festival name shown to visitors */
  label: string;
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const IST_OFFSET_MS = 330 * 60 * 1000;
const SCAN_DAYS = 400;

/** Calendar date (Ahmedabad) of an instant, as `YYYY-MM-DD`. */
const toIstDateKey = (instant: Date): string => new Date(instant.getTime() + IST_OFFSET_MS).toISOString().slice(0, 10);

const addDaysToDateKey = (dateKey: string, days: number): string =>
  new Date(Date.parse(`${dateKey}T00:00:00Z`) + days * MS_PER_DAY).toISOString().slice(0, 10);

/** The Ganesh Chaturthi in the library sometimes comes out as "Vinayaka Chaturthi" — pick the one just before Ganesh Visarjan. */
function findGaneshChaturthiFallback(festivals: { name: string; dateKey: string }[]): string | null {
  const visarjan = festivals.find((festival) => festival.name === 'Ganesh Visarjan');
  if (!visarjan) return null;
  const visarjanTime = Date.parse(`${visarjan.dateKey}T00:00:00Z`);
  const candidate = festivals.find((festival) => {
    const gapInDays = (visarjanTime - Date.parse(`${festival.dateKey}T00:00:00Z`)) / MS_PER_DAY;
    return festival.name === 'Vinayaka Chaturthi' && gapInDays >= 9 && gapInDays <= 12;
  });
  return candidate?.dateKey ?? null;
}

/**
 * Works out the days the press is closed for festivals, from today for the next ~13 months.
 * Uses the Hindu panchang (Amanta months — the Gujarati calendar) computed for Ahmedabad, so no yearly list is needed.
 */
export function getClosedDays(fromDate: Date = new Date()): ClosedDay[] {
  const observer = new Observer(siteConfig.geo.latitude, siteConfig.geo.longitude, 50);
  const scanStart = new Date(fromDate.getTime() - 2 * MS_PER_DAY);

  const festivals = getUpcomingFestivals({
    date: scanStart,
    observer,
    days: SCAN_DAYS,
    timezoneOffset: 330,
    calendarType: 'amanta',
  }).map((festival) => ({ name: festival.name, dateKey: toIstDateKey(festival.date) }));

  const closedByDate = new Map<string, string>();

  for (const rule of holidayRules) {
    const wantedNames = rule.festivalNames.map((name) => name.toLowerCase());
    let matchingDates = festivals
      .filter((festival) => wantedNames.includes(festival.name.toLowerCase()))
      .map((festival) => festival.dateKey);

    if (rule.label === 'Ganesh Chaturthi' && matchingDates.length === 0) {
      const fallbackDate = findGaneshChaturthiFallback(festivals);
      if (fallbackDate) matchingDates = [fallbackDate];
    }

    // group dates that are consecutive days of the same festival, then keep the first or last of each group
    const sortedDates = [...new Set(matchingDates)].sort();
    const groups: string[][] = [];
    for (const dateKey of sortedDates) {
      const lastGroup = groups[groups.length - 1];
      if (lastGroup && addDaysToDateKey(lastGroup[lastGroup.length - 1], 1) === dateKey) lastGroup.push(dateKey);
      else groups.push([dateKey]);
    }

    for (const group of groups) {
      const festivalDay = rule.whichDay === 'first' ? group[0] : group[group.length - 1];
      for (let offset = 0; offset <= (rule.extraDaysAfter ?? 0); offset += 1) {
        const closedDate = addDaysToDateKey(festivalDay, offset);
        if (!closedByDate.has(closedDate)) closedByDate.set(closedDate, rule.label);
      }
    }
  }

  // same-date-every-year holidays (Republic Day, Independence Day) across the scanned window
  for (let dayOffset = 0; dayOffset < SCAN_DAYS; dayOffset += 1) {
    const dateKey = addDaysToDateKey(toIstDateKey(scanStart), dayOffset);
    const fixedHoliday = fixedYearlyHolidays.find(({ monthDay }) => dateKey.endsWith(`-${monthDay}`));
    if (fixedHoliday && !closedByDate.has(dateKey)) closedByDate.set(dateKey, fixedHoliday.label);
  }

  manualHolidayOverrides.add.forEach(({ date, label }) => closedByDate.set(date, label));
  manualHolidayOverrides.remove.forEach((date) => closedByDate.delete(date));

  return [...closedByDate.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([date, label]) => ({ date, label }));
}
