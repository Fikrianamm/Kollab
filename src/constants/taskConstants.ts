import { IColumn, ITask } from "@/pages/workspace/Page";

const COLUMNS: IColumn[] = [
  {
    id: "TODO",
    title: "To Do",
  },
  {
    id: "IN_PROGRESS",
    title: "In Progress",
  },
  {
    id: "ON_REVIEW",
    title: "On Review",
  },
  {
    id: "DONE",
    title: "Done",
  },
];

const INITIAL_TASKS: ITask[] = [
  {
    id: "1",
    title: "Research",
    description: "Gather requirements for project.",
    status: "DONE",
  },
  {
    id: "2",
    title: "Design System",
    description: "Create UI and Component Library.",
    status: "IN_PROGRESS",
  },
  {
    id: "3",
    title: "API Development",
    description: "Build RESTful API for the application.",
    status: "TODO",
  },
  {
    id: "4",
    title: "API Development",
    description: "Build RESTful API for the application.",
    status: "ON_REVIEW",
  },
  {
    id: "5",
    title: "Research",
    description: "Gather requirements for project.",
    status: "DONE",
  },
  {
    id: "6",
    title: "Design System",
    description: "Create UI and Component Library.",
    status: "IN_PROGRESS",
  },
  {
    id: "7",
    title: "API Development",
    description: "Build RESTful API for the application.",
    status: "TODO",
  },
  {
    id: "8",
    title: "API Development",
    description: "Build RESTful API for the application.",
    status: "ON_REVIEW",
  },
];

export { COLUMNS, INITIAL_TASKS };
