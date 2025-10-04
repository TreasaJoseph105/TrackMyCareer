import React, { useState, useEffect } from "react";

export default function ProfileCard() {
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
    skills: "",
    education10: "",
    education12: "",
    collegeCGPA: "",
    profilePic: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Load profile from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  // Save profile to localStorage
  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setIsEditing(false);
  };

  const handleChange = (key, value) => {
    setProfile({ ...profile, [key]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, profilePic: imageUrl });
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>My Profile</h1>

      <div style={styles.grid}>
        {/* LEFT COLUMN */}
        <div style={styles.column}>
          <div style={styles.card}>
            <div style={styles.imageContainer}>
              <img
                src={
                  profile.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                }
                alt="Profile"
                style={styles.image}
              />
              {isEditing && (
                <>
                  <label htmlFor="fileUpload" style={styles.uploadBtn}>
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
            </div>
          </div>

          <div style={styles.card}>
            <h2>👤 Personal Info</h2>
            {["name", "email", "phone"].map((field) => (
              <Field
                key={field}
                label={field}
                value={profile[field]}
                editable={isEditing}
                onChange={(val) => handleChange(field, val)}
              />
            ))}
          </div>

          <div style={styles.card}>
            <h2>🔗 Links</h2>
            {["github", "linkedin", "portfolio"].map((field) => (
              <Field
                key={field}
                label={field}
                value={profile[field]}
                editable={isEditing}
                onChange={(val) => handleChange(field, val)}
              />
            ))}
          </div>
        </div>

        {/* MIDDLE COLUMN */}
        <div style={styles.column}>
          <div style={styles.card}>
            <h2>💼 Job Preferences</h2>
            {["role", "industry", "location", "salary", "jobType"].map(
              (field) => (
                <Field
                  key={field}
                  label={field}
                  value={profile[field]}
                  editable={isEditing}
                  onChange={(val) => handleChange(field, val)}
                />
              )
            )}
          </div>

          <div style={styles.card}>
            <h2>📝 Career Summary</h2>
            {isEditing ? (
              <textarea
                style={styles.textarea}
                value={profile.careerSummary}
                onChange={(e) =>
                  handleChange("careerSummary", e.target.value)
                }
              />
            ) : (
              <p style={styles.value}>{profile.careerSummary || "—"}</p>
            )}
          </div>

          <div style={styles.card}>
            <h2>🏢 Experience</h2>
            {isEditing ? (
              <textarea
                style={styles.textarea}
                value={profile.experience}
                onChange={(e) => handleChange("experience", e.target.value)}
              />
            ) : (
              <p style={styles.value}>{profile.experience || "—"}</p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={styles.column}>
          <div style={styles.card}>
            <h2>🧠 Skills</h2>
            <Field
              label="skills"
              value={profile.skills}
              editable={isEditing}
              onChange={(val) => handleChange("skills", val)}
              placeholder="E.g. React, Node, MongoDB"
            />
          </div>

          <div style={styles.card}>
            <h2>🎓 Education</h2>
            <Field
              label="10th %"
              value={profile.education10}
              editable={isEditing}
              onChange={(val) => handleChange("education10", val)}
            />
            <Field
              label="12th %"
              value={profile.education12}
              editable={isEditing}
              onChange={(val) => handleChange("education12", val)}
            />
            <Field
              label="College CGPA"
              value={profile.collegeCGPA}
              editable={isEditing}
              onChange={(val) => handleChange("collegeCGPA", val)}
            />
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            {isEditing ? (
              <button style={styles.saveBtn} onClick={handleSave}>
                💾 Save
              </button>
            ) : (
              <button style={styles.editBtn} onClick={() => setIsEditing(true)}>
                ✏ Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Fixed Field Component
function Field({ label, value, editable, onChange, placeholder }) {
  return (
    <div style={styles.inputGroup}>
      <label style={styles.label}>{label.toUpperCase()}</label>
      {editable ? (
        <input
          style={styles.input}
          value={value}
          placeholder={placeholder || `Enter ${label}`}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <p style={styles.value}>{value || "—"}</p>
      )}
    </div>
  );
}

const styles = {
  page: {
    background: "#f9fafb",
    minHeight: "100vh",
    padding: "30px 60px",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#1f2937",
  },
  grid: {
    display: "flex",
    gap: "30px",
    justifyContent: "center",
  },
  column: {
    flex: 1,
    minWidth: "300px",
  },
  card: {
    background: "#fff",
    padding: "20px 25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    marginBottom: "25px",
  },
  imageContainer: { textAlign: "center", marginBottom: "15px" },
  image: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    border: "3px solid #e5e7eb",
    objectFit: "cover",
  },
  uploadBtn: {
    display: "inline-block",
    marginTop: "10px",
    backgroundColor: "#4f46e5",
    color: "white",
    padding: "6px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  inputGroup: { marginBottom: "12px" },
  label: { fontWeight: "600", color: "#374151" },
  input: {
    width: "100%",
    padding: "8px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    marginTop: "5px",
  },
  textarea: {
    width: "100%",
    minHeight: "80px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
  },
  value: { marginTop: "6px", color: "#111827" },
  editBtn: {
    backgroundColor: "#4f46e5",
    color: "#fff",
    padding: "10px 24px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    fontSize: "16px",
  },
  saveBtn: {
    backgroundColor: "#16a34a",
    color: "#fff",
    padding: "10px 24px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    fontSize: "16px",
  },
};