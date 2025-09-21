-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;

-- Create main tables
CREATE TABLE IF NOT EXISTS tourists (
    id SERIAL PRIMARY KEY,
    tourist_id VARCHAR(255) UNIQUE NOT NULL,
    digital_id_hash VARCHAR(255),
    name VARCHAR(255),
    phone VARCHAR(20),
    emergency_contact VARCHAR(20),
    current_location GEOGRAPHY(POINT, 4326),
    safety_score INTEGER DEFAULT 100,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS geofences (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'circle', 'polygon', 'route'
    zone_type VARCHAR(50) NOT NULL, -- 'safe', 'restricted', 'danger', 'alert'
    center_lat DECIMAL(10, 8),
    center_lng DECIMAL(11, 8),
    radius_meters INTEGER,
    polygon_geom GEOGRAPHY(POLYGON, 4326),
    description TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS location_history (
    id SERIAL PRIMARY KEY,
    tourist_id VARCHAR(255) NOT NULL,
    location GEOGRAPHY(POINT, 4326) NOT NULL,
    accuracy FLOAT,
    speed FLOAT,
    heading FLOAT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tourist_id) REFERENCES tourists(tourist_id)
);

CREATE TABLE IF NOT EXISTS geofence_events (
    id SERIAL PRIMARY KEY,
    tourist_id VARCHAR(255) NOT NULL,
    geofence_id INTEGER NOT NULL,
    event_type VARCHAR(20) NOT NULL, -- 'enter', 'exit', 'dwell'
    location GEOGRAPHY(POINT, 4326) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tourist_id) REFERENCES tourists(tourist_id),
    FOREIGN KEY (geofence_id) REFERENCES geofences(id)
);

-- Insert sample geofences
INSERT INTO geofences (name, type, zone_type, center_lat, center_lng, radius_meters, description) VALUES
('Red Fort Safe Zone', 'circle', 'safe', 28.6562, 77.2410, 500, 'Safe tourist area around Red Fort'),
('Restricted Military Area', 'circle', 'restricted', 28.6000, 77.2000, 1000, 'Restricted military zone'),
('Emergency Assembly Point', 'circle', 'safe', 28.6600, 77.2300, 200, 'Emergency gathering point');

-- Create indexes for performance
CREATE INDEX idx_tourists_location ON tourists USING GIST(current_location);
CREATE INDEX idx_location_history_location ON location_history USING GIST(location);
CREATE INDEX idx_location_history_tourist_time ON location_history(tourist_id, timestamp DESC);
CREATE INDEX idx_geofences_geom ON geofences USING GIST(polygon_geom);