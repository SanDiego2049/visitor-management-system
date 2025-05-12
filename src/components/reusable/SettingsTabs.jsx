import { User, Bell, Shield, PanelLeft, Globe } from "lucide-react";

const SettingsTabs = ({ activeTab, setActiveTab, availableTabs }) => {
  // Define all possible tabs
  const allTabs = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "security", label: "Security", icon: <Shield size={18} /> },
    { id: "appearance", label: "Appearance", icon: <PanelLeft size={18} /> },
    { id: "system", label: "System", icon: <Globe size={18} /> },
  ];

  // Filter tabs based on availableTabs prop (if provided)
  const tabs = availableTabs
    ? allTabs.filter((tab) => availableTabs.includes(tab.id))
    : allTabs;

  return (
    <div className="w-full md:w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700">
      <nav className="p-4">
        <ul className="space-y-1">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <span className="mr-3">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SettingsTabs;
