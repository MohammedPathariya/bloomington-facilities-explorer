// src/components/TreeMapView.js
import NavTopButtonsSticky from "./NavTopButtonsSticky";

export default function TreeMapView() {
  return (
    <div>
      <NavTopButtonsSticky />
      
      <iframe
        src="/treemap.html"
        title="Facility Treemap"
        style={{
          width: "100%",
          height: "90vh",
          border: "none"
        }}
      />

      <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
        <h2>Insight</h2>
        <p>
          This treemap visualization provides an overview of public facility types across Bloomington. 
          The larger blocks represent more common facility types within each group. 
          This helps identify which services are most widely available and which areas may need additional investment.
        </p>
        <p>
          For example, you might notice that certain groups like <strong>Education & Learning</strong> or 
          <strong> Dining & Cafes</strong> dominate in size — indicating both demand and existing coverage.
        </p>
      </div>
    </div>
  );
}
