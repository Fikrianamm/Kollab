import { Task } from "@/types/types";
import { create, StoreApi, UseBoundStore } from "zustand";

interface ITaskStore {
  tasks: Task[] | null;
  task: Task | null;
  loading: boolean;
  getAllTask: () => Promise<Task[]>;
}

const useTask: UseBoundStore<StoreApi<ITaskStore>> = create((set) => ({
  tasks: null,
  task: null,
  loading: false,
  getAllTask: async () => {
    // try {
    //   set(() => ({ loading: true }));
    //   const { success, message, data } = await getAllPeople();
    //   if (!success) {
    //     throw new Error(message);
    //   }
    //   set(() => ({ dataUser: data }));
    //   set(() => ({ isAuthenticated: true }));
    //   return { message, success: true };
    // } catch (error) {
    //   const message = getErrorMessage(error);
    //   return { message, success: false };
    // } finally {
    //   set(() => ({ loading: false }));
    // }
  },
}));

// Subscribe untuk mengecek perubahan state
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unsubscribe = useTask.subscribe((state) => {
  console.log("State Auth:", state);
});

export default useTask;
