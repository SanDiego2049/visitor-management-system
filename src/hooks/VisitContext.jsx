import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const VisitContext = createContext();

export const useVisit = () => useContext(VisitContext);

export const VisitProvider = ({ children }) => {
  const [upcomingVisits, setUpcomingVisits] = useState([]);
  const [visitSummary, setVisitSummary] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial data fetch simulation
    const timer = setTimeout(() => {
      // Initial upcoming visits
      setUpcomingVisits([
        { id: 1, company: "Company HQ", date: "2025-05-10", time: "14:00" },
        { id: 2, company: "Branch Office", date: "2025-05-15", time: "10:00" },
      ]);

      // Initial visit summary
      setVisitSummary([
        {
          id: 101,
          date: "2025-04-05",
          company: "Company HQ",
          status: "Checked In",
        },
        {
          id: 102,
          date: "2025-03-21",
          company: "Branch Office",
          status: "Checked In",
        },
      ]);

      // Initial notifications
      setNotifications([
        { id: 1, message: "Security check completed.", isRead: false },
        { id: 2, message: "New event scheduled for May 12th!", isRead: false },
        { id: 3, message: "Please update your visitor profile.", isRead: true },
      ]);

      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Calculate unread notifications count
  useEffect(() => {
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    setUnreadNotifications(unreadCount);
  }, [notifications]);

  // Add a new visit
  const addVisit = (newVisit) => {
    // Check if the visit already exists
    const exists = upcomingVisits.some(
      (visit) =>
        visit.company === newVisit.company &&
        visit.date === newVisit.date &&
        visit.time === newVisit.time
    );

    if (exists) {
      toast.error("You already have this visit scheduled.");
      return false;
    }

    // Add to upcoming visits
    setUpcomingVisits((prev) => [...prev, newVisit]);

    // Add to visit summary
    const summaryEntry = {
      id: newVisit.id,
      date: formatDateForDisplay(newVisit.date),
      company: newVisit.company,
      status: "Scheduled",
    };
    setVisitSummary((prev) => [summaryEntry, ...prev]);

    // Add notification
    const notification = {
      id: Date.now(),
      message: `Visit scheduled with ${
        newVisit.company
      } on ${formatDateForDisplay(newVisit.date)} at ${formatTimeForDisplay(
        newVisit.time
      )}.`,
      isRead: false,
      timestamp: new Date().toISOString(),
    };
    setNotifications((prev) => [notification, ...prev]);

    // Show success toast
    toast.success("Visit scheduled successfully!");
    return true;
  };

  // Toggle notification read status
  const toggleReadStatus = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // Helper functions for date formatting
  const formatDateForDisplay = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTimeForDisplay = (timeStr) => {
    return new Date(`1970-01-01T${timeStr}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get the top 3 upcoming visits sorted by date/time
  const getTopUpcomingVisits = () => {
    return [...upcomingVisits]
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
      })
      .slice(0, 3);
  };

  return (
    <VisitContext.Provider
      value={{
        upcomingVisits,
        visitSummary,
        notifications,
        unreadNotifications,
        loading,
        addVisit,
        toggleReadStatus,
        markAllAsRead,
        getTopUpcomingVisits,
        formatDateForDisplay,
        formatTimeForDisplay,
      }}
    >
      {children}
    </VisitContext.Provider>
  );
};
