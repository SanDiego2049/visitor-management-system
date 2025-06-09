import React, { useState } from "react";
import { ArrowRightCircle } from "lucide-react";
import { useTheme } from "../../hooks/ThemeContext";

const pricingPlans = {
  monthly: [
    {
      title: "Starter",
      price: "$0",
      description: "For small offices just getting started.",
      features: [
        "Visitor check-in",
        "Basic visitor log",
        "Email notifications",
      ],
      cta: "Get Started Free",
      link: "/signup",
      isPopular: false,
    },
    {
      title: "Professional",
      price: "$49/mo",
      description: "Ideal for growing teams and multiple locations.",
      features: [
        "All Starter features",
        "Real-time dashboard",
        "Custom branding",
        "SMS alerts",
      ],
      cta: "Choose Plan",
      link: "/signup",
      isPopular: true,
    },
    {
      title: "Enterprise",
      price: "Contact Us",
      description: "Custom solutions for large organizations.",
      features: [
        "All Pro features",
        "Dedicated support",
        "Advanced compliance tools",
        "API access",
      ],
      cta: "Contact Sales",
      link: "/signup",
      isPopular: false,
    },
  ],
  yearly: [
    {
      title: "Starter",
      price: "$0",
      description: "For small offices just getting started.",
      features: [
        "Visitor check-in",
        "Basic visitor log",
        "Email notifications",
      ],
      cta: "Get Started Free",
      link: "/signup",
      isPopular: false,
    },
    {
      title: "Professional",
      price: "$490/yr",
      description: "Get 2 months free with annual billing.",
      features: [
        "All Starter features",
        "Real-time dashboard",
        "Custom branding",
        "SMS alerts",
      ],
      cta: "Choose Plan",
      link: "/checkout",
      isPopular: true,
    },
    {
      title: "Enterprise",
      price: "Contact Us",
      description: "Custom solutions for large organizations.",
      features: [
        "All Pro features",
        "Dedicated support",
        "Advanced compliance tools",
        "API access",
      ],
      cta: "Contact Sales",
      link: "/contact-sales",
      isPopular: false,
    },
  ],
};

const Pricing = () => {
  const [billing, setBilling] = useState("monthly");
  const { isDarkMode } = useTheme();

  return (
    <section
      id="pricing"
      className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Simple Pricing
        </h2>
        <p
          className={`mb-8 transition-colors duration-300 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Choose a plan that fits your organization. Switch anytime.
        </p>

        {/* Toggle */}
        <div
          className={`inline-flex mb-12 rounded-full p-1 transition-colors duration-300 ${
            isDarkMode
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <button
            onClick={() => setBilling("monthly")}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              billing === "monthly"
                ? "bg-sky-500 text-white"
                : isDarkMode
                ? "text-gray-300 hover:bg-gray-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              billing === "yearly"
                ? "bg-sky-500 text-white"
                : isDarkMode
                ? "text-gray-300 hover:bg-gray-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Yearly
          </button>
        </div>

        {/* Plans */}
        <div className="grid gap-8 md:grid-cols-3">
          {pricingPlans[billing].map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg border transition-all duration-300 transform hover:scale-[1.02] ${
                plan.isPopular
                  ? "border-sky-500 shadow-lg"
                  : isDarkMode
                  ? "border-gray-700"
                  : "border-gray-200"
              } ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } p-6 flex flex-col justify-between`}
            >
              {plan.isPopular && (
                <div
                  className={`text-xs font-semibold px-3 py-1 rounded-full mb-4 w-max mx-auto ${
                    isDarkMode
                      ? "bg-sky-900 text-sky-300"
                      : "bg-sky-100 text-sky-600"
                  }`}
                >
                  Most Popular
                </div>
              )}
              <div>
                <h3
                  className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {plan.title}
                </h3>
                <p
                  className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {plan.price}
                </p>
                <p
                  className={`mb-6 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {plan.description}
                </p>
                <ul className="space-y-2 text-left text-sm">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span
                        className={`mr-2 ${
                          isDarkMode ? "text-sky-400" : "text-sky-500"
                        }`}
                      >
                        ✓
                      </span>
                      <span
                        className={`transition-colors duration-300 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={plan.link}
                className={`mt-8 inline-block text-sm text-center font-medium px-6 py-3 rounded-lg transition ${
                  plan.isPopular
                    ? "bg-sky-500 hover:bg-sky-600 text-white"
                    : isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                {plan.cta}
                <ArrowRightCircle className="inline ml-2" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
