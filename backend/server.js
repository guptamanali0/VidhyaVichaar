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

// Classes Management API
app.post("/api/classes", async (req, res) => {
  try {
    const { classId, tid, active } = req.body;
    
    const newClass = {
      classId: classId,
      tid: tid,
      active: active,
      createdAt: new Date()
    };
    console.log("i am here")
    console.log(`server ${req.body.classId}`);
    const result = await mongoose.connection.db.collection('classes').insertOne(newClass);
    
    res.json({ 
      success: true, 
      message: "Class created successfully",
      classId: result.insertedId,
      class: { ...newClass, _id: result.insertedId }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get classes for a specific teacher
app.get("/api/classes", async (req, res) => {
  try {
    const { tid } = req.query;
    let query = {};
    
    if (tid) {
      query.tid = tid;
    }
    
    const classes = await mongoose.connection.db.collection('classes').find(query).toArray();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update class active status (End Class)
app.put("/api/classes/:classId/end", async (req, res) => {
  try {
    const { classId } = req.params;
    
    const result = await mongoose.connection.db.collection('classes').updateOne(
      { _id: new mongoose.Types.ObjectId(classId) },
      { 
        $set: { 
          active: false,
          endedAt: new Date()
        }
      }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Class not found" });
    }

    // Update all student entries for this class to completed status
    const updateResult = await mongoose.connection.db.collection('student_past_classes').updateMany(
      { 
        classId: classId,
        status: 'active'
      },
      { 
        $set: { 
          status: 'completed',
          completedAt: new Date()
        }
      }
    );

    console.log(`Updated ${updateResult.modifiedCount} student entries to completed status`);
    
    res.json({ 
      success: true, 
      message: "Class ended successfully",
      studentsUpdated: updateResult.modifiedCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all active classes for students
app.get("/api/classes/active", async (req, res) => {
  try {
    const activeClasses = await mongoose.connection.db.collection('classes')
      .find({ active: true })
      .toArray();
    
    res.json(activeClasses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Student joins a class - adds entry to student_past_classes collection
app.post("/api/classes/:classId/join", async (req, res) => {
  try {
    const { classId } = req.params;
    const { studentId, studentEmail } = req.body;
    
    if (!studentId || !studentEmail) {
      return res.status(400).json({ error: "Student ID and email are required" });
    }

    // Check if class exists and is active
    const classData = await mongoose.connection.db.collection('classes')
      .findOne({ _id: new mongoose.Types.ObjectId(classId), active: true });
    
    if (!classData) {
      return res.status(404).json({ error: "Active class not found" });
    }

    // Check if student already joined this class
    const existingEntry = await mongoose.connection.db.collection('student_past_classes')
      .findOne({ classId: classId, studentId: studentId });
    
    if (existingEntry) {
      return res.status(400).json({ error: "Student already joined this class" });
    }

    // Add entry to student_past_classes collection
    const studentClassEntry = {
      classId: classId,
      studentId: studentId,
      studentEmail: studentEmail,
      teacherId: classData.tid,
      className: classData.classId,
      joinedAt: new Date(),
      status: 'active',
      completedAt: null
    };

    const result = await mongoose.connection.db.collection('student_past_classes')
      .insertOne(studentClassEntry);
    
    res.json({ 
      success: true, 
      message: "Successfully joined class",
      entryId: result.insertedId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get past classes for a specific student
app.get("/api/students/:studentId/past-classes", async (req, res) => {
  try {
    const { studentId } = req.params;
    
    const pastClasses = await mongoose.connection.db.collection('student_past_classes')
      .find({ 
        studentId: studentId,
        status: 'completed'
      })
      .sort({ completedAt: -1 })
      .toArray();
    
    res.json(pastClasses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all classes joined by a student (active and completed)
app.get("/api/students/:studentId/classes", async (req, res) => {
  try {
    const { studentId } = req.params;
    
    const studentClasses = await mongoose.connection.db.collection('student_past_classes')
      .find({ studentId: studentId })
      .sort({ joinedAt: -1 })
      .toArray();
    
    res.json(studentClasses);
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