import { useVisit } from "../../hooks/VisitContext";
import {
  BookOpenCheck,
  CheckCheck,
  CheckCircle,
  Circle,
  Undo2,
  Bell,
  Clock,
} from "lucide-react";

const Notifications = () => {
  const { notifications, toggleReadStatus, markAllAsRead } = useVisit();

  const formatDate = (timestamp) => {
    if (!timestamp) return "Just now";

    try {
      // If timestamp is a string, parse it first
      const date =
        typeof timestamp === "string" ? new Date(timestamp) : timestamp;

      // Check if the date is valid
      if (isNaN(date.getTime())) return "Recently";

      // Format options
      const options = {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };

      return new Intl.DateTimeFormat("en-US", options).format(date);
    } catch (e) {
      return "Recently";
    }
  };

  return (
    <div className="h-full">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 dark:text-white flex items-center gap-2">
          <Bell size={28} className="text-blue-500" />
          Notifications
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          View and manage all your notifications.
        </p>
      </header>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-700 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Recent Notifications
          </h2>
          <button
            onClick={markAllAsRead}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1"
            title="Mark all as read"
          >
            <BookOpenCheck size={18} />
            <span className="hidden sm:inline">Mark all as read</span>
          </button>
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <Clock size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              No notifications to display.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              New notifications will appear here.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`py-4 px-4 rounded-lg transition-colors duration-150 ${
                  !n.isRead
                    ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-2 rounded-lg ${
                        !n.isRead
                          ? "bg-blue-100 dark:bg-blue-900/30"
                          : "bg-gray-100 dark:bg-gray-700"
                      }`}
                    >
                      {!n.isRead ? (
                        <CheckCircle size={20} className="text-blue-500" />
                      ) : (
                        <Circle size={20} className="text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3
                        className={`font-medium ${
                          !n.isRead
                            ? "text-gray-800 dark:text-white"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {n.message}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {formatDate(n.timestamp)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleReadStatus(n.id)}
                    className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 ${
                      !n.isRead
                        ? "text-blue-500 hover:text-blue-700"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                    title={n.isRead ? "Mark as unread" : "Mark as read"}
                  >
                    {n.isRead ? <Undo2 size={18} /> : <CheckCheck size={18} />}
                  </button>
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
          You can customize your notification preferences in the Settings page.
        </p>
      </div>
    </div>
  );
};

export default Notifications;
