import axiosinstance from "@/API/axiosinstance.api";

export const loginUser = async (data) => {
  return axiosinstance.post("/auth/login", data);
};

export const registerUser = async (data) => {
  console.log("Registering user with data:", data);
  return axiosinstance.post("/auth/register", data);
};

export const me = async () => {
  return axiosinstance.get("/auth/me");
};

export const logoutUser = async () => {
  return axiosinstance.delete("/auth/logout", { withCredentials: true });
};
