// src/services/api.js
import { mockDoubts } from './mockData';

// Mock API service
export const getAllDoubts = () => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(mockDoubts);
    }, 200);
  });
};
