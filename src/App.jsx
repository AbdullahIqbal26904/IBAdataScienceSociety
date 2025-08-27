import React, { useEffect, useState, useRef } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Events from './components/events/Events';
import Projects from './components/projects/Projects';
import { useDispatch, useSelector } from 'react-redux';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import Threebackground from './components/background/Threebackground';
import HeroSection from './components/hero/HeroSection';
import Navbar from './components/navbar/Navbar';
import DataverseSection from './components/dataverse/DataverseSection';
import AboutUs from './components/about/AboutUs';
import Gallery from './components/gallery/Gallery';
import { setshowloader, setInitialData } from './redux/features/portfolioSlice';
export default function App() {
  const { society, showloader } = useSelector((state) => state.allCart);
  const [hasError, setHasError] = useState(false);
  const [use3DBackground, setUse3DBackground] = useState(true);
  const dispatch = useDispatch();
  
  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, // Only animate elements once
    });
  }, []);
  
  // Set up performance monitoring
  useEffect(() => {
    // Check for browser performance support
    let isPerformanceSupported = window.performance && 
                               typeof window.performance.now === 'function' &&
                               window.requestAnimationFrame;

    // Monitor frame rate and performance
    let lastTime = 0;
    let frameCount = 0;
    let lowFrameRateCount = 0;
    
    // Only disable 3D background on very low-end mobile devices
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // Check for older devices with less memory
      const deviceMemory = navigator.deviceMemory;
      if (deviceMemory && deviceMemory < 2) { // Less than 2GB RAM
        console.log('Low memory device detected, disabling 3D background');
        setUse3DBackground(false);
      }
    }
    
    const checkPerformance = () => {
      if (!isPerformanceSupported) return;
      
      const now = window.performance.now();
      frameCount++;
      
      // Check every second
      if (now - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = now;
        
        // Only disable if FPS is extremely low for a longer period
        // This prevents Vercel deployments from disabling the background after a few seconds
        if (fps < 15) { // Lower threshold (was 30)
          lowFrameRateCount++;
          // Require more low FPS readings before disabling (was 3)
          if (lowFrameRateCount >= 5) {
            console.warn('Severe performance issues detected, disabling 3D background');
            setUse3DBackground(false);
          }
        } else {
          // Reset counter if FPS improves
          lowFrameRateCount = Math.max(0, lowFrameRateCount - 1);
        }
        
        // Only check memory if we have extreme issues
        if (window.performance && window.performance.memory) {
          try {
            const memoryInfo = window.performance.memory;
            if (memoryInfo.usedJSHeapSize > memoryInfo.jsHeapSizeLimit * 0.9) { // Higher threshold (was 0.7)
              console.warn('Critical memory usage detected, disabling 3D background');
              setUse3DBackground(false);
            }
          } catch (e) {
            console.error('Error checking memory:', e);
          }
        }
      }
      
      // Only continue monitoring if 3D background is still enabled
      if (use3DBackground) {
        window.requestAnimationFrame(checkPerformance);
      }
    };
    
    // Start monitoring after a delay to let the page stabilize
    // This prevents premature disabling on initial load
    const timeoutId = setTimeout(() => {
      const animFrameId = window.requestAnimationFrame(checkPerformance);
      return () => {
        if (animFrameId) {
          window.cancelAnimationFrame(animFrameId);
        }
      };
    }, 3000); // 3 second delay
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  
  useEffect(() => {
    // Initialize with static data instead of API fetch
    setTimeout(() => {
      dispatch(setInitialData());
      dispatch(setshowloader(false));
    }, 1500); // Short artificial delay for loading effect
    
    // Add a global error handler with better error filtering
    const handleError = (event) => {
      // Log the error for debugging
      console.error('Global error:', event.error);
      
      // Check if this is a critical error that should disable the app
      const errorString = event.error ? event.error.toString() : '';
      const isCriticalError = 
        errorString.includes('Out of memory') ||
        errorString.includes('Cannot read properties of undefined') ||
        errorString.includes('Maximum call stack size exceeded');
      
      // Only set hasError for truly critical errors
      if (isCriticalError) {
        setHasError(true);
      }
      
      // Only disable 3D background for specific WebGL-related critical errors
      // Ignore minor WebGL warnings that shouldn't affect functionality
      if (event.error && (
          errorString.includes('WebGL context lost') || 
          errorString.includes('Unable to initialize WebGL') ||
          errorString.includes('GPU process crashed') ||
          errorString.includes('Out of memory')
        )) {
        console.warn('Critical WebGL error detected, disabling 3D background');
        setUse3DBackground(false);
      }
    };
    
    window.addEventListener('error', handleError);
    
    // Add a specific handler for WebGL context lost events
    const handleContextLost = (event) => {
      console.warn('WebGL context lost event detected');
      // Prevent the default behavior which would prevent context restoration
      event.preventDefault();
    };
    
    // Add a specific handler for WebGL context restored events
    const handleContextRestored = () => {
      console.log('WebGL context restored');
    };
    
    // Add these handlers to the canvas element if it exists
    setTimeout(() => {
      const canvasElements = document.querySelectorAll('canvas');
      canvasElements.forEach(canvas => {
        canvas.addEventListener('webglcontextlost', handleContextLost);
        canvas.addEventListener('webglcontextrestored', handleContextRestored);
      });
    }, 2000);
    
    return () => {
      window.removeEventListener('error', handleError);
      
      // Clean up WebGL context event listeners
      const canvasElements = document.querySelectorAll('canvas');
      canvasElements.forEach(canvas => {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      });
    };
  }, [dispatch]);
  if (showloader) {
    // Display loading screen or spinner
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Animated Loader */}
        <div className="relative flex items-center justify-center w-20 h-20">
          <div className="absolute w-20 h-20 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
          <div className="absolute w-16 h-16 border-4 border-t-transparent border-secondary rounded-full animate-spin-reverse"></div>
        </div>

        {/* Loading Text */}
        <p className="mt-4 text-lg font-semibold tracking-wide text-gray-300 animate-pulse">
          Loading, please wait...
        </p>
      </div>
    );

  } else if (hasError) {
    // Show a simple fallback UI if the app encounters an error
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="mb-4 text-center">We encountered an error loading the website.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
        >
          Reload Page
        </button>
      </div>
    );
  } else {
    return (
      <main className="relative w-full h-screen">
        {use3DBackground ? <Threebackground /> : 
          <div className="fixed inset-0 -z-10 bg-gradient-to-b from-gray-900 to-black"></div>}
        <div className="max-w-screen-2xl mx-auto relative z-10">
          <Navbar />
          <div className="snap-y snap-mandatory h-screen overflow-y-auto overflow-x-hidden">
            <div id="hero" className="snap-start min-h-screen w-full flex items-center">
              <HeroSection />
            </div>
            
            <div id="about" className="snap-start min-h-screen w-full flex items-center justify-center">
              <div className="w-full px-4">
                <AboutUs />
              </div>
            </div>
            
            <div id="events" className="snap-start min-h-screen w-full flex items-center justify-center">
              <div className="w-full">
                <Events />
              </div>
            </div>
            
            <div id="dataverse" className="snap-start min-h-screen w-full">
              <DataverseSection />
            </div>
            
            <div id="projects" className="snap-start min-h-screen w-full">
              <Projects />
            </div>
            
            <div id="gallery" className="snap-start min-h-screen w-full">
              <Gallery />
            </div>
            
            <div id="contact" className="snap-start min-h-screen w-full">
              <Contact />
            </div>
            
            <div className="snap-start w-full">
              <Footer />
            </div>
          </div>
        </div>
      </main>
    )
  }
}

