import React, { useState, useEffect } from 'react';
import { getAllDoubts } from '../services/api';
import ClassCard from '../components/ClassCard';
import Header from '../components/Header';

const StudentDashboard = () => {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('live');

  const handleLogout = () => {
    // TODO: Replace with actual logout logic when backend is ready
    // This could be:
    // - Clear localStorage/sessionStorage
    // - Call logout API endpoint
    // - Redirect to login page
    console.log('Logout clicked - ready for backend integration');
    alert('Logout functionality ready for backend integration!');
  };

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        setLoading(true);
        const data = await getAllDoubts();
        setDoubts(data);
      } catch (err) {
        setError('Failed to fetch doubts data');
        console.error('Error fetching doubts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoubts();
  }, []);

  // Create unique classes from doubts data
  const getUniqueClasses = () => {
    const classMap = new Map();
    
    doubts.forEach(doubt => {
      const key = `${doubt.classtopic}-${doubt.tid}`;
      if (!classMap.has(key)) {
        classMap.set(key, {
          classtopic: doubt.classtopic,
          tid: doubt.tid,
          timestamp: doubt.timestamp
        });
      }
    });
    
    return Array.from(classMap.values());
  };

  // Separate classes into live and past
  const separateClasses = () => {
    const classes = getUniqueClasses();
    const today = new Date().toDateString();
    
    const liveClasses = classes.filter(cls => {
      const classDate = new Date(cls.timestamp).toDateString();
      return classDate === today;
    });
    
    const pastClasses = classes.filter(cls => {
      const classDate = new Date(cls.timestamp).toDateString();
      return classDate !== today;
    });
    
    return { liveClasses, pastClasses };
  };

  const { liveClasses, pastClasses } = separateClasses();

  if (loading) {
    return <div className="loading">Loading your classes...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <Header 
        title="VidyaVichar" 
        subtitle="Welcome back, Student 101! Here are your classes."
        onLogout={handleLogout}
      />
      <div className="container">

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'live' ? 'active' : ''}`}
          onClick={() => setActiveTab('live')}
        >
          Live Classes ({liveClasses.length})
        </button>
        <button 
          className={`tab ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Past Classes ({pastClasses.length})
        </button>
      </div>

      <div className="grid">
        {activeTab === 'live' ? (
          liveClasses.length > 0 ? (
            liveClasses.map((cls, index) => (
              <ClassCard
                key={`live-${index}`}
                classtopic={cls.classtopic}
                tid={cls.tid}
                date={cls.timestamp}
                isLive={true}
              />
            ))
          ) : (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '40px',
              color: '#6b7280'
            }}>
              No live classes available at the moment.
            </div>
          )
        ) : (
          pastClasses.length > 0 ? (
            pastClasses.map((cls, index) => (
              <ClassCard
                key={`past-${index}`}
                classtopic={cls.classtopic}
                tid={cls.tid}
                date={cls.timestamp}
                isLive={false}
              />
            ))
          ) : (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '40px',
              color: '#6b7280'
            }}>
              No past classes available.
            </div>
          )
        )}
      </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
