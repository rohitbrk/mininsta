const getAllPosts = async (setPosts, setLoading) => {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + "post");
  const data = await response.json();
  setPosts(data);
  setLoading(false);
};

export { getAllPosts };
