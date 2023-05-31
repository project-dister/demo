// getLocalTime.ts
import moment from 'moment-timezone';

export default function getLocalTime(timezone: string): string {
  return moment.tz(timezone).format('HH:mm');
}
