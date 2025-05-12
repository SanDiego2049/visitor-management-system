import { useState, useEffect } from "react";
import SettingsTabs from "../../components/reusable/SettingsTabs";
import ProfileSettings from "../../components/admins/adminsettings/ProfileSettings";
import NotificationSettings from "../../components/admins/adminsettings/NotificationSettings";
import AppearanceSettings from "../../components/admins/adminsettings/AppearanceSettings";
import SaveButton from "../../components/reusable/SaveButton";
import toast from "react-hot-toast";
import { Settings } from "lucide-react";

const VisitorSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    profile: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      purpose: "",
      profileImage: "",
      timeZone: "UTC+0",
    },
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      pushNotifications: true,
      upcomingVisits: true,
      checkInReminders: true,
    },
    appearance: {
      theme: localStorage.getItem("theme") || "system",
      compactMode: false,
      dateFormat: "MM/DD/YYYY",
      timeFormat: "12h",
    },
  });

  useEffect(() => {
    // Check for user's dark mode preference
    const userPrefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(userPrefersDark);

    // Simulate fetching visitor settings data
    const timer = setTimeout(() => {
      setFormData({
        profile: {
          fullName: "John Visitor",
          email: "john@visitorcompany.com",
          phone: "+1 (555) 987-6543",
          company: "Visitor Company Inc.",
          purpose: "Business Meeting",
          profileImage: "https://i.pravatar.cc/100?img=4",
          timeZone: "UTC-5",
        },
        notifications: {
          emailAlerts: true,
          smsAlerts: true,
          pushNotifications: false,
          upcomingVisits: true,
          checkInReminders: true,
        },
        appearance: {
          theme: "light",
          compactMode: false,
          dateFormat: "MM/DD/YYYY",
          timeFormat: "12h",
        },
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });
  };

  const handleCheckboxChange = (section, field) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: !formData[section][field],
      },
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          profileImage: URL.createObjectURL(file),
        },
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaveStatus("saving");

    // Simulate API call to save settings
    setTimeout(() => {
      setSaveStatus("saved");
      toast.success("Visitor settings saved successfully");

      // Reset the status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 bg-gray-50 dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 dark:text-gray-300">
          Loading visitor settings...
        </p>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileSettings
            profileData={formData.profile}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
          />
        );
      case "notifications":
        return (
          <NotificationSettings
            notificationsData={formData.notifications}
            handleCheckboxChange={handleCheckboxChange}
          />
        );
      case "appearance":
        return (
          <AppearanceSettings
            appearanceData={formData.appearance}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
          />
        );
      default:
        return <ProfileSettings profileData={formData.profile} />;
    }
  };

  return (
    <div className="h-full dark:bg-gray-900 transition-colors duration-200">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 dark:text-white flex items-center gap-2">
          <Settings size={28} className="text-blue-500" />
          Visitor Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your visitor account settings and preferences
        </p>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Tabs sidebar - passing the visitor-specific tabs */}
          <SettingsTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            availableTabs={["profile", "notifications", "appearance"]}
          />

          {/* Tab content */}
          <div className="flex-1 p-6">
            <form onSubmit={handleSubmit}>
              {renderTabContent()}

              {/* Save Button */}
              <SaveButton saveStatus={saveStatus} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorSettings;
