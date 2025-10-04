import { useEffect } from 'react';
import { PerspectiveCamera } from 'three';

const Camera = ({ position, fov, aspect, near, far }) => {
  useEffect(() => {
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(...position);

    return () => {
      // Clean up camera if necessary
    };
  }, [position, fov, aspect, near, far]);

  return null;
};

export default Camera;