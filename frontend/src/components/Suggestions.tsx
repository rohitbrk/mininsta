import { useState } from "react";
import { svgs } from "../utils/svgs";

type SuggestionsProps = {
  name: string;
  items: { name: string; userId: string };
  filterText: string;
  setFilterText: (filterText: string) => void;
  marginTop: number;
  svg: string;
};

const Suggestions = ({
  name,
  items,
  filterText,
  setFilterText,
  marginTop,
  svg,
}: SuggestionsProps) => {
  const [showDropDown, setShowDropdown] = useState(false);

  return (
    <div
      className={`w-full h-auto mt-${
        marginTop ? marginTop : 20
      } mx-4 border rounded bg-white p-2 mb-2 hover:shadow-lg duration-300`}
    >
      <div className="flex justify-between font-semibold">
        <div className="flex">
          {svg}
          {name}
        </div>

        {showDropDown ? (
          <button onClick={() => setShowDropdown((prev) => !prev)}>
            {svgs.dropDownTrue}
          </button>
        ) : (
          <button onClick={() => setShowDropdown((prev) => !prev)}>
            {svgs.dropDownFalse}
          </button>
        )}
      </div>
      <>
        {showDropDown ? (
          <ul className="flex flex-col">
            <hr className="h-px mx-8 mt-4 mb-1 bg-gray-300 border-0" />
            {items?.map((item) => (
              <li
                key={item.userId}
                className="block text-xl font-small leading-tight inline-block whitespace-nowrap rounded-1 bg-primary-100 text-center align-baseline font-bold leading-none text-primary-700"
              >
                <a className="cursor-pointer text-gray-600 font-medium hover:text-blue-600">
                  <button
                    onClick={() => {
                      if (filterText === item.userId) {
                        setFilterText("");
                        return;
                      }
                      setFilterText(item.userId);
                    }}
                  >
                    {item.name}
                  </button>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </>
    </div>
  );
};

export default Suggestions;
