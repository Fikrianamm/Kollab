/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Response,
  Task,
} from "@/types/types";
import {
  getDashboardData,
} from "@/utils/api";
import getErrorMessage from "@/utils/error";
import { create, StoreApi, UseBoundStore } from "zustand";

export interface IChart {
  year?: string;
  month: string;
  todo: number;
  inProgress: number;
  onReview: number;
  done: number;
}

interface DataDashboard {
  workspaces: number;
  tasks: number;
  people: number;
  tasksDone: number;
  myTask: Task[] | null;
  chartData: IChart[] | null;
}

interface IDashboardStore {
  data: DataDashboard | null;
  loading: boolean;
  getDashboardData: () => Promise<Response<any>>;
}

const useDashboard: UseBoundStore<StoreApi<IDashboardStore>> = create(
  (set) => ({
    data: {
      workspaces: 0,
      tasks: 0,
      people: 0,
      tasksDone: 0,
      myTask: [],
      chartData: [
        {
          month: "Jan",
          todo: 0,
          inProgress: 0,
          onReview: 0,
          done: 0,
        },
      ],
    },
    loading: false,
    getDashboardData: async () => {
      try {
        set(() => ({ loading: true }));
        const { success, message, data } = await getDashboardData();
        if (!success) {
          throw new Error(message);
        }
        set(() => ({ data: data }));
        return { message, success: true };
      } catch (error) {
        const message = getErrorMessage(error);
        return { message, success: false };
      } finally {
        set(() => ({ loading: false }));
      }
    },
  })
);

// Subscribe untuk mengecek perubahan state
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unsubscribe = useDashboard.subscribe((state) => {
  console.log("State Dashboard:", state);
});
void unsubscribe

export default useDashboard;
