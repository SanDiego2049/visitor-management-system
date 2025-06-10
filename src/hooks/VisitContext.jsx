import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import toast from "react-hot-toast";

const VisitContext = createContext();

export const useVisit = () => useContext(VisitContext);

export const VisitProvider = ({ children }) => {
  const [upcomingVisits, setUpcomingVisits] = useState([]);
  const [visitSummary, setVisitSummary] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchVisitsFromBackend = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.log("No token found, skipping fetch");
        setLoading(false);
        return;
      }

      console.log("Fetching visits from backend...");
      const response = await fetch(
        "https://phawaazvms.onrender.com/api/visitors/summary",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch visit summary.");
      }

      const responseJson = await response.json();
      console.log("Backend /summary response:", responseJson);

      const backendData = responseJson.data || responseJson;
      const rawVisitSummary = backendData.visitSummary || [];
      const rawUpcomingVisitsList = backendData.upcomingVisitsList || [];

      // Also handle the case where all visits might be in visitSummary
      // and we need to filter for upcoming ones
      const allVisitsFromSummary = backendData.visitSummary || [];
      const upcomingFromSummary = allVisitsFromSummary.filter((visit) => {
        const visitDate = new Date(visit.visitDate);
        const now = new Date();
        return (
          visitDate > now &&
          (visit.status === "scheduled" || visit.status === "pending")
        );
      });

      // Use upcomingVisitsList if available, otherwise filter from visitSummary
      const finalUpcomingVisits =
        rawUpcomingVisitsList.length > 0
          ? rawUpcomingVisitsList
          : upcomingFromSummary;

      // Ensure they are arrays
      if (
        !Array.isArray(finalUpcomingVisits) ||
        !Array.isArray(rawVisitSummary)
      ) {
        console.error("Expected arrays but got:", {
          finalUpcomingVisits,
          rawVisitSummary,
          backendData,
        });
        throw new Error(
          "Invalid data structure received from backend for visit summary."
        );
      }

      console.log("Raw visit summary:", rawVisitSummary);
      console.log("Final upcoming visits:", finalUpcomingVisits);

      const formattedUpcomingVisits = finalUpcomingVisits.map((visit) => {
        const visitDateTime = new Date(visit.visitDate);
        return {
          id: visit._id,
          company: visit.company,
          date: visit.visitDate,
          time: visitDateTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
          purpose: visit.purpose,
          status: visit.status,
          checkInTime: visit.checkInTime,
          checkOutTime: visit.checkOutTime,
          qrCode: visit.qrCode,
          user: visit.user,
        };
      });

      // Format backend data for overall visit summary
      const formattedVisitSummary = rawVisitSummary.map((visit) => {
        const visitDateTime = new Date(visit.visitDate);
        return {
          id: visit._id,
          company: visit.company,
          date: visit.visitDate,
          time: visitDateTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
          purpose: visit.purpose,
          status: visit.status,
          checkInTime: visit.checkInTime,
          checkOutTime: visit.checkOutTime,
          qrCode: visit.qrCode,
          user: visit.user,
        };
      });

      console.log("Formatted upcoming visits:", formattedUpcomingVisits);
      console.log("Formatted visit summary:", formattedVisitSummary);

      setUpcomingVisits(formattedUpcomingVisits);
      setVisitSummary(formattedVisitSummary);
    } catch (error) {
      console.error("Error fetching visits:", error);
      toast.error(error.message || "Could not load visits.");
      setUpcomingVisits([]);
      setVisitSummary([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVisitsFromBackend();
  }, [fetchVisitsFromBackend]);

  useEffect(() => {
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    setUnreadNotifications(unreadCount);
  }, [notifications]);

  const addVisit = async (newVisitFormData) => {
    setLoading(true);
    const addToastId = toast.loading("Scheduling visit...");

    try {
      const token = localStorage.getItem("access_token");
      const currentUserProfile = JSON.parse(
        localStorage.getItem("profile_data") || "{}"
      );

      if (!token || !currentUserProfile.id) {
        toast.error("Authentication required to schedule a visit.", {
          id: addToastId,
        });
        setLoading(false);
        return false;
      }

      const visitDateCombined = new Date(
        `${newVisitFormData.date}T${newVisitFormData.time}:00`
      ).toISOString();

      const requestBody = {
        user: {
          _id: currentUserProfile.id,
          firstName:
            currentUserProfile.firstName ||
            (currentUserProfile.fullName
              ? currentUserProfile.fullName.split(" ")[0]
              : ""),
          lastName:
            currentUserProfile.lastName ||
            (currentUserProfile.fullName
              ? currentUserProfile.fullName.split(" ").slice(1).join(" ")
              : ""),
          email: currentUserProfile.email,
          role: currentUserProfile.role,
          phone: currentUserProfile.phone || "",
          photo: currentUserProfile.avatarUrl || "default-avatar.png",
          isActive: true,
          lastLogin: new Date().toISOString(),
          createdAt: currentUserProfile.createdAt,
          updatedAt: new Date().toISOString(),
        },
        purpose: newVisitFormData.purpose,
        visitDate: visitDateCombined,
        expectedDuration: newVisitFormData.expectedDuration || 60,
        company: newVisitFormData.company,
        notes: newVisitFormData.notes || "",
        status: "scheduled",
      };

      console.log("Sending visit request:", requestBody);

      const response = await fetch(
        "https://phawaazvms.onrender.com/api/visitors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      const responseJson = await response.json();
      console.log("Add visit response:", responseJson);

      if (!response.ok) {
        throw new Error(responseJson.message || "Failed to schedule visit.");
      }

      setTimeout(() => {
        console.log("Re-fetching visits after successful creation...");
        fetchVisitsFromBackend();
      }, 500);

      const notification = {
        id: Date.now(),
        message: `Visit scheduled with ${
          newVisitFormData.company
        } on ${formatDateForDisplay(
          newVisitFormData.date
        )} at ${formatTimeForDisplay(newVisitFormData.time)}.`,
        isRead: false,
        timestamp: new Date().toISOString(),
      };
      setNotifications((prev) => [notification, ...prev]);

      toast.success("Visit scheduled successfully!", { id: addToastId });
      return true;
    } catch (error) {
      console.error("Error scheduling visit:", error);
      toast.error(
        error.message || "Failed to schedule visit. Please try again.",
        {
          id: addToastId,
        }
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleReadStatus = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      console.error("Error formatting date:", dateStr, e);
      return dateStr;
    }
  };

  const formatTimeForDisplay = (timeStr) => {
    if (!timeStr) return "";
    try {
      const dateObj = new Date(`1970-01-01T${timeStr}`);
      if (isNaN(dateObj.getTime())) {
        const isoDateObj = new Date(timeStr);
        if (!isNaN(isoDateObj.getTime())) {
          return isoDateObj.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
        }
      }
      return dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (e) {
      console.error("Error formatting time:", timeStr, e);
      return timeStr;
    }
  };

  const getTopUpcomingVisits = useCallback(() => {
    return [...upcomingVisits]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
  }, [upcomingVisits]);

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
        fetchVisitsFromBackend,
      }}
    >
      {children}
    </VisitContext.Provider>
  );
};
