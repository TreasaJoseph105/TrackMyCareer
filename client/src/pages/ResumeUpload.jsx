import React, { useState } from "react";
import axios from "axios";

const ResumeUpload = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a resume file");

    const token = localStorage.getItem("token");
    if (!token) return alert("User not authenticated");

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("userId", userId); // optional, for backend reference

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/ats/upload", // update if using production URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setParsedData(res.data.data);
      alert("Resume parsed successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload or parse resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Parsing..." : "Upload & Parse"}
      </button>

      {parsedData && (
        <div className="mt-6">
          <h3 className="font-semibold">Parsed Data:</h3>
          <pre className="bg-gray-100 p-2 rounded max-h-96 overflow-auto">
            {JSON.stringify(parsedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
