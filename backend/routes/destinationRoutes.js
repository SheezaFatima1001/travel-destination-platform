const express = require("express");

const {
    getDestinations,
    addDestination,
    getDestinationById,
    updateDestination,
    deleteDestination,
    getDestinationsByCategory
} = require("../controllers/destinationController");

const router = express.Router();

// Get all destinations
router.get("/", getDestinations);

// Get destinations by category
router.get("/category/:category", getDestinationsByCategory);

// Add a destination
router.post("/", addDestination);

// Get one destination
router.get("/:id", getDestinationById);

// Update a destination
router.put("/:id", updateDestination);

// Delete a destination
router.delete("/:id", deleteDestination);

module.exports = router;