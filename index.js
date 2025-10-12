const express = require('express');
const cors =  require("cors")
const morgan = require("morgan");
const { connectDB } = require('./models/config');
require('dotenv').config();
const QRCode = require("qrcode")
const indexRoute = require("./routes/indexRoutes")
const app = express();
const path = require("path")

app.use(cors({origin:"*"}))

app.use(morgan("dev"))
const PORT = process.env.PORT || 3000

// Middleware to parse JSON
app.use(express.json());
connectDB()

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to E-Learning Platform.');
});

  app.use("/api", indexRoute)

 
  app.use("/public", express.static(path.join(__dirname, "public")));
  // Route that returns user info

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
