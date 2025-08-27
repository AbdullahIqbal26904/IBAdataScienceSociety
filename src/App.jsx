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
    
    // Set the 3D background to false by default on mobile devices
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      console.log('Mobile device detected, disabling 3D background');
      setUse3DBackground(false);
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
        
        // If FPS is consistently low, disable 3D background
        if (fps < 30) {
          lowFrameRateCount++;
          if (lowFrameRateCount >= 3) {
            console.warn('Performance issues detected, disabling 3D background');
            setUse3DBackground(false);
          }
        } else {
          // Reset counter if FPS improves
          lowFrameRateCount = Math.max(0, lowFrameRateCount - 1);
        }
        
        // Also check memory usage if available
        if (window.performance && window.performance.memory) {
          try {
            const memoryInfo = window.performance.memory;
            if (memoryInfo.usedJSHeapSize > memoryInfo.jsHeapSizeLimit * 0.7) {
              console.warn('High memory usage detected, disabling 3D background');
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
    
    // Start monitoring
    const animFrameId = window.requestAnimationFrame(checkPerformance);
    
    return () => {
      if (animFrameId) {
        window.cancelAnimationFrame(animFrameId);
      }
    };
  }, []);
  
  useEffect(() => {
    // Initialize with static data instead of API fetch
    setTimeout(() => {
      dispatch(setInitialData());
      dispatch(setshowloader(false));
    }, 1500); // Short artificial delay for loading effect
    
    // Add a global error handler
    const handleError = (event) => {
      console.error('Global error:', event.error);
      setHasError(true);
      // If error is related to WebGL, disable 3D background
      if (event.error && (
          event.error.toString().includes('WebGL') || 
          event.error.toString().includes('canvas') ||
          event.error.toString().includes('GPU')
        )) {
        setUse3DBackground(false);
      }
    };
    
    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
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

