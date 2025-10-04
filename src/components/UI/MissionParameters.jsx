import React from 'react';
import { constructionTypes, destinations } from '../../constants/habitatSpecs';

const MissionParameters = ({ missionParams, onUpdateParams, onValidate }) => {
  const handleChange = (field, value) => {
    onUpdateParams({ [field]: value });
  };

  const selectedConstruction = constructionTypes[missionParams.constructionType];
  const selectedDestination = destinations[missionParams.destination];

  return (
    <div className="mission-parameters">
      <h3> NASA Mission Parameters</h3>
      
      <div className="param-group">
        <label htmlFor="crewSize">
          <span className="param-label"> Crew Size</span>
          <select 
            id="crewSize"
            value={missionParams.crewSize}
            onChange={(e) => handleChange('crewSize', parseInt(e.target.value))}
            className="param-select"
          >
            <option value={2}>2 Astronauts</option>
            <option value={4}>4 Astronauts</option>
            <option value={6}>6 Astronauts</option>
          </select>
        </label>
      </div>

      <div className="param-group">
        <label htmlFor="destination">
          <span className="param-label"> Destination</span>
          <select 
            id="destination"
            value={missionParams.destination}
            onChange={(e) => handleChange('destination', e.target.value)}
            className="param-select"
          >
            <option value="lunar"> Lunar Surface</option>
            <option value="marsTransit"> Mars Transit</option>
            <option value="marsSurface"> Mars Surface</option>
          </select>
        </label>
        {selectedDestination && (
          <div className="param-hint">
            <strong>Challenge:</strong> {selectedDestination.primaryChallenge}<br/>
            <strong>Mass Limit:</strong> {selectedDestination.massLimit} metric tons<br/>
            <strong>Gravity:</strong> {selectedDestination.gravity === 0 ? 'Zero-G' : `${selectedDestination.gravity}g`}
          </div>
        )}
      </div>

      <div className="param-group">
        <label htmlFor="constructionType">
          <span className="param-label"> Construction Type</span>
          <select 
            id="constructionType"
            value={missionParams.constructionType}
            onChange={(e) => handleChange('constructionType', e.target.value)}
            className="param-select"
          >
            <option value="rigid"> Rigid (Metallic)</option>
            <option value="inflatable"> Inflatable (TransHAB)</option>
            <option value="isru"> Constructed (ISRU)</option>
          </select>
        </label>
        {selectedConstruction && (
          <div className="param-hint">
            <strong>Launch Mass:</strong> {selectedConstruction.launchMass}<br/>
            <strong>Volume:</strong> {selectedConstruction.habitableVolume}<br/>
            <strong>Radiation:</strong> {selectedConstruction.radiationProtection}<br/>
            <em>{selectedConstruction.specialRules}</em>
          </div>
        )}
      </div>

      <div className="param-group">
        <label htmlFor="duration">
          <span className="param-label"> Mission Duration</span>
          <select 
            id="duration"
            value={missionParams.duration}
            onChange={(e) => handleChange('duration', e.target.value)}
            className="param-select"
          >
            <option value="short">Short-Duration (30 days)</option>
            <option value="mid">Mid-Duration (90-180 days)</option>
            <option value="extended">Extended-Duration (365+ days)</option>
          </select>
        </label>
      </div>

      <button 
        className="btn-validate"
        onClick={onValidate}
      >
         Assess Mission Readiness
      </button>

      <div className="mission-summary">
        <h4> Current Mission Profile</h4>
        <div className="summary-item">
          <span>Crew:</span>
          <span>{missionParams.crewSize} astronauts</span>
        </div>
        <div className="summary-item">
          <span>Location:</span>
          <span>
            {missionParams.destination === 'lunar' && ' Lunar Surface'}
            {missionParams.destination === 'marsTransit' && ' Mars Transit'}
            {missionParams.destination === 'marsSurface' && ' Mars Surface'}
          </span>
        </div>
        <div className="summary-item">
          <span>Construction:</span>
          <span>
            {missionParams.constructionType === 'rigid' && ' Rigid'}
            {missionParams.constructionType === 'inflatable' && ' Inflatable'}
            {missionParams.constructionType === 'isru' && ' ISRU'}
          </span>
        </div>
        <div className="summary-item">
          <span>Duration:</span>
          <span>
            {missionParams.duration === 'short' && '30 days'}
            {missionParams.duration === 'mid' && '90-180 days'}
            {missionParams.duration === 'extended' && '365+ days'}
          </span>
        </div>
        {selectedDestination && (
          <div className="summary-item mission-challenge">
            <span> Primary Challenge:</span>
            <span>{selectedDestination.primaryChallenge}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionParameters;
