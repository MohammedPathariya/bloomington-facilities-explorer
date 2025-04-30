import NavTopButtonsSticky from "./NavTopButtonsSticky";

export default function MapView() {
  return (
    <div style={{ position: "relative", height: "100vh", width: "100%" }}>
      {/* Custom style: move down to avoid map zoom buttons */}
      <NavTopButtonsSticky style={{ top: "170px" }} />

      <iframe
        src="/map.html"
        width="100%"
        height="100%"
        style={{
          border: "none",
          margin: 0,
          padding: 0,
          display: "block",
          height: "100%",
          width: "100%",
        }}
        title="Map of Bloomington"
      />
    </div>
  );
}
