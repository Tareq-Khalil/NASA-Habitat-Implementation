import React from 'react';

const ValidationModal = ({ results, onClose }) => {
  if (!results) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2> Mission Readiness Assessment</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className={`readiness-status ${results.passed ? 'passed' : 'failed'}`}>
            <div className="status-icon">
              {results.passed ? '✅' : '⚠️'}
            </div>
            <div className="status-text">
              <h3>{results.passed ? 'Mission Ready!' : 'Mission Not Ready'}</h3>
              <p>
                {results.passedCount} of {results.totalChecks} requirements met
              </p>
            </div>
          </div>

          <div className="validation-results">
            {results.checks.map((check, index) => (
              <div key={index} className={`check-item ${check.passed ? 'check-passed' : 'check-failed'}`}>
                <div className="check-header">
                  <span className="check-icon">
                    {check.passed ? '✓' : '✗'}
                  </span>
                  <span className="check-name">{check.name}</span>
                  <span className={`check-badge ${check.passed ? 'badge-pass' : 'badge-fail'}`}>
                    {check.passed ? 'PASS' : 'FAIL'}
                  </span>
                </div>
                
                <p className="check-description">{check.description}</p>
                
                <div className="check-values">
                  <div className="value-item">
                    <span className="value-label">Current:</span>
                    <span className="value-number">
                      {check.current} {check.unit}
                    </span>
                  </div>
                  <div className="value-item">
                    <span className="value-label">Required:</span>
                    <span className="value-number">
                      {check.required} {check.unit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!results.passed && (
            <div className="recommendations">
              <h4> Recommendations</h4>
              <ul>
                {results.checks.filter(c => !c.passed).map((check, index) => (
                  <li key={index}>
                    Add {check.required - check.current} more {check.name} module(s)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            {results.passed ? 'Launch Mission! ' : 'Continue Building'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidationModal;
