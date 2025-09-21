const { pool } = require('../config/database');

const checkGeofences = async (touristId, latitude, longitude) => {
  try {
    const client = await pool.connect();
    
    // Check circular geofences
    const circularResult = await client.query(`
      SELECT id, name, zone_type, 'enter' as event_type
      FROM geofences 
      WHERE type = 'circle' 
      AND active = true
      AND ST_DWithin(
        ST_GeogFromText('POINT($1 $2)'),
        ST_GeogFromText('POINT(' || center_lng || ' ' || center_lat || ')'),
        radius_meters
      )
    `, [longitude, latitude]);

    // Check polygon geofences (if any exist)
    const polygonResult = await client.query(`
      SELECT id, name, zone_type, 'enter' as event_type
      FROM geofences 
      WHERE type = 'polygon' 
      AND active = true
      AND ST_Within(
        ST_GeogFromText('POINT($1 $2)'),
        polygon_geom
      )
    `, [longitude, latitude]);

    client.release();

    const alerts = [...circularResult.rows, ...polygonResult.rows];

    // Log geofence events
    for (const alert of alerts) {
      await logGeofenceEvent(touristId, alert.id, alert.event_type, latitude, longitude);
    }

    return alerts;

  } catch (error) {
    console.error('Error checking geofences:', error);
    return [];
  }
};

const logGeofenceEvent = async (touristId, geofenceId, eventType, latitude, longitude) => {
  try {
    const client = await pool.connect();
    await client.query(`
      INSERT INTO geofence_events (tourist_id, geofence_id, event_type, location)
      VALUES ($1, $2, $3, ST_GeogFromText('POINT($5 $4)'))
    `, [touristId, geofenceId, eventType, latitude, longitude]);
    client.release();
  } catch (error) {
    console.error('Error logging geofence event:', error);
  }
};

module.exports = {
  checkGeofences,
  logGeofenceEvent
};