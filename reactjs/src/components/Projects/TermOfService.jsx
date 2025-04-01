import React from 'react';

const TermsOfService = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800">Terms of Service</h1>
        <p className="text-gray-500">Last Updated: March 31, 2025</p>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Acceptance of Terms</h2>
          <p className="text-gray-700 mt-2">
            By accessing or using our service, you agree to comply with and be
            bound by these Terms of Service.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Use of the Service</h2>
          <p className="text-gray-700 mt-2">
            You are responsible for your use of the service and agree not to use
            it for illegal or unauthorized purposes.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Limitation of Liability</h2>
          <p className="text-gray-700 mt-2">
            We are not responsible for any damages resulting from the use of our
            service.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Termination</h2>
          <p className="text-gray-700 mt-2">
            We may suspend or terminate your access to our service if you violate
            these terms.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Changes to the Terms</h2>
          <p className="text-gray-700 mt-2">
            We may revise these Terms of Service at any time. It is your
            responsibility to review these terms periodically for any changes.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Contact Us</h2>
          <p className="text-gray-700 mt-2">
            If you have any questions about these Terms of Service, please contact us at
            [ProjectUjyalo@gmail.com].
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
