import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { useTheme } from "../../hooks/ThemeContext";

const BackToTopButton = () => {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-opacity duration-300">
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
              : "bg-sky-300 hover:bg-sky-400 text-gray-800"
          } hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sky-500`}
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;
