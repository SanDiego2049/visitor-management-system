const LoadingSpinner = ({
  message = "Please wait...",
  size = "md",
  fullScreen = true,
}) => {
  // Size classes for the spinner
  const spinnerSizes = {
    sm: "w-8 h-8 border-2",
    md: "w-12 h-12 border-4",
    lg: "w-16 h-16 border-4",
  };

  const spinnerClass = spinnerSizes[size] || spinnerSizes.md;

  const spinner = (
    <>
      <div
        className={`${spinnerClass} border-blue-500 border-t-transparent rounded-full animate-spin`}
      />
      {message && <p className="text-gray-600 dark:text-gray-300">{message}</p>}
    </>
  );

  if (fullScreen) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      {spinner}
    </div>
  );
};

export default LoadingSpinner;
