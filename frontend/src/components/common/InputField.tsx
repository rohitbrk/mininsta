type InputFieldProps = {
  svg: string;
  type: string;
  value: string;
  onChange: () => void;
  placeholder: string;
};
const InputField = ({
  svg,
  type,
  value,
  onChange,
  placeholder,
}: InputFieldProps) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
        {svg}
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
