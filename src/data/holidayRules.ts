/**
 * Which Gujarati festivals the press stays closed for.
 *
 * Festival dates are NOT written here — they are worked out automatically every year from the
 * Hindu panchang (see `src/lib/holidays.ts`). This file only says which festivals mean a holiday.
 */

export interface HolidayRule {
  /** name shown to visitors, e.g. "Diwali" */
  label: string;
  /** festival names (as reported by the panchang library) that trigger this holiday — case-insensitive, exact */
  festivalNames: string[];
  /** when the library lists a festival on two days: close on the first or the last of them */
  whichDay: 'first' | 'last';
  /** extra closed days after the festival day (e.g. Uttarayan + Vasi Uttarayan = 1) */
  extraDaysAfter?: number;
}

export const holidayRules: readonly HolidayRule[] = [
  { label: 'Uttarayan', festivalNames: ['Makar Sankranti (Thai Pongal)'], whichDay: 'first', extraDaysAfter: 1 },
  { label: 'Maha Shivratri', festivalNames: ['Maha Shivaratri'], whichDay: 'first' },
  { label: 'Holi', festivalNames: ['Holika Dahan'], whichDay: 'first' },
  { label: 'Dhuleti', festivalNames: ['Holi (Rangwali / Dhulandi)'], whichDay: 'first' },
  { label: 'Raksha Bandhan', festivalNames: ['Raksha Bandhan'], whichDay: 'last' },
  { label: 'Janmashtami', festivalNames: ['Janmashtami (Smarta)', 'Janmashtami (Vaishnava)'], whichDay: 'last' },
  { label: 'Ganesh Chaturthi', festivalNames: ['Ganesh Chaturthi'], whichDay: 'first' },
  { label: 'Dussehra', festivalNames: ['Vijaya Dashami (Dussehra)'], whichDay: 'first' },
  { label: 'Diwali', festivalNames: ['Diwali (Lakshmi Puja)'], whichDay: 'first' },
  { label: 'Gujarati New Year (Bestu Varas)', festivalNames: ['Govardhan Puja'], whichDay: 'first' },
  { label: 'Bhai Beej', festivalNames: ['Bhai Dooj (Yama Dwitiya)'], whichDay: 'last' },
];

/** National holidays that fall on the same English date every year (`MM-DD`). */
export const fixedYearlyHolidays: readonly { monthDay: string; label: string }[] = [
  { monthDay: '01-26', label: 'Republic Day' },
  { monthDay: '08-15', label: 'Independence Day' },
];

/**
 * Safety net, normally empty. If the panchang library ever gets a date wrong or misses a festival,
 * fix it here with `YYYY-MM-DD` dates and the site follows immediately.
 */
export const manualHolidayOverrides: {
  /** extra closed days to add */
  add: { date: string; label: string }[];
  /** dates to treat as normal working days even if a festival falls on them */
  remove: string[];
} = {
  add: [],
  remove: [],
};
