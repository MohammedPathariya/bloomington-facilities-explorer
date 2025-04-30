import { useNavigate, useLocation } from "react-router-dom";

export default function NavTopButtonsSticky({ style = {} }) {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "12px",
        left: "12px",
        zIndex: 1000,
        display: "flex",
        gap: "8px",
        ...style,
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "4px 10px",
          fontSize: "13px",
          backgroundColor: "#eeeeee",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
          opacity: 0.85,
        }}
      >
        ← Back
      </button>

      <button
        onClick={() => navigate("/district-map")}
        style={{
          padding: "4px 10px",
          fontSize: "13px",
          backgroundColor: "#eeeeee",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
          opacity: 0.85,
        }}
      >
        🏙️ District Map
      </button>
    </div>
  );
}
