import React, { useEffect, useState } from 'react';
import Threebackground from './Threebackground';
import StaticBackground from './StaticBackground';

function BackgroundManager() {
  const [useStaticBackground, setUseStaticBackground] = useState(false);
  const [isVercelEnvironment, setIsVercelEnvironment] = useState(false);
  
  useEffect(() => {
    // Check if we're in a Vercel environment by looking at the hostname
    // This is a simple heuristic - Vercel domains typically end with vercel.app or are custom domains
    const hostname = window.location.hostname;
    const isVercel = hostname.includes('vercel.app') || 
                     !hostname.includes('localhost') && 
                     !hostname.includes('127.0.0.1') &&
                     !hostname.includes('.local');
    
    // Always use static background on Vercel to ensure stability
    if (isVercel) {
      console.log('Vercel environment detected, using static background');
      setIsVercelEnvironment(true);
    }
    
    // Handle WebGL context lost events as a backup
    const handleWebGLContextLost = () => {
      console.log('WebGL context lost, switching to static background');
      setUseStaticBackground(true);
    };
    
    // Listen for webglcontextlost events
    window.addEventListener('webglcontextlost', handleWebGLContextLost);
    
    return () => {
      window.removeEventListener('webglcontextlost', handleWebGLContextLost);
    };
  }, []);
  
  return (
    <>
      {(useStaticBackground || isVercelEnvironment) ? (
        <StaticBackground />
      ) : (
        <Threebackground fallbackToStatic={() => setUseStaticBackground(true)} />
      )}
    </>
  );
}

export default BackgroundManager;
