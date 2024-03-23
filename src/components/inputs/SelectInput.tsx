import React, { ChangeEvent } from "react";

interface SelectInputProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="select"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        id="select"
        value={value}
        onChange={handleSelectChange}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
