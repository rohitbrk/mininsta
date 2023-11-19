import CreatePost from "./CreatePost";
import Posts from "./Posts";

type MainProps = {
  creatingPost: boolean;
};

const Main = ({ creatingPost }: MainProps) => {
  return <div>{creatingPost ? <CreatePost /> : <Posts />}</div>;
};
export default Main;
