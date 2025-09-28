// src/services/taApi.js

import { taMockData } from './taMockData';
import { mockDoubts } from './mockData';

// Mock API service for TA interface - SAME as student approach
export const getTAInfo = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(taMockData.taInfo);
    }, 200);
  });
};

// Get ALL doubts - same as student approach
export const getAllDoubts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDoubts);
    }, 200);
  });
};

// Get questions for a specific class - simple filtering
export const getClassQuestions = (classtopic, tid) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const questions = mockDoubts.filter(doubt => 
        doubt.classtopic === classtopic && doubt.tid === tid
      );
      resolve(questions);
    }, 200);
  });
};

export const updateQuestionStatus = (questionId, status) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In real implementation, this would update the backend
      console.log(`Question ${questionId} status updated to ${status}`);
      resolve({ success: true, questionId, status });
    }, 200);
  });
};
