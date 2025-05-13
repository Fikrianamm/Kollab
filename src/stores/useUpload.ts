/* eslint-disable no-alert */
import { create, StoreApi, UseBoundStore } from "zustand";
import getErrorMessage from "../utils/error";
import { uploadImageToCloudinary } from "@/utils/api";
import { IUploadFile } from "@/types/types";

const useUpload: UseBoundStore<StoreApi<IUploadFile>> = create((set) => ({
  loading: false,
  uploadProgress: 0,
  uploadFile: async (
    file: File,
    onUploadProgress?: (progress: number) => void
  ): Promise<string | null> => {
    try {
      set({ loading: true, uploadProgress: 0 });

      const response = await uploadImageToCloudinary(file, (progress) => {
        set({ uploadProgress: progress }); // Update progress di Zustand
        if (onUploadProgress) onUploadProgress(progress); // Callback ke komponen
      });

      set({ uploadProgress: 100 });
      return response;
    } catch (error) {
      const message = getErrorMessage(error);
      alert(`Gagal mengunggah gambar! \nError: ${message}`);
      return null;
    } finally {
      set({ loading: false, uploadProgress: 0 });
    }
  },
}));

export default useUpload;
