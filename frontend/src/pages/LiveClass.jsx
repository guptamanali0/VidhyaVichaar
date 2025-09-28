import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllDoubts } from '../services/api';
import Header from '../components/Header';

const LiveClass = () => {
  const { classtopic } = useParams();
  const navigate = useNavigate();
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newDoubt, setNewDoubt] = useState('');

  const handleLogout = () => {
    // TODO: Replace with actual logout logic when backend is ready
    console.log('Logout clicked - ready for backend integration');
    alert('Logout functionality ready for backend integration!');
  };

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        setLoading(true);
        const data = await getAllDoubts();
        // Filter doubts for current student and class topic
        const studentDoubts = data.filter(
          doubt => 
            doubt.sid === 'student101' && 
            doubt.classtopic === decodeURIComponent(classtopic)
        );
        setDoubts(studentDoubts);
      } catch (err) {
        setError('Failed to fetch doubts data');
        console.error('Error fetching doubts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoubts();
  }, [classtopic]);

  const handlePostDoubt = () => {
    if (newDoubt.trim()) {
      // In a real app, this would make an API call
      const newDoubtObj = {
        tid: "teacher_alpha", // This would come from the class data
        sid: "student101",
        classtopic: decodeURIComponent(classtopic),
        timestamp: new Date().toISOString(),
        doubtasked: newDoubt.trim(),
        sstatus: "unanswered"
      };
      
      setDoubts(prev => [newDoubtObj, ...prev]);
      setNewDoubt('');
    }
  };

  const getStableColor = (text) => {
    const colors = [
      '#FFFACD', // Light yellow
      '#FFE4E1', // Misty rose
      '#E0FFFF', // Light cyan
      '#F0FFF0', // Honeydew
      '#FFF8DC', // Cornsilk
      '#F5FFFA', // Mint cream
      '#FFEFD5', // Papaya whip
      '#F0F8FF', // Alice blue
    ];
    // Use text hash to get consistent color
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading">Loading class doubts...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <Header 
        title={decodeURIComponent(classtopic)}
        subtitle="Ask your questions and view your doubts"
        showBackButton={true}
        onBackClick={() => navigate('/')}
        onLogout={handleLogout}
      />
      <div className="container">

      <div className="card">
        <h3 style={{ marginBottom: '15px', color: '#1f2937' }}>Post a New Doubt</h3>
        <textarea
          className="textarea"
          value={newDoubt}
          onChange={(e) => setNewDoubt(e.target.value)}
          placeholder="Type your question here..."
        />
        <button 
          className="btn btn-primary"
          onClick={handlePostDoubt}
          style={{ marginTop: '10px' }}
          disabled={!newDoubt.trim()}
        >
          Post Doubt
        </button>
      </div>

      <div>
        <h3 style={{ 
          marginBottom: '20px', 
          color: '#1f2937',
          fontSize: '20px'
        }}>
          Your Doubts ({doubts.length})
        </h3>
        
        {doubts.length > 0 ? (
          <div>
            {doubts.map((doubt, index) => (
              <div
                key={index}
                className={`sticky-note ${doubt.sstatus}`}
                style={{ 
                  backgroundColor: getStableColor(doubt.doubtasked),
                  transform: 'rotate(0deg)'
                }}
              >
                <div className={`status-badge ${doubt.sstatus}`}>
                  {doubt.sstatus}
                </div>
                <p style={{ 
                  marginBottom: '10px',
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  {doubt.doubtasked}
                </p>
                <p style={{ 
                  fontSize: '12px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  Posted at {formatTimestamp(doubt.timestamp)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            color: '#6b7280',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            No doubts posted yet. Ask your first question above!
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default LiveClass;
