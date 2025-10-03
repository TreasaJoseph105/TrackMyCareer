import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const ResumeUpload = ({ userId }) => {
    const [file, setFile] = useState(null);
    const [resumes, setResumes] = useState([]);

    const fetchResumes = async () => {
        const res = await axios.get(`/ats/${userId}`);
        setResumes(res.data);
    };

    const handleUpload = async () => {
        const version = prompt("Enter version name:");
        // In real scenario, use FormData for file upload
        const res = await axios.post('/ats/upload', { userId, version, fileUrl: file });
        fetchResumes();
        setFile(null);
    };

    useEffect(() => { fetchResumes(); }, []);

    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px' }}>
                <h3>Resume Upload</h3>
                <input value={file} onChange={e => setFile(e.target.value)} placeholder="File URL" />
                <button onClick={handleUpload}>Upload</button>
            </div>
            <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px' }}>
                <h3>ATS Score & Feedback</h3>
                <ul>
                    {resumes.map(r => (
                        <li key={r._id}>
                            <b>{r.version}</b> - Score: {r.atsScore}<br />
                            Feedback: {r.feedback}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ResumeUpload;
