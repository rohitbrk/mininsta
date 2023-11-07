const getAllPosts = async (
  setPosts: (posts: []) => void,
  setLoading: (loading: boolean) => void
) => {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + "post");
  const data = await response.json();
  setPosts(data);
  setLoading(false);
};

export { getAllPosts };
