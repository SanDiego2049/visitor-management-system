import React from "react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Steps from "../components/landing/Steps";
import Testimonials from "../components/landing/Testimonials";
import Pricing from "../components/landing/Pricing";
import IndustriesServed from "../components/landing/IndustriesServed";
import CallToAction from "../components/landing/CallToAction";
import Footer from "../components/landing/Footer";
import BackToTopButton from "../components/landing/BackToTopButton";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Steps />
      <Testimonials />
      <Pricing />
      <IndustriesServed />
      <CallToAction />
      <Footer />
      <BackToTopButton />
    </>
  );
};

export default LandingPage;
// This component serves as the main entry point for the homepage of the application. It imports and renders the Navbar, Hero, and Features components in a structured layout. The use of React fragments (<> and </>) allows for grouping multiple elements without adding extra nodes to the DOM. This is a common pattern in React applications to keep the code organized and maintainable.
