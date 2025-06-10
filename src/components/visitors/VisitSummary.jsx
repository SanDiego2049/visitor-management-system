import { useVisit } from "../../hooks/VisitContext";
import {
  CalendarDays,
  Building2,
  Clock,
  CheckCircle,
  AlertCircle,
  Clock3,
} from "lucide-react";

const VisitSummary = () => {
  const { visitSummary } = useVisit();

  const getStatusIcon = (status) => {
    switch (status) {
      case "Checked In":
        return <CheckCircle size={18} className="text-green-500" />;
      case "Scheduled":
        return <Clock3 size={18} className="text-blue-500" />;
      case "Cancelled":
        return <AlertCircle size={18} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 dark:text-white flex items-center gap-2">
          <CalendarDays size={28} className="text-blue-500" />
          Visit Summary
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          View and manage all your scheduled and past visits.
        </p>
      </header>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-700 mb-8">
        {visitSummary.length === 0 ? (
          <div className="text-center py-8">
            <Clock size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              No visits to display.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Scheduled and past visits will appear here.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {visitSummary.map((visit) => (
              <li
                key={visit.id}
                className="py-4 hover:bg-gray-50 dark:hover:bg-gray-700 px-2 rounded-lg transition-colors duration-150"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                      <Building2 size={24} className="text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {visit.company}
                      </h3>
                      <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-300">
                        <CalendarDays size={16} className="mr-1" />
                        <span>{visit.date}</span>
                      </div>
                      {visit.time && (
                        <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-300">
                          <Clock size={16} className="mr-1" />
                          <span>{visit.time}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`py-1 px-3 rounded-full text-sm font-medium flex items-center gap-1.5
                        ${
                          visit.status === "Checked In"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : visit.status === "Scheduled"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            : visit.status === "Cancelled"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                    >
                      {getStatusIcon(visit.status)}
                      {visit.status}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
        <h3 className="text-blue-800 dark:text-blue-200 font-medium mb-2">
          Tip:
        </h3>
        <p className="text-blue-700 dark:text-blue-300 text-sm">
          You can scan a visitor's QR code to quickly check them in using the
          Scanner page.
        </p>
      </div>
    </div>
  );
};

export default VisitSummary;
