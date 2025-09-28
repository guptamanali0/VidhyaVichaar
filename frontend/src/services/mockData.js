// src/services/mockData.js

// Function to get today's date in YYYY-MM-DD format for the timestamp
const getTodayTimestamp = () => new Date().toISOString();

export const mockDoubts = [
  {
    tid: "teacher_alpha",
    sid: "student101",
    classtopic: "System Design Principles",
    timestamp: getTodayTimestamp(), // This makes the class "live"
    doubtasked: "How does CAP theorem apply to microservices?",
    sstatus: "unanswered",
  },
  {
    tid: "teacher_alpha",
    sid: "student202", // A doubt from another student in the same class
    classtopic: "System Design Principles",
    timestamp: getTodayTimestamp(),
    doubtasked: "What is the difference between horizontal and vertical scaling?",
    sstatus: "answered",
  },
  {
    tid: "teacher_beta",
    sid: "student101",
    classtopic: "Introduction to MongoDB",
    timestamp: "2025-09-25T11:20:00Z", // This makes the class "past"
    doubtasked: "What is the primary advantage of NoSQL over SQL?",
    sstatus: "answered",
  },
  {
    tid: "teacher_alpha",
    sid: "student101",
    classtopic: "System Design Principles",
    timestamp: getTodayTimestamp(),
    doubtasked: "How do we handle data consistency in distributed systems?",
    sstatus: "unanswered",
  },
  {
    tid: "teacher_gamma",
    sid: "student101",
    classtopic: "React Advanced Patterns",
    timestamp: "2025-01-15T14:30:00Z",
    doubtasked: "What are the best practices for state management in large React applications?",
    sstatus: "answered",
  },
  {
    tid: "teacher_gamma",
    sid: "student101",
    classtopic: "React Advanced Patterns",
    timestamp: "2025-01-15T14:30:00Z",
    doubtasked: "How do we optimize performance in React components?",
    sstatus: "unanswered",
  },
  {
    tid: "teacher_gamma",
    sid: "student202",
    classtopic: "React Advanced Patterns",
    timestamp: "2025-01-15T14:35:00Z",
    doubtasked: "What is the difference between useCallback and useMemo?",
    sstatus: "answered",
  },
  {
    tid: "teacher_gamma",
    sid: "student303",
    classtopic: "React Advanced Patterns",
    timestamp: "2025-01-15T14:40:00Z",
    doubtasked: "How do we handle complex state updates in React?",
    sstatus: "unanswered",
  },
  {
    tid: "teacher_gamma",
    sid: "student101",
    classtopic: "JavaScript ES6+ Features",
    timestamp: "2025-01-10T10:00:00Z",
    doubtasked: "What are the benefits of using arrow functions?",
    sstatus: "answered",
  },
  {
    tid: "teacher_gamma",
    sid: "student404",
    classtopic: "JavaScript ES6+ Features",
    timestamp: "2025-01-10T10:15:00Z",
    doubtasked: "How do destructuring assignments work in JavaScript?",
    sstatus: "answered",
  },
  {
    tid: "teacher_gamma",
    sid: "student202",
    classtopic: "JavaScript ES6+ Features",
    timestamp: "2025-01-10T10:20:00Z",
    doubtasked: "What is the difference between let, const, and var?",
    sstatus: "unanswered",
  },
];
