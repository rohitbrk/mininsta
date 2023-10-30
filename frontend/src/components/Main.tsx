import { useContext } from "react";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
import { Store } from "../App";

const Main = () => {
  const { creatingPost } = useContext(Store);
  return <div>{creatingPost ? <CreatePost /> : <Posts />}</div>;
};
export default Main;
