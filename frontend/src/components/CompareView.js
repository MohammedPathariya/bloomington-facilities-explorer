import { useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import NavTopButtonsSticky from "./NavTopButtonsSticky";


export default function CompareView() {
  const [districtA, setDistrictA] = useState("District 1");
  const [districtB, setDistrictB] = useState("District 2");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const districts = ["District 1", "District 2", "District 3", "District 4", "District 5", "District 6"];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC", "#FF4444", "#33B5E5", "#00C851"];

  const handleCompare = async () => {
    setError("");
    setResult(null);
    try {
      const res = await axios.post("http://localhost:5000/compare", {
        districtA,
        districtB
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  const prepareChartData = (countsA, countsB) => {
    const allKeys = Array.from(new Set([...Object.keys(countsA), ...Object.keys(countsB)]));
    return allKeys.map(key => ({
      type: key,
      [districtA]: countsA[key] || 0,
      [districtB]: countsB[key] || 0
    }));
  };

  const preparePieData = (counts) => {
    return Object.entries(counts).map(([name, value]) => ({
      name,
      value
    }));
  };

  return (
    <div className="compare-view" style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
      <NavTopButtonsSticky />
      <h2 style={{ textAlign: "center" }}>Compare District Facilities</h2>
      <p style={{ textAlign: "center" }}>
        Select two districts to compare their public facility distribution and summary insight.
      </p>

      {/* Dropdowns */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginBottom: "30px" }}>
        <select value={districtA} onChange={e => setDistrictA(e.target.value)}>
          {districts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={districtB} onChange={e => setDistrictB(e.target.value)}>
          {districts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <button onClick={handleCompare} style={{ padding: "6px 14px", borderRadius: "6px", background: "#4CAF50", color: "white" }}>
          Compare
        </button>
      </div>

      {result && (
        <>
          {/* Bar Chart */}
          <h3 style={{ textAlign: "center" }}>Facility Counts by Type</h3>
          <div style={{ width: "100%", height: 450 }}>
            <ResponsiveContainer>
              <BarChart data={prepareChartData(result.districtA.counts, result.districtB.counts)} margin={{ top: 20, right: 30, left: 10, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" angle={-40} textAnchor="end" interval={0} height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={districtA} fill="#8884d8" />
                <Bar dataKey={districtB} fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Radar Chart */}
          <h3 style={{ textAlign: "center", marginTop: "60px" }}>Radar View of Facility Coverage</h3>
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
              <RadarChart outerRadius="80%" data={prepareChartData(result.districtA.counts, result.districtB.counts)}>
                <PolarGrid />
                <PolarAngleAxis dataKey="type" />
                <PolarRadiusAxis />
                <Radar name={districtA} dataKey={districtA} stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name={districtB} dataKey={districtB} stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Charts */}
          <h3 style={{ textAlign: "center", marginTop: "60px" }}>Facility Composition in Each District</h3>
          <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", marginTop: "20px" }}>
            {/* Pie Chart A */}
            <div style={{ width: "500px", height: "380px", padding: "10px" }}>
              <h4 style={{ textAlign: "center" }}>{districtA}</h4>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={preparePieData(result.districtA.counts)}
                    dataKey="value"
                    outerRadius={85}
                    labelLine={false}
                    label={({ name, value }) => `${name} (${value})`}
                  >
                    {preparePieData(result.districtA.counts).map((entry, index) => (
                      <Cell key={`cell-a-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart B */}
            <div style={{ width: "500px", height: "380px", padding: "10px" }}>
              <h4 style={{ textAlign: "center" }}>{districtB}</h4>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={preparePieData(result.districtB.counts)}
                    dataKey="value"
                    outerRadius={85}
                    labelLine={false}
                    label={({ name, value }) => `${name} (${value})`}
                  >
                    {preparePieData(result.districtB.counts).map((entry, index) => (
                      <Cell key={`cell-b-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Comparison Results */}
          <h3 style={{ textAlign: "center", marginTop: "60px" }}>Detailed Comparison</h3>
          <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "20px", flexWrap: "wrap" }}>
            <div style={{ minWidth: "280px", textAlign: "center" }}>
              <h4>{result.districtA.name}</h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {Object.entries(result.districtA.counts).map(([type, count]) => (
                  <li key={type}>• {type}: {count}</li>
                ))}
              </ul>
            </div>
            <div style={{ minWidth: "280px", textAlign: "center" }}>
              <h4>{result.districtB.name}</h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {Object.entries(result.districtB.counts).map(([type, count]) => (
                  <li key={type}>• {type}: {count}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Insight */}
          <h4 style={{ marginTop: "40px" }}>Insight</h4>
          <p>{result.insight}</p>

          <div style={{ marginTop: "20px", backgroundColor: "#f4f4f4", padding: "20px", borderRadius: "8px" }}>
            <h4>How to Interpret</h4>
            <p>
              The bar and radar charts illustrate how various public services are distributed across districts. Taller bars and wider radar spokes indicate greater availability.
            </p>
            <p>
              Pie charts help highlight which facility types dominate each district. This allows a quick glance at the focus of public services in each zone.
            </p>
          </div>
        </>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
