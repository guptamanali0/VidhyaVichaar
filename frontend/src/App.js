import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentDashboard from './pages/StudentDashboard';
import LiveClass from './pages/LiveClass';
import PastClass from './pages/PastClass';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/live-class/:classtopic" element={<LiveClass />} />
          <Route path="/past-class/:classtopic" element={<PastClass />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
