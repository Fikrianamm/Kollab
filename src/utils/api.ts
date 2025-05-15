import axios from "axios";
import getErrorMessage from "./error";
import {
  Credential,
  ICommentData,
  ICreatePerson,
  ITaskData,
  IUpdatePassword,
  IUpdateProfile,
  IWorkspaceData,
  RegisterData,
} from "@/types/types";

const baseUrl = "https://backend-kollab.vercel.app/api";
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

export async function logout() {
  try {
    const response = await api.post(`${baseUrl}/logout`);
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

export async function updateProfile(dataUpdate: IUpdateProfile) {
  try {
    const response = await api.patch(`${baseUrl}/updateaccount`, dataUpdate);
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

export async function updatePassword(data: IUpdatePassword) {
  try {
    const response = await api.patch(`${baseUrl}/updatepassword`, data);
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

// Task Route
export async function getAllTask() {
  try {
    const response = await api.get(`${baseUrl}/getalltasks`);
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

export async function createTask(taskData: ITaskData, workspace_id: string) {
  try {
    const response = await api.post(
      `${baseUrl}/createtask/${workspace_id}`,
      taskData
    );
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

export async function deleteTask(id: string) {
  try {
    const response = await api.delete(`${baseUrl}/deletetask/${id}`);
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

export async function getTask(id: string) {
  try {
    const response = await api.get(`${baseUrl}/gettask/${id}`);
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

export async function updateTask(taskData: ITaskData, task_id: string) {
  try {
    const response = await api.patch(
      `${baseUrl}/updatetask/${task_id}`,
      taskData
    );
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

export async function updateTaskStatus(newStatus: string, task_id: string) {
  try {
    const response = await api.patch(`${baseUrl}/updatetask/${task_id}`, {
      status: newStatus,
    });
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

// Sub-Task Route
export async function createSubtask(
  subtaskData: { description: string },
  task_id: string
) {
  try {
    const response = await api.post(
      `${baseUrl}/createsubtask/${task_id}`,
      subtaskData
    );
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

export async function deleteSubtask(id: string) {
  try {
    const response = await api.delete(`${baseUrl}/deletesubtask/${id}`);
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

export async function updateSubtask(
  subtaskData: { is_complete: boolean },
  subtaskId: string
) {
  try {
    const response = await api.patch(
      `${baseUrl}/updatesubtask/${subtaskId}`,
      subtaskData
    );
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

// Workspace Route
export async function getAllWorkspace() {
  try {
    const response = await api.get(`${baseUrl}/getallworkspace`);
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

export async function createWorkspace(workspaceData: IWorkspaceData) {
  try {
    const response = await api.post(
      `${baseUrl}/createworkspace`,
      workspaceData
    );
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

export async function deleteWorkspace(id: string) {
  try {
    const response = await api.delete(`${baseUrl}/deleteworkspace/${id}`);
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

export async function getWorkspace(id: string) {
  try {
    const response = await api.get(`${baseUrl}/getworkspace/${id}`);
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

export async function updateWorkspace(
  workspaceData: IWorkspaceData,
  id: string
) {
  try {
    const response = await api.patch(
      `${baseUrl}/updateworkspace/${id}`,
      workspaceData
    );
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

export async function getDashboardData() {
  try {
    const response = await api.get(`${baseUrl}/dashboard`);
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

// Comment Route
export async function createComment(commentData: ICommentData, taskId: string) {
  try {
    const response = await api.post(
      `${baseUrl}/createcomment/${taskId}`,
      commentData
    );
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

export async function deleteComment(id: string) {
  try {
    const response = await api.delete(`${baseUrl}/deletecomment/${id}`);
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
