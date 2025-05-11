import {
  User,
  Team,
  Member,
  Workspace,
  Task,
  SubTask,
  Komentar,
} from "@/types/types";

// User dummy data
export const users: User[] = [
  {
    user_id: "user_1",
    role: "leader",
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    password: "password",
    avatar: "https://avatar.iran.liara.run/public/32",
    created_at: new Date("2025-02-15"),
  },
  {
    user_id: "user_2",
    role: "member",
    name: "Jane Smith",
    username: "janesmith",
    email: "jane.smith@example.com",
    password: "password",
    avatar: "https://avatar.iran.liara.run/public/58",
    created_at: new Date("2025-02-20"),
  },
  {
    user_id: "user_3",
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
    team_id: "team_1",
    user_id: "user_1",
    name: "Koderra",
  },
];

// Member dummy data
export const members: Member[] = [
  {
    member_id: "mem_1",
    user_id: "user_1",
    team_id: "team_1",
    user: {
      user_id: "user_1",
      role: "leader",
      name: "John Doe",
      username: "johndoe",
      email: "john.doe@example.com",
      password: "password",
      avatar: "https://avatar.iran.liara.run/public/32",
      created_at: new Date("2025-02-15"),
    },
    team: {
      team_id: "team_1",
      user_id: "user_1",
      name: "Koderra",
    },
  },
  {
    member_id: "mem_2",
    user_id: "user_2",
    team_id: "team_1",
    user: {
      user_id: "user_2",
      role: "member",
      name: "Jane Smith",
      username: "janesmith",
      email: "jane.smith@example.com",
      password: "password",
      avatar: "https://avatar.iran.liara.run/public/58",
      created_at: new Date("2025-02-20"),
    },
    team: {
      team_id: "team_1",
      user_id: "user_1",
      name: "Koderra",
    },
  },
  {
    member_id: "mem_3",
    user_id: "user_3",
    team_id: "team_1",
    user: {
      user_id: "user_3",
      role: "member",
      name: "Michael Johnson",
      username: "michaelj",
      email: "michael.johnson@example.com",
      password: "password",
      avatar: "https://avatar.iran.liara.run/public/37",
      created_at: new Date("2025-02-20"),
    },
    team: {
      team_id: "team_1",
      user_id: "user_1",
      name: "Koderra",
    },
  },
];

// Workspace dummy data
export const workspaces: Workspace[] = [
  {
    project_id: "proj_1",
    user_id: "user_1",
    logo: "project_logo1.png",
    cover: "project_cover1.jpg",
    title: "Educa",
    user: {
      user_id: "user_1",
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
    project_id: "proj_2",
    user_id: "user_1",
    logo: "project_logo2.png",
    cover: "project_cover2.jpg",
    title: "Ecotreasures",
    user: {
      user_id: "user_1",
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
    project_id: "proj_3",
    user_id: "user_1",
    logo: "project_logo3.png",
    cover: "project_cover3.jpg",
    title: "Kollab",
    user: {
      user_id: "user_1",
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
    task_id: "task_1",
    project_id: "proj_1",
    user_id: "user_2",
    title: "Implement Login Functionality",
    deadline: new Date("2025-06-15"),
    priority: "low",
    status: "in progress",
    description:
      "Create a secure login system with email verification and password recovery options. Implement JWT authentication and session management. Test with various user roles and edge cases.",
    created_at: new Date("2025-05-10"),
    project: {
      project_id: "proj_1",
      user_id: "user_1",
      logo: "project_logo1.png",
      cover: "project_cover1.jpg",
      title: "Educa",
    },
    user: {
      user_id: "user_2",
      role: "member",
      name: "Jane Smith",
      username: "janesmith",
      email: "jane.smith@example.com",
      password: "password",
      avatar: "https://avatar.iran.liara.run/public/58",
      created_at: new Date("2025-02-20"),
    },
    sub_tasks: [
      {
        sub_task_id: "subtask_1",
        task_id: "task_1",
        is_complete: false,
        description: "Create API endpoints for authentication",
      },
    ],
    komentars: [
      {
        komentar_id: "com_1",
        task_id: "task_1",
        user_id: "user_2",
        comment:
          "I've started working on the authentication API. We should discuss the token expiration policy at our next meeting.",
        date: new Date("2025-05-01"),
        user: {
          user_id: "user_2",
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
        komentar_id: "com_2",
        task_id: "task_1",
        user_id: "user_3",
        comment:
          "Let's use JWT with a 7-day expiration and implement refresh tokens.",
        date: new Date("2025-05-02"),
        user: {
          user_id: "user_3",
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
    task_id: "task_2",
    project_id: "proj_2",
    user_id: "user_3",
    title: "Design Dashboard UI",
    deadline: new Date("2025-05-20"),
    priority: "medium",
    status: "done",
    description:
      "Create a responsive dashboard interface with dark/light mode toggle. Include analytics charts, recent activity feed, and user notification panel.",
    created_at: new Date("2025-05-01"),
    project: {
      project_id: "proj_2",
      user_id: "user_1",
      logo: "project_logo2.png",
      cover: "project_cover2.jpg",
      title: "Ecotreasures",
    },
    user: {
      user_id: "user_3",
      role: "member",
      name: "Michael Johnson",
      username: "michaelj",
      email: "michael.johnson@example.com",
      password: "password",
      avatar: "https://avatar.iran.liara.run/public/37",
      created_at: new Date("2025-02-20"),
    },
    sub_tasks: [
      {
        sub_task_id: "subtask_2",
        task_id: "task_2",
        is_complete: true,
        description: "Design login form UI",
      },
      {
        sub_task_id: "subtask_3",
        task_id: "task_2",
        is_complete: true,
        description: "Create wireframes for dashboard layout",
      },
    ],
    komentars: [
      {
        komentar_id: "com_3",
        task_id: "task_2",
        user_id: "user_1",
        comment:
          "The dashboard UI looks great! Can we add a notification center to the top bar?",
        date: new Date("2025-05-10"),
        user: {
          user_id: "user_1",
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
    task_id: "task_3",
    project_id: "proj_1",
    user_id: "user_3",
    title: "Setup Database Schema",
    deadline: new Date("2025-05-30"),
    priority: "high",
    status: "on review",
    description:
      "Design and implement the database schema for the new project management system. Include tables for users, projects, tasks, and comments with appropriate relationships and constraints.",
    created_at: new Date("2025-05-01"),
    project: {
      project_id: "proj_1",
      user_id: "user_1",
      logo: "project_logo1.png",
      cover: "project_cover1.jpg",
      title: "Educa",
    },
    user: {
      user_id: "user_3",
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
    task_id: "task_4",
    project_id: "proj_1",
    user_id: "user_2",
    title: "Implement Login Functionality",
    deadline: new Date("2025-06-15"),
    priority: "urgent",
    status: "in progress",
    description:
      "Create a secure login system with email verification and password recovery options. Implement JWT authentication and session management. Test with various user roles and edge cases.",
    created_at: new Date("2025-05-01"),
    project: {
      project_id: "proj_1",
      user_id: "user_1",
      logo: "project_logo1.png",
      cover: "project_cover1.jpg",
      title: "Educa",
    },
    user: {
      user_id: "user_2",
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
    task_id: "task_5",
    project_id: "proj_1",
    user_id: "user_3",
    title: "Design Dashboard UI",
    deadline: new Date("2025-05-20"),
    priority: "medium",
    status: "to do",
    description:
      "Create a responsive dashboard interface with dark/light mode toggle. Include analytics charts, recent activity feed, and user notification panel.",
    created_at: new Date("2025-05-01"),
    project: {
      project_id: "proj_1",
      user_id: "user_1",
      logo: "project_logo1.png",
      cover: "project_cover1.jpg",
      title: "Educa",
    },
    user: {
      user_id: "user_3",
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
    task_id: "task_6",
    project_id: "proj_2",
    user_id: "user_3",
    title: "Setup Database Schema",
    deadline: new Date("2025-05-30"),
    priority: "unknown",
    status: "to do",
    description:
      "Design and implement the database schema for the new project management system. Include tables for users, projects, tasks, and comments with appropriate relationships and constraints.",
    created_at: new Date("2025-05-01"),
    project: {
      project_id: "proj_2",
      user_id: "user_1",
      logo: "project_logo2.png",
      cover: "project_cover2.jpg",
      title: "Ecotreasures",
    },
    user: {
      user_id: "user_3",
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
    sub_task_id: "subtask_1",
    task_id: "task_1",
    is_complete: false,
    description: "Create API endpoints for authentication",
  },
  {
    sub_task_id: "subtask_2",
    task_id: "task_2",
    is_complete: true,
    description: "Design login form UI",
  },
  {
    sub_task_id: "subtask_3",
    task_id: "task_2",
    is_complete: true,
    description: "Create wireframes for dashboard layout",
  },
];

// Komentar dummy data
export const komentars: Komentar[] = [
  {
    komentar_id: "com_1",
    task_id: "task_1",
    user_id: "user_2",
    comment:
      "I've started working on the authentication API. We should discuss the token expiration policy at our next meeting.",
    date: new Date("2025-05-01"),
    user: {
      user_id: "user_2",
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
    komentar_id: "com_2",
    task_id: "task_1",
    user_id: "user_3",
    comment:
      "Let's use JWT with a 7-day expiration and implement refresh tokens.",
    date: new Date("2025-05-02"),
    user: {
      user_id: "user_3",
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
    komentar_id: "com_3",
    task_id: "task_2",
    user_id: "user_1",
    comment:
      "The dashboard UI looks great! Can we add a notification center to the top bar?",
    date: new Date("2025-05-10"),
    user: {
      user_id: "user_1",
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
