const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware with Secure CORS Configuration (Cookie & Session Protection)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Import & Mount Secure Admin Routes
const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);

const schoolRoutes = require("./routes/school");
app.use("/api/admin/add-school", schoolRoutes);

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));




app.get("/health", (req, res) => {
  res.send("ok");
});


const MONGO_URI=process.env.DB_URI

mongoose.connect(MONGO_URI).then(()=>{
    console.log("db connected")
}).catch(err=>console.log(err))



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});