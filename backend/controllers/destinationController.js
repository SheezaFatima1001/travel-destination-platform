const Destination = require("../models/Destination");

// Get all destinations
const getDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find();

        res.status(200).json(destinations);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve destinations",
            error: error.message
        });
    }
};

// Add a new destination
const addDestination = async (req, res) => {
    try {
        const newDestination = await Destination.create(req.body);

        res.status(201).json(newDestination);
    } catch (error) {
        res.status(500).json({
            message: "Failed to add destination",
            error: error.message
        });
    }
};

// Get a single destination by ID
const getDestinationById = async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);

        if (!destination) {
            return res.status(404).json({
                message: "Destination not found"
            });
        }

        res.status(200).json(destination);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve destination",
            error: error.message
        });
    }
};

// Update a destination
const updateDestination = async (req, res) => {
    try {
        const updatedDestination = await Destination.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedDestination) {
            return res.status(404).json({
                message: "Destination not found"
            });
        }

        res.status(200).json(updatedDestination);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update destination",
            error: error.message
        });
    }
};


// delete function

// Delete a destination
const deleteDestination = async (req, res) => {
    try {
        const deletedDestination = await Destination.findByIdAndDelete(
            req.params.id
        );

        if (!deletedDestination) {
            return res.status(404).json({
                message: "Destination not found"
            });
        }

        res.status(200).json({
            message: "Destination deleted successfully",
            destination: deletedDestination
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete destination",
            error: error.message
        });
    }
};

module.exports = {
    getDestinations,
    addDestination,
    getDestinationById,
    updateDestination,
    deleteDestination
};