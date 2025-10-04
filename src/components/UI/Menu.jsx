import React from 'react';

const Menu = ({ onStart }) => {
  return (
    <div className="menu-screen">
      <div className="menu-content">
        <h1 className="game-title"> Space Habitat Builder</h1>
        <h2 className="game-title"> Mission XXI</h2>
        <p className="game-subtitle">Design and build your orbital space station</p>
        <div className="menu-buttons">
          <button className="btn-start" onClick={onStart}>
            Start Building
          </button>
        </div>
        <div className="game-info">
          <h3>How to Play:</h3>
          <ul>
            <li>Select modules from the builder panel</li>
            <li>Add them to create your space habitat</li>
            <li>Watch your station grow in 3D</li>
            <li>Score points for each module added</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
