import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isStudentView = !location.pathname.startsWith('/ta') && !location.pathname.startsWith('/teacher');
  const isTAView = location.pathname.startsWith('/ta');
  const isTeacherView = location.pathname.startsWith('/teacher');

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 10000,
      display: 'flex',
      gap: '8px',
      backgroundColor: 'white',
      padding: '12px 20px',
      borderRadius: '25px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      border: '2px solid #e5e7eb'
    }}>
      <button
        className={`btn ${isStudentView ? 'btn-primary' : 'btn-secondary'}`}
        onClick={() => navigate('/')}
        style={{ 
          padding: '10px 20px', 
          fontSize: '14px',
          fontWeight: '600',
          minWidth: '120px'
        }}
      >
        Student View
      </button>
      <button
        className={`btn ${isTAView ? 'btn-primary' : 'btn-secondary'}`}
        onClick={() => navigate('/ta')}
        style={{ 
          padding: '10px 20px', 
          fontSize: '14px',
          fontWeight: '600',
          minWidth: '120px'
        }}
      >
        TA View
      </button>
      <button
        className={`btn ${isTeacherView ? 'btn-primary' : 'btn-secondary'}`}
        onClick={() => navigate('/teacher')}
        style={{ 
          padding: '10px 20px', 
          fontSize: '14px',
          fontWeight: '600',
          minWidth: '120px'
        }}
      >
        Teacher View
      </button>
    </div>
  );
};

export default Navigation;
