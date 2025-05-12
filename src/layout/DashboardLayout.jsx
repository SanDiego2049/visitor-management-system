import { useEffect, useState } from "react";
import Sidebar from "../components/reusable/Sidebar";

const DashboardLayout = ({
  user,
  navItems,
  dashboardTitle,
  unreadNotifications,
  handleLogout,
  children,
  currentPath,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);

  // Handle window resize for responsive sidebar
  const handleResize = () => {
    if (window.innerWidth < 768) setIsCollapsed(true);
    else setIsCollapsed(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Loading state
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 dark:text-gray-300">Please wait...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar */}
      <Sidebar
        user={user}
        navItems={navItems}
        dashboardTitle={dashboardTitle}
        unreadNotifications={unreadNotifications}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        handleLogout={handleLogout}
        currentPath={currentPath}
      />

      {/* Overlay for mobile when sidebar is open */}
      {!isCollapsed && window.innerWidth < 768 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Main Content */}
      <main
        className={`flex-1 p-4 md:p-6 lg:p-8 overflow-auto h-screen ${
          isCollapsed ? "ml-20" : "ml-0 lg:ml-0"
        } transition-all duration-300`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
