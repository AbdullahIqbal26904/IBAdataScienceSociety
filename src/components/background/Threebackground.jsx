import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function Threebackground() {
    const mountRef = useRef(null); // To attach the 3D scene to a DOM element
    const [isVisible, setIsVisible] = useState(true);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const starsRef = useRef(null);
    const animationFrameIdRef = useRef(null);

    useEffect(() => {
        // Check if device is mobile (define once at the top)
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Prevent WebGL context loss on Vercel or other hosting environments
        const canvas = document.createElement('canvas');
        const contextAttributes = {
            alpha: true,
            antialias: !isMobile,
            powerPreference: 'high-performance',
            preserveDrawingBuffer: true, // Important for preventing context loss in some browsers
            failIfMajorPerformanceCaveat: false // Allow fallback to software rendering if needed
        };
        
        // Step 1: Create the scene, camera, and renderer
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        scene.background = new THREE.Color(0x000000); // Set the background color of the scene
        
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.z = 5; // Move the camera back so we can see the stars
        
        const renderer = new THREE.WebGLRenderer(contextAttributes);
        rendererRef.current = renderer;
        
        // Set size to use client width/height to avoid overflow
        renderer.setSize(window.innerWidth, window.innerHeight);
        // Use lower pixel ratio for better performance, but not too low to prevent blurriness
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
        
        //Step 2: attach the renderer to the <div> in the JSX
        if (mountRef.current) {
            mountRef.current.innerHTML = ''; // Clear any existing children first
            mountRef.current.appendChild(renderer.domElement); // Attach renderer to the <div>
        }
        
        // Step 3: Create stars
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({ 
            color: 0xffffff,
            size: isMobile ? 2 : 1.7, // Slightly larger on mobile for better visibility
            sizeAttenuation: true // Stars further away appear smaller
        });
        
        // Optimize star count for performance while maintaining visual quality
        const starCount = isMobile ? 800 : 3000;
        const starVertices = [];
        for (let i = 0; i < starCount; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starVertices.push(x, y, z);
        }
        
        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        const stars = new THREE.Points(starGeometry, starMaterial);
        starsRef.current = stars;
        scene.add(stars);
        
        // Step 4: Create an animation loop with performance optimizations
        let lastRenderTime = 0;
        const targetFPS = isMobile ? 15 : 20; // Lower frame rate to reduce CPU/GPU usage
        const frameInterval = 1000 / targetFPS;
        
        // Setup intersection observer with optimized options for production
        const observer = new IntersectionObserver((entries) => {
            setIsVisible(entries[0].isIntersecting);
        }, { 
            threshold: 0.1,
            rootMargin: "0px"
        });
        
        if (mountRef.current) {
            observer.observe(mountRef.current);
        }
        
        const animate = (currentTime) => {
            animationFrameIdRef.current = requestAnimationFrame(animate);
            
            // Skip frames to maintain target FPS
            const deltaTime = currentTime - lastRenderTime;
            if (deltaTime < frameInterval) return;
            
            // Ensure we have valid refs before rendering
            if (starsRef.current && rendererRef.current && sceneRef.current) {
                // Even slower rotation for better stability
                starsRef.current.rotation.y += isMobile ? 0.0002 : 0.0004;
                starsRef.current.rotation.x += isMobile ? 0.0001 : 0.0002;
                
                // Force renderer to maintain context with camera and scene
                rendererRef.current.render(sceneRef.current, camera);
                lastRenderTime = currentTime - (deltaTime % frameInterval);
            }
        };
        
        // Optimize mouse move events to reduce processing
        let throttleTimeout;
        const handleMouseMove = (event) => {
            if (!throttleTimeout) {
                throttleTimeout = setTimeout(() => {
                    throttleTimeout = null;
                    
                    const x = event.clientX / window.innerWidth - 0.5;
                    const y = event.clientY / window.innerHeight - 0.5;
                    camera.position.x = x * 0.5; // Further reduced sensitivity
                    camera.position.y = -y * 0.5;
                    camera.lookAt(scene.position);
                }, isMobile ? 100 : 50); // Less frequent updates
            }
        };
        
        // Only add mousemove listener if not mobile
        if (!isMobile) {
            window.addEventListener('mousemove', handleMouseMove);
        }
        
        const handleResize = () => {
            // Update renderer and camera to match the window size
            if (rendererRef.current) {
                rendererRef.current.setSize(window.innerWidth, window.innerHeight);
            }
            
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        
        window.addEventListener('resize', handleResize);
        handleResize(); // Call once at start to ensure proper sizing

        // Force first render to prevent initial blank state
        if (rendererRef.current && sceneRef.current) {
            rendererRef.current.render(sceneRef.current, camera);
        }
        
        // Start animation loop after a short delay to ensure proper initialization
        setTimeout(() => {
            animate(0);
        }, 100);
        
        // Step 5: Cleanup when the component unmounts
        return () => {
            // Cancel animation frame to stop rendering loop
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
                animationFrameIdRef.current = null;
            }
            
            // Clear any pending throttle timeout
            if (throttleTimeout) {
                clearTimeout(throttleTimeout);
            }
            
            // Disconnect observer
            observer.disconnect();
            
            // Remove event listeners
            if (!isMobile) {
                window.removeEventListener('mousemove', handleMouseMove);
            }
            window.removeEventListener('resize', handleResize);
            
            // Properly dispose Three.js resources
            if (starGeometry) starGeometry.dispose();
            if (starMaterial) starMaterial.dispose();
            
            // Clean up scene
            if (sceneRef.current && starsRef.current) {
                sceneRef.current.remove(starsRef.current);
            }
            
            // Remove renderer from DOM and dispose
            if (mountRef.current && rendererRef.current) {
                if (rendererRef.current.domElement && mountRef.current.contains(rendererRef.current.domElement)) {
                    mountRef.current.removeChild(rendererRef.current.domElement);
                }
                rendererRef.current.dispose();
                rendererRef.current = null;
            }
            
            // Clear refs
            sceneRef.current = null;
            starsRef.current = null;
        };
    }, []); // Remove isVisible dependency to prevent re-creating the scene

    return (
        <div className='fixed inset-0 -z-10' ref={mountRef} style={{ pointerEvents: 'none' }}>
            {/* The 3D scene will be rendered into this div */}
        </div>
    );
}

export default Threebackground;
