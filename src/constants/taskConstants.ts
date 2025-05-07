import { Container } from "@/pages/workspace/Page";

const INITIAL_TASKS: Container[] = [
  {
    id: "TODO",
    title: "To Do",
    tasks: [
      {
        id: "task-3",
        title: "API Development",
        description: "Build RESTful API for the application.",
        status: "TODO",
      },
      {
        id: "task-2",
        title: "Design System",
        description: "Create UI and Component Library.",
        status: "TODO",
      },
    ],
  },
  {
    id: "IN_PROGRESS",
    title: "In Progress",
    tasks: [
      {
        id: "task-7",
        title: "API Development",
        description: "Build RESTful API for the application.",
        status: "IN_PROGRESS",
      },
      {
        id: "task-6",
        title: "Design System",
        description: "Create UI and Component Library.",
        status: "IN_PROGRESS",
      },
    ],
  },
  {
    id: "ON_REVIEW",
    title: "On Review",
    tasks: [
      {
        id: "task-4",
        title: "API Development",
        description: "Build RESTful API for the application.",
        status: "ON_REVIEW",
      },
      {
        id: "task-8",
        title: "API Development",
        description: "Build RESTful API for the application.",
        status: "ON_REVIEW",
      },
    ],
  },
  {
    id: "DONE",
    title: "Done",
    tasks: [
      {
        id: "task-1",
        title: "Research",
        description: "Gather requirements for project.",
        status: "DONE",
      },
      {
        id: "task-5",
        title: "Research",
        description: "Gather requirements for project.",
        status: "DONE",
      },
    ],
  },
];

export { INITIAL_TASKS };
