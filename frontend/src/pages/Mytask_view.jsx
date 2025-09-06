import React from "react";
import { Bell, Search, Settings, User, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const MyTask_view = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
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
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      {/* Sidebar */}
      <div className="w-64 bg-[#d9d9d9] flex flex-col justify-between">
        <div>
          <div className="flex items-center px-4 py-4 border-b border-gray-300">
            <img
              src="../assets/odoologo.png"
              alt="Logo"
              className="h-10 w-10"
            />
            <span className="ml-2 font-bold text-lg text-[#333]">
              CompanyName
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
              My Tasks
            </button>
          </div>
        </div>

        {/* User Section */}
        <div className="flex items-center bg-[#4a6fcf] text-white px-4 py-3">
          <User className="mr-2" />
          <span className="text-sm">{user?.name || "User "} </span>
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
              2
            </span>
          </div>
          <Settings className="h-6 w-6" />
        </div>

        {/* Breadcrumb */}
        <div className="bg-[#a2d1cb] px-6 py-2 text-gray-700 font-medium text-sm">
          My Tasks
        </div>

        {/* Task Cards */}
        <div className="flex-1 p-6 grid grid-cols-3 gap-6">
          {[1, 2].map((id) => (
            <div
              key={id}
              className="bg-[#f1eef6] rounded-md shadow-sm border border-gray-200 p-4 flex flex-col justify-between"
            >
              <div>
                <div className="font-medium text-base mb-2">
                  Task Title {id}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Short description or attached PDF info.
                </p>
              </div>
              <div className="flex items-center justify-between text-gray-600 text-xs">
                <div className="flex items-center">
                  <User className="mr-2" size={16} /> Test User
                </div>
                <div className="flex items-center space-x-4">
                  <span>Due: 15/09/25</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Add Task Button */}
        <button
          onClick={() => navigate("/new-task")}
          className="absolute bottom-6 right-6 bg-gradient-to-r from-[#4a6fcf] to-[#5b6ea3] hover:from-[#5b6ea3] hover:to-[#4a6fcf] text-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-105"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default MyTask_view;
