function InputItem({ label, name, value, onChange, flex = false }) {
  return (
    <div
      className={`flex flex-col gap-1 ${flex ? "flex-1 min-w-37.5" : "w-full"}`}
    >
      <label htmlFor={name} className="text-sm font-medium text-gray-600">
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="h-10 border-2 border-gray-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900 rounded-lg px-3 transition-colors duration-200 ease-in-out text-sm font-medium text-neutral-700 outline-none"
      />
    </div>
  );
}

export default InputItem;
