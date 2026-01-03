import React, { useRef, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext/AuthContext';

const PrivacyPolicy = () => {
  const { user } = useContext(AuthContext);

  // refs
  const introRef = useRef(null);
  const collectRef = useRef(null);
  const usageRef = useRef(null);
  const sharingRef = useRef(null);
  const changesRef = useRef(null);
  const contactRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="max-w-7xl min-h-screen mx-auto px-4 py-14">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500">
          Last updated: 24 June 2024
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* Sidebar */}
        <aside className="lg:col-span-1 border rounded-lg p-5 h-fit lg:sticky top-24">
          <h3 className="font-semibold mb-4">Quick Navigation</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li onClick={() => scrollTo(introRef)} className="hover:text-green-700 cursor-pointer">
              Introduction
            </li>
            <li onClick={() => scrollTo(collectRef)} className="hover:text-green-700 cursor-pointer">
              Information We Collect
            </li>
            <li onClick={() => scrollTo(usageRef)} className="hover:text-green-700 cursor-pointer">
              How We Use Your Information
            </li>
            <li onClick={() => scrollTo(sharingRef)} className="hover:text-green-700 cursor-pointer">
              Sharing Your Information
            </li>
            <li onClick={() => scrollTo(changesRef)} className="hover:text-green-700 cursor-pointer">
              Changes to This Policy
            </li>
            <li onClick={() => scrollTo(contactRef)} className="hover:text-green-700 cursor-pointer">
              Contact Us
            </li>
          </ul>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3 space-y-10 text-sm leading-relaxed text-gray-700">

          <section ref={introRef}>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p>
              At <strong>KrishiLink</strong>, we respect the privacy of farmers,
              agricultural partners, and users. This Privacy Policy explains
              how we collect, use, and protect your information.
            </p>
          </section>

          <section ref={collectRef}>
            <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>

            <h3 className="font-medium mt-3 mb-2">2.1 Personal Information</h3>
            <p>
              We may collect personal details such as your name, phone number,
              email address, location, and farming-related data.
            </p>

            <h3 className="font-medium mt-3 mb-2">2.2 Non-Personal Information</h3>
            <p>
              Non-personal data includes device info, browser type, and usage data.
            </p>
          </section>

          <section ref={usageRef}>
            <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide farming advice and services</li>
              <li>Improve agricultural recommendations</li>
              <li>Send updates and alerts</li>
              <li>Maintain platform security</li>
            </ul>
          </section>

          <section ref={sharingRef}>
            <h2 className="text-xl font-semibold mb-3">4. Sharing Your Information</h2>
            <p>
              We do not sell personal data. Information may be shared only when
              legally required or to deliver essential services.
            </p>
          </section>

          <section ref={changesRef}>
            <h2 className="text-xl font-semibold mb-3">5. Changes to This Privacy Policy</h2>
            <p>
              We may update this policy periodically. Continued use means
              acceptance of the updated policy.
            </p>
          </section>

          <section ref={contactRef}>
            <h2 className="text-xl font-semibold mb-3">6. Contact Us</h2>
            <p>If you have questions, contact us at:</p>
            <p className="mt-2 font-medium text-green-700">
              {user?.email || "support@krishilink.com"}
            </p>
          </section>

        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
