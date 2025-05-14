// User Interface
export interface User {
  id?: number;
  role?: string;
  name: string;
  username?: string;
  email: string;
  password?: string;
  avatar: string;
  created_at?: Date;
}

// Team Interface
export interface Team {
  id: number;
  user_id: number;
  name: string;
  user?: User;
}

// Member Interface
export interface Member {
  id: number;
  user_id: number;
  team_id: number;
  user?: User;
  team?: Team;
}

// Workspace Interface
export interface Workspace {
  id: number;
  user_id?: number;
  name: string;
  logo: string;
  cover: string;
  user?: User;
  task?: Task[];
}

// Task Interface
export interface Task {
  id: number;
  workspace_id: number;
  user_id: number;
  title: string;
  deadline: Date;
  priority: string;
  status: string;
  description: string;
  created_at?: Date;
  workspace?: Workspace;
  user?: User;
  subtask?: SubTask[];
  comment?: Comment[];
}

// SubTask Interface
export interface SubTask {
  id: number;
  task_id: number;
  is_complete: boolean;
  description: string;
  task?: Task[];
}

// Comment Interface
export interface Comment {
  id: number;
  task_id: number;
  user_id: number;
  comment: string;
  date: Date;
  user?: User;
  task?: Task;
}

export interface ICommentData {
  comment: string;
}

export type PriorityType = "urgent" | "high" | "medium" | "low" | "unknown";
export type StatusType = "in progress" | "on review" | "done" | "to do";

export const enumPriorityType = ["urgent", "high", "medium", "low", "unknown"];
export const enumStatusType = ["in progress", "on review", "done", "to do"];

export interface Response<T> {
  message: string;
  success: boolean;
  data?: T;
}

export interface Credential {
  email: string;
  password: string;
}

export interface RegisterData {
  name_team: string;
  name: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface IUploadFile {
  loading: boolean;
  uploadProgress: number;
  uploadFile: (
    file: File,
    onUploadProgress?: (progress: number) => void
  ) => Promise<string | null>;
}

export interface ICreatePerson extends User {
  confirm_password: string;
}

export interface ITaskData {
  user_id: string;
  title: string;
  deadline: Date;
  priority: string;
  status: string;
  description: string;
  subtask?: SubTask[];
}

export interface ISubtaskData {
  id: number;
  is_complete: boolean;
  description: string;
}

export interface IWorkspaceData {
  name: string;
  logo: string;
  cover: string;
}

export interface IUpdateProfile {
  name: string;
  username: string;
  email: string;
  avatar: string;
}

export interface IUpdatePassword {
  current_password: string;
  new_password: string;
  confirm_pass: string;
}
