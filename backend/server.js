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


// Define models for all collections
const Student = mongoose.model(
  "Student", 
  new mongoose.Schema({}, { strict: false }), 
  "student"
);

const Teacher = mongoose.model(
  "Teacher", 
  new mongoose.Schema({}, { strict: false }), 
  "Teacher"
);

const TeachingAssistant = mongoose.model(
  "TeachingAssistant", 
  new mongoose.Schema({}, { strict: false }), 
  "teachingassistant"
);

const Doubt = mongoose.model(
  "Doubt", 
  new mongoose.Schema({}, { strict: false }), 
  "doubt"
);

// Authentication endpoint
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    if (!email || !password || !role) {
      return res.status(400).json({ 
        success: false, 
        message: "Email, password, and role are required" 
      });
    }

    let user = null;
    let userField = '';

    // Check based on role
    switch(role) {
      case 'student':
        user = await Student.findOne({ roll_no: email, password: password });
        userField = 'roll_no';
        break;
        
      case 'teacher':
        user = await Teacher.findOne({ tid: email, password: password });
        userField = 'tid';
        break;
        
      case 'ta':
        user = await TeachingAssistant.findOne({ taid: email, password: password });
        userField = 'taid';
        break;
        
      default:
        return res.status(400).json({ 
          success: false, 
          message: "Invalid role. Use: student, teacher, ta" 
        });
    }

    if (user) {
      res.json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          [userField]: user[userField],
          role: role
        },
        token: `token_${user._id}_${Date.now()}` // Simple token
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }
    
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: err.message 
    });
  }
});

// Get all data endpoints
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/teachingassistants", async (req, res) => {
  try {
    const tas = await TeachingAssistant.find();
    res.json(tas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/doubts", async (req, res) => {
  try {
    const doubts = await Doubt.find();
    res.json(doubts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));