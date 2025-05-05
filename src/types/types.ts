// User Interface
export interface User {
  user_id: string;
  role: string;
  name: string;
  username?: string;
  email: string;
  password?: string;
  avatar: string;
  created_at: Date;
}

// Team Interface
export interface Team {
  team_id: string;
  user_id: string;
  name: string;
}

// Member Interface
export interface Member {
  member_id: string;
  user_id: string;
  team_id: string;
}

// Workspace Interface
export interface Workspace {
  project_id: string;
  user_id: string;
  logo: string;
  cover: string;
  title: string;
}

// Task Interface
export interface Task {
  task_id: string;
  project_id: string;
  user_id: string;
  title: string;
  deadline: Date;
  priority: string;
  status: string;
  description: string;
  created_at: Date;
}

// SubTask Interface
export interface SubTask {
  sub_task_id: string;
  task_id: string;
  is_complete: boolean;
  description: string;
}

// Komentar Interface
export interface Komentar {
  komentar_id: string;
  task_id: string;
  user_id: string;
  comment: string;
  date: Date;
}
