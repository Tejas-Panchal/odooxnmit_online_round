import React from "react";
import { Bell, Search, Settings, User, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Task_Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      {/* Sidebar */}
      <div className="w-64 bg-[#d9d9d9] flex flex-col justify-between">
        <div>
          <div className="flex items-center px-4 py-4 border-b border-gray-300">
            <img src="frotend/oddologo.png" alt="Logo" className="h-10 w-10" />
            <span className="ml-2 font-bold text-lg text-[#333]">
              SynergySphere
            </span>
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
              My tasks
            </button>
          </div>
        </div>

        {/* User Section */}
        <div className="flex items-center bg-[#4a6fcf] text-white px-4 py-3">
          <User className="mr-2" />
          <span className="text-sm">{user?.name || "User"}</span>
          <Settings className="ml-auto" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <div className="flex items-center bg-[#5b6ea3] px-6 py-4 text-white">
          <div className="flex-1">
            <div className="relative w-1/3">
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-full py-2 px-4 text-black focus:outline-none"
              />
              <Search className="absolute right-3 top-2 text-gray-600" />
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
        <div className="flex-1 p-6 grid grid-cols-2 gap-6">
          {[1, 2].map((id) => (
            <div
              key={id}
              className="bg-[#f1eef6] rounded-md shadow-sm border border-gray-200 p-4 flex flex-col justify-between"
            >
              <div className="font-medium text-base mb-6">Task 1</div>
              <div className="flex items-center justify-between text-gray-600 text-xs">
                <div className="flex items-center">
                  <User className="mr-2" size={16} /> Test User
                </div>
                <div className="flex items-center space-x-4">
                  <span>10/09/25</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Add Project Button */}
        <button className="absolute bottom-6 right-6 bg-gradient-to-r from-[#4a6fcf] to-[#5b6ea3] hover:from-[#5b6ea3] hover:to-[#4a6fcf] text-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-105">
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Task_Dashboard;
