import React from 'react';

const Controls = ({ onMove, onRotate, onZoom }) => {
  return (
    <div className="controls">
      <h2>Controls</h2>
      <div className="control-buttons">
        <button onClick={onMove}>Move</button>
        <button onClick={onRotate}>Rotate</button>
        <button onClick={onZoom}>Zoom</button>
      </div>
    </div>
  );
};

export default Controls;