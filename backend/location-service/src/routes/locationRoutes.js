const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// POST /api/location/update - Update tourist location
router.post('/update', locationController.updateLocation);

// GET /api/location/:touristId - Get current location
router.get('/:touristId', locationController.getCurrentLocation);

// GET /api/location/:touristId/history - Get location history
router.get('/:touristId/history', locationController.getLocationHistory);

// POST /api/location/bulk-update - Bulk location updates
router.post('/bulk-update', locationController.bulkUpdateLocations);

module.exports = router;