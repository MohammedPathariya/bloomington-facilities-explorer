# --- Backend Dockerfile (Flask App) ---
    FROM python:3.10-slim

    WORKDIR /app
    
    COPY app.py /app/
    COPY data /app/data
    
    RUN pip install flask flask-cors pandas geopandas shapely
    
    EXPOSE 5000
    CMD ["python", "app.py"]
    