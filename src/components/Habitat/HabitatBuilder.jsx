import React, { useState } from 'react';
import Room from './Room';
import Module from './Module';

const HabitatBuilder = () => {
  const [rooms, setRooms] = useState([]);
  const [modules, setModules] = useState([]);

  const addRoom = (roomType) => {
    setRooms([...rooms, { id: rooms.length, type: roomType }]);
  };

  const addModule = (moduleType) => {
    setModules([...modules, { id: modules.length, type: moduleType }]);
  };

  return (
    <div className="habitat-builder">
      <h1>Space Habitat Builder</h1>
      <div className="controls">
        <button onClick={() => addRoom('Living Room')}>Add Living Room</button>
        <button onClick={() => addRoom('Laboratory')}>Add Laboratory</button>
        <button onClick={() => addModule('Solar Panel')}>Add Solar Panel</button>
        <button onClick={() => addModule('Air Filter')}>Add Air Filter</button>
      </div>
      <div className="habitat-layout">
        {rooms.map(room => (
          <Room key={room.id} type={room.type} />
        ))}
        {modules.map(module => (
          <Module key={module.id} type={module.type} />
        ))}
      </div>
    </div>
  );
};

export default HabitatBuilder;