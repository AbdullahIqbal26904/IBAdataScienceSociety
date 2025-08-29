import React, { useEffect, useState } from 'react';
import Threebackground from './Threebackground';
import StaticBackground from './StaticBackground';

function BackgroundManager() {
  const [useStaticBackground, setUseStaticBackground] = useState(false);

  // Simple runtime check for WebGL support in the client browser
  const isWebGLAvailable = () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    // If the client does not support WebGL, fallback to the static background
    if (!isWebGLAvailable()) {
      console.log('WebGL not available, using static background');
      setUseStaticBackground(true);
    }

    // Handle WebGL context lost events as a backup during runtime
    const handleWebGLContextLost = () => {
      console.log('WebGL context lost, switching to static background');
      setUseStaticBackground(true);
    };

    window.addEventListener('webglcontextlost', handleWebGLContextLost);

    return () => {
      window.removeEventListener('webglcontextlost', handleWebGLContextLost);
    };
  }, []);

  return (
    <>
      {useStaticBackground ? (
        <StaticBackground />
      ) : (
        <Threebackground fallbackToStatic={() => setUseStaticBackground(true)} />
      )}
    </>
  );
}

export default BackgroundManager;
