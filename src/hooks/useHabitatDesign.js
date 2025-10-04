import { useState } from 'react';

export const useHabitatDesign = () => {
  const [habitatStructure, setHabitatStructure] = useState({
    shape: 'cylinder', // 'cylinder' or 'dome'
    radius: 5,
    height: 8,
  });

  const [modules, setModules] = useState([]);

  const updateHabitatStructure = (updates) => {
    setHabitatStructure(prev => ({
      ...prev,
      ...updates
    }));
  };

  const addModule = (moduleType) => {
    const newModule = {
      id: Date.now(),
      type: moduleType,
      position: { x: 0, y: 0.5, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 1,
    };
    console.log('Creating module in useHabitatDesign:', newModule);
    setModules(prev => {
      const updated = [...prev, newModule];
      console.log('Updated modules:', updated);
      return updated;
    });
    return newModule;
  };

  const updateModulePosition = (moduleId, position) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { ...module, position }
        : module
    ));
  };

  const removeModule = (moduleId) => {
    setModules(prev => prev.filter(module => module.id !== moduleId));
  };

  const clearModules = () => {
    setModules([]);
  };

  const isPositionValid = (position) => {
    const { shape, radius, height } = habitatStructure;
    const { x, y, z } = position;
    
    if (shape === 'cylinder') {
      const distanceFromCenter = Math.sqrt(x * x + z * z);
      return distanceFromCenter <= radius - 0.5 && y >= 0 && y <= height - 1;
    } else if (shape === 'dome') {
      const distanceFromCenter = Math.sqrt(x * x + z * z);
      const maxHeightAtPosition = Math.sqrt(Math.max(0, radius * radius - distanceFromCenter * distanceFromCenter));
      return distanceFromCenter <= radius - 0.5 && y >= 0 && y <= maxHeightAtPosition - 0.5;
    }
    return false;
  };

  return {
    habitatStructure,
    modules,
    updateHabitatStructure,
    addModule,
    updateModulePosition,
    removeModule,
    clearModules,
    isPositionValid,
  };
};