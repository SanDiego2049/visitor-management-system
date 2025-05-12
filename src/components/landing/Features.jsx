import { User, Shield, Clock, Search } from "lucide-react";
import { useTheme } from "../../hooks/ThemeContext";

const features = [
  {
    icon: <User />,
    title: "Easy Visitor Check-in",
    description:
      "Effortlessly register and check-in visitors with our user-friendly system.",
  },
  {
    icon: <Shield />,
    title: "Enhanced Security",
    description:
      "Our system ensures secure visitor access with real-time monitoring and alerts.",
  },
  {
    icon: <Clock />,
    title: "Real-time Monitoring",
    description: "Keep track of visitor arrivals and departures in real-time.",
  },
  {
    icon: <Search />,
    title: "Detailed Reporting",
    description:
      "Access detailed reports on visitor history, check-ins, and security events.",
  },
];

const Features = () => {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="features"
      className={`py-16 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-600" : "bg-gray-50"
      }`}
      aria-label="Key Features"
    >
      <div className="container mx-auto px-4 text-center">
        <h2
          className={`text-3xl font-bold mb-12 transition-colors duration-300 ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Our Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <article
              key={index}
              className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-800 border border-gray-700 hover:border-gray-600"
                  : "bg-white hover:border-gray-300"
              }`}
            >
              <div
                className={`text-4xl mb-4 mx-auto ${
                  isDarkMode ? "text-sky-400" : "text-sky-500"
                }`}
              >
                {feature.icon}
              </div>
              <h3
                className={`text-xl font-semibold transition-colors duration-300 ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={`mt-2 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
