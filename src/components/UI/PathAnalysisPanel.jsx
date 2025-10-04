import React from 'react';
import { MIN_PATH_WIDTH } from '../../utils/pathAnalysis';

const PathAnalysisPanel = ({ 
  pathAnalysisMode, 
  onToggleMode, 
  pathResult
}) => {
  return (
    <div className="path-analysis-panel">
      <button 
        className={`btn-path-toggle ${pathAnalysisMode ? 'active' : ''}`}
        onClick={onToggleMode}
      >
        <span className="btn-icon">🛤️</span>
        {pathAnalysisMode ? 'Exit Path Analysis' : 'Analyze Crew Path'}
      </button>

      {pathAnalysisMode && (
        <div className="path-instructions">
          <div className="instruction-box">
            <strong>Instructions:</strong>
            <ol>
              <li>Click on a point on the habitat floor to set the start</li>
              <li>Click on another point to set the end</li>
              <li>View the calculated path with clearance analysis</li>
            </ol>
          </div>

          <div className="path-legend">
            <div className="legend-title">Path Color Legend:</div>
            <div className="legend-item">
              <div className="legend-color green"></div>
              <span>Clear Path (≥ {MIN_PATH_WIDTH}m clearance)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color red"></div>
              <span>Narrow Path (&lt; {MIN_PATH_WIDTH}m clearance)</span>
            </div>
          </div>
        </div>
      )}

      {pathResult && pathResult.totalSegments > 0 && (
        <div className={`path-results ${pathResult.passes ? 'pass' : 'fail'}`}>
          <div className="results-header">
            <span className="status-icon">{pathResult.passes ? '✅' : '⚠️'}</span>
            <span className="status-text">{pathResult.passes ? 'PASS' : 'FAIL'}</span>
          </div>

          <div className="results-metrics">
            <div className="metric">
              <div className="metric-label">Total Distance</div>
              <div className="metric-value">{(pathResult.totalDistance || 0).toFixed(2)}m</div>
            </div>
            <div className="metric">
              <div className="metric-label">Path Segments</div>
              <div className="metric-value">{pathResult.totalSegments}</div>
            </div>
            <div className="metric">
              <div className="metric-label">Clear Segments</div>
              <div className={`metric-value ${pathResult.clearSegments === pathResult.totalSegments ? 'good' : ''}`}>
                {pathResult.clearSegments}
              </div>
            </div>
            <div className="metric">
              <div className="metric-label">Narrow Segments</div>
              <div className={`metric-value ${pathResult.narrowSegments > 0 ? 'bad' : ''}`}>
                {pathResult.narrowSegments}
              </div>
            </div>
            <div className="metric">
              <div className="metric-label">Min Width Found</div>
              <div className={`metric-value ${pathResult.minWidth >= MIN_PATH_WIDTH ? 'good' : 'bad'}`}>
                {(pathResult.minWidth || 0).toFixed(2)}m
              </div>
            </div>
            <div className="metric">
              <div className="metric-label">Pass Rate</div>
              <div className={`metric-value ${pathResult.passes ? 'good' : 'bad'}`}>
                {((pathResult.clearSegments / pathResult.totalSegments) * 100).toFixed(0)}%
              </div>
            </div>
          </div>

          <div className="nasa-compliance">
            <h4> NASA Compliance Check</h4>
            <div className="compliance-info">
              <strong>Required Standard:</strong> ≥ {MIN_PATH_WIDTH}m (39.4 inches) minimum translation path width
              <em>Reference: "Internal Layout of a Lunar Surface Habitat"</em>
            </div>
            
            <div className={`compliance-message ${pathResult.passes ? 'pass' : 'fail'}`}>
              {pathResult.passes ? (
                <>
                  ✓ Path meets NASA requirements. All segments provide adequate clearance 
                  for crew translation with equipment.
                </>
              ) : (
                <>
                  ✗ Path does not meet NASA requirements. {pathResult.narrowSegments} segment(s) 
                  have insufficient clearance. Minimum width found: {(pathResult.minWidth || 0).toFixed(2)}m.
                </>
              )}
            </div>

            {!pathResult.passes && (
              <div className="recommendations">
                <strong> Recommendations:</strong>
                <ul>
                  <li>Reposition modules to increase clearance between obstacles</li>
                  <li>Consider alternative crew translation routes</li>
                  <li>Ensure critical pathways maintain ≥ {MIN_PATH_WIDTH}m clearance</li>
                  <li>Review module placement for optimized crew flow</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PathAnalysisPanel;
