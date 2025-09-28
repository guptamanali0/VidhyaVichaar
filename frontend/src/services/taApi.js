// src/services/taApi.js
import { taMockData } from './taMockData';

// Mock API service for TA interface
export const getTAInfo = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(taMockData.taInfo);
    }, 200);
  });
};

export const getTAClasses = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(taMockData.classes);
    }, 200);
  });
};

export const getClassQuestions = (classId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const questions = taMockData.questions.filter(q => q.classId === classId);
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
