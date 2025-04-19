import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthUser from "../Authentication/AuthUser";
import ProjectChatbot from '../Projects/ProjectChatbot';

export default function Home() {
  const { user, http } = AuthUser();
  const [projects, setProjects] = useState([]);
  const [topDonors, setTopDonors] = useState([]);

  useEffect(() => {
    http
      .get("/home")
      .then((response) => {
        setProjects(response.data.projects);
      })
      .catch((error) => {
        console.error(error);
      });
      
    // Fetch leaderboard data
    http
      .get("/leaderboard")
      .then((response) => {
        setTopDonors(response.data.topDonors);
      })
      .catch((error) => {
        console.error("Error fetching leaderboard data:", error);
      });
  }, []);

  const shuffledProjects = projects.sort(() => Math.random() - 0.5);
  const featuredProject =
    shuffledProjects.length > 0 ? shuffledProjects[0] : null;
  const randomProjects = shuffledProjects.slice(1);

  // Donation steps data
  const donationSteps = [
    {
      icon: "🔍",
      title: "Find a Project",
      description: "Browse through our projects and find a cause you're passionate about."
    },
    {
      icon: "👆",
      title: "Select Amount",
      description: "Choose how much you'd like to contribute to make a difference."
    },
    {
      icon: "💳",
      title: "Make Payment",
      description: "Complete your donation securely using your preferred payment method."
    },
    {
      icon: "📱",
      title: "Track Impact",
      description: "Receive updates about how your donation is helping the project."
    }
  ];

  // Remove sample leaderboard data (now using API data from /leaderboard)
  const sampleTopDonors = topDonors.length > 0 ? topDonors : [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="relative">
          <div className="bg-black opacity-15 absolute top-0 left-0 bottom-0 right-0"></div>
          {/* Image */}
          <img
            src={require("./nepal.jpg")}
            alt="Background"
            className="w-full h-[80vh] object-cover"
          />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-transparent bg-gradient-to-r from-[#49D8D4] via-[#3A3478] to-[#7B5BF5] bg-clip-text text-6xl md:text-8xl font-semibold opacity-100 animate-typing animate-blink-caret font-stylish whitespace-nowrap drop-shadow-lg">
            Ujyalo: Brighten Lives
          </span>

          {/* Button */}
          <Link
            to={user ? `/${user.name}/my_projects` : "/login"}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 absolute bottom-14 left-1/2 transform -translate-x-1/2 opacity-90 shadow-lg hover:shadow-xl"
          >
            Create Project
          </Link>
        </div>
      </div>

      {/* How to Donate Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="border-b-4 border-blue-500 pb-2">
              How to Donate
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {donationSteps.map((step, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-md text-center transition duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-blue-50 cursor-pointer"
              >
                <div className="text-4xl mb-4 transition-transform duration-300 hover:scale-110 inline-block">{step.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 hover:text-blue-600 transition duration-300">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                <div className="mt-4 text-blue-500 font-semibold"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Project Section */}
      <div className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="border-b-4 border-blue-500 pb-2">
              Featured Project
            </span>
          </h2>

          {featuredProject && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-16 max-w-5xl mx-auto transform transition duration-300 hover:shadow-xl">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    className="w-full h-72 md:h-full object-cover"
                    src={`http://localhost:8000/${featuredProject.cover_image}`}
                    alt="Featured Project"
                  />
                </div>
                <div className="md:w-1/2 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      {featuredProject.project_title}
                    </h3>
                    <p className="text-gray-700 mb-6">
                      {featuredProject.short_description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-gray-500 text-sm">Ending On</p>
                        <p className="font-semibold">
                          {featuredProject.end_date.split("T")[0]}
                        </p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-gray-500 text-sm">Goal</p>
                        <p className="font-semibold">
                          Rs. {featuredProject.funding_goal}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/project/${featuredProject.projectID}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-center font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                  >
                    View Project
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* More Projects Section */}
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="border-b-4 border-blue-500 pb-2">
              Discover More
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {randomProjects.map((project) => (
              <div
                key={project.projectID}
                className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <Link to={`/project/${project.projectID}`} className="block">
                  <div className="relative">
                    <img
                      className="w-full h-48 object-cover"
                      src={`http://localhost:8000/${project.cover_image}`}
                      alt="Project Cover"
                    />
                  </div>
                  <div className="p-5">
                    <h5 className="text-lg font-bold mb-3 line-clamp-1">
                      {project.project_title}
                    </h5>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {project.short_description}
                    </p>

                    <div className="flex justify-between items-center text-sm border-t pt-4">
                      <div>
                        <span className="font-medium text-gray-500">
                          Ending:
                        </span>{" "}
                        <span>{project.end_date.split("T")[0]}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Goal:</span>{" "}
                        <span>Rs. {project.funding_goal}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/projects/all"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Explore All Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Leaderboard Section - Enhanced Top Donors */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="border-b-4 border-blue-500 pb-2">
              Top Donors Leaderboard
            </span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {/* Top Donors */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-5 px-6">
                <h3 className="text-2xl font-bold">Top Donors</h3>
                <p className="text-blue-100">Recognizing our most generous contributors</p>
              </div>
              
              {sampleTopDonors.length > 0 ? (
                <div className="divide-y divide-blue-100">
                  {sampleTopDonors.map((donor, index) => (
                    <div 
                      key={donor.id} 
                      className={`flex items-center p-5 hover:bg-blue-50 transition duration-300 ${index < 3 ? 'bg-blue-50/50' : ''}`}
                    >
                      <div className="mr-4">
                        {index === 0 && <span className="text-2xl">🥇</span>}
                        {index === 1 && <span className="text-2xl">🥈</span>}
                        {index === 2 && <span className="text-2xl">🥉</span>}
                        {index > 2 && (
                          <span className="h-8 w-8 rounded-full bg-blue-100 inline-flex items-center justify-center font-bold text-blue-600">
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold text-lg">{donor.name}</h4>
                        <p className="text-xs text-gray-500">{donor.total > 10000 ? 'Platinum Donor' : donor.total > 5000 ? 'Gold Donor' : 'Silver Donor'}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${index < 3 ? 'text-blue-700' : 'text-blue-600'}`}>
                          Rs. {donor.total.toLocaleString()}
                        </p>
                        <div className="flex items-center justify-end mt-1">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Total Donations</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500">No donors to display yet.</p>
                </div>
              )}
              
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 text-center">
                <p className="text-gray-700 font-medium mb-3">Make a donation today to appear on our leaderboard!</p>
                <Link 
                  to="/projects/all" 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-md"
                >
                  Browse Projects to Support
                </Link>
              </div>
            </div>
            
            {/* Stats section below leaderboard */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-md text-center border-t-4 border-blue-500">
                <div className="text-3xl font-bold text-blue-600">{sampleTopDonors.length}</div>
                <div className="text-gray-600">Active Donors</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md text-center border-t-4 border-green-500">
                <div className="text-3xl font-bold text-green-600">
                  {sampleTopDonors.length > 0 ? 
                    `Rs. ${sampleTopDonors.reduce((sum, donor) => sum + donor.total, 0).toLocaleString()}` : 
                    'Rs. 0'}
                </div>
                <div className="text-gray-600">Total Donations</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md text-center border-t-4 border-purple-500">
                <div className="text-3xl font-bold text-purple-600">
                  {sampleTopDonors.length > 0 ? 
                    `Rs. ${Math.max(...sampleTopDonors.map(donor => donor.total)).toLocaleString()}` : 
                    'Rs. 0'}
                </div>
                <div className="text-gray-600">Largest Donation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Donate Section */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="border-b-4 border-blue-500 pb-2">
              Why Donate with Ujyalo
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center transition duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-blue-50 group cursor-pointer">
              <div className="text-4xl mb-4 group-hover:animate-bounce transition-all duration-500">🔍</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition duration-300">100% Transparency</h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition duration-300">Track where your donations go and see the impact you're making in real-time.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center transition duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-blue-50 group cursor-pointer">
              <div className="text-4xl mb-4 group-hover:animate-bounce transition-all duration-500">🤝</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition duration-300">Easy Process</h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition duration-300">Donate quickly and easily with multiple payment options to choose from.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center transition duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-blue-50 group cursor-pointer">
              <div className="text-4xl mb-4 group-hover:animate-bounce transition-all duration-500">🎯</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition duration-300">Real Impact</h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition duration-300">Help fund meaningful causes that make a difference in people's lives.</p>
            </div>
          </div>
        </div>
      </div>

      <ProjectChatbot />
    </div>
  );
}