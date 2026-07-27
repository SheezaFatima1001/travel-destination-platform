const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const destinationRoutes = require("./routes/destinationRoutes");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/destinations", destinationRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("Travel Destination API is running!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});