// stores/useAuth.ts
import { toast } from "@/hooks/use-toast";
import {
  Credential,
  IUpdatePassword,
  IUpdateProfile,
  RegisterData,
  Response,
  User,
} from "@/types/types";
import {
  getUserAuth,
  login,
  logout,
  register,
  updatePassword,
  updateProfile,
} from "@/utils/api";
import getErrorMessage from "@/utils/error";
import { create, StoreApi, UseBoundStore } from "zustand";

interface IAuthStore {
  dataUser: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credential: Credential) => Promise<Response<User>>;
  logout: () => Promise<Response<null>>;
  getUser: () => Promise<Response<null>>;
  register: (registerData: RegisterData) => Promise<Response<null>>;
  updateProfile: (data: IUpdateProfile) => Promise<Response<null>>;
  updatePassword: (data: IUpdatePassword) => Promise<Response<null>>;
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
        title: "Login success!",
        description: `Welcome back, ${data.username}`,
      });
      set(() => ({ isAuthenticated: true }));
      return { success: true, message, data };
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
  logout: async () => {
    try {
      set(() => ({ loading: true }));
      const { success, message } = await logout();
      if (!success) {
        throw new Error(message);
      }
      set(() => ({ dataUser: null }));
      set(() => ({ isAuthenticated: false }));
      toast({
        title: "Logout successful!",
      });
      return { message, success };
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
        title: "Oops, Something Went Wrong",
        description: message || "Something went wrong. Please try again.",
      });
      return { message, success: false };
    } finally {
      set(() => ({ loading: false }));
    }
  },
  updateProfile: async (data: IUpdateProfile) => {
    try {
      set(() => ({ loading: true }));
      const { success, message, data: updatedData } = await updateProfile(data);
      if (!success) {
        throw new Error(message);
      }
      toast({
        title: "Profile Updated",
        description:
          "You’ve successfully updated your profile. Please log in again.",
      });
      set((state) => ({
        dataUser: {
          ...state.dataUser,
          name: updatedData.name,
          username: updatedData.username,
          email: updatedData.email,
          avatar: updatedData.avatar,
        },
      }));
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
  updatePassword: async (data: IUpdatePassword) => {
    try {
      set(() => ({ loading: true }));
      const { success, message } = await updatePassword(data);
      if (!success) {
        throw new Error(message);
      }
      toast({
        title: "Password Updated",
        description: "You’ve successfully updated your password. Please log in again.",
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
const unsubscribe = useAuth.subscribe((state) => {
  console.log("State Auth:", state);
});

export default useAuth;
