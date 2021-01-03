import { DayModifiers } from 'react-day-picker';

export interface CalendarModifiers extends DayModifiers {
  available: boolean;
}
