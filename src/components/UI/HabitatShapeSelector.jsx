import React from 'react';

const HabitatShapeSelector = ({ habitatStructure, onUpdateStructure }) => {
  const { shape, radius, height } = habitatStructure;

  const handleShapeChange = (newShape) => {
    onUpdateStructure({ shape: newShape });
  };

  const handleRadiusChange = (e) => {
    onUpdateStructure({ radius: parseFloat(e.target.value) });
  };

  const handleHeightChange = (e) => {
    onUpdateStructure({ height: parseFloat(e.target.value) });
  };

  return (
    <div className="habitat-selector">
      <h3> Habitat Structure</h3>
      
      <div className="shape-buttons">
        <button
          className={`shape-btn ${shape === 'cylinder' ? 'active' : ''}`}
          onClick={() => handleShapeChange('cylinder')}
        >
          <div className="shape-icon">⬛</div>
          <span>Cylinder</span>
        </button>
        <button
          className={`shape-btn ${shape === 'dome' ? 'active' : ''}`}
          onClick={() => handleShapeChange('dome')}
        >
          <div className="shape-icon">⬢</div>
          <span>Dome</span>
        </button>
      </div>

      <div className="dimension-controls">
        <div className="control-group">
          <label>
            <span>Radius: {radius.toFixed(1)}m</span>
            <input
              type="range"
              min="3"
              max="15"
              step="0.5"
              value={radius}
              onChange={handleRadiusChange}
              className="slider"
            />
          </label>
        </div>

        <div className="control-group">
          <label>
            <span>Height: {height.toFixed(1)}m</span>
            <input
              type="range"
              min="4"
              max="20"
              step="0.5"
              value={height}
              onChange={handleHeightChange}
              className="slider"
            />
          </label>
        </div>
      </div>

      <div className="habitat-stats">
        <div className="stat-item">
          <span className="stat-label">Shape:</span>
          <span className="stat-value">{shape.charAt(0).toUpperCase() + shape.slice(1)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Volume:</span>
          <span className="stat-value">
            {shape === 'cylinder' 
              ? (Math.PI * radius * radius * height).toFixed(1)
              : ((2/3) * Math.PI * Math.pow(radius, 3)).toFixed(1)
            } m³
          </span>
        </div>
      </div>
    </div>
  );
};

export default HabitatShapeSelector;
