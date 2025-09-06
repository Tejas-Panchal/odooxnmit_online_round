import React from "react";
import { FaSearch, FaBell, FaCog, FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState("");
  const [tags, setTags] = useState([]);
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/tasks",
        {
          name,
          deadline,
          description,
          assignee,
          project,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      navigate("/mytask-view");
    } catch (error) {
      setError(error.response.data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/projects", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProjects(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/projects", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProjects(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
  }, []);

  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const Logo = () => (
    <div className="h-9 w-9 rounded-full bg-white/20 grid place-items-center ring-2 ring-white/30">
      <div className="h-7 w-7 rounded-full bg-white grid place-items-center">
        <span className="font-semibold text-[#5B6EA3]">S</span>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-100 border-r flex flex-col">
        {/* Company Logo + Name */}
        <div className="flex items-center space-x-3">
          <Logo />
          <span className="text-xl font-semibold">SynergySphere</span>
        </div>

        {/* Sidebar Buttons */}
        <div className="flex flex-col mt-6 gap-4 px-4">
          <button
            onClick={() => navigate("/project-dashboard")}
            className="bg-[#4B6EA9] text-white py-2 rounded-md font-medium"
          >
            Projects
          </button>
          <button
            onClick={() => navigate("/mytask-view")}
            className="bg-[#4B6EA9] text-white py-2 rounded-md font-medium"
          >
            My tasks
          </button>
        </div>

        {/* Bottom User Section */}
        <div className="mt-auto p-4 flex items-center justify-between bg-[#4B6EA9] text-white rounded-tr-2xl">
          <div className="flex items-center gap-2">
            <FaUserCircle size={28} />
            <span>{user?.fullName || "User"}</span>
          </div>
          <FaCog className="cursor-pointer" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="bg-[#4B6EA9] flex items-center justify-between px-6 py-3">
          {/* Search */}
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

          {/* Icons */}
          <div className="flex items-center gap-6 text-white">
            <div className="relative">
              <FaBell size={20} />
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white rounded-full px-1">
                3
              </span>
            </div>
            <FaCog size={20} />
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-[#B5D9D3] text-gray-800 text-sm px-6 py-2">
          Projects &gt; Project 1 &gt; New Task
        </div>

        {/* Task Form */}
        <div className="p-8 flex justify-center">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="bg-[#F9F4FA] w-full max-w-2xl p-6 rounded-md shadow-sm mx-auto">
              {/* Task Name */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">Task Name :</label>
                <input
                  type="text"
                  className="w-full border rounded-md px-3 py-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Assignee */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">Assignee:</label>
                <select
                  className="w-full border rounded-md px-3 py-2"
                  onChange={(e) => setAssignee(e.target.value)}
                  value={assignee}
                >
                  <option value="">select an Assignee</option>
                  <option value="Tej">Tej</option>
                  <option value="puru">Puru</option>
                </select>
              </div>

              {/* Project */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">Project :</label>
                <select
                  className="w-full border rounded-md px-3 py-2"
                  onChange={(e) => setProject(e.target.value)}
                  value={project}
                  required
                >
                  <option value="">select an ongoing Project</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags & Document */}
              <div className="mb-4 flex items-center gap-6">
                <div className="flex-1">
                  <div className="flex-1">
                    <label className="block mb-1 font-medium">Tags :</label>
                    <input
                      value={typeof tags === "string" ? tags : tags.join(", ")}
                      onChange={(e) =>
                        setTags(
                          e.target.value.split(",").map((tag) => tag.trim())
                        )
                      }
                      type="text"
                      placeholder="Add tags (comma separated)"
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="border px-3 py-2 rounded-md text-sm"
                >
                  Documents (optional)
                </button>
              </div>

              {/* Deadline */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">Deadline :</label>
                <input
                  type="date"
                  className="w-full border rounded-md px-3 py-2"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">Description :</label>
                <textarea
                  className="w-full border rounded-md px-3 py-2"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-6 py-2 rounded-md"
                  onClick={() => navigate(-1)}
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="bg-[#A5D4CD] text-gray-700 px-6 py-2 rounded-md"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
