import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentDashboard from './pages/StudentDashboard';
import LiveClass from './pages/LiveClass';
import PastClass from './pages/PastClass';
import TADashboard from './pages/TADashboard';
import TAClassDetail from './pages/TAClassDetail';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherClassDetail from './pages/TeacherClassDetail';
import TeacherPastClassDetail from './pages/TeacherPastClassDetail';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          {/* Student Routes */}
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/live-class/:classtopic" element={<LiveClass />} />
          <Route path="/past-class/:classtopic" element={<PastClass />} />
          
          {/* TA Routes */}
          <Route path="/ta" element={<TADashboard />} />
          <Route path="/ta/class/:classtopic/:tid" element={<TAClassDetail />} />
          
          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/class/:classtopic/:tid" element={<TeacherClassDetail />} />
          <Route path="/teacher/past-class/:classtopic/:tid" element={<TeacherPastClassDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
