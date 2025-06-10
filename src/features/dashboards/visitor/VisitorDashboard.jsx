import { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation, Link } from "react-router-dom";
import {
  Clipboard,
  Bell,
  Home,
  User,
  Calendar,
  Settings,
  QrCode,
} from "lucide-react";
import toast from "react-hot-toast";
import DashboardLayout from "../../../layout/DashboardLayout";
import StatsCard from "../../../components/reusable/StatsCard";
import LoadingSpinner from "../../../components/reusable/LoadingSpinner";
import VisitForm from "../../../components/visitors/Visitform";
import FeedbackForm from "../../../components/visitors/FeedbackForm";

import { useProfile } from "../../../hooks/ProfileContext";
import { useVisit } from "../../../hooks/VisitContext";

const navItems = [
  {
    to: "",
    label: "Dashboard",
    icon: <Home size={20} />,
  },
  {
    to: "visit-summary",
    label: "Visit Summary",
    icon: <Clipboard size={20} />,
  },
  {
    to: "notifications",
    label: "Notifications",
    icon: <Bell size={20} />,
  },
  {
    to: "settings",
    label: "Settings",
    icon: <Settings size={20} />,
  },
];

const VisitorDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { profile, loading: profileLoading } = useProfile();
  const {
    loading: visitContextLoading,
    getTopUpcomingVisits,
    addVisit,
    unreadNotifications,
    formatDateForDisplay,
    formatTimeForDisplay,
    upcomingVisits,
    visitSummary,
  } = useVisit();

  const isDashboardRoot = location.pathname === "/visitor";
  const currentPath = location.pathname.split("/").filter(Boolean)[1] || "";

  const [generatedQRData, setGeneratedQRData] = useState("");
  const [topVisits, setTopVisits] = useState([]);
  const [visitStats, setVisitStats] = useState({
    upcoming: 0,
    completed: 0,
    total: 0,
  });

  useEffect(() => {
    console.log("=== useEffect triggered ===");
    console.log("Dependencies:", {
      profileLoading,
      visitContextLoading,
      profile: !!profile,
      upcomingVisitsLength: upcomingVisits.length,
      visitSummaryLength: visitSummary.length,
    });

    if (!profileLoading && !visitContextLoading && profile) {
      console.log("Conditions met, updating stats...");

      const currentTopVisits = getTopUpcomingVisits();
      console.log("Current top visits:", currentTopVisits);
      setTopVisits(currentTopVisits);

      const completedVisits = visitSummary.filter(
        (v) => v.status === "checked-out" || v.status === "completed"
      ).length;
      const totalVisits = visitSummary.length;

      const newStats = {
        upcoming: upcomingVisits.length, 
        completed: completedVisits,
        total: totalVisits,
      };

      console.log("New stats calculated:", newStats);
      setVisitStats(newStats);
    } else {
      console.log("Conditions not met, waiting...");
    }

    console.log("=== useEffect complete ===");
  }, [
    profileLoading,
    visitContextLoading,
    profile,
    upcomingVisits,
    visitSummary,
    getTopUpcomingVisits,
  ]);

  const handleVisitSubmit = async (newVisit) => {
    console.log("=== Visit Submit Started ===");
    console.log("New visit data:", newVisit);

    const success = await addVisit(newVisit);
    console.log("Visit submission result:", success);

    if (success) {
      console.log("Visit submitted successfully, should trigger re-fetch");
      setTimeout(() => {
        console.log("Post-submit state check:");
        console.log("upcomingVisits:", upcomingVisits);
        console.log("visitSummary:", visitSummary);
      }, 2000);
    }

    console.log("=== Visit Submit Complete ===");
    return success;
  };

  const handleQRGenerated = (qrData) => {
    setGeneratedQRData(qrData);
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (profileLoading || visitContextLoading || !profile) {
    return <LoadingSpinner message="Loading your dashboard..." />;
  }

  const DashboardContent = () => (
    <>
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 dark:text-white">
          Welcome, {profile.fullName} 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Here's your dashboard overview.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="UPCOMING VISITS"
          value={visitStats.upcoming}
          icon={<Calendar size={20} />}
          iconColor="blue"
          description="Scheduled visits"
        />

        <StatsCard
          title="COMPLETED VISITS"
          value={visitStats.completed}
          icon={<Clipboard size={20} />}
          iconColor="green"
          description="Previous visits"
        />

        <StatsCard
          title="TOTAL VISITS"
          value={visitStats.total}
          icon={<User size={20} />}
          iconColor="purple"
          description="All time"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
            <Clipboard size={20} className="mr-2 text-blue-500" />
            Upcoming Visits
          </h2>
          <div className="space-y-3">
            {topVisits.length === 0 ? (
              <div>
                <p className="text-gray-500 dark:text-gray-400">
                  No upcoming visits scheduled.
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Raw upcoming visits: {upcomingVisits.length}
                </p>
              </div>
            ) : (
              topVisits.map((visit) => (
                <div
                  key={visit.id}
                  className="p-4 border dark:bg-gray-800 dark:text-white border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-500 transition-colors duration-200 bg-gray-50 dark:bg-gray-750"
                >
                  <p className="font-medium text-gray-800 dark:text-white">
                    {visit.company}
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      {formatDateForDisplay(visit.date)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      {formatTimeForDisplay(visit.time)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    {visit.purpose || "No purpose specified"}
                  </p>
                </div>
              ))
            )}
          </div>
          <div className="mt-4">
            <Link to="/visitor/visit-summary" className="w-full">
              <button className="w-full text-center text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
                View all visits →
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 dark:text-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Feedback
          </h2>
          <FeedbackForm />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
          <QrCode size={20} className="mr-2 text-blue-500" />
          Generate Visit QR Code
        </h2>

        <VisitForm
          onSubmit={handleVisitSubmit}
          onQRGenerated={handleQRGenerated}
          initialQRData={generatedQRData}
        />
      </div>
    </>
  );

  const user = {
    fullName: profile.fullName,
    role: profile.role || "Visitor",
    avatarUrl: profile.avatarUrl || "https://i.pravatar.cc/100?img=2",
  };

  return (
    <DashboardLayout
      user={user}
      navItems={navItems}
      currentPath={currentPath}
      unreadNotifications={unreadNotifications}
      handleLogout={handleLogout}
      title="Visitor Portal"
    >
      {isDashboardRoot ? <DashboardContent /> : <Outlet />}
    </DashboardLayout>
  );
};

export default VisitorDashboard;
