const FormSection = ({ children, title, icon = null }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
      <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">
        {icon && <span className="inline-block mr-2">{icon}</span>}
        {title}
      </h3>
      {children}
    </div>
  );
};

export default FormSection; 
