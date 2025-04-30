import NavTopButtonsSticky from "./NavTopButtonsSticky";

export default function DistrictMapView() {
  return (
    <div
      className="district-map-view"
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <NavTopButtonsSticky />

      <h2>Bloomington Council Districts</h2>
      <img
        src="/district-map.png"
        alt="District Map of Bloomington"
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "650px",  // ✅ Reduce the height here
          borderRadius: "8px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
        }}
      />

      <p style={{ marginBottom: "20px" }}>
            This map highlights the boundaries of all six Bloomington city council districts. 
            Use this as a reference to understand district-level distribution of public services.
        </p>
    </div>
  );
}
