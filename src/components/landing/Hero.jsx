import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/ThemeContext";

const Hero = () => {
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`min-h-[80vh] flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-20 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-300 text-gray-800"
      }`}
      aria-label="Hero Section"
    >
      {/* Text Content */}
      <div className="max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Smarter Visitor Management
        </h1>
        <p
          className={`text-lg mt-4 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Modernize your front desk with instant check-ins, real-time alerts,
          and secure visitor tracking. One platform for all your needs.
        </p>
        <div className="mt-6">
          <Link
            to="/signup"
            className={`inline-block px-6 py-2 rounded-lg text-sm transition-colors ${
              isDarkMode
                ? "bg-sky-600 hover:bg-sky-500 text-white"
                : "bg-sky-300 hover:bg-sky-500 text-gray-800"
            }`}
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="mt-10 md:mt-0 md:ml-12">
        <img
          src="https://imgs.search.brave.com/0eu3CoQ011pEkIb4Rt0c_1xOCpCpunWIoI8hWD_ilJM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZmFjaWxpdHlvcy5j/b20vaHMtZnMvaHVi/ZnMvRmFjaWxpdHlP/UyUyMDIwMjUvSW1h/Z2UvaW1hZ2UtMy5w/bmc_d2lkdGg9NTUy/JmhlaWdodD02Mzkm/bmFtZT1pbWFnZS0z/LnBuZw"
          alt="Visitor dashboard preview interface"
          className={`max-w-md w-full transition-all duration-500 rounded-lg border ${
            isDarkMode
              ? "border-gray-700 hover:border-gray-900"
              : "border-gray-200 hover:border-gray-300"
          } md:hover:scale-105`}
        />
      </div>
    </section>
  );
};

export default Hero;
