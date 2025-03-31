import React from "react";

export default function ContactUs() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-4xl font-semibold text-gray-900 text-center">Contact Us</h2>
        <p className="mt-4 text-lg text-gray-600 text-center">
          We’d love to hear from you! Please feel free to reach out with any questions or feedback.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-900">Reach Us</h3>
            <p className="mt-6 text-gray-600">
              If you have any questions or need support, feel free to contact us via email or through our social media channels.
            </p>
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-900">Email</h4>
              <p className="text-gray-600">
                You can reach us at <a href="mailto:ProjectUjyalo@gmail.com" className="text-indigo-600">ProjectUjyalo@gmail.com</a>.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-900">Follow Us</h4>
              <div className="flex space-x-6 mt-4">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://img.icons8.com/ios/50/000000/facebook.png" alt="Facebook" className="w-6 h-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://img.icons8.com/ios/50/000000/twitter.png" alt="Twitter" className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://img.icons8.com/ios/50/000000/instagram.png" alt="Instagram" className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://img.icons8.com/ios/50/000000/linkedin.png" alt="LinkedIn" className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-900">Our Location</h3>
            <div className="mt-6">
              <iframe
                title="Google Map"
                width="100%"
                height="300"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.942730428517!2d144.95543131535956!3d-37.8172090797512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d9bfffdc8eb%3A0x5045675218ce8e0!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1611774101299!5m2!1sen!2sau"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
