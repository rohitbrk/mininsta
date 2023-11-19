import { useState } from "react";
import { useContext } from "react";
import { AuthContext, Store } from "../App";
import { getDate } from "../utils/date";
import { post } from "../utils/api";
import InputField from "./common/InputField";
import { svgs } from "../utils/svgs";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const { user, getAccessTokenSilently } = useContext(AuthContext);
  const { userId, setLoading, setCreatingPost, fetchPosts, setErr } =
    useContext(Store);

  const handleCreatePost = async (title, desc, date, file) => {
    setLoading(true);
    const token = await getAccessTokenSilently();
    const axiosResponse = await post(
      "/post",
      token,
      {
        post: {
          userId,
          name: user.name,
          title,
          desc,
          date,
          img: file,
          likes: [],
          picture: user.picture,
        },
      },
      setErr
    );

    if (axiosResponse.data.status === "ok") {
      fetchPosts(1);
    }
  };

  const createPost = (title, desc, file) => {
    if (!title || !file) {
      alert("Enter a title and select file");
      return;
    }

    const date = getDate();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      handleCreatePost(title, desc, date, reader.result);
    };
    setCreatingPost(false);
  };

  return (
    <div className="flex justify-center">
      <div className="p-6 max-w-lg mx-6 border rounded-lg bg-white p-2 mb-2 shadow hover:shadow-lg duration-300 border-gray-200">
        <InputField
          svg={svgs.inputTitle}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
        <InputField
          svg={svgs.inputDesc}
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter description"
        />
        <div>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="focus:ring-4 focus:outline-none focus:ring-gray-500 mb-4 relative block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:transition file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-400 focus:border-primary focus:text-neutral-700 focus:outline-none file:bg-neutral-700 file:text-neutral-100"
          />
        </div>
        <div>
          <button
            className="w-full items-center text-md font-medium text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => createPost(title, desc, file)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreatePost;
