const SectionHeading = ({ icon, title }) => {
  return (
    <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">
      {icon && <span className="inline-block mr-2">{icon}</span>}
      {title}
    </h3>
  );
};

export default SectionHeading; 
