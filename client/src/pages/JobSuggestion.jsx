import React, { useEffect, useState } from "react";
import { fetchJobs } from "../services/jobApi";

const JobSuggestion = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      const data = await fetchJobs();
      setJobs(data);
      setLoading(false);
    };
    loadJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Job Suggestions</h2>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.job_id} style={{ marginBottom: "15px" }}>
              <strong>{job.job_title}</strong> <br />
              {job.employer_name} - {job.job_city}, {job.job_country} <br />
              <a href={job.job_apply_link} target="_blank" rel="noreferrer">
                Apply
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobSuggestion;