import React, { ChangeEvent, useState } from "react";

interface TextInputProps {
  name?: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  minLength?: number;
  required?: boolean;
  label?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  type,
  value,
  placeholder,
  onChange,
  minLength,
  required,
  label,
}: TextInputProps) => {
  const [error, setError] = useState<string | null>(null);
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    onChange(inputValue);

    if (required && inputValue.trim() === "") {
      setError("This field is required");
    } else if (minLength && inputValue.length < minLength) {
      setError(`Minimum length is ${minLength} characters`);
    } else {
      setError(null);
    }
  };
  return (
    <>
      <label className="text-gray-700 font-bold">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={handleOnChange}
        placeholder={placeholder}
        className=" mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </>
  );
};

export default TextInput;
