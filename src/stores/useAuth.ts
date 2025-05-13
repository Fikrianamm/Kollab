// stores/useAuth.ts
import { toast } from "@/hooks/use-toast";
import { Credential, RegisterData, Response, User } from "@/types/types";
import { getUserAuth, login, register } from "@/utils/api";
import getErrorMessage from "@/utils/error";
import { create, StoreApi, UseBoundStore } from "zustand";

interface IAuthStore {
  dataUser: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credential: Credential) => Promise<Response<User>>;
  logout: () => void;
  getUser: () => Promise<Response<null>>;
  register: (registerData: RegisterData) => Promise<Response<null>>;
}

const useAuth: UseBoundStore<StoreApi<IAuthStore>> = create((set) => ({
  dataUser: null,
  loading: false,
  isAuthenticated: false,
  login: async (credential: Credential) => {
    try {
      set(() => ({ loading: true }));
      const { success, message, data } = await login(credential as Credential);
      if (!success) {
        throw new Error(message);
      }
      toast({
        description: "Login success",
      });
      set(() => ({ dataUser: data }));
      set(() => ({ isAuthenticated: true }));
      return { success: true, message, data };
    } catch (error) {
      const message = getErrorMessage(error);
      toast({
        variant: "destructive",
        title: "Login failed!",
        description: message,
      });
      return { message, success: false };
    } finally {
      set(() => ({ loading: false }));
    }
  },
  logout: async () => {
    // try {
    //   set(() => ({ loading: true }));
    //   Cookies.remove("token");
    //   const message = "Logout successfully";
    //   set(() => ({ isAuthenticated: false }));
    //   return { message, success: true };
    // } catch (error) {
    //   const message = getErrorMessage(error);
    //   toast({
    //     description: "Logout failed!",
    //   });
    //   return { message, success: false };
    // } finally {
    //   set(() => ({ loading: false }));
    // }
  },
  getUser: async () => {
    try {
      set(() => ({ loading: true }));
      const { success, message, data } = await getUserAuth();
      if (!success) {
        throw new Error(message);
      }
      set(() => ({ dataUser: data }));
      set(() => ({ isAuthenticated: true }));
      return { message, success: true };
    } catch (error) {
      const message = getErrorMessage(error);
      return { message, success: false };
    } finally {
      set(() => ({ loading: false }));
    }
  },
  register: async (registerData: RegisterData) => {
    try {
      set(() => ({ loading: true }));
      const { success, message } = await register(registerData as RegisterData);
      if (!success) {
        throw new Error(message);
      }
      toast({
        title: "Registration successful!",
        description: "Please log in to continue.",
      });
      return { success: true, message };
    } catch (error) {
      const message = getErrorMessage(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: message,
      });
      return { message, success: false };
    } finally {
      set(() => ({ loading: false }));
    }
  },
}));

// Subscribe untuk mengecek perubahan state
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unsubscribe = useAuth.subscribe((state) => {
  console.log("State Auth:", state);
});

export default useAuth;
