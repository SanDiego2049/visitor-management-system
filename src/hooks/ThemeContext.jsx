import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const getInitialTheme = (userType) => {
    const key = userType === "default" ? "theme" : `theme_${userType}`;
    const savedTheme = localStorage.getItem(key);

    if (savedTheme) return savedTheme === "dark";

    return window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  };

  const [themePreferences, setThemePreferences] = useState({
    visitor: getInitialTheme("visitor"),
    admin: getInitialTheme("admin"),
    default: getInitialTheme("default"),
  });

  const getCurrentUserType = () => {
    const path = window.location.pathname;
    if (path.startsWith("/admin")) return "admin";
    if (path.startsWith("/visitor")) return "visitor";
    return "default"; // This will catch signup/login routes
  };

  const [currentUserType, setCurrentUserType] = useState(getCurrentUserType());

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentUserType(getCurrentUserType());
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  const isDarkMode = themePreferences[currentUserType];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const saveThemePreference = (userType, isDark) => {
    const key = userType === "default" ? "theme" : `theme_${userType}`;
    localStorage.setItem(key, isDark ? "dark" : "light");

    if (userType === "default") {
      localStorage.setItem("darkMode", isDark);
    }
  };

  // Add listener for system preference changes
  useEffect(() => {
    const key =
      currentUserType === "default" ? "theme" : `theme_${currentUserType}`;

    if (!localStorage.getItem(key)) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = (e) => {
        setThemePreferences((prev) => ({
          ...prev,
          [currentUserType]: e.matches,
        }));
      };

      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [currentUserType]);

  useEffect(() => {
    const handleStorageChange = () => {
      setThemePreferences({
        visitor: getInitialTheme("visitor"),
        admin: getInitialTheme("admin"),
        default: getInitialTheme("default"),
      });
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleTheme = () => {
    const newValue = !themePreferences[currentUserType];

    setThemePreferences((prev) => ({
      ...prev,
      [currentUserType]: newValue,
    }));

    saveThemePreference(currentUserType, newValue);
  };

  const setTheme = (userType, isDark) => {
    const type = userType || currentUserType;

    setThemePreferences((prev) => ({
      ...prev,
      [type]: isDark,
    }));

    saveThemePreference(type, isDark);
  };

  // Get current theme mode (light, dark, or system) for specific user type
  const getThemeMode = (userType) => {
    const type = userType || currentUserType;
    const key = type === "default" ? "theme" : `theme_${type}`;

    if (!localStorage.getItem(key)) {
      return "system";
    }
    return themePreferences[type] ? "dark" : "light";
  };

  // Use system theme for specific user type
  const useSystemTheme = (userType) => {
    const type = userType || currentUserType;
    const key = type === "default" ? "theme" : `theme_${type}`;

    localStorage.removeItem(key);

    const systemPreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    setThemePreferences((prev) => ({
      ...prev,
      [type]: systemPreference,
    }));
  };

  // Context value
  const value = {
    isDarkMode,
    toggleTheme,
    setTheme,
    getThemeMode,
    useSystemTheme,
    currentUserType,
    themePreferences,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Custom hook for using the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export default ThemeContext;

// These functions are maintained for backward compatibility
// but they now use the ThemeContext internally
export const initDarkMode = () => {
  // This function is now just for compatibility
  // The ThemeProvider handles the initialization
  const userPrefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const storedPreference =
    localStorage.getItem("theme") || localStorage.getItem("darkMode");
  const isDarkMode =
    storedPreference !== null
      ? storedPreference === "dark" || storedPreference === "true"
      : userPrefersDark;

  return isDarkMode;
};

export const toggleDarkMode = (currentState) => {
  // This function is maintained for backward compatibility
  // but it's recommended to use the useTheme hook instead
  const newState = !currentState;
  localStorage.setItem("theme", newState ? "dark" : "light");
  localStorage.setItem("darkMode", newState);

  if (newState) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return newState;
};
