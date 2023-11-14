// @ts-nocheck
import CreatePost from "./CreatePost";
import Posts from "./Posts";

const Main = ({ creatingPost }) => {
  return <div>{creatingPost ? <CreatePost /> : <Posts />}</div>;
};
export default Main;
