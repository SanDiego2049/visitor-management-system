import React from "react";

const CallToAction = () => {
  return (
    <section id="cta"
      className="bg-sky-600 py-16 px-6 sm:px-8 text-center text-white"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="cta-heading"
          className="text-3xl font-bold sm:text-4xl mb-4 tracking-tight"
        >
          Ready to Take Control of Your Visitor Management?
        </h2>
        <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto">
          Our platform offers seamless integration, real-time tracking, and
          top-notch security. Start today and enhance your facility’s
          efficiency.
        </p>
        <a
          href="/signup"
          className="inline-block px-8 py-3 bg-white text-sky-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-600"
          aria-label="Get started with visitor management system"
        >
          Get Started Now
        </a>
      </div>
    </section>
  );
};

export default CallToAction;
