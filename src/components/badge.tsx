import { PriorityType, StatusType } from "@/types/types";

export function PriorityTaskBadge({
  priority,
}: {
  priority: PriorityType;
}) {
  let badgeTask = "";
  let text = "";

  switch (priority) {
    case "urgent":
      badgeTask =
        "bg-red-50 text-red-600 dark:bg-red-600/20 font-bold text-base";
      text = "URGENT";
      break;
    case "high":
      badgeTask =
        "bg-orange-50 text-orange-600 dark:bg-orange-600/20 font-bold text-base";
      text = "HIGH";
      break;
    case "medium":
      badgeTask =
        "bg-blue-50 text-blue-600 dark:bg-blue-600/20 font-bold text-base";
      text = "MEDIUM";
      break;
    case "low":
      badgeTask =
        "bg-green-50 text-green-600 dark:bg-green-600/20 font-bold text-base";
      text = "LOW";
      break;
    default:
      badgeTask =
        "bg-gray-100 text-gray-800 dark:bg-gray-100/10 dark:text-gray-100 font-bold text-base";
      text = "UNKNOWN";
  }
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded md:text-xs text-[9px] lg:text-sm font-semibold ${badgeTask}`}
    >
      {text}
    </span>
  );
}

export function StatusTaskBadge({
  status,
}: {
  status: StatusType;
}) {
  let badgeTask = "";
  let text = "";

  switch (status) {
    case "in progress":
      badgeTask =
        "bg-orange-50 text-orange-600 dark:bg-orange-600/20 font-bold text-base";
      text = "IN PROGRESS";
      break;
    case "on review":
      badgeTask =
        "bg-blue-50 text-blue-600 dark:bg-blue-600/20 font-bold text-base";
      text = "ON REVIEW";
      break;
    case "done":
      badgeTask =
        "bg-green-50 text-green-600 dark:bg-green-600/20 font-bold text-base";
      text = "DONE";
      break;
    default:
      badgeTask =
        "bg-gray-100 text-gray-800 dark:bg-gray-100/10 dark:text-gray-100 font-bold text-base";
      text = "TO DO";
  }
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded md:text-xs text-[9px] lg:text-sm font-semibold ${badgeTask}`}
    >
      {text}
    </span>
  );
}
