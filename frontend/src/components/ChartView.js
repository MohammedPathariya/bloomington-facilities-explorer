import NavTopButtonsSticky from "./NavTopButtonsSticky";

export default function ChartView() {
  return (
    <div className="chart-view" style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", padding: "20px" }}>
      <NavTopButtonsSticky />
      <img src="/compare.png" alt="Comparison Chart" style={{ width: "100%", maxWidth: "800px", marginBottom: "20px" }} />
      <h2>How to Interpret This Visualization</h2>
      <p>
        This chart shows the number of public facilities available per million square feet for each district.
        A higher bar indicates greater service density, suggesting easier access to amenities like parks, healthcare centers, and restaurants within that area.
      </p>
      <p>
        <strong>Key Insight:</strong> District 6 stands out with the highest facility density, reflecting a strong concentration of services.
        In contrast, District 3 shows the lowest density, indicating fewer services relative to its overall size.
      </p>
    </div>
  );
}
