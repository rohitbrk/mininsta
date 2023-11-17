import { svgs } from "../utils/svgs";

const Tips = ({ tips }) => {
  return (
    <div className="w-full mt-[150px] mx-4 border rounded bg-white p-2 mb-2 hover:shadow-lg duration-300">
      <div className="flex">
        {svgs.tips}
        Tips
      </div>
      <>
        <ul className="flex flex-col">
          <hr className="h-px mx-8 mt-4 mb-2 bg-gray-300 border-0" />
          {tips?.map((item) => (
            <li
              key={item}
              className="block text-lg font-medium leading-tight inline-block whitespace-nowrap rounded-1 bg-primary-100 text-center align-baseline font-bold leading-none text-primary-700"
            >
              {item}
            </li>
          ))}
        </ul>
      </>
    </div>
  );
};

export default Tips;
