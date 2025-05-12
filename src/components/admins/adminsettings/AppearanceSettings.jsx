import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "../../../hooks/ThemeContext";
import FormSection from "../../reusable/FormSection";
import ToggleSwitch from "../../reusable/ToggleSwitch";
import ThemeOption from "../../reusable/ThemeOption";

const AppearanceSettings = ({
  appearanceData,
  handleInputChange,
  handleCheckboxChange,
}) => {
  // Get the theme context
  const { isDarkMode, setTheme, currentUserType, getThemeMode } = useTheme();

  // Local state to track the selected theme option
  const [selectedTheme, setSelectedTheme] = useState(() => {
    return getThemeMode(); // Now using the user-specific theme from context
  });

  // Handle theme selection
  const handleThemeChange = (theme) => {
    const isDark = theme === "dark";
    const isSystem = theme === "system";

    if (isSystem) {
      // Use system theme for the current user type only
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(currentUserType, mediaQuery.matches);
      localStorage.removeItem(
        currentUserType === "default" ? "theme" : `theme_${currentUserType}`
      );
    } else {
      // Set theme specifically for the current user type
      setTheme(currentUserType, isDark);
    }

    setSelectedTheme(theme);
  };

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (selectedTheme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = (e) => {
        setTheme(currentUserType, e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [selectedTheme, setTheme, currentUserType]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
        Appearance Settings
      </h2>

      <div className="space-y-6">
        <FormSection title="Theme">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ThemeOption
              title="Light Mode"
              value="light"
              currentTheme={selectedTheme}
              onClick={() => handleThemeChange("light")}
              icon={<Sun size={24} className="text-yellow-500" />}
              bgClass="bg-white"
            />

            <ThemeOption
              title="Dark Mode"
              value="dark"
              currentTheme={selectedTheme}
              onClick={() => handleThemeChange("dark")}
              icon={<Moon size={24} className="text-blue-400" />}
              bgClass="bg-gray-800"
            />

            <ThemeOption
              title="System Default"
              value="system"
              currentTheme={selectedTheme}
              onClick={() => handleThemeChange("system")}
              icon={
                <div className="flex">
                  <Sun size={24} className="text-yellow-500 mr-1" />
                  <Moon size={24} className="text-blue-400" />
                </div>
              }
              bgClass="bg-gradient-to-r from-white to-gray-800"
            />
          </div>
        </FormSection>

        <FormSection title="Layout Preferences">
          <div className="space-y-4">
            <ToggleSwitch
              title="Sidebar Expanded"
              description="Keep sidebar expanded by default"
              checked={appearanceData?.sidebarExpanded}
              onChange={() =>
                handleCheckboxChange &&
                handleCheckboxChange("appearance", "sidebarExpanded")
              }
            />

            <ToggleSwitch
              title="Compact Mode"
              description="Show more content with less spacing"
              checked={appearanceData?.compactMode}
              onChange={() =>
                handleCheckboxChange &&
                handleCheckboxChange("appearance", "compactMode")
              }
            />
          </div>
        </FormSection>

        <FormSection title="Date & Time Format">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date Format
              </label>
              <select
                value={appearanceData?.dateFormat || "MM/DD/YYYY"}
                onChange={(e) =>
                  handleInputChange &&
                  handleInputChange("appearance", "dateFormat", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY (US)</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY (UK/EU)</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
                <option value="DD.MM.YYYY">DD.MM.YYYY</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Time Format
              </label>
              <select
                value={appearanceData?.timeFormat || "12h"}
                onChange={(e) =>
                  handleInputChange &&
                  handleInputChange("appearance", "timeFormat", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="12h">12-hour (AM/PM)</option>
                <option value="24h">24-hour</option>
              </select>
            </div>
          </div>
        </FormSection>
      </div>
    </div>
  );
};

export default AppearanceSettings;
