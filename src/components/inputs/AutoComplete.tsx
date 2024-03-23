import React, { useState } from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

interface AutocompleteProps {
  options: string[];
  onSelect: (value: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    onSelect(value);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          {selectedOption || "Select an option"}
          <ChevronDownIcon
            className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Menu.Items className="absolute right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {options.map((option, index) => (
          <Menu.Item key={index}>
            {({ active }) => (
              <button
                onClick={() => handleSelect(option)}
                className={`${
                  active ? "bg-gray-100" : ""
                } group flex justify-between items-center w-full px-4 py-2 text-sm text-gray-900`}
              >
                {option}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default Autocomplete;
