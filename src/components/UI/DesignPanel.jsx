import React, { useState } from 'react';
import HabitatShapeSelector from './HabitatShapeSelector';
import MissionParameters from './MissionParameters';
import { MODULE_SPECS } from '../../utils/missionValidation';

const moduleTypes = [
  { id: 'living', name: ' Living Quarters', description: 'Crew living space', color: '#ff6644' },
  { id: 'lab', name: ' Research Lab', description: 'Scientific research', color: '#44ff88' },
  { id: 'power', name: ' Power Module', description: 'Energy generation', color: '#ffff44' },
  { id: 'greenhouse', name: ' Greenhouse', description: 'Food & oxygen', color: '#44ff44' },
  { id: 'medical', name: ' Medical Bay', description: 'Health & treatment', color: '#ff4488' },
  { id: 'airlock', name: ' Airlock', description: 'EVA access', color: '#4444ff' },
  { id: 'storage', name: ' Storage', description: 'Resource storage', color: '#8844ff' },
];

const DesignPanel = ({ 
  habitatStructure, 
  modules, 
  missionParams,
  onUpdateStructure, 
  onUpdateMissionParams,
  onAddModule,
  onRemoveModule,
  onValidate 
}) => {
  const [selectedModule, setSelectedModule] = useState(null);

  const handleAddModule = (moduleType) => {
    const moduleData = {
      type: moduleType.id,
      name: moduleType.name,
      position: { x: 0, y: 0, z: 0 },
    };
    onAddModule(moduleData);
  };

  const getModuleCount = (type) => {
    return modules.filter(m => m.type === type).length;
  };

  const getTotalMass = () => {
    return modules.reduce((sum, module) => {
      return sum + (MODULE_SPECS[module.type]?.mass || 0);
    }, 0);
  };

  const getTotalVolume = () => {
    return modules.reduce((sum, module) => {
      return sum + (MODULE_SPECS[module.type]?.volume || 0);
    }, 0);
  };

  return (
    <div className="design-panel">
      <MissionParameters 
        missionParams={missionParams}
        onUpdateParams={onUpdateMissionParams}
        onValidate={onValidate}
      />

      <div className="divider"></div>

      <HabitatShapeSelector 
        habitatStructure={habitatStructure}
        onUpdateStructure={onUpdateStructure}
      />

      <div className="divider"></div>

      <h2>🔧 Module Builder</h2>
      <p className="hint">Click to add modules, then drag them in 3D space</p>
      
      <div className="module-list">
        {moduleTypes.map(module => {
          const specs = MODULE_SPECS[module.id];
          return (
            <div 
              key={module.id} 
              className={`module-item ${selectedModule?.id === module.id ? 'selected' : ''}`}
              onClick={() => setSelectedModule(module)}
            >
              <div className="module-header">
                <div className="module-icon">{module.name}</div>
                <span className="module-count">×{getModuleCount(module.id)}</span>
              </div>
              <p className="module-desc">{module.description}</p>
              {specs && (
                <div className="module-specs">
                  <span className="spec-item"> {specs.mass}t</span>
                  <span className="spec-item"> {specs.volume}m³</span>
                </div>
              )}
              <div className="module-color" style={{ backgroundColor: module.color }}></div>
              <button 
                className="btn-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddModule(module);
                }}
              >
                Add to Habitat
              </button>
            </div>
          );
        })}
      </div>

      <div className="layout-info">
        <h3> Habitat Statistics</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Total Modules:</span>
            <span className="info-value">{modules.length}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Total Mass:</span>
            <span className="info-value">{getTotalMass().toFixed(1)} t</span>
          </div>
          <div className="info-item">
            <span className="info-label">Total Volume:</span>
            <span className="info-value">{getTotalVolume().toFixed(1)} m³</span>
          </div>
          <div className="info-item">
            <span className="info-label">Habitat Shape:</span>
            <span className="info-value">{habitatStructure.shape}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPanel;