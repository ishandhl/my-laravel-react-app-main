import React, { useState } from "react";

export default function PrivacyPolicy() {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index); // Toggle between showing and hiding
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-md">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-lg text-gray-600 mt-2">For Our Crowdfunding Platform</p>
          <p className="text-sm text-gray-500 mt-1">Last Updated: March 31, 2025</p>
        </header>

        <div className="mt-12">
          <section className="border-t border-gray-200 pt-6">
            <h2
              className="text-2xl font-semibold text-gray-800 cursor-pointer"
              onClick={() => toggleExpand(0)}
            >
              Introduction
            </h2>
            {expanded === 0 && (
              <p className="text-gray-700 mt-4">
                We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information.
              </p>
            )}
          </section>

          <section className="border-t border-gray-200 pt-6">
            <h2
              className="text-2xl font-semibold text-gray-800 cursor-pointer"
              onClick={() => toggleExpand(1)}
            >
              Information We Collect
            </h2>
            {expanded === 1 && (
              <p className="text-gray-700 mt-4">
                We collect personal information such as your name, email address, payment details, and other data you provide to use our services.
              </p>
            )}
          </section>

          <section className="border-t border-gray-200 pt-6">
            <h2
              className="text-2xl font-semibold text-gray-800 cursor-pointer"
              onClick={() => toggleExpand(2)}
            >
              How We Use Your Information
            </h2>
            {expanded === 2 && (
              <p className="text-gray-700 mt-4">
                Your information is used to provide you with our crowdfunding services, communicate important updates, and process your transactions.
              </p>
            )}
          </section>

          <section className="border-t border-gray-200 pt-6">
            <h2
              className="text-2xl font-semibold text-gray-800 cursor-pointer"
              onClick={() => toggleExpand(3)}
            >
              Data Security
            </h2>
            {expanded === 3 && (
              <p className="text-gray-700 mt-4">
                We implement strong security measures to protect your personal data, but please note that no method of data transmission over the internet is 100% secure.
              </p>
            )}
          </section>

          <section className="border-t border-gray-200 pt-6">
            <h2
              className="text-2xl font-semibold text-gray-800 cursor-pointer"
              onClick={() => toggleExpand(4)}
            >
              Changes to This Policy
            </h2>
            {expanded === 4 && (
              <p className="text-gray-700 mt-4">
                We may update this Privacy Policy occasionally. We encourage you to review it regularly for any changes.
              </p>
            )}
          </section>

          <section className="border-t border-gray-200 pt-6">
            <h2
              className="text-2xl font-semibold text-gray-800 cursor-pointer"
              onClick={() => toggleExpand(5)}
            >
              Contact Us
            </h2>
            {expanded === 5 && (
              <p className="text-gray-700 mt-4">
                If you have any questions or concerns about this Privacy Policy, please contact us at <strong>support@crowdfundapp.com</strong>.
              </p>
            )}
          </section>
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>&copy; 2025 Crowdfunding App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
