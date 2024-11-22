const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// Load image data from JSON file
const imageData = JSON.parse(fs.readFileSync('images.json'));

// Create endpoints for each image
imageData.forEach((item, index) => {
    app.get(`/api/image${index + 1}`, (req, res) => {
        const imagePath = path.join(__dirname, item.image);
        res.sendFile(imagePath, (err) => {
            if (err) {
                res.status(err.status).end();
            }
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${BASE_URL}`);
});


