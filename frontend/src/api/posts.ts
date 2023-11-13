import axios from "axios";

const app = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

const get = async () => {
  const response = await app.get("/post");
  return response.data;
};

export { get };
