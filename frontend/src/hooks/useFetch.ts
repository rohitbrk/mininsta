const getFetch = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

const customFetch = async (URL, options) => {
  const response = await fetch(URL, {
    method: options.method,
    headers: options.headers,
    body: JSON.stringify(options.body),
  });
  const data = await response.json();
  return data;
};

const useFetch = (URL, options) => {
  if (JSON.stringify(options) === JSON.stringify({})) {
    return getFetch(URL);
  }
  return customFetch(URL, options);
};

export { useFetch };
