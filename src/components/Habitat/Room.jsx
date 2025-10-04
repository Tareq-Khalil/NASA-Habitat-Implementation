import React from 'react';

const Room = ({ dimensions, furniture, onFurnitureChange }) => {
  return (
    <div className="room" style={{ width: dimensions.width, height: dimensions.height }}>
      {furniture.map((item, index) => (
        <div key={index} className="furniture" style={{ left: item.position.x, top: item.position.y }}>
          {item.type}
        </div>
      ))}
      <button onClick={onFurnitureChange}>Add Furniture</button>
    </div>
  );
};

export default Room;