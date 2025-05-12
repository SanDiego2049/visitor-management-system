import React from "react";
import { MessageSquareQuote } from "lucide-react";
import { useTheme } from "../../hooks/ThemeContext";

const testimonials = [
  {
    name: "Sarah Thompson",
    role: "Front Desk Manager, HealthCare Inc.",
    quote:
      "Since adopting this system, we've streamlined our visitor sign-in process dramatically. Our staff and guests feel safer and more organized.",
    logo: "https://imgs.search.brave.com/_4wvPcoMT4L5K_3EgFqZL0-DWYUUkWKW0WjvRmDyNTA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc3F1YXJlc3Bh/Y2UtY2RuLmNvbS9j/b250ZW50L3YxLzVl/ZGUyMTIyZTU4MmI5/NjYzMGE0YTczZS8x/NjA5Mzc1NzY5NjM0/LUVHMVdPVElON1k0/TUIwMU44QVYxL0Rv/bWlubyVFMiU4MCU5/OXMtbG9nby0yMDIx/LmpwZw",
  },
  {
    name: "James Okwu",
    role: "IT Manager, Axis Manufacturing",
    quote:
      "The real-time dashboard and alerts have been a game changer. We always know who's on site, and compliance is easier than ever.",
    logo: "https://imgs.search.brave.com/c_CviH_Ume_61ZqalMjAG_peY1eUYkslJNLwdUamZuw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtY3NlLmNhbnZh/LmNvbS9ibG9iLzU2/NDEwMC8yM0xHMS5q/cGc",
  },
  {
    name: "Lydia Mensah",
    role: "Head of Operations, GreenEdge Schools",
    quote:
      "Parents love the seamless check-in, and we've reduced paper logs completely. It's made our school more secure and more efficient.",
    logo: "https://imgs.search.brave.com/3PhdBcxbf7OIBrBe3Fg8RjHd72cn3uFA5_nq844URqc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9nb2Rlc2lnbndv/cmtzLmNvbS9pbWFn/ZXMvYmxvZy9pbWFn/ZXMvdW5pdGVkLW5h/dGlvbnMtY2hpbGRy/ZW5zLWZ1bmQtbG9n/by1kZXNpZ24tdHJl/bmQuanBn",
  },
];

const Testimonials = () => {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="testimonials"
      className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-950" : "bg-white"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <h2
          className={`text-3xl font-bold text-center mb-12 transition-colors duration-300 ${
            isDarkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Hear From Organizations Like Yours
        </h2>

        <div className="space-y-12">
          {testimonials.map((testimony, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              } items-center gap-8 md:gap-12`}
            >
              <div className="flex-1">
                <div
                  className={`p-6 rounded-lg shadow-md transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-sky-50 border border-gray-100"
                  }`}
                >
                  <MessageSquareQuote
                    className={`w-8 h-8 mb-4 ${
                      isDarkMode ? "text-sky-400" : "text-sky-500"
                    }`}
                  />
                  <p
                    className={`text-lg italic mb-4 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    "{testimony.quote}"
                  </p>
                  <div>
                    <p
                      className={`font-semibold transition-colors duration-300 ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {testimony.name}
                    </p>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {testimony.role}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/3">
                <img
                  src={testimony.logo}
                  alt={`${testimony.name} logo`}
                  className={`w-full h-24 object-contain transition-all duration-300 ${
                    isDarkMode
                      ? "grayscale-50 hover:grayscale-0"
                      : "grayscale hover:grayscale-0"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
