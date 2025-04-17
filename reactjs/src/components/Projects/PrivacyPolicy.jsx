import React from 'react';
import { LockKeyhole, Eye, Database, Bell, RefreshCw } from 'lucide-react';
import ProjectChatbot from '../Projects/ProjectChatbot';


const PrivacyPolicy = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Header with flowing design */}
      <div className="relative">
        <div className="bg-gradient-to-r from-purple-800 to-indigo-900 pt-32 pb-40 skew-y-1">
          <div className="max-w-5xl mx-auto px-6 -skew-y-1">
            <h1 className="text-6xl font-bold text-white mb-4">Term Of Service</h1>
            <p className="text-indigo-100 text-xl font-medium">Last Updated: March 31, 2025</p>
          </div>
        </div>
      </div>

      {/* Content sections with flowing design */}
      <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-white shadow-xl rounded-3xl p-12 mb-12">
          {/* Privacy Policy sections */}
          <div className="space-y-24">
            <div className="relative">
              <div className="absolute left-0 top-0 w-16 h-16 flex items-center justify-center">
                <div className="absolute w-16 h-16 rounded-full bg-purple-100 opacity-50 animate-pulse"></div>
                <LockKeyhole className="w-8 h-8 text-purple-800 relative z-10" />
              </div>
              <div className="ml-28">
                <h2 className="text-3xl font-bold text-purple-900 mb-6">Information We Collect</h2>
                <p className="text-gray-700 text-xl leading-relaxed">
                  We collect personal information that you provide to us directly when you use our services, 
                  including but not limited to your name, email address, and usage data.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 w-16 h-16 flex items-center justify-center">
                <div className="absolute w-16 h-16 rounded-full bg-purple-100 opacity-50 animate-pulse"></div>
                <Eye className="w-8 h-8 text-purple-800 relative z-10" />
              </div>
              <div className="ml-28">
                <h2 className="text-3xl font-bold text-purple-900 mb-6">How We Use Your Information</h2>
                <p className="text-gray-700 text-xl leading-relaxed">
                  We use your information to provide, maintain, and improve our services, 
                  communicate with you, and enhance your user experience.
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
                <Database className="w-8 h-8 text-purple-800 relative z-10" />
              </div>
              <div className="ml-28">
                <h2 className="text-3xl font-bold text-purple-900 mb-6">Data Retention and Security</h2>
                <p className="text-gray-700 text-xl leading-relaxed">
                  We implement appropriate security measures to protect your personal information 
                  and retain your data only for as long as necessary to fulfill the purposes 
                  outlined in this Privacy Policy.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 w-16 h-16 flex items-center justify-center">
                <div className="absolute w-16 h-16 rounded-full bg-purple-100 opacity-50 animate-pulse"></div>
                <Bell className="w-8 h-8 text-purple-800 relative z-10" />
              </div>
              <div className="ml-28">
                <h2 className="text-3xl font-bold text-purple-900 mb-6">Your Rights and Choices</h2>
                <p className="text-gray-700 text-xl leading-relaxed">
                  You have the right to access, update, or delete your personal information. 
                  You may also opt out of receiving marketing communications from us at any time.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 w-16 h-16 flex items-center justify-center">
                <div className="absolute w-16 h-16 rounded-full bg-purple-100 opacity-50 animate-pulse"></div>
                <RefreshCw className="w-8 h-8 text-purple-800 relative z-10" />
              </div>
              <div className="ml-28">
                <h2 className="text-3xl font-bold text-purple-900 mb-6">Changes to this Privacy Policy</h2>
                <p className="text-gray-700 text-xl leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you 
                  of any changes by posting the new Privacy Policy on this page and updating 
                  the "Last Updated" date.
                </p>
              </div>
            </div>
          </div>
        </div>
        

      </div>
      <ProjectChatbot />
    </div>
  );
};

export default PrivacyPolicy;