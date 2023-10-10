import React from 'react';

const ProgressIndicator = ({ isLoading }) => {
    return isLoading ? (
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress-block" />
            <div className="progress-block" />
            <div className="progress-block" />
            <div className="progress-block" />
            <div className="progress-block" />
            <div className="progress-block" />
            <div className="progress-block" />
            <div className="progress-block" />
            <div className="progress-block" />
            <div className="progress-block" />
          </div>
        </div>
      ) : null;
    };
export default ProgressIndicator;
