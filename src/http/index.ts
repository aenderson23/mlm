import axios, { AxiosInstance } from "axios";

export default axios.create({
  baseURL: "http://localhost:3000",
}) as AxiosInstance;

