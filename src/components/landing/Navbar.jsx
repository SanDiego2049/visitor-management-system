import React, { useState } from "react";
import {
  Building,
  Globe,
  Sun,
  Moon,
  List,
  Footprints,
  ShieldCheck,
  CirclePercent,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const navLinks = [
    {
      name: "Features",
      sectionId: "features",
      icon: <List className="w-8 h-8" />,
    },
    {
      name: "How It Works",
      sectionId: "steps",
      icon: <Footprints className="w-8 h-8" />,
    },
    {
      name: "Testimonials",
      sectionId: "testimonials",
      icon: <ShieldCheck className="w-8 h-8" />,
    },
    {
      name: "Pricing",
      sectionId: "pricing",
      icon: <CirclePercent className="w-8 h-8" />,
    },
    {
      name: "Companies",
      sectionId: "companies",
      icon: <Building className="w-8 h-8" />,
    },
    {
      name: "CTA",
      sectionId: "cta",
      icon: <Globe className="w-8 h-8" />,
    },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false); // Close mobile menu after clicking
  };

  return (
    <header
      className={`w-full bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900 transition-colors duration-200 ${
        isOpen ? "md:shadow-none" : ""
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div
          className="text-2xl font-bold text-gray-800 dark:text-white cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          VMS
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <button
                onClick={() => scrollToSection(link.sectionId)}
                className="cursor-pointer flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 transition-colors focus:outline-none"
              >
                {React.cloneElement(link.icon, {
                  className: `${
                    isDarkMode ? "hover:text-blue-300 " : "hover:text-blue-700"
                  }`,
                })}
                <span>{link.name}</span>
              </button>
            </div>
          ))}
          <button
            onClick={toggleTheme}
            className="absolute right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {isDarkMode ? <Sun className="text-white" /> : <Moon />}
          </button>
        </nav>

        <div className="hidden md:block">
          <Link
            to="/signup"
            className="px-6 py-2 rounded-lg bg-sky-300 dark:bg-sky-600 hover:bg-sky-500 dark:hover:bg-sky-500 text-sm text-gray-800 dark:text-white transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleTheme}
            className="absolute top-3 right-14 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {isDarkMode ? <Sun className="text-white" /> : <Moon />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none relative w-8 h-8 flex flex-col justify-center items-center space-y-1"
          >
            <div
              className={`w-6 h-1 bg-black dark:bg-white transition-all duration-300 transform ${
                isOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-1 bg-black dark:bg-white transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-1 bg-black dark:bg-white transition-all duration-300 transform ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></div>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900 transition-all duration-600 ease-in overflow-hidden ${
          isOpen
            ? "max-h-screen opacity-100 border-t border-gray-100 dark:border-gray-700"
            : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col space-y-2 px-4 pb-4">
          {navLinks.map((link) => (
            <li key={link.name} className="relative">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => scrollToSection(link.sectionId)}
                  className="flex items-center space-x-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 w-full text-left focus:outline-none"
                >
                  {React.cloneElement(link.icon, {
                    className: `${
                      isDarkMode ? "hover:text-blue-300" : "hover:text-blue-700"
                    }`,
                  })}
                  <span>{link.name}</span>
                </button>
              </div>
            </li>
          ))}
          <li>
            <Link
              to="/signup"
              className="flex items-center justify-center px-4 py-2 mt-2 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600 transition-colors"
            >
              Get Started
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
