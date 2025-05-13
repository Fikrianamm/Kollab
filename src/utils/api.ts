import axios from "axios";
import getErrorMessage from "./error";
import { Credential, ICreatePerson, RegisterData } from "@/types/types";

const baseUrl = "http://localhost:3000/api";
const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

// auth route
export async function login(credential: Credential) {
  try {
    const response = await api.post(`${baseUrl}/login`, credential);
    const { message, success, data } = response.data;
    if (success) {
      return { message, success, data };
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}

export async function getUserAuth() {
  try {
    const response = await api.get(`${baseUrl}/getuserinfo`);
    console.log(response);
    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}

export async function register(registerData: RegisterData) {
  try {
    const response = await api.post(`${baseUrl}/register`, registerData);
    const { message, success } = response.data;
    if (success) {
      return { message, success };
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}

// Image to Cloudinary
export async function uploadImageToCloudinary(
  file: File,
  onUploadProgress?: (progress: number) => void
): Promise<string> {
  const cloudName = "dbvqf264q";
  const uploadPreset = "kollab";

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary credentials are not set");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          if (onUploadProgress && progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onUploadProgress(percentCompleted);
          }
        },
      }
    );

    return response.data.secure_url;
  } catch (error) {
    const message = getErrorMessage(error);
    throw message;
  }
}

// People Route
export async function getAllPeople() {
  try {
    const response = await api.get(`${baseUrl}/getallpeoples`);
    const { message, success, data } = response.data;
    if (success) {
      return { message, success, data };
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}

export async function createPeople(peopleData: ICreatePerson) {
  try {
    const response = await api.post(`${baseUrl}/createpeople`, peopleData);
    const { message, success } = response.data;
    if (success) {
      return { message, success };
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}

export async function deletePeople(id: string) {
  try {
    const response = await api.delete(`${baseUrl}/deletepeople/${id}`);
    const { message, success } = response.data;
    if (success) {
      return { message, success };
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}

export async function getPeople(id: string) {
  try {
    const response = await api.get(`${baseUrl}/getpeople/${id}`);
    const { message, success, data } = response.data;
    if (success) {
      return { message, success, data };
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}

// 