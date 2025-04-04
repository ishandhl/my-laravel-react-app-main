import React from 'react';
import { Scroll, Shield, AlertTriangle, X, RefreshCw } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header with improved contrast */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-purple-700 to-indigo-800 pt-24 pb-32">
          <div className="max-w-5xl mx-auto px-6">
            <h1 className="text-5xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-white text-xl font-medium">Last Updated: March 31, 2025</p>
          </div>
        </div>
        
        {/* Wavy divider with improved visibility */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-24">
            <path fill="#FFFFFF" fillOpacity="1" d="M0,224L60,229.3C120,235,240,245,360,229.3C480,213,600,171,720,170.7C840,171,960,213,1080,218.7C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Content sections with improved visibility */}
      <div className="max-w-5xl mx-auto px-6 -mt-12 relative z-10">
        <div className="mb-20">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-purple-200 flex items-center justify-center shadow-md">
              <Scroll className="w-10 h-10 text-purple-800" />
            </div>
            <div className="ml-8">
              <h2 className="text-3xl font-bold text-purple-900">Acceptance of Terms</h2>
              <div className="h-2 w-24 bg-gradient-to-r from-purple-600 to-indigo-700 mt-2"></div>
            </div>
          </div>
          <p className="text-gray-800 text-xl pl-28 leading-relaxed">
            By accessing or using our service, you agree to comply with and be
            bound by these Terms of Service.
          </p>
        </div>

        <div className="mb-20">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-purple-200 flex items-center justify-center shadow-md">
              <Shield className="w-10 h-10 text-purple-800" />
            </div>
            <div className="ml-8">
              <h2 className="text-3xl font-bold text-purple-900">Use of the Service</h2>
              <div className="h-2 w-24 bg-gradient-to-r from-purple-600 to-indigo-700 mt-2"></div>
            </div>
          </div>
          <p className="text-gray-800 text-xl pl-28 leading-relaxed">
            You are responsible for your use of the service and agree not to use
            it for illegal or unauthorized purposes.
          </p>
        </div>

        {/* Decorative divider with improved visibility */}
        <div className="flex items-center justify-center my-16">
          <div className="h-1 w-32 bg-gray-300"></div>
          <div className="h-3 w-3 rounded-full bg-purple-600 mx-4"></div>
          <div className="h-1 w-32 bg-gray-300"></div>
        </div>

        <div className="mb-20">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-purple-200 flex items-center justify-center shadow-md">
              <AlertTriangle className="w-10 h-10 text-purple-800" />
            </div>
            <div className="ml-8">
              <h2 className="text-3xl font-bold text-purple-900">Limitation of Liability</h2>
              <div className="h-2 w-24 bg-gradient-to-r from-purple-600 to-indigo-700 mt-2"></div>
            </div>
          </div>
          <p className="text-gray-800 text-xl pl-28 leading-relaxed">
            We are not responsible for any damages resulting from the use of our
            service.
          </p>
        </div>

        <div className="mb-20">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-purple-200 flex items-center justify-center shadow-md">
              <X className="w-10 h-10 text-purple-800" />
            </div>
            <div className="ml-8">
              <h2 className="text-3xl font-bold text-purple-900">Termination</h2>
              <div className="h-2 w-24 bg-gradient-to-r from-purple-600 to-indigo-700 mt-2"></div>
            </div>
          </div>
          <p className="text-gray-800 text-xl pl-28 leading-relaxed">
            We may suspend or terminate your access to our service if you violate
            these terms.
          </p>
        </div>

        <div className="mb-20">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-purple-200 flex items-center justify-center shadow-md">
              <RefreshCw className="w-10 h-10 text-purple-800" />
            </div>
            <div className="ml-8">
              <h2 className="text-3xl font-bold text-purple-900">Changes to the Terms</h2>
              <div className="h-2 w-24 bg-gradient-to-r from-purple-600 to-indigo-700 mt-2"></div>
            </div>
          </div>
          <p className="text-gray-800 text-xl pl-28 leading-relaxed">
            We may revise these Terms of Service at any time. It is your
            responsibility to review these terms periodically for any changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;