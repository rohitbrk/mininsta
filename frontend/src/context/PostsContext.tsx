import { createContext, useReducer } from "react";

const PostsContext = createContext(null);
const PostsDispatchContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return action.payload;
    case "MY_POSTS":
      return state.filter((post) => post.name === action.payload.name);
    case "LIKE_POST":
      return state.map((post) => {
        if (post.id === action.payload.postId)
          post.likes.push(action.payload.name);
        return post;
      });
    case "CUSTOM_POSTS":
      return state.filter((post) => post.name === action.payload.name);
  }
};

const PostsProvider = ({ children }) => {
  const [posts, dispatch] = useReducer(reducer, []);
  return (
    <PostsContext.Provider value={posts}>
      <PostsDispatchContext.Provider value={dispatch}>
        {children}
      </PostsDispatchContext.Provider>
    </PostsContext.Provider>
  );
};

export default PostsProvider;

export { PostsContext, PostsDispatchContext };
