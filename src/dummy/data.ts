import {
  User,
  Team,
  Member,
  Workspace,
  Task,
  SubTask,
  Comment,
} from "@/types/types";

// User dummy data
export const users: User[] = [
  {
    id: 0,
    role: "leader",
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    password: "password",
    avatar: "https://avatar.iran.liara.run/public/32",
    created_at: new Date("2025-02-15"),
  },
  {
    id: 1,
    role: "member",
    name: "Jane Smith",
    username: "janesmith",
    email: "jane.smith@example.com",
    password: "password",
    avatar: "https://avatar.iran.liara.run/public/58",
    created_at: new Date("2025-02-20"),
  },
  {
    id: 2,
    role: "member",
    name: "Michael Johnson",
    username: "michaelj",
    email: "michael.johnson@example.com",
    password: "password",
    avatar: "https://avatar.iran.liara.run/public/37",
    created_at: new Date("2025-02-20"),
  },
];

// Team dummy data
export const teams: Team[] = [
  {
    id: 0,
    user_id: 0,
    name: "Koderra",
  },
];

// Member dummy data
export const members: Member[] = [
  {
    id: 0,
    user_id: 0,
    team_id: 0,
    user: {
      id: 0,
      role: "Leader",
      name: "John Doe",
      username: "johndoe",
      email: "john.doe@example.com",
      password: "password",
      avatar: "https://avatar.iran.liara.run/public/32",
      created_at: new Date("2025-02-15"),
    },
    team: {
      id: 0,
      user_id: 0,
      name: "Koderra",
    },
  },
  {
    id: 1,
    user_id: 1,
    team_id: 0,
    user: {
      id: 1,
      role: "member",
      name: "Jane Smith",
      username: "janesmith",
      email: "jane.smith@example.com",
      password: "password",
      avatar: "https://avatar.iran.liara.run/public/58",
      created_at: new Date("2025-02-20"),
    },
    team: {
      id: 0,
      user_id: 0,
      name: "Koderra",
    },
  },
  {
    id: 2,
    user_id: 2,
    team_id: 0,
    user: {
      id: 2,
      role: "member",
      name: "Michael Johnson",
      username: "michaelj",
      email: "michael.johnson@example.com",
      password: "password",
      avatar: "https://avatar.iran.liara.run/public/37",
      created_at: new Date("2025-02-20"),
    },
    team: {
      id: 0,
      user_id: 0,
      name: "Koderra",
    },
  },
];

// Workspace dummy data
export const workspaces: Workspace[] = [
  {
    id: 0,
    user_id: 0,
    logo: "project_logo1.png",
    cover: "project_cover1.jpg",
    name: "Educa",
    user: {
      id: 0,
      role: "leader",
      name: "John Doe",
      username: "johndoe",
      email: "john.doe@example.com",
      password: "password",
      avatar: "https://avatar.iran.liara.run/public/32",
      created_at: new Date("2025-02-15"),
    },
  },
  {
    id: 1,
    user_id: 0,
    logo: "project_logo2.png",
    cover: "project_cover2.jpg",
    name: "Ecotreasures",
    user: {
      id: 0,
      role: "leader",
      name: "John Doe",
      username: "johndoe",
      email: "john.doe@example.com",
      password: "password",
      avatar: "https://avatar.iran.liara.run/public/32",
      created_at: new Date("2025-02-15"),
    },
  },
  {
    id: 2,
    user_id: 0,
    logo: "project_logo3.png",
    cover: "project_cover3.jpg",
    name: "Kollab",
    user: {
      id: 0,
      role: "leader",
      name: "John Doe",
      username: "johndoe",
      email: "john.doe@example.com",
      password: "password",
      avatar: "https://avatar.iran.liara.run/public/32",
      created_at: new Date("2025-02-15"),
    },
  },
];

// Task dummy data
export const tasks: Task[] = [
  {
    id: 0,
    workspace_id: 0,
    user_id: 1,
    title: "Implement Login Functionality",
    deadline: new Date("2025-06-15"),
    priority: "low",
    status: "in progress",
    description:
      "Create a secure login system with email verification and password recovery options. Implement JWT authentication and session management. Test with various user roles and edge cases.",
    created_at: new Date("2025-05-10"),
    workspace: {
      id: 0,
      user_id: 0,
      logo: "project_logo1.png",
      cover: "project_cover1.jpg",
      name: "Educa",
    },
    user: {
      id: 1,
      role: "member",
      name: "Jane Smith",
      username: "janesmith",
      email: "jane.smith@example.com",
      password: "password",
      avatar: "https://avatar.iran.liara.run/public/58",
      created_at: new Date("2025-02-20"),
    },
    subtask: [
      {
        id: 0,
        task_id: 0,
        is_complete: false,
        description: "Create API endpoints for authentication",
      },
    ],
    comment: [
      {
        id: 0,
        task_id: 0,
        user_id: 1,
        comment:
          "I've started working on the authentication API. We should discuss the token expiration policy at our next meeting.",
        date: new Date("2025-05-01"),
        user: {
          id: 1,
          role: "member",
          name: "Jane Smith",
          username: "janesmith",
          email: "jane.smith@example.com",
          password: "password",
          avatar: "https://avatar.iran.liara.run/public/58",
          created_at: new Date("2025-02-20"),
        },
      },
      {
        id: 1,
        task_id: 0,
        user_id: 2,
        comment:
          "Let's use JWT with a 7-day expiration and implement refresh tokens.",
        date: new Date("2025-05-02"),
        user: {
          id: 2,
          role: "member",
          name: "Michael Johnson",
          username: "michaelj",
          email: "michael.johnson@example.com",
          password: "password",
          avatar: "https://avatar.iran.liara.run/public/37",
          created_at: new Date("2025-02-20"),
        },
      },
    ],
  },
  {
    id: 1,
    workspace_id: 1,
    user_id: 2,
    title: "Design Dashboard UI",
    deadline: new Date("2025-05-20"),
    priority: "medium",
    status: "done",
    description:
      "Create a responsive dashboard interface with dark/light mode toggle. Include analytics charts, recent activity feed, and user notification panel.",
    created_at: new Date("2025-05-01"),
    workspace: {
      id: 1,
      user_id: 0,
      logo: "project_logo2.png",
      cover: "project_cover2.jpg",
      name: "Ecotreasures",
    },
    user: {
      id: 2,
      role: "member",
      name: "Michael Johnson",
      username: "michaelj",
      email: "michael.johnson@example.com",
      password: "password",
      avatar: "https://avatar.iran.liara.run/public/37",
      created_at: new Date("2025-02-20"),
    },
    subtask: [
      {
        id: 1,
        task_id: 1,
        is_complete: true,
        description: "Design login form UI",
      },
      {
        id: 2,
        task_id: 1,
        is_complete: true,
        description: "Create wireframes for dashboard layout",
      },
    ],
    comment: [
      {
        id: 2,
        task_id: 1,
        user_id: 0,
        comment:
          "The dashboard UI looks great! Can we add a notification center to the top bar?",
        date: new Date("2025-05-10"),
        user: {
          id: 0,
          role: "leader",
          name: "John Doe",
          username: "johndoe",
          email: "john.doe@example.com",
          password: "password",
          avatar: "https://avatar.iran.liara.run/public/32",
          created_at: new Date("2025-02-15"),
        },
      },
    ],
  },
  {
    id: 2,
    workspace_id: 0,
    user_id: 2,
    title: "Setup Database Schema",
    deadline: new Date("2025-05-30"),
    priority: "high",
    status: "on review",
    description:
      "Design and implement the database schema for the new project management system. Include tables for users, projects, tasks, and comments with appropriate relationships and constraints.",
    created_at: new Date("2025-05-01"),
    workspace: {
      id: 0,
      user_id: 0,
      logo: "project_logo1.png",
      cover: "project_cover1.jpg",
      name: "Educa",
    },
    user: {
      id: 2,
      role: "member",
      name: "Michael Johnson",
      username: "michaelj",
      email: "michael.johnson@example.com",
      password: "password",
      avatar: "https://avatar.iran.liara.run/public/37",
      created_at: new Date("2025-02-20"),
    },
  },
  {
    id: 3,
    workspace_id: 0,
    user_id: 1,
    title: "Implement Login Functionality",
    deadline: new Date("2025-06-15"),
    priority: "urgent",
    status: "in progress",
    description:
      "Create a secure login system with email verification and password recovery options. Implement JWT authentication and session management. Test with various user roles and edge cases.",
    created_at: new Date("2025-05-01"),
    workspace: {
      id: 0,
      user_id: 0,
      logo: "project_logo1.png",
      cover: "project_cover1.jpg",
      name: "Educa",
    },
    user: {
      id: 1,
      role: "member",
      name: "Jane Smith",
      username: "janesmith",
      email: "jane.smith@example.com",
      password: "password",
      avatar: "https://avatar.iran.liara.run/public/58",
      created_at: new Date("2025-02-20"),
    },
  },
  {
    id: 4,
    workspace_id: 0,
    user_id: 2,
    title: "Design Dashboard UI",
    deadline: new Date("2025-05-20"),
    priority: "medium",
    status: "to do",
    description:
      "Create a responsive dashboard interface with dark/light mode toggle. Include analytics charts, recent activity feed, and user notification panel.",
    created_at: new Date("2025-05-01"),
    workspace: {
      id: 0,
      user_id: 0,
      logo: "project_logo1.png",
      cover: "project_cover1.jpg",
      name: "Educa",
    },
    user: {
      id: 2,
      role: "member",
      name: "Michael Johnson",
      username: "michaelj",
      email: "michael.johnson@example.com",
      password: "password",
      avatar: "https://avatar.iran.liara.run/public/37",
      created_at: new Date("2025-02-20"),
    },
  },
  {
    id: 5,
    workspace_id: 1,
    user_id: 2,
    title: "Setup Database Schema",
    deadline: new Date("2025-05-30"),
    priority: "unknown",
    status: "to do",
    description:
      "Design and implement the database schema for the new project management system. Include tables for users, projects, tasks, and comments with appropriate relationships and constraints.",
    created_at: new Date("2025-05-01"),
    workspace: {
      id: 1,
      user_id: 0,
      logo: "project_logo2.png",
      cover: "project_cover2.jpg",
      name: "Ecotreasures",
    },
    user: {
      id: 2,
      role: "member",
      name: "Michael Johnson",
      username: "michaelj",
      email: "michael.johnson@example.com",
      password: "password",
      avatar: "https://avatar.iran.liara.run/public/37",
      created_at: new Date("2025-02-20"),
    },
  },
];

// SubTask dummy data
export const subTasks: SubTask[] = [
  {
    id: 0,
    task_id: 0,
    is_complete: false,
    description: "Create API endpoints for authentication",
  },
  {
    id: 1,
    task_id: 1,
    is_complete: true,
    description: "Design login form UI",
  },
  {
    id: 2,
    task_id: 1,
    is_complete: true,
    description: "Create wireframes for dashboard layout",
  },
];

// Komentar dummy data
export const komentars: Comment[] = [
  {
    id: 0,
    task_id: 0,
    user_id: 1,
    comment:
      "I've started working on the authentication API. We should discuss the token expiration policy at our next meeting.",
    date: new Date("2025-05-01"),
    user: {
      id: 1,
      role: "member",
      name: "Jane Smith",
      username: "janesmith",
      email: "jane.smith@example.com",
      password: "password",
      avatar: "https://avatar.iran.liara.run/public/58",
      created_at: new Date("2025-02-20"),
    },
  },
  {
    id: 1,
    task_id: 0,
    user_id: 2,
    comment:
      "Let's use JWT with a 7-day expiration and implement refresh tokens.",
    date: new Date("2025-05-02"),
    user: {
      id: 2,
      role: "member",
      name: "Michael Johnson",
      username: "michaelj",
      email: "michael.johnson@example.com",
      password: "password",
      avatar: "https://avatar.iran.liara.run/public/37",
      created_at: new Date("2025-02-20"),
    },
  },
  {
    id: 2,
    task_id: 1,
    user_id: 0,
    comment:
      "The dashboard UI looks great! Can we add a notification center to the top bar?",
    date: new Date("2025-05-10"),
    user: {
      id: 0,
      role: "leader",
      name: "John Doe",
      username: "johndoe",
      email: "john.doe@example.com",
      password: "password",
      avatar: "https://avatar.iran.liara.run/public/32",
      created_at: new Date("2025-02-15"),
    },
  },
];

export const data = {
  workspaces: 1, // semua workspace berdasarkan team
  tasks: 11, // semua task bulan ini 
  people: 10, // semua orang di team
  tasksDone: 10, // semua task yang sudah selesai dibulan ini 
  myTask: [
    {
    id: 0,
    workspace_id: 0,
    user_id: 1,
    title: "Implement Login Functionality",
    deadline: new Date("2025-06-15"),
    priority: "low",
    status: "in progress",
    description:
      "Create a secure login system with email verification and password recovery options. Implement JWT authentication and session management. Test with various user roles and edge cases.",
  },
  {
    id: 1,
    workspace_id: 1,
    user_id: 2,
    title: "Design Dashboard UI",
    deadline: new Date("2025-05-20"),
    priority: "medium",
    status: "done",
    description:
      "Create a responsive dashboard interface with dark/light mode toggle. Include analytics charts, recent activity feed, and user notification panel.",
  },
  ],
  chartData: [
    { month: "Desember", todo: 1, inProgress: 4, onReview: 5, done: 8 },
    { month: "January", todo: 2, inProgress: 7, onReview: 2, done: 11 },
    { month: "February", todo: 0, inProgress: 1, onReview: 7, done: 7 },
    { month: "March", todo: 7, inProgress: 3, onReview: 2, done: 5 },
    { month: "April", todo: 3, inProgress: 7, onReview: 2, done: 10 },
    { month: "May", todo: 4, inProgress: 5, onReview: 1, done: 13 },
  ],
};
