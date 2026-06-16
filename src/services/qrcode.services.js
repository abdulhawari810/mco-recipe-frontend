import axiosinstance from "@/API/axiosinstance.api";

export const verify2FAS = async (data) => {
  return axiosinstance.patch("/2fas/verify", data);
};

export const setup2FAS = async (data) => {
  return axiosinstance.post("/2fas/setup", data);
};

export const disable2FAS = async (data) => {
  return axiosinstance.patch("/2fas/disable", data);
};
