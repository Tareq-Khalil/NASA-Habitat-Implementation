// This file contains utility functions for geometric calculations used in the space habitat game.

export const calculateDistance = (pointA, pointB) => {
  const dx = pointB.x - pointA.x;
  const dy = pointB.y - pointA.y;
  const dz = pointB.z - pointA.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

export const calculateVolume = (length, width, height) => {
  return length * width * height;
};

export const calculateArea = (length, width) => {
  return length * width;
};

export const isPointInsideBox = (point, box) => {
  return (
    point.x >= box.min.x &&
    point.x <= box.max.x &&
    point.y >= box.min.y &&
    point.y <= box.max.y &&
    point.z >= box.min.z &&
    point.z <= box.max.z
  );
};