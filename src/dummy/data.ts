import { User, Team, Member, Workspace, Task, SubTask, Komentar } from '@/types/types';

// User dummy data
export const users: User[] = [
  {
    user_id: "usr_123456789012345",
    role: "admin",
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    password: "hashed_password_here_123456789012345678901234567890",
    avatar: "avatar_john.jpg"
  },
  {
    user_id: "usr_234567890123456",
    role: "developer",
    name: "Jane Smith",
    username: "janesmith",
    email: "jane.smith@example.com",
    password: "hashed_password_here_234567890123456789012345678901",
    avatar: "avatar_jane.jpg"
  },
  {
    user_id: "usr_345678901234567",
    role: "manager",
    name: "Michael Johnson",
    username: "michaelj",
    email: "michael.johnson@example.com",
    password: "hashed_password_here_345678901234567890123456789012",
    avatar: "avatar_michael.jpg"
  }
];

// Team dummy data
export const teams: Team[] = [
  {
    team_id: "team_12345",
    user_id: "usr_123456789012345",
    name: "Frontend Team"
  },
  {
    team_id: "team_23456",
    user_id: "usr_234567890123456",
    name: "Backend Team"
  },
  {
    team_id: "team_34567",
    user_id: "usr_345678901234567",
    name: "UI/UX Team"
  }
];

// Member dummy data
export const members: Member[] = [
  {
    member_id: "mem_12345",
    user_id: "usr_123456789012345",
    team_id: "team_23456"
  },
  {
    member_id: "mem_23456",
    user_id: "usr_234567890123456",
    team_id: "team_12345"
  },
  {
    member_id: "mem_34567",
    user_id: "usr_345678901234567",
    team_id: "team_34567"
  }
];

// Workspace dummy data
export const workspaces: Workspace[] = [
  {
    project_id: "proj_123456789",
    user_id: "usr_123456789012345",
    logo: "project_logo1.png",
    cover: "project_cover1.jpg"
  },
  {
    project_id: "proj_234567890",
    user_id: "usr_234567890123456",
    logo: "project_logo2.png",
    cover: "project_cover2.jpg"
  },
  {
    project_id: "proj_345678901",
    user_id: "usr_345678901234567",
    logo: "project_logo3.png",
    cover: "project_cover3.jpg"
  }
];

// Task dummy data
export const tasks: Task[] = [
  {
    task_id: "task_123456789012345678901234567",
    project_id: "proj_123456789",
    user_id: "usr_123456789012345",
    title: "Implement Login Functionality",
    deadline: new Date("2025-06-15"),
    priority: "high",
    status: "in progress",
    description: "Create a secure login system with email verification and password recovery options. Implement JWT authentication and session management. Test with various user roles and edge cases."
  },
  {
    task_id: "task_234567890123456789012345678",
    project_id: "proj_123456789",
    user_id: "usr_234567890123456",
    title: "Design Dashboard UI",
    deadline: new Date("2025-05-20"),
    priority: "medium",
    status: "completed",
    description: "Create a responsive dashboard interface with dark/light mode toggle. Include analytics charts, recent activity feed, and user notification panel."
  },
  {
    task_id: "task_345678901234567890123456789",
    project_id: "proj_234567890",
    user_id: "usr_345678901234567",
    title: "Setup Database Schema",
    deadline: new Date("2025-05-30"),
    priority: "high",
    status: "pending",
    description: "Design and implement the database schema for the new project management system. Include tables for users, projects, tasks, and comments with appropriate relationships and constraints."
  }
];

// SubTask dummy data
export const subTasks: SubTask[] = [
  {
    sub_task_id: "subtask_1234567890123456789012345678901",
    task_id: "task_123456789012345678901234567",
    is_complete: false,
    description: "Create API endpoints for authentication"
  },
  {
    sub_task_id: "subtask_2345678901234567890123456789012",
    task_id: "task_123456789012345678901234567",
    is_complete: true,
    description: "Design login form UI"
  },
  {
    sub_task_id: "subtask_3456789012345678901234567890123",
    task_id: "task_234567890123456789012345678",
    is_complete: true,
    description: "Create wireframes for dashboard layout"
  }
];

// Komentar dummy data
export const komentars: Komentar[] = [
  {
    komentar_id: "com_12345678901234567",
    task_id: "task_123456789012345678901234567",
    user_id: "usr_234567890123456",
    comment: "I've started working on the authentication API. We should discuss the token expiration policy at our next meeting.",
    date: new Date("2025-05-01")
  },
  {
    komentar_id: "com_23456789012345678",
    task_id: "task_123456789012345678901234567",
    user_id: "usr_345678901234567",
    comment: "Let's use JWT with a 7-day expiration and implement refresh tokens.",
    date: new Date("2025-05-02")
  },
  {
    komentar_id: "com_34567890123456789",
    task_id: "task_234567890123456789012345678",
    user_id: "usr_123456789012345",
    comment: "The dashboard UI looks great! Can we add a notification center to the top bar?",
    date: new Date("2025-05-10")
  }
];
