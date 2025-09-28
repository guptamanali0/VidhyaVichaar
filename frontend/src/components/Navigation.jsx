import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isStudentView = !location.pathname.startsWith('/ta');
  const isTAView = location.pathname.startsWith('/ta');

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      display: 'flex',
      gap: '10px'
    }}>
      <button
        className={`btn ${isStudentView ? 'btn-primary' : 'btn-secondary'}`}
        onClick={() => navigate('/')}
        style={{ padding: '8px 16px', fontSize: '14px' }}
      >
        Student View
      </button>
      <button
        className={`btn ${isTAView ? 'btn-primary' : 'btn-secondary'}`}
        onClick={() => navigate('/ta')}
        style={{ padding: '8px 16px', fontSize: '14px' }}
      >
        TA View
      </button>
    </div>
  );
};

export default Navigation;
