require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); 
const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes"); 

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();
app.use(cors({
  origin: ["http://localhost:5173", "https://ems-frontend-six-roan.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/employees", employeeRoutes); 
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;