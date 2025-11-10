import React from 'react';
import './LoadingSpinner.css';

export default function LoadingSpinner({ fullScreen = false }) {
  if (fullScreen) {
    return (
      <div className="loading-container">
        <div className="spinner-wrapper">
          <div className="custom-spinner"></div>
          <p className="loading-text">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-5">
      <div className="custom-spinner mx-auto"></div>
      <p className="loading-text mt-3">Loading...</p>
    </div>
  );
}
