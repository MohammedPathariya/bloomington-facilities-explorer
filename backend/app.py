from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import geopandas as gpd
from shapely import wkt
import json

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# ------------------ Load Data ------------------

# Load Districts
districts = pd.read_csv("data/City_Council_Districts.csv")
districts["geometry"] = districts["Geometry"].apply(wkt.loads)
gdf_dist = gpd.GeoDataFrame(districts, geometry="geometry", crs="EPSG:4326")

# Load Facilities
facilities = pd.read_csv("data/city_fac_bloomington_fully_cleaned_main.csv")
facilities_gdf = gpd.GeoDataFrame(
    facilities,
    geometry=gpd.points_from_xy(facilities.Longitude, facilities.Latitude),
    crs="EPSG:4326"
)

# Assign facilities to districts (handle orphans)
joined = gpd.sjoin(facilities_gdf, gdf_dist, how="left", predicate="within")
orphans = joined[joined.index_right.isna()].copy()

if not orphans.empty:
    gdf_proj = gdf_dist.to_crs(epsg=26916)
    orphans_proj = orphans.set_geometry("geometry").to_crs(epsg=26916)
    reassigned_idxs = [gdf_proj.geometry.distance(o.geometry).idxmin() for _, o in orphans_proj.iterrows()]
    joined.loc[orphans.index, "index_right"] = reassigned_idxs

# Final assigned district column
facilities_gdf["assigned_dist"] = joined["index_right"].astype(int)

# Facility group counts by district
facility_counts = facilities_gdf.groupby(["assigned_dist", "Facility Group"]).size().unstack(fill_value=0)

# District facility count and density
gdf_dist["facility_count"] = facilities_gdf["assigned_dist"].value_counts().reindex(gdf_dist.index).fillna(0).astype(int)
gdf_dist["density"] = gdf_dist["facility_count"] / gdf_dist["Area (sq ft)"]

# Load pre-written insights
with open("data/district_summary_insights.json") as f:
    insight_dict = json.load(f)

# ------------------ Routes ------------------

@app.route("/")
def home():
    return jsonify({"status": "✅ Flask backend is running!"})

@app.route("/compare", methods=["POST"])
def compare():
    data = request.json
    district_a = data.get("districtA")
    district_b = data.get("districtB")

    if not district_a or not district_b:
        return jsonify({"error": "Both districtA and districtB must be provided."}), 400

    try:
        idx_a = gdf_dist[gdf_dist["District"] == district_a].index[0]
        idx_b = gdf_dist[gdf_dist["District"] == district_b].index[0]
    except IndexError:
        return jsonify({"error": "Invalid district names provided."}), 400

    # Facility counts per type for each district
    counts_a = facility_counts.loc[idx_a].to_dict()
    counts_b = facility_counts.loc[idx_b].to_dict()

    # Lookup insight
    key1 = f"{district_a} vs {district_b}"
    key2 = f"{district_b} vs {district_a}"
    insight = insight_dict.get(key1) or insight_dict.get(key2) or "No specific insight available."

    return jsonify({
        "districtA": {"name": district_a, "counts": counts_a},
        "districtB": {"name": district_b, "counts": counts_b},
        "insight": insight
    })

# ------------------ Main ------------------

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=False)  # ⚠️ Set debug=False before production!
