import { DayModifiers } from 'react-day-picker';

export interface CalendarModifiers extends DayModifiers {
  available: boolean;
}

export interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}
