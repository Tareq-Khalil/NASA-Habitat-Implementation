import React from 'react';

const HUD = ({ score, moduleCount, onEndGame }) => {
  return (
    <div className="hud">
      <div className="hud-left">
        <h1> Space Habitat Builder</h1>
      </div>
      <div className="hud-center">
        <div className="hud-stats">
          <div className="stat-badge">
            <span className="stat-icon"></span>
            <span className="stat-text">Score: {score}</span>
          </div>
          <div className="stat-badge">
            <span className="stat-icon"></span>
            <span className="stat-text">Modules: {moduleCount || 0}</span>
          </div>
        </div>
      </div>
      <div className="hud-right">
        <button className="btn-secondary" onClick={onEndGame}>End Game</button>
      </div>
    </div>
  );
};

export default HUD;