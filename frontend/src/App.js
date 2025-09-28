import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentDashboard from './pages/StudentDashboard';
import LiveClass from './pages/LiveClass';
import PastClass from './pages/PastClass';
import TADashboard from './pages/TADashboard';
import TAClassDetail from './pages/TAClassDetail';
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
          <Route path="/ta/class/:classId" element={<TAClassDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
