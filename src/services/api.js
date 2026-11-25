const API_URL = import.meta.env.VITE_API_URL;

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        data.errors?.[0]?.msg ||
        "Something went wrong"
      );
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Unable to connect to server");
  }
};

// Authentication APIs
export const registerUser = (userData) =>
  apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });

export const loginUser = (userData) =>
  apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(userData),
  });

// Task APIs
export const getTasks = () => apiRequest("/tasks");

export const getTask = (id) => apiRequest(`/tasks/${id}`);

export const createTask = (taskData) =>
  apiRequest("/tasks", {
    method: "POST",
    body: JSON.stringify(taskData),
  });

export const updateTask = (id, taskData) =>
  apiRequest(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(taskData),
  });

export const deleteTask = (id) =>
  apiRequest(`/tasks/${id}`, {
    method: "DELETE",
  });