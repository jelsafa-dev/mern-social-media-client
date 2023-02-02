import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");

  if (token) {
    api.defaults.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

export const login = async (values) => {
  const response = await api({
    method: "post",
    url: "/auth/login",
    data: JSON.stringify(values),
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
