const express = require("express");
const app = express();
const cors = require("cors");

// Configure CORS options
const corsOptions = {
  origin: "*", // Allow all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow specific methods
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization", // Allow specific headers
};

// Use CORS middleware
app.use(cors(corsOptions));

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(4000, () => console.log("Server ready on port 4000."));

module.exports = app;
