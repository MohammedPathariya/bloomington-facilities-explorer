import { useNavigate } from "react-router-dom";
import bgImage from "../assets/world-map-bg.jpg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.94), rgba(255,255,255,0.94)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "0 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      {/* Main content box */}
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
          maxWidth: "800px",
          margin: "auto",
          textAlign: "center"
        }}
      >
        <h1>Bloomington Facilities Explorer</h1>
        <p style={{ fontSize: "18px", marginBottom: "10px" }}>
          Discover how public services are distributed across Bloomington's city council districts.
        </p>

        <ul style={{ listStyleType: "disc", textAlign: "left", margin: "0 auto 30px", paddingLeft: "20px", maxWidth: "500px" }}>
          <li>Filter and explore facilities by category</li>
          <li>Analyze district-level service coverage and density</li>
          <li>Navigate down to neighborhood-level granularity</li>
        </ul>

        {/* Button rows */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          {/* Row 1 */}
          <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/map")}>Explore Map</button>
            <button onClick={() => navigate("/district-map")}>Districts Overview</button>
            <button onClick={() => navigate("/compare")}>Compare Areas</button>
          </div>

          {/* Row 2 */}
          <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap", marginTop: "10px" }}>
            <button onClick={() => navigate("/chart")}>Density Chart</button>
            <button onClick={() => navigate("/treemap")}>Facility Treemap</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        marginTop: "40px",
        textAlign: "center",
        fontSize: "13px",
        color: "#777",
        paddingBottom: "10px"
      }}>
        © {new Date().getFullYear()} Bloomington Facilities Explorer. All rights reserved.
      </footer>
    </div>
  );
}
