// src/services/taMockData.js

// Function to get today's date in YYYY-MM-DD format for the timestamp
const getTodayTimestamp = () => new Date().toISOString();

export const taMockData = {
  // TA Information
  taInfo: {
    taid: "ta_001",
    name: "Teaching Assistant Alpha",
    assignedTeacher: "teacher_alpha",
    teacherName: "Dr. Sarah Johnson"
  },

  // Classes assigned to this TA (only past classes)
  classes: [
    {
      classId: "class_002", 
      classtopic: "Introduction to MongoDB",
      teacherId: "teacher_alpha",
      teacherName: "Dr. Sarah Johnson",
      timestamp: "2025-01-15T14:30:00Z",
      totalQuestions: 12,
      answeredQuestions: 12,
      unansweredQuestions: 0
    },
    {
      classId: "class_003",
      classtopic: "React Advanced Patterns", 
      teacherId: "teacher_gamma",
      teacherName: "Prof. Michael Chen",
      timestamp: "2025-01-10T10:00:00Z",
      totalQuestions: 6,
      answeredQuestions: 4,
      unansweredQuestions: 2
    },
    {
      classId: "class_004",
      classtopic: "System Design Principles",
      teacherId: "teacher_alpha",
      teacherName: "Dr. Sarah Johnson",
      timestamp: "2025-01-05T11:20:00Z",
      totalQuestions: 8,
      answeredQuestions: 5,
      unansweredQuestions: 3
    }
  ],

  // All questions for the assigned teacher's classes (simplified like student interface)
  questions: [
    {
      questionId: "q_001",
      classId: "class_004",
      classtopic: "System Design Principles",
      studentId: "student101",
      questionText: "How does CAP theorem apply to microservices?",
      timestamp: "2025-01-05T11:25:00Z",
      status: "unanswered"
    },
    {
      questionId: "q_002",
      classId: "class_004", 
      classtopic: "System Design Principles",
      studentId: "student202",
      questionText: "What is the difference between horizontal and vertical scaling?",
      timestamp: "2025-01-05T11:30:00Z",
      status: "answered"
    },
    {
      questionId: "q_003",
      classId: "class_004",
      classtopic: "System Design Principles", 
      studentId: "student101",
      questionText: "How do we handle data consistency in distributed systems?",
      timestamp: "2025-01-05T11:35:00Z",
      status: "unanswered"
    },
    {
      questionId: "q_004",
      classId: "class_002",
      classtopic: "Introduction to MongoDB",
      studentId: "student101", 
      questionText: "What is the primary advantage of NoSQL over SQL?",
      timestamp: "2025-01-15T14:35:00Z",
      status: "answered"
    },
    {
      questionId: "q_005",
      classId: "class_002",
      classtopic: "Introduction to MongoDB",
      studentId: "student303", 
      questionText: "How do we handle relationships in MongoDB?",
      timestamp: "2025-01-15T14:40:00Z",
      status: "answered"
    },
    {
      questionId: "q_006",
      classId: "class_003",
      classtopic: "React Advanced Patterns",
      studentId: "student101",
      questionText: "What are the best practices for state management in large React applications?",
      timestamp: "2025-01-10T10:15:00Z", 
      status: "answered"
    },
    {
      questionId: "q_007",
      classId: "class_003",
      classtopic: "React Advanced Patterns",
      studentId: "student404",
      questionText: "How do we optimize performance in React components?",
      timestamp: "2025-01-10T10:20:00Z",
      status: "unanswered"
    }
  ]
};
