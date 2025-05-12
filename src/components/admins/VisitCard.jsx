const VisitCard = ({ visit, dateFormatter, timeFormatter }) => (
  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 transition-colors duration-200">
    <p className="font-medium">{visit.company}</p>
    <div className="mt-2 grid grid-cols-2 gap-2">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {dateFormatter(visit.date)}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {timeFormatter(visit.time)}
      </p>
    </div>
  </div>
);

export default VisitCard;
