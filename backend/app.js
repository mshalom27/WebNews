require("dotenv").config();
const express = require("express");
const app = express(); 
app.use(express.json());

const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

const authRoutes = require("./routes/auth");
const articleRoutes = require("./routes/articles");
const savedRoutes = require("./routes/saved");
const commentRoutes = require("./routes/comments");


mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log("Error connecting to MongoDB", err);
})

app.use("/api/auth", authRoutes); 

app.listen(5000, () => console.log(`Server running on port 5000`));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error"; 

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  } )
})

