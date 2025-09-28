import React, { useState, useEffect } from 'react';
import { getTAInfo, getAllDoubts } from '../services/taApi';
import ClassSummaryCard from '../components/ClassSummaryCard';
import Header from '../components/Header';

const TADashboard = () => {
  const [taInfo, setTaInfo] = useState(null);
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [taData, doubtsData] = await Promise.all([
          getTAInfo(),
          getAllDoubts()
        ]);
        setTaInfo(taData);
        setDoubts(doubtsData);
      } catch (err) {
        setError('Failed to fetch TA data');
        console.error('Error fetching TA data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Create unique classes from doubts data - SAME as student approach
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

  // Filter classes by TA's assigned teacher
  const getFilteredClasses = () => {
    const allClasses = getUniqueClasses();
    const taTeacherId = taInfo?.assignedTeacher;
    
    return allClasses.filter(cls => cls.tid === taTeacherId);
  };

  const handleLogout = () => {
    console.log('TA Logout clicked - ready for backend integration');
    alert('TA Logout functionality ready for backend integration!');
  };

  if (loading) {
    return <div className="loading">Loading your classes...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const classes = getFilteredClasses();

  return (
    <div>
      <Header 
        title="VidyaVichar - TA Dashboard" 
        subtitle={`Welcome, TA ${taInfo?.taid}! View past classes and doubts.`}
        onLogout={handleLogout}
      />
      <div className="container">
        <div className="grid">
          {classes.length > 0 ? (
            classes.map((classData, index) => (
              <ClassSummaryCard
                key={`${classData.classtopic}-${classData.tid}-${index}`}
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
