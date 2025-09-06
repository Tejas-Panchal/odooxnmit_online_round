import React,{ useState , useEffect} from "react";
import axios from "axios";
import {
  FaSearch,
  FaBell,
  FaCog,
  FaUserCircle,
  FaUpload,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function NewProjectPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("High");
  const [tags, setTags] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [projectManager, setProjectManager] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      // Ensure tags is an array
      const tagsArray = typeof tags === "string" ? tags.split(",").map(t => t.trim()).filter(Boolean) : tags;
      // Prepare payload with all required fields
      const payload = {
        name,
        description,
        deadline,
        priority,
        tags: tagsArray,
        project_manager: projectManager,
        documents,
        created_at: new Date().toISOString(),
      };
      const res = await axios.post("http://localhost:5000/api/projects", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/project-dashboard");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
      setLoading(false);
    }
  };

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

  

  
  // const [user, setUser] = useState(null);


  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-1/5 h-full bg-gray-100 border-r flex flex-col">
        {/* Company Logo + Name */}
        <div className="flex items-center gap-2 p-4 border-b">
          <img
            alt="logo"
            className="w-8 h-8"
          />
          <span className="font-bold text-gray-700">CompanyName</span>
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
            <span>{user?.name || "User "}</span>
          </div>
          <FaCog className="cursor-pointer" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="bg-[#4B6EA9] flex items-left justify-between px-6 py-3">
          {/* Search */}
          

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
          Projects &gt; New Project
        </div>

        {/* Project Form */}
        <form onSubmit={handleSubmit}>
        <div className="p-8 flex justify-center">
          <div className="bg-[#F9F4FA] w-full max-w-2xl p-6 rounded-md shadow-sm">
            {/* Project Name */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Project Name :</label>
              <input
                placeholder="Enter project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                type="text"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            {/* Project Manager */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Project Manager:</label>
              <input
                value={projectManager}
                onChange={(e) => setProjectManager(e.target.value)}
                required
                type="text"
                placeholder="select project manager"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            {/* Deadline */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Deadline :</label>
              <input
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
                type="date"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            {/* Tags & Document */}
            <div className="mb-4 flex items-center gap-6">
              <div className="flex-1">
                <label className="block mb-1 font-medium">Tags :</label>
                <input
                  value={typeof tags === "string" ? tags : tags.join(", ")}
                  onChange={(e) => setTags(e.target.value)}
                  type="text"
                  placeholder="Add tags (comma separated)"
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <button className="border px-3 py-2 rounded-md text-sm flex items-center gap-2">
                <FaUpload /> Documents (optional)
              </button>
            </div>

            {/* Priority */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">Priority :</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Description :</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter project description"
                required
                className="w-full border rounded-md px-3 py-2"
                rows="3"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button className="bg-gray-400 text-white px-6 py-2 rounded-md"
                type="button"
                onClick={() => navigate("/project-dashboard")}> 
                Discard
              </button>
              <button className="bg-[#A5D4CD] text-gray-700 px-6 py-2 rounded-md"
                type="submit"
                disabled={loading}>
                {loading ? "Creating..." : "Create Project"}
              </button>
            </div>
        {error && (
          <div className="text-red-600 text-center mb-4">{error}</div>
        )}
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}
