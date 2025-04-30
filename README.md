# Bloomington Facilities Explorer 🌇

This interactive web application allows users to explore, compare, and visualize public facilities across Bloomington's city council districts. It supports dynamic map filtering, facility comparisons, chart insights, and proximity-based views.

## 🔧 Features

- 🌍 Interactive Leaflet map of city facilities
- 🏙️ District overview and comparison
- 📊 Density bar chart
- 🌲 Facility group treemap
- 📍 Dynamic "Nearby Me" filtering based on user location
- 🔄 Responsive React frontend with Flask backend
- 📦 Dockerized deployment

## 🧱 Tech Stack

- React + Vite (frontend)
- Flask (backend)
- Folium + GeoPandas (map generation)
- Plotly (for treemap chart)
- Docker + Docker Compose

## 🚀 Run Locally

```bash
# Build and run both frontend and backend
docker-compose up --build
