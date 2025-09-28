import React, { useState, useEffect } from 'react';
import { getTAInfo, getTAClasses } from '../services/taApi';
import ClassSummaryCard from '../components/ClassSummaryCard';
import Header from '../components/Header';

const TADashboard = () => {
  const [taInfo, setTaInfo] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [taData, classesData] = await Promise.all([
          getTAInfo(),
          getTAClasses()
        ]);
        setTaInfo(taData);
        setClasses(classesData);
      } catch (err) {
        setError('Failed to fetch TA data');
        console.error('Error fetching TA data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    // TODO: Replace with actual logout logic when backend is ready
    console.log('TA Logout clicked - ready for backend integration');
    alert('TA Logout functionality ready for backend integration!');
  };

  if (loading) {
    return <div className="loading">Loading your classes...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <Header 
        title="VidyaVichar - TA Dashboard" 
        subtitle={`Welcome, ${taInfo?.name}! View past classes and doubts for ${taInfo?.teacherName}`}
        onLogout={handleLogout}
      />
      <div className="container">
        <div className="grid">
          {classes.length > 0 ? (
            classes.map((classData) => (
              <ClassSummaryCard
                key={classData.classId}
                classData={classData}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default TADashboard;
