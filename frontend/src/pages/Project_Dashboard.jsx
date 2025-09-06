import React from "react";
import { format } from "date-fns";
import { Bell, Search, Settings, User, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Project_Dashboard = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProjects();
    fetchData();
  }, []);

  // console.log(projects);
  console.log(user);
  console.log(projects);

  const Logo = () => (
    <div className="h-9 w-9 rounded-full bg-white/20 grid place-items-center ring-2 ring-white/30">
      <div className="h-7 w-7 rounded-full bg-white grid place-items-center">
        <span className="font-semibold text-[#5B6EA3]">S</span>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      {/* Sidebar */}
      <div className="w-64 bg-[#d9d9d9] flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <Logo />
            <span className="text-xl font-semibold">SynergySphere</span>
          </div>

          <div className="mt-6 flex flex-col space-y-4 px-4">
            <button
              onClick={() => navigate("/project-dashboard")}
              className="bg-[#4a6fcf] text-white py-3 px-4 rounded-md text-left text-sm font-medium"
            >
              Projects
            </button>
            <button
              onClick={() => navigate("/mytask-view")}
              className="bg-[#4a6fcf] text-white py-3 px-4 rounded-md text-left text-sm font-medium"
            >
              My Tasks
            </button>
          </div>
        </div>

        {/* User Section */}
        <div className="flex items-center bg-[#4a6fcf] text-white px-4 py-3">
          <User className="mr-2" />
          <span className="text-sm">{user?.fullName}</span>
          <Settings className="ml-auto" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <div className="flex items-center bg-[#5b6ea3] px-6 py-4 text-white">
          <div className="flex-1">
            <div className="relative w-1/3">
              {/* <input
                type="text"
                placeholder="Search"
                className="w-full rounded-full py-2 px-4 text-black focus:outline-none"
              />
              <Search className="absolute right-3 top-2 text-gray-600" /> */}
            </div>
          </div>
          <div className="relative mr-4">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white bg-red-600 rounded-full">
              3
            </span>
          </div>
          <Settings className="h-6 w-6" />
        </div>

        {/* Breadcrumb */}
        <div className="bg-[#a2d1cb] px-6 py-2 text-gray-700 font-medium text-sm">
          Projects&gt;
        </div>

        {/* Project Cards */}
        <div className="flex-1 p-6 grid grid-cols-2 grid-rows-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className=" rounded-md shadow-sm border h-34 border-gray-200 p-4 flex flex-col justify-start"
            >
              <div className="font-medium text-base mb-6">{project.name}</div>
              <div className="text-gray-600 text-sm mb-4">{project.description}</div>
              <div className="flex items-center justify-between text-gray-600 text-xs">
                <div className="flex items-center">
                  <User className="mr-2" size={16} /> {user?.fullName}
                </div>
                <div className="flex items-center space-x-4">
                  <span>
                    Daedline:{" "}
                    {project.deadline
                      ? format(new Date(project.deadline), "dd MMM yyyy")
                      : "No deadline"}
                  </span>
                  <span>{project.priority}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Add Project Button */}
        <button
          onClick={() => navigate("/new-project")}
          className="absolute bottom-6 right-6 bg-gradient-to-r from-[#4a6fcf] to-[#5b6ea3] hover:from-[#5b6ea3] hover:to-[#4a6fcf] text-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-105"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Project_Dashboard;
