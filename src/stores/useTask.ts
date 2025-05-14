import { toast } from "@/hooks/use-toast";
import { ICommentData, ITaskData, Response, Task } from "@/types/types";
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

interface ITaskStore {
  tasks: Task[] | null;
  task: Task | null;
  loading: boolean;
  loadingComment: boolean;
  getAllTask: () => Promise<Response<Task[]>>;
  getTask: (id: string) => Promise<Response<Task>>;
  createTask: (taskData: ITaskData, id: string) => Promise<Response<null>>;
  updateTask: (taskData: ITaskData, id: string) => Promise<Response<null>>;
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
  tasks: null,
  task: null,
  loading: false,
  loadingComment: false,
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
    try {
      set(() => ({ loading: true }));

      const { success, message } = await createComment(commentData, taskId);
      if (!success) {
        throw new Error(message);
      }

      toast({
        title: "Comment Created",
        description: "You’ve successfully added a new comment.",
      });
      return { message, success: true };
    } catch (error) {
      const message = getErrorMessage(error);
      toast({
        variant: "destructive",
        title: "Oops, Something Went Wrong",
        description: message || "Failed to create comment.",
      });
      return { message, success: false };
    } finally {
      set(() => ({ loading: false }));
    }
  },
  deleteComment: async (id: string) => {
    try {
      set(() => ({ loading: true }));

      const { success, message } = await deleteComment(id);
      if (!success) {
        throw new Error(message);
      }

      toast({
        title: "Comment Deleted",
        description: "You’ve successfully deleted the comment.",
      });
      return { message, success: true };
    } catch (error) {
      const message = getErrorMessage(error);
      toast({
        variant: "destructive",
        title: "Oops, Something Went Wrong",
        description: message || "Failed to delete comment.",
      });
      return { message, success: false };
    } finally {
      set(() => ({ loading: false }));
    }
  },
  createSubtask: async (subtaskData: { description: string }, taskId: string) => {
    try {
      set(() => ({ loading: true }));

      const { success, message } = await createSubtask(subtaskData, taskId);
      if (!success) {
        throw new Error(message);
      }

      toast({
        title: "Subtask Created",
        description: "You’ve successfully added a new subtask.",
      });
      return { message, success: true };
    } catch (error) {
      const message = getErrorMessage(error);
      toast({
        variant: "destructive",
        title: "Oops, Something Went Wrong",
        description: message || "Failed to create subtask.",
      });
      return { message, success: false };
    } finally {
      set(() => ({ loading: false }));
    }
  },
  updateSubtask: async (subtaskData: { is_complete: boolean }, subtaskId: string) => {
    try {
      set(() => ({ loading: true }));

      const { success, message } = await updateSubtask(subtaskData, subtaskId);
      if (!success) {
        throw new Error(message);
      }

      toast({
        title: "Subtask Updated",
        description: "You’ve successfully updated a subtask.",
      });
      return { message, success: true };
    } catch (error) {
      const message = getErrorMessage(error);
      toast({
        variant: "destructive",
        title: "Oops, Something Went Wrong",
        description: message || "Failed to update subtask.",
      });
      return { message, success: false };
    } finally {
      set(() => ({ loading: false }));
    }
  },
  deleteSubtask: async (id: string) => {
    try {
      set(() => ({ loading: true }));

      const { success, message } = await deleteSubtask(id);
      if (!success) {
        throw new Error(message);
      }

      toast({
        title: "Subtask Deleted",
        description: "You’ve successfully deleted the subtask.",
      });
      return { message, success: true };
    } catch (error) {
      const message = getErrorMessage(error);
      toast({
        variant: "destructive",
        title: "Oops, Something Went Wrong",
        description: message || "Failed to delete subtask.",
      });
      return { message, success: false };
    } finally {
      set(() => ({ loading: false }));
    }
  },
}));

// Subscribe untuk mengecek perubahan state
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unsubscribe = useTask.subscribe((state) => {
  console.log("State Auth:", state);
});

export default useTask;
