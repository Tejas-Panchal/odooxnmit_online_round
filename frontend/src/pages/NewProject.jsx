import React, { useState } from "react";
import { Bell, Search, Settings, User } from "lucide-react";

const ProjectForm = () => {
  const [name, setName] = useState("");
  const [tags, setTags] = useState([]);
  const [manager, setManager] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("");
  const [pdf, setPdf] = useState(null);
  const [description, setDescription] = useState("");

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdf(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      {/* Sidebar */}
      <div className="w-64 bg-[#d9d9d9] flex flex-col justify-between">
        <div>
          <div className="flex items-center px-4 py-4 border-b border-gray-300">
            <img
              src="frontend/oddologo.png"
              alt="Logo"
              className="h-10 w-10"
            />
            <span className="ml-2 font-bold text-lg text-[#333]">Company</span>
          </div>

          <div className="mt-6 flex flex-col space-y-4 px-4">
            <button className="bg-[#4a6fcf] text-white py-3 px-4 rounded-md text-left text-sm font-medium">
              Projects
            </button>
            <button className="bg-[#4a6fcf] text-white py-3 px-4 rounded-md text-left text-sm font-medium">
              My Tasks
            </button>
          </div>
        </div>

        {/* User Section */}
        <div className="flex items-center bg-[#4a6fcf] text-white px-4 py-3">
          <User className="mr-2" />
          <span className="text-sm">Test User</span>
          <Settings className="ml-auto" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
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
          Projects &gt; New Project
        </div>

        {/* Form */}
        <div className="flex-1 p-6 overflow-y-auto">
          <form className="space-y-6 bg-white shadow rounded-lg p-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tags</label>
              <select
                multiple
                value={tags}
                onChange={(e) =>
                  setTags(Array.from(e.target.selectedOptions, (opt) => opt.value))
                }
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option>UI</option>
                <option>Backend</option>
                <option>API</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Project Manager</label>
              <select
                value={manager}
                onChange={(e) => setManager(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Manager</option>
                <option>Alice</option>
                <option>Bob</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <div className="flex space-x-4 mt-1">
                {['Low', 'Medium', 'High'].map((level) => (
                  <label key={level} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value={level}
                      checked={priority === level}
                      onChange={(e) => setPriority(e.target.value)}
                    />
                    <span>{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Project Description (PDF)</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfUpload}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {pdf && <p className="text-sm text-gray-600 mt-1">{pdf.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                rows="4"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Discard
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
