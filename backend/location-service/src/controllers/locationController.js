const { pool } = require('../config/database');
const geofenceService = require('../services/geofenceService');

const updateLocation = async (req, res) => {
  try {
    const { tourist_id, latitude, longitude, accuracy, speed, heading } = req.body;

    if (!tourist_id || !latitude || !longitude) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const client = await pool.connect();
    
    // Update current location in tourists table
    await client.query(`
      INSERT INTO tourists (tourist_id, current_location, updated_at)
      VALUES ($1, ST_GeogFromText('POINT($3 $2)'), CURRENT_TIMESTAMP)
      ON CONFLICT (tourist_id) 
      UPDATE SET current_location = ST_GeogFromText('POINT($3 $2)'), updated_at = CURRENT_TIMESTAMP
    `, [tourist_id, latitude, longitude]);

    // Insert into location history
    await client.query(`
      INSERT INTO location_history (tourist_id, location, accuracy, speed, heading, timestamp)
      VALUES ($1, ST_GeogFromText('POINT($3 $2)'), $4, $5, $6, CURRENT_TIMESTAMP)
    `, [tourist_id, latitude, longitude, accuracy, speed, heading]);

    client.release();

    // Check geofences
    const geofenceAlerts = await geofenceService.checkGeofences(tourist_id, latitude, longitude);

    res.json({ 
      success: true, 
      message: 'Location updated successfully',
      geofence_alerts: geofenceAlerts
    });

  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCurrentLocation = async (req, res) => {
  try {
    const { touristId } = req.params;
    
    const client = await pool.connect();
    const result = await client.query(`
      SELECT tourist_id, 
             ST_Y(current_location::geometry) as latitude,
             ST_X(current_location::geometry) as longitude,
             updated_at
      FROM tourists 
      WHERE tourist_id = $1
    `, [touristId]);
    
    client.release();

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tourist not found' });
    }

    res.json(result.rows);
  } catch (error) {
    console.error('Error getting current location:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getLocationHistory = async (req, res) => {
  try {
    const { touristId } = req.params;
    const limit = parseInt(req.query.limit) || 100;
    
    const client = await pool.connect();
    const result = await client.query(`
      SELECT ST_Y(location::geometry) as latitude,
             ST_X(location::geometry) as longitude,
             accuracy, speed, heading, timestamp
      FROM location_history 
      WHERE tourist_id = $1
      ORDER BY timestamp DESC
      LIMIT $2
    `, [touristId, limit]);
    
    client.release();

    res.json(result.rows);
  } catch (error) {
    console.error('Error getting location history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const bulkUpdateLocations = async (req, res) => {
  // Implementation for bulk updates (for dashboard efficiency)
  res.json({ message: 'Bulk update endpoint - implement as needed' });
};

module.exports = {
  updateLocation,
  getCurrentLocation,
  getLocationHistory,
  bulkUpdateLocations
};