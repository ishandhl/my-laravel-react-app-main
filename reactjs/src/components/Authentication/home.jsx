import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthUser from "../Authentication/AuthUser";

export default function Home() {
  const { user, http } = AuthUser();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    http
      .get("/home")
      .then((response) => {
        setProjects(response.data.projects);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const shuffledProjects = projects.sort(() => Math.random() - 0.5);
  const featuredProject =
    shuffledProjects.length > 0 ? shuffledProjects[0] : null;
  const randomProjects = shuffledProjects.slice(1);

  return (
    <div className="min-h-screen">
      <div className="relative">
        <div className="relative">
          <div className="bg-black opacity-15 absolute top-0 left-0 bottom-0 right-0"></div>
          {/* Image */}
          <img
            src={require("./nepal.jpg")}
            alt="Background"
            className="w-full h-[80vh]"
          />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-transparent bg-gradient-to-r from-[#49D8D4] via-[#3A3478] to-[#7B5BF5] bg-clip-text text-6xl md:text-8xl font-semibold opacity-100 animate-typing animate-blink-caret font-stylish whitespace-nowrap drop-shadow-lg">
            Ujyalo: Brighten Lives
          </span>

          {/* Button */}
          <Link
            to={user ? `/${user.name}/my_projects` : "/login"}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 absolute bottom-14 left-1/2 transform -translate-x-1/2 opacity-90"
          >
            Create Project
          </Link>
        </div>
      </div>

      <div className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="border-b-4 border-blue-500 pb-2">
              Featured Project
            </span>
          </h2>

          {featuredProject && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-16 max-w-5xl mx-auto">
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
                    className="bg-blue-500 hover:bg-blue-600 text-white text-center font-bold py-3 px-6 rounded-lg transition duration-300"
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
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Explore All Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
