type PostProps = {
  userId: string;
  id: string;
  picture: string;
  name: string;
  date: string;
  img: string;
  title: string;
  handleLike: () => void;
  likesString: string;
  desc: string;
};

const Post = ({
  userId,
  id,
  picture,
  name,
  date,
  img,
  title,
  handleLike,
  likesString,
  desc,
}: PostProps) => {
  return (
    <div
      key={id}
      className="mx-14 border rounded bg-white p-2 mb-2 hover:shadow-lg duration-300"
    >
      <div className="flex justify-between flex font-semibold text-xl ml-6 my-1 p-1.5 mb-1 inline-block rounded-full text-gray-700">
        <div className="flex">
          <div>
            <img
              className="w-9 h-9 mr-1 rounded-full shadow-lg"
              src={picture}
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="mt-0.5">
            <p className="text-base flex justify-center items-center leading-none">
              {name}
            </p>
            <p className="cursor-pointer text-sm mt-0 text-gray-500 leading-none">
              @{userId}
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-500">{date}</div>
      </div>
      <div className="flex justify-center">
        <img className="w-80 rounded" src={img} alt={title} />
      </div>
      <div className="px-6 py-4">
        <div className="px-6 flex justify-between">
          <div className="items-center font-bold text-xl mb-2">{title}</div>
          <button
            onClick={() => handleLike(userId, id, likesString)}
            className="flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center ml-2 mb-2"
          >
            {likesString}
          </button>
        </div>
        <p className="px-6 text-gray-700 text-base">{desc}</p>
      </div>
    </div>
  );
};

export default Post;
