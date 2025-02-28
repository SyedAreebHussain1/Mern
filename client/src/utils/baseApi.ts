import axios, { AxiosResponse } from "axios";
import { Authorization } from "./storage";
import { errorMessage } from "./message";

// base api for all the requests
const baseURL = import.meta.env.VITE_BASE_URL;

//for post requests
export const post = async <T>(url: string, payload: any): Promise<T> => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: Authorization(),
  };
  const response: AxiosResponse<T> = await axios.post(
    `${baseURL}/${url}`,
    payload,
    { headers }
  );
  return response.data;
};

// for get requests
export const get = async <T>(url: string): Promise<T> => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: Authorization(),
  };
  const response: AxiosResponse<T> = await axios.get(`${baseURL}/${url}`, {
    headers,
  });
  return response.data;
};

// for delete requests
export const del = async <T>(url: string, body?: any): Promise<T> => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: Authorization(),
  };
  const response: AxiosResponse<T> = await axios.delete(`${baseURL}/${url}`, {
    headers,
    data: body,
  });
  return response.data;
};

// for update requests
export const update = async <T>(url: string, payload: any): Promise<T> => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: Authorization(),
  };
  const response: AxiosResponse<T> = await axios.put(
    `${baseURL}/${url}`,
    payload,
    { headers }
  );
  return response.data;
};
// for patch requests
export const patch = async <T>(url: string, payload?: any): Promise<T> => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: Authorization(),
  };
  const response: AxiosResponse<T> = await axios.patch(
    `${baseURL}/${url}`,
    payload,
    { headers }
  );
  return response.data;
};

// for error handling
export const getError = (err: any) => {
  if (err.response) {
    errorMessage(err.response?.data?.message);
  } else {
    errorMessage(err.toString());
  }
};
