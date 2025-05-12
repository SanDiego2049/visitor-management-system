const ThemeOption = ({
  title,
  value,
  currentTheme,
  onClick,
  icon,
  bgClass,
}) => {
  const isSelected = currentTheme === value;

  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-colors duration-200 ${
        isSelected
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
      }`}
      onClick={onClick}
    >
      <div
        className={`h-24 border border-gray-100 dark:border-gray-700 rounded mb-2 flex items-center justify-center ${bgClass}`}
      >
        {icon}
      </div>
      <div className="flex items-center">
        <input
          type="radio"
          checked={isSelected}
          onChange={() => {}}
          className="mr-2"
        />
        <span className="font-medium text-gray-800 dark:text-white">
          {title}
        </span>
      </div>
    </div>
  );
};

export default ThemeOption;