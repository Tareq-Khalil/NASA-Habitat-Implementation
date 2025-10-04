// NASA Habitat Construction Types (Reference: NASA-CP-97-206241-Cohen.pdf)
export const constructionTypes = {
  rigid: {
    name: 'Rigid (Metallic)',
    description: 'Pre-fabricated metal modules like ISS. Launched in final form.',
    launchMass: 'High',
    launchMassMultiplier: 1.0,
    habitableVolume: 'Limited by rocket size',
    volumeMultiplier: 1.0,
    radiationProtection: 'Standard',
    radiationFactor: 1.0,
    specialRules: 'Most straightforward, no special requirements',
    requirements: []
  },
  inflatable: {
    name: 'Inflatable (TransHAB)',
    description: 'Launched compressed, expanded in space. Best volume-for-mass ratio.',
    launchMass: 'Low',
    launchMassMultiplier: 0.6,
    habitableVolume: 'Very High',
    volumeMultiplier: 1.8,
    radiationProtection: 'Standard',
    radiationFactor: 1.0,
    specialRules: 'Excellent volume efficiency',
    requirements: []
  },
  isru: {
    name: 'Constructed (ISRU/Regolith)',
    description: '3D printed or built on-site using local materials.',
    launchMass: 'Very Low',
    launchMassMultiplier: 0.3,
    habitableVolume: 'Potentially Unlimited',
    volumeMultiplier: 2.0,
    radiationProtection: 'Excellent',
    radiationFactor: 1.5,
    specialRules: 'Requires Construction Rover or ISRU Plant module',
    requirements: ['isru']
  }
};

// Enhanced Destination Specifications (NASA mission profiles)
export const destinations = {
  lunar: {
    name: 'Lunar Surface',
    primaryChallenge: 'Strict Mass Limit',
    massLimit: 12, // metric tons
    gravity: 0.16,
    description: 'Moon base with severe launch mass constraints',
    validationRules: {
      strictMassLimit: true,
      requiresISRUIfConstructed: true,
      minModules: 4,
      requiredModules: ['living', 'power', 'airlock']
    }
  },
  marsTransit: {
    name: 'Mars Transit',
    primaryChallenge: 'Zero-G & Radiation',
    massLimit: 26.4, // metric tons
    gravity: 0,
    description: 'Long-duration spaceflight with radiation and medical concerns',
    validationRules: {
      requiresRadiationShielding: true,
      requiresMedicalBay: true,
      requires3DLayout: true,
      minModules: 6,
      requiredModules: ['living', 'medical', 'power', 'storage']
    }
  },
  marsSurface: {
    name: 'Mars Surface',
    primaryChallenge: 'Self-Sufficiency',
    massLimit: 18, // metric tons
    gravity: 0.38,
    description: 'Long-term Mars settlement requiring self-sufficiency',
    validationRules: {
      requiresGreenhouse: true,
      requiresScienceLab: true,
      requiresRobustPower: true,
      encouragesISRU: true,
      minModules: 7,
      requiredModules: ['living', 'greenhouse', 'lab', 'power', 'storage']
    }
  }
};

export const habitatSpecifications = {
  modules: [
    {
      name: "Living Quarters",
      dimensions: { width: 5, length: 5, height: 3 },
      features: ["bed", "storage", "window"],
    },
    {
      name: "Laboratory",
      dimensions: { width: 6, length: 6, height: 3 },
      features: ["workbench", "shelves", "equipment"],
    },
    {
      name: "Greenhouse",
      dimensions: { width: 7, length: 7, height: 4 },
      features: ["plants", "hydroponics", "lighting"],
    },
    {
      name: "Common Area",
      dimensions: { width: 8, length: 8, height: 3 },
      features: ["seating", "entertainment", "kitchen"],
    },
  ],
  maxModules: 10,
  minSpacePerModule: 25,
  layoutGuidelines: {
    spacing: 2,
    accessibility: true,
    safety: true,
  },
};