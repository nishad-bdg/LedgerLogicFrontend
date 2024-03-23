import React, { ChangeEvent } from "react";

interface TextInputProps {
  name?: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  type,
  value,
  placeholder,
  onChange,
}: TextInputProps) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <>
      <input
        name={name}
        type={type}
        value={value}
        onChange={handleOnChange}
        placeholder={placeholder}
        className=" mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
    </>
  );
};

export default TextInput;
