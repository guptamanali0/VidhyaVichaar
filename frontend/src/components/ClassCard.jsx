import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClassCard = ({ classtopic, tid, date, isLive }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isLive) {
      navigate(`/live-class/${encodeURIComponent(classtopic)}`);
    } else {
      navigate(`/past-class/${encodeURIComponent(classtopic)}`);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card">
      <div style={{ marginBottom: '15px' }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: '#1f2937',
          marginBottom: '8px'
        }}>
          {classtopic}
        </h3>
        <p style={{ 
          color: '#9ca3af', 
          fontSize: '12px',
          marginBottom: '15px'
        }}>
          {formatDate(date)}
        </p>
      </div>
      
      <button 
        className={`btn ${isLive ? 'btn-success' : 'btn-secondary'}`}
        onClick={handleButtonClick}
        style={{ width: '100%' }}
      >
        {isLive ? 'Join Class' : 'View Doubts'}
      </button>
    </div>
  );
};

export default ClassCard;
