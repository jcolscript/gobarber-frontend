import { DayModifiers } from 'react-day-picker';

export interface ICalendarModifiers extends DayModifiers {
  available: boolean;
}

export interface IMonthAvailabilityItem {
  day: number;
  available: boolean;
}
