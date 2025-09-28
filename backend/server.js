require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URL)
  .then((mongooseInstance) => {
    console.log("MongoDB connected");
    console.log("Database:", mongooseInstance.connection.name);
    console.log("Host:", mongooseInstance.connection.hosts); // shows all hosts in the cluster
  })
  .catch(err => console.error("MongoDB connection error:", err));


  const Student = mongoose.model(
  "Student", 
  new mongoose.Schema({}, { strict: false }), // flexible schema
  "student" // exact collection name in Atlas
);

app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find(); // fetch all docs
    console.log(students); // should now log your roll_no & password docs
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));