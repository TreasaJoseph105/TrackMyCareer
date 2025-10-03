export default function ProfileCard() {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "20px",
      maxWidth: "400px",
      margin: "20px auto",
      textAlign: "center",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    }}>
      <img
        src="https://via.placeholder.com/100"
        alt="Profile"
        style={{ borderRadius: "50%", marginBottom: "15px" }}
      />
      <h2>Joseph</h2>
      <p>Full Stack Developer</p>
      <p>Email: joseph@example.com</p>
      <button style={{
        marginTop: "10px",
        padding: "8px 16px",
        background: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
      }}>
        Edit Profile
      </button>
    </div>
  );
}
