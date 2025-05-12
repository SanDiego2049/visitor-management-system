const StatsCard = ({ title, value, subtitle, icon, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-300",
    green:
      "bg-green-50 dark:bg-green-900/30 text-green-500 dark:text-green-300",
    yellow:
      "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-500 dark:text-yellow-300",
    purple:
      "bg-purple-50 dark:bg-purple-900/30 text-purple-500 dark:text-purple-300",
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium">
          {title}
        </h3>
        <span className={`p-2 ${colorClasses[color]} rounded-lg`}>{icon}</span>
      </div>
      <p className="text-3xl font-bold mt-2 text-gray-800 dark:text-white">
        {value}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {subtitle}
      </p>
    </div>
  );
};

export default StatsCard;
