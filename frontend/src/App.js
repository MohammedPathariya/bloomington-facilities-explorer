import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import MapView from "./components/MapView";
import ChartView from "./components/ChartView";
import CompareView from "./components/CompareView";
import DistrictMapView from "./components/DistrictView";
import TreeMapView from "./components/TreeMapView";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/chart" element={<ChartView />} />
        <Route path="/compare" element={<CompareView />} />
        <Route path="/district-map" element={<DistrictMapView />} />
        <Route path="/treemap" element={<TreeMapView />} />
      </Routes>
    </Router>
  );
}

export default App;
