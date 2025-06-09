import React from "react";
import {
  Building,
  Stethoscope,
  GraduationCap,
  Factory,
  Hotel,
  Bus,
} from "lucide-react";
import { useTheme } from "../../hooks/ThemeContext";

const industries = [
  {
    name: "Corporate Offices",
    description: "Secure and manage guest visits across corporate campuses.",
    icon: <Building className="w-8 h-8" />,
    href: "/signup",
  },
  {
    name: "Healthcare",
    description: "Ensure safety and compliance for patients and visitors.",
    icon: <Stethoscope className="w-8 h-8" />,
    href: "/signup",
  },
  {
    name: "Education",
    description: "Streamline check-ins and enhance student safety.",
    icon: <GraduationCap className="w-8 h-8" />,
    href: "/signup",
  },
  {
    name: "Manufacturing",
    description: "Track contractor and visitor access across facilities.",
    icon: <Factory className="w-8 h-8" />,
    href: "/signup",
  },
  {
    name: "Hospitality",
    description: "Create a welcoming and secure experience for guests.",
    icon: <Hotel className="w-8 h-8" />,
    href: "/signup",
  },
  {
    name: "Transportation",
    description: "Monitor and manage visitor access at transport hubs.",
    icon: <Bus className="w-8 h-8" />,
    href: "/signup",
  },
];

const IndustriesServed = () => {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="companies"
      className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Built for Every Industry
        </h2>
        <p
          className={`mb-12 transition-colors duration-300 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Whether you're running a school, clinic, or corporate HQ — our system
          adapts to your needs.
        </p>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <a
              key={index}
              href={industry.href}
              aria-label={`Learn more about ${industry.name}`}
              className={`group p-6 rounded-lg border transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 hover:border-sky-500"
                  : "bg-white border-gray-200 hover:border-sky-500"
              } shadow-sm hover:shadow-md`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div
                  className={`p-2 rounded-full group-hover:scale-105 transform transition-transform duration-300 ${
                    isDarkMode ? "bg-sky-900" : "bg-sky-100"
                  }`}
                >
                  {React.cloneElement(industry.icon, {
                    className: `w-8 h-8 ${
                      isDarkMode ? "text-sky-400" : "text-sky-500"
                    }`,
                  })}
                </div>
                <h3
                  className={`text-lg font-semibold transition-colors duration-300 group-hover:text-sky-500 ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {industry.name}
                </h3>
              </div>
              <p
                className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {industry.description}
              </p>
            </a>
          ))}
        </div>

        <div className="mt-12">
          <a
            href="/signup"
            className={`inline-block px-6 py-3 font-medium rounded-lg transition-colors duration-300 ${
              isDarkMode
                ? "bg-sky-600 hover:bg-sky-500 text-white"
                : "bg-sky-500 hover:bg-sky-600 text-white"
            }`}
          >
            Explore All Industries
          </a>
        </div>
      </div>
    </section>
  );
};

export default IndustriesServed;
