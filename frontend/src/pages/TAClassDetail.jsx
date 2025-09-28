import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTAClasses, getClassQuestions } from '../services/taApi';
import Header from '../components/Header';

const TAClassDetail = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [classesData, questionsData] = await Promise.all([
          getTAClasses(),
          getClassQuestions(classId)
        ]);
        
        const currentClass = classesData.find(cls => cls.classId === classId);
        if (!currentClass) {
          setError('Class not found');
          return;
        }
        
        setClassData(currentClass);
        setQuestions(questionsData);
      } catch (err) {
        setError('Failed to fetch class data');
        console.error('Error fetching class data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [classId]);

  const handleLogout = () => {
    console.log('TA Logout clicked - ready for backend integration');
    alert('TA Logout functionality ready for backend integration!');
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

  const getFilteredQuestions = () => {
    if (filterStatus === 'all') return questions;
    return questions.filter(q => q.status === filterStatus);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading">Loading class questions...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const filteredQuestions = getFilteredQuestions();

  return (
    <div>
      <Header 
        title={classData?.classtopic || 'Class Questions'}
        subtitle={`Viewing doubts from ${classData?.teacherName || 'Teacher'}`}
        showBackButton={true}
        onBackClick={() => navigate('/ta')}
        onLogout={handleLogout}
      />
      <div className="container">
        {/* Filter Tabs */}
        <div className="tabs" style={{ marginBottom: '20px' }}>
          <button 
            className={`tab ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All Questions ({questions.length})
          </button>
          <button 
            className={`tab ${filterStatus === 'unanswered' ? 'active' : ''}`}
            onClick={() => setFilterStatus('unanswered')}
          >
            Pending ({questions.filter(q => q.status === 'unanswered').length})
          </button>
          <button 
            className={`tab ${filterStatus === 'answered' ? 'active' : ''}`}
            onClick={() => setFilterStatus('answered')}
          >
            Answered ({questions.filter(q => q.status === 'answered').length})
          </button>
        </div>

        {/* Questions List - Same as Student Interface */}
        <div>
          {filteredQuestions.length > 0 ? (
            <div>
              {filteredQuestions.map((question, index) => (
                <div
                  key={question.questionId}
                  className={`sticky-note ${question.status}`}
                  style={{ 
                    backgroundColor: getStableColor(question.questionText),
                    transform: 'rotate(0deg)'
                  }}
                >
                  <div className={`status-badge ${question.status}`}>
                    {question.status}
                  </div>
                  <p style={{ 
                    marginBottom: '10px',
                    fontSize: '14px',
                    lineHeight: '1.4'
                  }}>
                    {question.questionText}
                  </p>
                  <p style={{ 
                    fontSize: '12px',
                    color: '#6b7280',
                    margin: 0
                  }}>
                    Posted on {formatTimestamp(question.timestamp)}
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
              No questions found for the selected filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TAClassDetail;