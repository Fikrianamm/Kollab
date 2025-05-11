import { format, formatDistanceToNow, differenceInDays } from "date-fns";

export default function formatCreatedAt(date: Date): string {
  const daysDiff = differenceInDays(new Date(), date);

  if (daysDiff > 7) {
    return format(date, "d MMMM yyyy");
  } else {
    return formatDistanceToNow(date, { addSuffix: true });
  }
}
