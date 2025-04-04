import React from 'react';
import { Scroll, Shield, AlertTriangle, X, RefreshCw } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Header with flowing design */}
      <div className="relative">
        <div className="bg-gradient-to-r from-purple-800 to-indigo-900 pt-32 pb-40 skew-y-1">
          <div className="max-w-5xl mx-auto px-6 -skew-y-1">
            <h1 className="text-6xl font-bold text-white mb-4">Provacy Policy</h1>
            <p className="text-indigo-100 text-xl font-medium">Last Updated: March 31, 2025</p>
          </div>
        </div>
      </div>

      {/* Content sections with flowing design */}
      <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-white shadow-xl rounded-3xl p-12 mb-12">
          {/* Terms sections */}
          <div className="space-y-24">
            <div className="relative">
              <div className="absolute left-0 top-0 w-16 h-16 flex items-center justify-center">
                <div className="absolute w-16 h-16 rounded-full bg-purple-100 opacity-50 animate-pulse"></div>
                <Scroll className="w-8 h-8 text-purple-800 relative z-10" />
              </div>
              <div className="ml-28">
                <h2 className="text-3xl font-bold text-purple-900 mb-6">Acceptance of Terms</h2>
                <p className="text-gray-700 text-xl leading-relaxed">
                  By accessing or using our service, you agree to comply with and be
                  bound by these Terms of Service.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 w-16 h-16 flex items-center justify-center">
                <div className="absolute w-16 h-16 rounded-full bg-purple-100 opacity-50 animate-pulse"></div>
                <Shield className="w-8 h-8 text-purple-800 relative z-10" />
              </div>
              <div className="ml-28">
                <h2 className="text-3xl font-bold text-purple-900 mb-6">Use of the Service</h2>
                <p className="text-gray-700 text-xl leading-relaxed">
                  You are responsible for your use of the service and agree not to use
                  it for illegal or unauthorized purposes.
                </p>
              </div>
            </div>

            {/* Decorative flowing divider */}
            <div className="py-4 flex justify-center">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-6">
                    <div className="h-2 w-2 rounded-full bg-purple-600 mx-1 inline-block"></div>
                    <div className="h-2 w-2 rounded-full bg-indigo-600 mx-1 inline-block"></div>
                    <div className="h-2 w-2 rounded-full bg-purple-600 mx-1 inline-block"></div>
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 w-16 h-16 flex items-center justify-center">
                <div className="absolute w-16 h-16 rounded-full bg-purple-100 opacity-50 animate-pulse"></div>
                <AlertTriangle className="w-8 h-8 text-purple-800 relative z-10" />
              </div>
              <div className="ml-28">
                <h2 className="text-3xl font-bold text-purple-900 mb-6">Limitation of Liability</h2>
                <p className="text-gray-700 text-xl leading-relaxed">
                  We are not responsible for any damages resulting from the use of our
                  service.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 w-16 h-16 flex items-center justify-center">
                <div className="absolute w-16 h-16 rounded-full bg-purple-100 opacity-50 animate-pulse"></div>
                <X className="w-8 h-8 text-purple-800 relative z-10" />
              </div>
              <div className="ml-28">
                <h2 className="text-3xl font-bold text-purple-900 mb-6">Termination</h2>
                <p className="text-gray-700 text-xl leading-relaxed">
                  We may suspend or terminate your access to our service if you violate
                  these terms.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 w-16 h-16 flex items-center justify-center">
                <div className="absolute w-16 h-16 rounded-full bg-purple-100 opacity-50 animate-pulse"></div>
                <RefreshCw className="w-8 h-8 text-purple-800 relative z-10" />
              </div>
              <div className="ml-28">
                <h2 className="text-3xl font-bold text-purple-900 mb-6">Changes to the Terms</h2>
                <p className="text-gray-700 text-xl leading-relaxed">
                  We may revise these Terms of Service at any time. It is your
                  responsibility to review these terms periodically for any changes.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer area */}
        <div className="pb-20 text-center text-gray-500">
          &copy; 2025 Your Company. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;