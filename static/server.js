// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection setup (replace with your MongoDB connection string)
mongoose.connect("mongodb://localhost:27017/zurin-foundation", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Create a schema for the form data
const FormSubmissionSchema = new mongoose.Schema({
    name: String,
    email: String,
    walletAddress: String,
});

// Create a model based on the schema
const FormSubmission = mongoose.model("FormSubmission", FormSubmissionSchema);

// Middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to handle form submission
app.post("/submit-form", async (req, res) => {
    try {
        // Extract data from the request body
        const { name, email, walletAddress } = req.body;

        // Create a new document instance
        const newSubmission = new FormSubmission({
            name,
            email,
            walletAddress,
        });

        // Save the document to the database
        await newSubmission.save();

        // Respond with success message
        res.status(201).json({ message: "Form submission successful!" });
    } catch (error) {
        console.error("Form submission error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
