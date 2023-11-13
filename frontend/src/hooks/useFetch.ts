const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const getFetch = async (URL) => {
  const response = await fetch(BASE_URL + URL);
  const data = await response.json();
  return data;
};

const customFetch = async (URL, options) => {
  const response = await fetch(BASE_URL + URL, {
    method: options.method,
    headers: options.headers,
    body: JSON.stringify(options.body),
  });
  const data = await response.json();
  return data;
};

const useFetch = async (URL, token, options) => {
  if (JSON.stringify(options) === JSON.stringify({})) {
    return getFetch(URL);
  }

  const headers = {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };

  options.headers = headers;
  return customFetch(URL, options);
};

export { useFetch };
