import { toast } from "@/hooks/use-toast";
import {
  Comment,
  ICommentData,
  ITaskData,
  PriorityType,
  Response,
  StatusType,
  SubTask,
  Task,
  User,
} from "@/types/types";
import {
  createComment,
  createSubtask,
  createTask,
  deleteComment,
  deleteSubtask,
  deleteTask,
  getAllTask,
  getTask,
  updateSubtask,
  updateTask,
} from "@/utils/api";
import getErrorMessage from "@/utils/error";
import { create, StoreApi, UseBoundStore } from "zustand";
import useAuth from "./useAuth";

interface ITaskStore {
  tasks: Task[] | [];
  task: Task | null;
  comment: Comment[] | [];
  subtask: SubTask[] | [];
  assignedTo: User | null;
  priority: PriorityType;
  status: StatusType;
  loading: boolean;
  loadingComment: boolean;
  loadingSubtask: boolean;
  getAllTask: () => Promise<Response<Task[]>>;
  getTask: (id: string) => Promise<Response<Task>>;
  createTask: (taskData: ITaskData, id: string) => Promise<Response<null>>;
  updateTask: (taskData: ITaskData, id: string) => Promise<Response<null>>;
  updateAssigned: (taskData: ITaskData, id: string) => Promise<Response<null>>;
  updatePriority: (taskData: ITaskData, id: string) => Promise<Response<null>>;
  updateStatus: (taskData: ITaskData, id: string) => Promise<Response<null>>;
  deleteTask: (id: string) => Promise<void>;
  resetTask: () => void;
  createComment: (
    commentData: ICommentData,
    taskId: string
  ) => Promise<Response<null>>;
  deleteComment: (id: string) => Promise<Response<null>>;
  createSubtask: (
    { description }: { description: string },
    taskId: string
  ) => Promise<Response<null>>;
  updateSubtask: (
    { is_complete }: { is_complete: boolean },
    taskId: string
  ) => Promise<Response<null>>;
  deleteSubtask: (id: string) => Promise<Response<null>>;
}

const useTask: UseBoundStore<StoreApi<ITaskStore>> = create((set, get) => ({
  tasks: [],
  task: null,
  comment: [],
  subtask: [],
  assignedTo: null,
  priority: "unknown",
  status: "to do",
  loading: false,
  loadingComment: false,
  loadingSubtask: false,
  getAllTask: async () => {
    try {
      set(() => ({ loading: true }));
      const { success, message, data } = await getAllTask();
      if (!success) {
        throw new Error(message);
      }

      set(() => ({ tasks: data }));
      return { message, success: true };
    } catch (error) {
      const message = getErrorMessage(error);
      return { message, success: false };
    } finally {
      set(() => ({ loading: false }));
    }
  },
  getTask: async (id: string) => {
    try {
      set(() => ({ loading: true }));
      const { success, message, data } = await getTask(id);
      if (!success) {
        throw new Error(message);
      }

      set(() => ({ task: data }));
      set(() => ({ comment: data.comment }));
      set(() => ({ subtask: data.subtask }));
      set(() => ({ assignedTo: data.user }));
      set(() => ({ priority: data.priority as PriorityType }));
      set(() => ({ status: data.status as StatusType }));

      return { message, success: true };
    } catch (error) {
      const message = getErrorMessage(error);
      return { message, success: false };
    } finally {
      set(() => ({ loading: false }));
    }
  },
  createTask: async (taskData: ITaskData, id: string) => {
    try {
      set(() => ({ loading: true }));
      const { success, message } = await createTask(taskData, id);
      if (!success) {
        throw new Error(message);
      }
      toast({
        title: "Task Created",
        description: "You’ve successfully added a task.",
      });
      return { message, success: true };
    } catch (error) {
      const message = getErrorMessage(error);
      toast({
        variant: "destructive",
        title: "Oops, Something Went Wrong",
        description: message || "Something went wrong. Please try again.",
      });
      return { message, success: false };
    } finally {
      set(() => ({ loading: false }));
    }
  },
  updateTask: async (taskData: ITaskData, id: string) => {
    try {
      set(() => ({ loading: true }));
      const { success, message } = await updateTask(taskData, id);
      if (!success) {
        throw new Error(message);
      }
      toast({
        title: "Task Updated",
        description: "You’ve successfully updated a task.",
      });
      return { message, success: true };
    } catch (error) {
      const message = getErrorMessage(error);
      toast({
        variant: "destructive",
        title: "Oops, Something Went Wrong",
        description: message || "Something went wrong. Please try again.",
      });
      return { message, success: false };
    } finally {
      set(() => ({ loading: false }));
    }
  },
  updateAssigned: async (taskData: ITaskData, id: string) => {
    const prevAssigned = get().assignedTo;
    try {
      
      const { user, ...taskDataWithoutUser } = taskData;
      set(() => ({ assignedTo: user }));

      const { success, message } = await updateTask(taskDataWithoutUser, id);
      if (!success) {
        throw new Error(message);
      }
      return { message, success: true };
    } catch (error) {
      set(() => ({ assignedTo: prevAssigned }));
      const message = getErrorMessage(error);
      toast({
        variant: "destructive",
        title: "Oops, Something Went Wrong",
        description: message || "Something went wrong. Please try again.",
      });
      return { message, success: false };
    }
  },
  updatePriority: async (taskData: ITaskData, id: string) => {
    try {
      set(() => ({ priority: taskData.priority as PriorityType }));

      const { success, message } = await updateTask(taskData, id);
      if (!success) {
        throw new Error(message);
      }
      return { message, success: true };
    } catch (error) {
      const message = getErrorMessage(error);
      toast({
        variant: "destructive",
        title: "Oops, Something Went Wrong",
        description: message || "Something went wrong. Please try again.",
      });
      return { message, success: false };
    }
  },
  updateStatus: async (taskData: ITaskData, id: string) => {
    const prevStatus = get().status;
    try {
      set(() => ({ status: taskData.status as StatusType }));

      const { success, message } = await updateTask(taskData, id);
      if (!success) {
        throw new Error(message);
      }
      return { message, success: true };
    } catch (error) {
      set(() => ({ status: prevStatus }));
      const message = getErrorMessage(error);
      toast({
        variant: "destructive",
        title: "Oops, Something Went Wrong",
        description: message || "Something went wrong. Please try again.",
      });
      return { message, success: false };
    }
  },
  deleteTask: async (id: string) => {
    try {
      set(() => ({ loading: true }));
      const { success, message } = await deleteTask(id);
      if (!success) {
        throw new Error(message);
      }

      set(() => ({
        tasks: get().tasks?.filter((task) => task.id !== parseInt(id)),
      }));
      toast({
        title: "Task Deleted",
        description: "You’ve successfully deleted task.",
      });
    } catch (error) {
      const message = getErrorMessage(error);
      toast({
        variant: "destructive",
        title: "Oops, Something Went Wrong",
        description: message || "Something went wrong. Please try again.",
      });
    } finally {
      set(() => ({ loading: false }));
    }
  },
  resetTask: () => {
    set(() => ({
      task: null,
    }));
  },
  createComment: async (commentData: ICommentData, taskId: string) => {
    const prevComment = get().comment;
    try {
      set(() => ({ loadingComment: true }));

      const { dataUser } = useAuth.getState();

      const newComment = {
        id: Math.random(),
        comment: commentData.comment,
        user: dataUser,
        date: new Date(),
      };

      set((state) => ({
        comment: [...state.comment, newComment as Comment],
      }));

      const { success, message } = await createComment(commentData, taskId);
      if (!success) {
        throw new Error(message);
      }

      return { message, success: true };
    } catch (error) {
      set(() => ({
        comment: prevComment,
      }));
      const message = getErrorMessage(error);
      toast({
        variant: "destructive",
        title: "Oops, Something Went Wrong",
        description: message || "Failed to create comment.",
      });
      return { message, success: false };
    } finally {
      set(() => ({ loadingComment: false }));
    }
  },
  deleteComment: async (id: string) => {
    const prevComment = get().comment;
    try {
      set(() => ({ loadingComment: true }));

      set((state) => ({
        comment: state.comment.filter((c) => c.id?.toString() !== id),
      }));

      const { success, message } = await deleteComment(id);
      if (!success) {
        throw new Error(message);
      }

      return { message, success: true };
    } catch (error) {
      set(() => ({
        comment: prevComment,
      }));
      const message = getErrorMessage(error);
      toast({
        variant: "destructive",
        title: "Oops, Something Went Wrong",
        description: message || "Failed to delete comment.",
      });
      return { message, success: false };
    } finally {
      set(() => ({ loadingComment: false }));
    }
  },
  createSubtask: async (
    subtaskData: { description: string },
    taskId: string
  ) => {
    const prevSubtask = get().subtask;
    try {
      set(() => ({ loadingSubtask: true }));

      const idRandom = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
      const newSubtask = {
        id: idRandom,
        description: subtaskData.description,
        is_complete: false,
      };

      set((state) => ({
        subtask: [...state.subtask, newSubtask as SubTask],
      }));

      const { success, message, data } = await createSubtask(
        subtaskData,
        taskId
      );
      if (!success) {
        throw new Error(message);
      }

      set((state) => ({
        subtask: state.subtask.map((s) =>
          s.id === idRandom ? { ...s, id: data.id } : s
        ),
      }));

      toast({
        title: "Subtask Created",
        description: "You’ve successfully added a new subtask.",
      });
      return { message, success: true };
    } catch (error) {
      set(() => ({
        subtask: prevSubtask,
      }));
      const message = getErrorMessage(error);
      toast({
        variant: "destructive",
        title: "Oops, Something Went Wrong",
        description: message || "Failed to create subtask.",
      });
      return { message, success: false };
    } finally {
      set(() => ({ loadingSubtask: false }));
    }
  },
  updateSubtask: async (
    subtaskData: { is_complete: boolean },
    subtaskId: string
  ) => {
    const prevSubtask = get().subtask;
    try {
      set(() => ({ loadingSubtask: true }));

      set((state) => ({
        subtask: state.subtask.map((s) =>
          s.id?.toString() === subtaskId
            ? { ...s, is_complete: subtaskData.is_complete }
            : s
        ),
      }));

      const { success, message } = await updateSubtask(subtaskData, subtaskId);
      if (!success) {
        throw new Error(message);
      }

      return { message, success: true };
    } catch (error) {
      set(() => ({
        subtask: prevSubtask,
      }));
      const message = getErrorMessage(error);
      toast({
        variant: "destructive",
        title: "Oops, Something Went Wrong",
        description: message || "Failed to update subtask.",
      });
      return { message, success: false };
    } finally {
      set(() => ({ loadingSubtask: false }));
    }
  },
  deleteSubtask: async (id: string) => {
    const prevSubtask = get().subtask;
    try {
      set(() => ({ loadingSubtask: true }));

      set((state) => ({
        subtask: state.subtask.filter((s) => s.id?.toString() !== id),
      }));

      const { success, message } = await deleteSubtask(id);
      if (!success) {
        throw new Error(message);
      }

      return { message, success: true };
    } catch (error) {
      set(() => ({
        subtask: prevSubtask,
      }));
      const message = getErrorMessage(error);
      toast({
        variant: "destructive",
        title: "Oops, Something Went Wrong",
        description: message || "Failed to delete subtask.",
      });
      return { message, success: false };
    } finally {
      set(() => ({ loadingSubtask: false }));
    }
  },
}));

// Subscribe untuk mengecek perubahan state
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unsubscribe = useTask.subscribe((state) => {
  console.log("State Auth:", state);
});
void unsubscribe;

export default useTask;
