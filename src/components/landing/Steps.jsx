import { Clipboard, Lock, Bell, BarChart2 } from "lucide-react";
import { useTheme } from "../../hooks/ThemeContext";

const Steps = () => {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="steps"
      className={`py-20 transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-r from-gray-800 to-gray-900"
          : "bg-gradient-to-r from-blue-50 to-purple-50"
      }`}
      aria-label="How Visitor Management System Works"
    >
      <div className="container mx-auto px-6 text-center">
        <h2
          className={`text-3xl font-bold mb-12 transition-colors duration-300 ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          How VMS Works
        </h2>

        <div className="flex flex-col items-center space-y-12">
          {[
            {
              icon: <Clipboard className="w-8 h-6 md:w-8 md:h-8" />,
              title: "Step 1: Visitor Registration",
              text: "Visitors sign in using a user-friendly interface, either manually or through QR codes.",
            },
            {
              icon: <Lock className="w-8 h-6 md:w-8 md:h-8" />,
              title: "Step 2: Security Check",
              text: "The system performs a background security check to ensure only authorized visitors gain access.",
            },
            {
              icon: <Bell className="w-8 h-6 md:w-8 md:h-8" />,
              title: "Step 3: Notification & Access",
              text: "Visitors are instantly notified of their access, and their entry is logged in real-time.",
            },
            {
              icon: <BarChart2 className="w-8 h-6 md:w-8 md:h-8" />,
              title: "Step 4: Reporting & Analytics",
              text: "Track visitor history, create detailed reports, and analyze patterns with our data-driven system.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="flex items-center space-x-6 md:space-x-8 justify-center max-w-3xl"
            >
              <div
                className={`w-8 h-8 md:w-16 md:h-16 flex items-center justify-center rounded-full shadow-lg transform transition-all duration-500 hover:scale-110 ${
                  isDarkMode
                    ? "bg-sky-500 text-white"
                    : "bg-gray-600 text-white"
                }`}
              >
                {step.icon}
              </div>
              <div className="text-left">
                <h3
                  className={`text-xl font-semibold transition-colors duration-300 ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`mt-2 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
