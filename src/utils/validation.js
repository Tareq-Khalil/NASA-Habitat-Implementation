export const validateRoomDimensions = (width, length, height) => {
  const minDimension = 1; // Minimum dimension in meters
  const maxDimension = 20; // Maximum dimension in meters

  if (width < minDimension || width > maxDimension) {
    return `Width must be between ${minDimension} and ${maxDimension} meters.`;
  }
  if (length < minDimension || length > maxDimension) {
    return `Length must be between ${minDimension} and ${maxDimension} meters.`;
  }
  if (height < minDimension || height > maxDimension) {
    return `Height must be between ${minDimension} and ${maxDimension} meters.`;
  }
  return null; // Valid dimensions
};

export const validateModulePlacement = (module, habitatLayout) => {
  // Check if the module overlaps with existing modules
  for (const existingModule of habitatLayout.modules) {
    if (isOverlapping(module, existingModule)) {
      return 'Module placement overlaps with an existing module.';
    }
  }
  return null; // Valid placement
};

const isOverlapping = (moduleA, moduleB) => {
  // Simple bounding box overlap check
  return !(
    moduleA.x + moduleA.width < moduleB.x ||
    moduleA.x > moduleB.x + moduleB.width ||
    moduleA.y + moduleA.length < moduleB.y ||
    moduleA.y > moduleB.y + moduleB.length
  );
};