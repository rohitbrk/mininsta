import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const get = (URL, setErr) => {
  try {
    const data = axios.get(BASE_URL + URL);
    return data;
  } catch (err) {
    setErr(true);
  }
};

const post = (URL, token, data, setErr) => {
  try {
    const response = axios.post(BASE_URL + URL, data, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    setErr(true);
  }
};

const deleteReq = (URL, token, setErr) => {
  try {
    const response = axios.delete(BASE_URL + URL, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    setErr(true);
  }
};

export { get, post, deleteReq };
