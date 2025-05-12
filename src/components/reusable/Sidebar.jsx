import { Menu, LogOut } from "lucide-react";
import UserAvatar from "../reusable/UserAvatar";
import NavMenu from "../reusable/NavMenu"; 

const Sidebar = ({
  user,
  navItems,
  dashboardTitle,
  unreadNotifications,
  isCollapsed,
  setIsCollapsed,
  handleLogout,
  currentPath, 
}) => {
  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-gray-100 dark:bg-gray-950 text-dark dark:text-white p-4 flex flex-col justify-between h-screen transition-all duration-300 fixed lg:static z-30`}
    >
      <div>
        <div className="">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`${
              isCollapsed ? "mx-auto" : "justify-center"
            } text-dark dark:text-white focus:outline-none lg:block flex mb-6`}
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
        </div>

        {!isCollapsed && (
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            {dashboardTitle}
          </h2>
        )}

        {/* User Avatar and Info */}
        <UserAvatar user={user} isCollapsed={isCollapsed} />

        {/* Navigation - Use NavMenu component instead */}
        <nav className="flex mt-8">
          <NavMenu
            items={navItems}
            isCollapsed={isCollapsed}
            currentPath={currentPath}
            unreadCounts={{
              Dashboard: unreadNotifications,
              Notifications: unreadNotifications,
            }}
          />
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        title={isCollapsed ? "Logout" : ""}
        className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg transition-colors duration-200 w-full mt-auto text-white"
      >
        <LogOut size={18} />
        {!isCollapsed && <span>Logout</span>}
      </button>
    </aside>
  );
};

export default Sidebar;
