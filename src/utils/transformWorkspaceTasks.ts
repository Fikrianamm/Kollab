// Transform workspace tasks into Container format for kanban board
import { StatusType, Task } from "@/types/types";
import { Container } from "@/pages/workspace/Page";

// Define the possible status values and their display titles
const STATUS_COLUMNS: { id: StatusType; title: string }[] = [
  { id: "to do", title: "To Do" },
  { id: "in progress", title: "In Progress" },
  { id: "on review", title: "On Review" },
  { id: "done", title: "Done" },
];

/**
 * Transform workspace tasks into Container format for kanban board
 * @param tasks - Array of tasks from workspace
 * @returns Array of containers with tasks grouped by status
 */
export function transformWorkspaceTasks(tasks: Task[] = []): Container[] {
  // Create empty containers for each status
  const containers: Container[] = STATUS_COLUMNS.map(({ id, title }) => ({
    id,
    title,
    tasks: [],
  }));

  // Group tasks by status
  tasks.forEach((task) => {
    const container = containers.find((c) => c.id === task.status);
    if (container) {
      container.tasks.push(task);
    } else {
      // If status doesn't match any container, put in "to do" as fallback
      containers[0].tasks.push({
        ...task,
        status: "to do",
      });
    }
  });

  return containers;
}