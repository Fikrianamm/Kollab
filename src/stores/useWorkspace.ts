/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from "@/hooks/use-toast";
import {
  IWorkspaceData,
  Response,
  StatusType,
  Task,
  Workspace,
} from "@/types/types";
import {
  createWorkspace,
  deleteWorkspace,
  getAllWorkspace,
  getWorkspace,
  updateTaskStatus as apiUpdateTaskStatus,
  updateWorkspace,
  updateTaskStatus,
} from "@/utils/api";
import getErrorMessage from "@/utils/error";
import { create, StoreApi, UseBoundStore } from "zustand";

interface IWorkspaceStore {
  workspaces: Workspace[] | [];
  workspace: Workspace | null;
  loading: boolean;
  getAllWorkspace: () => Promise<Response<null>>;
  getWorkspace: (id: string) => Promise<Response<Workspace>>;
  createWorkspace: (workspaceData: IWorkspaceData) => Promise<Response<null>>;
  updateWorkspace: (
    workspaceData: IWorkspaceData,
    id: string
  ) => Promise<Response<null>>;
  deleteWorkspace: (id: string) => Promise<Response<null>>;
  resetWorkspace: () => void;
  updateTaskStatus: (
    taskId: string,
    newStatus: StatusType
  ) => Promise<Response<null>>;
}

const useWorkspace: UseBoundStore<StoreApi<IWorkspaceStore>> = create(
  (set, get) => ({
    workspaces: [],
    workspace: null,
    loading: false,
    getAllWorkspace: async () => {
      try {
        set(() => ({ loading: true }));
        const { success, message, data } = await getAllWorkspace();
        if (!success) {
          throw new Error(message);
        }
        set(() => ({ workspaces: data.workspaces }));
        return { message, success: true };
      } catch (error) {
        const message = getErrorMessage(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: message || "Failed to fetch workspaces.",
        });
        return { message, success: false };
      } finally {
        set(() => ({ loading: false }));
      }
    },
    getWorkspace: async (id: string) => {
      try {
        set(() => ({ loading: true }));
        const { success, message, data } = await getWorkspace(id);
        if (!success) {
          throw new Error(message);
        }
        set(() => ({ workspace: data.workspace }));
        return { message, success: true, data: data.workspace };
      } catch (error) {
        const message = getErrorMessage(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: message || "Failed to fetch workspace.",
        });
        return { message, success: false };
      } finally {
        set(() => ({ loading: false }));
      }
    },
    createWorkspace: async (workspaceData: IWorkspaceData) => {
      const previousWorkspaces = get().workspaces;
      try {
        set(() => ({ loading: true }));
        // Store current state for rollback
        // Optimistically add a temporary workspace
        const tempId = Math.random();
        const tempWorkspace: Workspace = {
          id: tempId,
          ...workspaceData,
        };
        set((state) => ({
          workspaces: [...state.workspaces, tempWorkspace],
        }));

        const { success, message } = await createWorkspace(workspaceData);
        if (!success) {
          throw new Error(message);
        }

        // Refresh workspaces to get the real data
        const { data } = await getAllWorkspace();
        set(() => ({ workspaces: data.workspaces }));

        toast({
          title: "Workspace Created",
          description: "You've successfully added a new workspace.",
        });
        return { message, success: true };
      } catch (error) {
        // Rollback to previous state
        set(() => ({ workspaces: previousWorkspaces }));
        const message = getErrorMessage(error);
        toast({
          variant: "destructive",
          title: "Oops, Something Went Wrong",
          description: message || "Failed to create workspace.",
        });
        return { message, success: false };
      } finally {
        set(() => ({ loading: false }));
      }
    },
    updateWorkspace: async (workspaceData: IWorkspaceData, id: string) => {
      const previousWorkspaces = get().workspaces;
      try {
        set(() => ({ loading: true }));
        // Store current state for rollback
        // Optimistically update the workspace
        set((state) => ({
          workspaces: state.workspaces.map((w) =>
            w.id.toString() === id
              ? { ...w, ...workspaceData, updated_at: new Date().toISOString() }
              : w
          ),
          workspace:
            state.workspace?.id.toString() === id
              ? {
                  ...state.workspace,
                  ...workspaceData,
                  updated_at: new Date().toISOString(),
                }
              : state.workspace,
        }));

        const { success, message } = await updateWorkspace(workspaceData, id);
        if (!success) {
          throw new Error(message);
        }

        // Refresh workspaces to get the real data
        const { data } = await getAllWorkspace();
        set(() => ({ workspaces: data.workspaces }));

        toast({
          title: "Workspace Updated",
          description: "You've successfully updated a workspace.",
        });
        return { message, success: true };
      } catch (error) {
        // Rollback to previous state
        set(() => ({ workspaces: previousWorkspaces }));
        const message = getErrorMessage(error);
        toast({
          variant: "destructive",
          title: "Oops, Something Went Wrong",
          description: message || "Failed to update workspace.",
        });
        return { message, success: false };
      } finally {
        set(() => ({ loading: false }));
      }
    },
    deleteWorkspace: async (id: string) => {
      const previousWorkspaces = get().workspaces;
      try {
        set(() => ({ loading: true }));
        // Store current state for rollback
        // Optimistically remove the workspace
        set((state) => ({
          workspaces: state.workspaces.filter((w) => w.id.toString() !== id),
          workspace:
            state.workspace?.id.toString() === id ? null : state.workspace,
        }));

        const { success, message } = await deleteWorkspace(id);
        if (!success) {
          throw new Error(message);
        }

        // Refresh workspaces to get the real data
        const { data } = await getAllWorkspace();
        set(() => ({ workspaces: data.workspaces }));

        toast({
          title: "Workspace Deleted",
          description: "You've successfully deleted the workspace.",
        });
        return { message, success: true };
      } catch (error) {
        // Rollback to previous state
        set(() => ({ workspaces: previousWorkspaces }));
        const message = getErrorMessage(error);
        toast({
          variant: "destructive",
          title: "Oops, Something Went Wrong",
          description: message || "Failed to delete workspace.",
        });
        return { message, success: false };
      } finally {
        set(() => ({ loading: false }));
      }
    },
    resetWorkspace: () => {
      set(() => ({
        workspace: null,
      }));
    },
    updateTaskStatus: async (taskId: string, newStatus: StatusType) => {
      // Store current workspace state for rollback if needed
      const previousWorkspace = get().workspace;

      try {
        // Optimistically update the task status in the local state
        set((state) => {
          if (!state.workspace || !state.workspace.task) {
            return state;
          }

          // Create updated task list with the new status
          const updatedTasks = state.workspace.task.map((task) =>
            task.id.toString() === taskId
              ? { ...task, status: newStatus }
              : task
          );

          // Return updated state
          return {
            ...state,
            workspace: {
              ...state.workspace,
              task: updatedTasks,
            },
          };
        });

        // Call API to update the task status
        const { success, message } = await updateTaskStatus(newStatus, taskId);

        if (!success) {
          throw new Error(message);
        }

        toast({
          title: "Task Updated",
          description: "Task status successfully updated.",
        });

        return { message, success: true };
      } catch (error) {
        // Rollback to previous state on error
        set(() => ({ workspace: previousWorkspace }));

        const message = getErrorMessage(error);
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: message || "Failed to update task status.",
        });

        return { message, success: false };
      }
    },
  })
);

// Subscribe to log state changes (for debugging)
const unsubscribe = useWorkspace.subscribe((state) => {
  console.log("State Workspace:", state);
});

export default useWorkspace;
