import React, { useState, useEffect } from "react";

const statusOptions = ["Applied", "Interview", "Offer", "Rejected"];
const statusColors = {
  Applied: "bg-blue-200 text-blue-800",
  Interview: "bg-yellow-200 text-yellow-800",
  Offer: "bg-green-200 text-green-800",
  Rejected: "bg-red-200 text-red-800",
};

export default function Tracker() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    deadline: "",
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch jobs
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/tracker");
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.company.trim() || !form.role.trim()) {
      setError("Company and Role are required.");
      return;
    }

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId
        ? `http://localhost:5000/api/tracker/${editId}`
        : "http://localhost:5000/api/tracker";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errMsg = await response.text();
        throw new Error(errMsg || "Failed to save job");
      }

      await fetchJobs();
      setForm({ company: "", role: "", status: "Applied", deadline: "" });
      setEditId(null);
    } catch (err) {
      console.error("Error saving job:", err.message);
      setError(err.message);
    }
  };

  const handleEdit = (job) => {
    setForm({
      company: job.company,
      role: job.role,
      status: job.status,
      deadline: job.deadline ? job.deadline.split("T")[0] : "",
    });
    setEditId(job._id);
    setError("");
  };

  const handleCancelEdit = () => {
    setForm({ company: "", role: "", status: "Applied", deadline: "" });
    setEditId(null);
    setError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/tracker/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete job");
      await fetchJobs();
    } catch (err) {
      console.error(err);
      setError("Failed to delete job");
    }
  };

  return (
    <div className="flex-1 h-full bg-[#000000] p-6 flex flex-col font-custom">
      <h1 className="text-4xl font-extrabold mb-8 text-[#CFFFE2] tracking-tight">
        Job Tracker
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 w-full bg-[#F6F6F6]/90 p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-4 border border-[#A2D5C6]"
      >
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          className="flex-1 px-3 py-2 rounded-lg border border-[#A2D5C6] bg-[#F6F6F6] text-[#000000] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#A2D5C6]"
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
          className="flex-1 px-3 py-2 rounded-lg border border-[#A2D5C6] bg-[#F6F6F6] text-[#000000] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#A2D5C6]"
        />
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg border border-[#A2D5C6] bg-[#F6F6F6] text-[#000000] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#A2D5C6]"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg border border-[#A2D5C6] bg-[#F6F6F6] text-[#000000] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#A2D5C6]"
        >
          {statusOptions.map((s) => (
            <option key={s} value={s} className="bg-[#F6F6F6] text-[#000000]">
              {s}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-[#A2D5C6] text-[#000000] px-4 py-2 rounded-lg font-bold shadow hover:bg-[#CFFFE2] transition text-sm"
        >
          {editId ? "Update" : "Add"}
        </button>
        {editId && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-gray-500 transition text-sm"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Job List */}
      {loading ? (
        <p className="text-[#CFFFE2] text-center">Loading jobs...</p>
      ) : (
        <div className="flex-1 overflow-auto flex flex-col gap-4">
          {jobs.length === 0 ? (
            <p className="text-center text-[#CFFFE2] text-sm font-medium mt-6">
              No jobs added yet.
            </p>
          ) : (
            jobs.map((job) => (
              <div
                key={job._id}
                className="flex flex-col md:flex-row items-center justify-between bg-[#A2D5C6]/10 p-4 rounded-lg shadow-md gap-4 border border-[#A2D5C6] hover:shadow-xl transition-all w-full"
              >
                <div className="flex-1">
                  <h2 className="font-semibold text-lg text-[#CFFFE2] mb-1">
                    {job.role}
                  </h2>
                  <p className="text-[#CFFFE2] text-sm mb-1">{job.company}</p>
                  <p className="text-[#CFFFE2] text-xs">
                    Deadline:{" "}
                    <span className="font-medium">
                      {job.deadline ? job.deadline.slice(0, 10) : "N/A"}
                    </span>
                  </p>
                </div>
                <div
                  className={`px-4 py-1 rounded-full text-xs font-bold border shadow ${statusColors[job.status]}`}
                >
                  {job.status}
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button
                    onClick={() => handleEdit(job)}
                    className="bg-[#A2D5C6] px-3 py-1 rounded-lg hover:bg-[#CFFFE2] text-[#000000] font-bold shadow text-xs transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-[#FF6B6B] px-3 py-1 rounded-lg hover:bg-[#FF4C4C] text-white font-bold shadow text-xs transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
