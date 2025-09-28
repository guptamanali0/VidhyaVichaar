import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDoubts } from '../services/api';
import ClassCard from '../components/ClassCard';
import Header from '../components/Header';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('live');
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [newClassName, setNewClassName] = useState('');

  const handleLogout = () => {
    console.log('Teacher Logout clicked - ready for backend integration');
    alert('Teacher Logout functionality ready for backend integration!');
  };

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        setLoading(true);
        const data = await getAllDoubts();
        setDoubts(data);
      } catch (err) {
        setError('Failed to fetch classes data');
        console.error('Error fetching doubts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoubts();
  }, []);

  // Create unique classes from doubts data - filter by teacher ID
  const getUniqueClasses = () => {
    const classMap = new Map();
    
    doubts.forEach(doubt => {
      const key = `${doubt.classtopic}-${doubt.tid}`;
      if (!classMap.has(key) && doubt.tid === 'teacher_alpha') { // Filter by current teacher
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

  const handleCreateClass = () => {
    if (newClassName.trim()) {
      // In a real app, this would make an API call to create a new class
      const newClass = {
        classtopic: newClassName.trim(),
        tid: 'teacher_alpha',
        timestamp: new Date().toISOString()
      };
      
      // Add to doubts array to simulate the class creation
      setDoubts(prev => [...prev, {
        ...newClass,
        sid: 'system',
        doubtasked: 'Class created',
        sstatus: 'answered'
      }]);
      
      setNewClassName('');
      setShowCreateClass(false);
    }
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
        title="VidyaVichar - Teacher Dashboard" 
        subtitle="Welcome back, Teacher Alpha! Manage your classes and student doubts."
        onLogout={handleLogout}
      />
      <div className="container">

      {/* Create New Class Section */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ margin: 0, color: '#1f2937' }}>Class Management</h3>
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateClass(!showCreateClass)}
          >
            {showCreateClass ? 'Cancel' : 'Create New Class'}
          </button>
        </div>
        
        {showCreateClass && (
          <div style={{ 
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            padding: '25px',
            borderRadius: '12px',
            border: '2px solid #e5e7eb',
            marginTop: '15px'
          }}>
            <h4 style={{ 
              margin: '0 0 15px 0', 
              color: '#1f2937',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              Create New Class
            </h4>
            <p style={{ 
              margin: '0 0 20px 0', 
              color: '#6b7280',
              fontSize: '14px'
            }}>
              Enter a descriptive topic for your new class. Students will see this when joining.
            </p>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <label style={{ 
                  display: 'block',
                  marginBottom: '8px',
                  color: '#374151',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Class Topic *
                </label>
                <input
                  type="text"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="e.g., Advanced React Patterns, Data Structures, Machine Learning..."
                  style={{ 
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s ease',
                    backgroundColor: 'white',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowCreateClass(false);
                    setNewClassName('');
                  }}
                  style={{ 
                    padding: '12px 20px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleCreateClass}
                  disabled={!newClassName.trim()}
                  style={{ 
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: '600',
                    opacity: !newClassName.trim() ? '0.5' : '1'
                  }}
                >
                  Create Class
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

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
                isTeacher={true}
              />
            ))
          ) : (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '40px',
              color: '#6b7280'
            }}>
              No live classes available. Create a new class to get started!
            </div>
          )
        ) : (
          pastClasses.length > 0 ? (
            pastClasses.map((cls, index) => {
              // Get doubts for this class
              const classDoubts = doubts.filter(doubt => 
                doubt.classtopic === cls.classtopic && doubt.tid === cls.tid
              );
              const answeredCount = classDoubts.filter(doubt => doubt.sstatus === 'answered').length;
              const unansweredCount = classDoubts.length - answeredCount;

              return (
                <div key={`past-${index}`} className="card">
                  <div style={{ marginBottom: '15px' }}>
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: '600', 
                      color: '#1f2937',
                      marginBottom: '8px'
                    }}>
                      {cls.classtopic}
                    </h3>
                    
                    <p style={{ 
                      color: '#6b7280', 
                      fontSize: '14px',
                      marginBottom: '5px'
                    }}>
                      Teacher ID: {cls.tid}
                    </p>
                    
                    <p style={{ 
                      color: '#9ca3af', 
                      fontSize: '12px',
                      marginBottom: '15px'
                    }}>
                      {new Date(cls.timestamp).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px',
                      backgroundColor: '#f9fafb',
                      borderRadius: '8px',
                      marginBottom: '10px'
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937' }}>
                          {classDoubts.length}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>Total</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '20px', fontWeight: '700', color: '#10b981' }}>
                          {answeredCount}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>Answered</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ 
                          fontSize: '20px', 
                          fontWeight: '700', 
                          color: unansweredCount > 0 ? '#ef4444' : '#6b7280'
                        }}>
                          {unansweredCount}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>Pending</div>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigate(`/teacher/past-class/${encodeURIComponent(cls.classtopic)}/${cls.tid}`)}
                    style={{ width: '100%' }}
                  >
                    View Doubts
                  </button>
                </div>
              );
            })
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

export default TeacherDashboard;
