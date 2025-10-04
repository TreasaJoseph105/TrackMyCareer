import React, { useState, useEffect } from "react";

export default function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    portfolio: "",
    role: "",
    industry: "",
    location: "",
    salary: "",
    jobType: "",
    careerSummary: "",
    experience: "",
    skills: [],
    education: {
      tenth: "",
      twelfth: "",
      college: "",
    },
    profilePic: "",
  });

  const [skillInput, setSkillInput] = useState("");

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  // Save automatically
  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
  }, [profile]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, profilePic: imageUrl });
    }
  };

  const addSkill = () => {
    if (skillInput.trim() !== "") {
      setProfile({ ...profile, skills: [...profile.skills, skillInput] });
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skill),
    });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ flex: "1", textAlign: "center" }}>
        {/* Profile Picture */}
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            overflow: "hidden",
            margin: "0 auto",
            border: "3px solid #ccc",
          }}
        >
          <img
            src={
              profile.profilePic ||
              "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        {isEditing && (
          <>
            <label
              htmlFor="fileUpload"
              style={{
                display: "inline-block",
                marginTop: "10px",
                backgroundColor: "#4f46e5",
                color: "white",
                padding: "6px 12px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              📸 Upload
            </label>
            <input
              id="fileUpload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </>
        )}

        <h2 style={{ marginTop: "20px" }}>Personal Info</h2>
        {["name", "email", "phone"].map((field) => (
          <div key={field}>
            {isEditing ? (
              <input
                placeholder={field}
                value={profile[field]}
                onChange={(e) =>
                  setProfile({ ...profile, [field]: e.target.value })
                }
                style={inputStyle}
              />
            ) : (
              <p>
                <strong>{field.toUpperCase()}:</strong>{" "}
                {profile[field] || "—"}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div style={{ flex: "2" }}>
        <div style={{ textAlign: "right" }}>
          {isEditing ? (
            <button onClick={handleSave} style={saveBtn}>
              💾 Save
            </button>
          ) : (
            <button onClick={handleEdit} style={editBtn}>
              ✏️ Edit
            </button>
          )}
        </div>

        {/* Links */}
        <Section title="Links">
          {["github", "linkedin", "portfolio"].map((field) =>
            isEditing ? (
              <input
                key={field}
                placeholder={field}
                value={profile[field]}
                onChange={(e) =>
                  setProfile({ ...profile, [field]: e.target.value })
                }
                style={inputStyle}
              />
            ) : (
              <p key={field}>
                <strong>{field.toUpperCase()}:</strong>{" "}
                {profile[field] || "—"}
              </p>
            )
          )}
        </Section>

        {/* Job Preferences */}
        <Section title="Job Preferences">
          {["role", "industry", "location", "salary", "jobType"].map((field) =>
            isEditing ? (
              <input
                key={field}
                placeholder={field}
                value={profile[field]}
                onChange={(e) =>
                  setProfile({ ...profile, [field]: e.target.value })
                }
                style={inputStyle}
              />
            ) : (
              <p key={field}>
                <strong>{field.toUpperCase()}:</strong>{" "}
                {profile[field] || "—"}
              </p>
            )
          )}
        </Section>

        {/* Career Summary */}
        <Section title="Career Summary">
          {isEditing ? (
            <textarea
              placeholder="Write a short summary about your career..."
              value={profile.careerSummary}
              onChange={(e) =>
                setProfile({ ...profile, careerSummary: e.target.value })
              }
              style={inputStyle}
            />
          ) : (
            <p>{profile.careerSummary || "—"}</p>
          )}
        </Section>

        {/* Experience */}
        <Section title="Experience">
          {isEditing ? (
            <textarea
              placeholder="Add your work experience..."
              value={profile.experience}
              onChange={(e) =>
                setProfile({ ...profile, experience: e.target.value })
              }
              style={inputStyle}
            />
          ) : (
            <p>{profile.experience || "—"}</p>
          )}
        </Section>

        {/* Skills */}
        <Section title="Skills">
          {isEditing && (
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                placeholder="Add skill"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                style={inputStyle}
              />
              <button onClick={addSkill} style={addBtn}>
                ➕
              </button>
            </div>
          )}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {profile.skills.map((skill) => (
              <span key={skill} style={skillTag}>
                {skill}
                {isEditing && (
                  <button
                    onClick={() => removeSkill(skill)}
                    style={removeSkillBtn}
                  >
                    ❌
                  </button>
                )}
              </span>
            ))}
          </div>
        </Section>

        {/* Education */}
        <Section title="Education">
          {Object.keys(profile.education).map((field) =>
            isEditing ? (
              <input
                key={field}
                placeholder={field}
                value={profile.education[field]}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    education: {
                      ...profile.education,
                      [field]: e.target.value,
                    },
                  })
                }
                style={inputStyle}
              />
            ) : (
              <p key={field}>
                <strong>{field.toUpperCase()}:</strong>{" "}
                {profile.education[field] || "—"}
              </p>
            )
          )}
        </Section>
      </div>
    </div>
  );
}

// 🔹 Reusable Section Component
const Section = ({ title, children }) => (
  <div
    style={{
      marginTop: "20px",
      padding: "16px",
      border: "1px solid #eee",
      borderRadius: "12px",
      background: "#fafafa",
    }}
  >
    <h3 style={{ marginBottom: "10px", color: "#333" }}>{title}</h3>
    {children}
  </div>
);

// 🎨 Styles
const inputStyle = {
  display: "block",
  width: "100%",
  padding: "8px",
  margin: "6px 0",
  border: "1px solid #ccc",
  borderRadius: "8px",
};

const editBtn = {
  background: "#facc15",
  border: "none",
  padding: "6px 12px",
  borderRadius: "8px",
  cursor: "pointer",
};

const saveBtn = {
  background: "#22c55e",
  border: "none",
  padding: "6px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  color: "white",
};

const addBtn = {
  background: "#4f46e5",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "8px",
  cursor: "pointer",
};

const skillTag = {
  background: "#e0e7ff",
  padding: "6px 10px",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const removeSkillBtn = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
};