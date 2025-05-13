/* eslint-disable @typescript-eslint/no-explicit-any */
// stores/usePeople.ts
import { toast } from "@/hooks/use-toast";
import { ICreatePerson, Response, User } from "@/types/types";
import { createPeople, getAllPeople } from "@/utils/api";
import getErrorMessage from "@/utils/error";
import { create, StoreApi, UseBoundStore } from "zustand";

interface IPeopleStore {
  peoples: User[] | null;
  loading: boolean;
  getAllPeople: () => Promise<Response<any>>;
  createPeople: (peopleData: ICreatePerson) => Promise<Response<any>>;
}

const usePeople: UseBoundStore<StoreApi<IPeopleStore>> = create((set, get) => ({
  peoples: null,
  loading: false,
  getAllPeople: async () => {
    try {
      set(() => ({ loading: true }));
      const { success, message, data } = await getAllPeople();
      if (!success) {
        throw new Error(message);
      }
      const peoples = data.peoples.map((people: any) => people.user);
      set(() => ({ peoples: peoples }));
      return { success: true, message, data };
    } catch (error) {
      const message = getErrorMessage(error);
      return { message, success: false };
    } finally {
      set(() => ({ loading: false }));
    }
  },
  createPeople: async (peopleData: ICreatePerson) => {
    try {
      set(() => ({ loading: true }));
      const { success, message } = await createPeople(peopleData);
      if (!success) {
        throw new Error(message);
      }

      const prevPeoples = get().peoples;
      set(() => ({
        peoples: [...(prevPeoples as User[]), peopleData],
      }));
      toast({
        title: "Person Created",
        description: "You’ve successfully added a new person.",
      });
      return { success: true, message };
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
}));

// Subscribe untuk mengecek perubahan state
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unsubscribe = usePeople.subscribe((state) => {
  console.log("State People:", state);
});

export default usePeople;
