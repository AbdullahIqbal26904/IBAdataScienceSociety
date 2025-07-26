import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function Threebackground() {
    const mountRef = useRef(null); // To attach the 3D scene to a DOM element
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Check if device is mobile (define once at the top)
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Three.js works with three main parts:
        // Scene: The container for everything in your 3D world.
        // Camera: Your point of view to see the 3D objects.
        // Renderer: A tool to display the 3D scene in your browser.
        // Step 1: Create the scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera();
        const renderer = new THREE.WebGLRenderer({ 
            antialias: !isMobile, // Disable antialiasing for mobile
            powerPreference: 'high-performance', // Request high performance GPU
            alpha: true // Enable transparency
        });
        scene.background = new THREE.Color(0x000000); // Set the background color of the scene
        
        // Set size to use client width/height to avoid overflow
        renderer.setSize(window.innerWidth, window.innerHeight);
        // Use lower pixel ratio for mobile devices
        renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
        
        //Step 2: attach the renderer to the <div> in the JSX
        mountRef.current.appendChild(renderer.domElement); // Attach renderer to the <div>
        // Step 3: Create a 3D object
        //Geometry: The shape of the 3D object (e.g., cube, sphere, etc.).
        // Material: The surface of the object (color, texture, etc.).
        // Mesh: The combination of geometry and material to create the 3D object.
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        // scene.add(cube);
        // Step 4: Position the camera
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({ 
            color: 0xffffff,
            size: 1.7, // Increase size slightly so we can use fewer stars
            sizeAttenuation: true // Stars further away appear smaller
        });
        
        // Reduce star count for better performance
        // Use even fewer stars on mobile
        const starCount = isMobile ? 800 : 3000;
        const starVertices = [];
        for (let i = 0; i < starCount; i++) {
            const x = (Math.random() - 0.5) * 2000; // Random position in X
            const y = (Math.random() - 0.5) * 2000; // Random position in Y
            const z = (Math.random() - 0.5) * 2000; // Random position in Z
            starVertices.push(x, y, z);
        }
        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);
        camera.position.z = 5; // Move the camera back so we can see the stars
        // Step 5: Create an animation loop with performance optimizations
        let animationFrameId;
        let lastRenderTime = 0;
        const targetFPS = 20; // Lower frame rate limit to significantly reduce CPU usage
        const frameInterval = 1000 / targetFPS;
        
        // Setup intersection observer to detect if component is visible
        // Use a higher threshold for better performance on mobile
        const observer = new IntersectionObserver((entries) => {
            setIsVisible(entries[0].isIntersecting);
        }, { 
            threshold: isMobile ? 0.25 : 0.1,
            rootMargin: isMobile ? "-20% 0px" : "0px" 
        });
        
        if (mountRef.current) {
            observer.observe(mountRef.current);
        }
        
        const animate = (currentTime) => {
            animationFrameId = requestAnimationFrame(animate);
            
            // Skip frames to maintain target FPS
            const deltaTime = currentTime - lastRenderTime;
            if (deltaTime < frameInterval) return;
            
            // Only render when visible
            if (isVisible) {
                // Even slower rotation on mobile for better performance
                stars.rotation.y += isMobile ? 0.0003 : 0.0005;
                stars.rotation.x += isMobile ? 0.0001 : 0.0002;
                renderer.render(scene, camera);
                lastRenderTime = currentTime - (deltaTime % frameInterval);
            }
        };
        
        // Throttle mouse move events to reduce processing
        let throttleTimeout;
        const handleMouseMove = (event) => {
            if (!throttleTimeout) {
                throttleTimeout = setTimeout(() => {
                    throttleTimeout = null;
                    
                    // Only update camera if component is visible
                    if (isVisible) {
                        const x = event.clientX / window.innerWidth - 0.5;
                        const y = event.clientY / window.innerHeight - 0.5;
                        camera.position.x = x * 0.8; // Reduced movement sensitivity
                        camera.position.y = -y * 0.8;
                        camera.lookAt(scene.position);
                    }
                }, 50); // Throttle to 20 updates per second max
            }
        }
        window.addEventListener('mousemove', handleMouseMove);
        
        const handleResize = () => {
            // Update renderer and camera to match the window size
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }
        window.addEventListener('resize', handleResize);
        handleResize(); // Call once at start to ensure proper sizing

        animate();
        
        // Step 5: Cleanup when the component unmounts
        return () => {
            // Cancel animation frame to stop rendering loop
            cancelAnimationFrame(animationFrameId);
            
            // Clear any pending throttle timeout
            if (throttleTimeout) {
                clearTimeout(throttleTimeout);
            }
            
            // Disconnect observer
            if (mountRef.current) {
                observer.disconnect();
            }
            
            // Remove event listeners to prevent memory leaks
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            
            // Properly dispose Three.js resources
            if (starGeometry) starGeometry.dispose();
            if (starMaterial) starMaterial.dispose();
            if (geometry) geometry.dispose();
            if (material) material.dispose();
            
            // Remove renderer from DOM
            if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
            
            // Release GPU resources
            renderer.forceContextLoss();
            renderer.dispose();
            
            // Force garbage collection (this is a hint, not guaranteed)
            if (window.gc) window.gc();
        };

    }, [isVisible]); // Re-run effect if visibility changes

    return (
        <div className='fixed inset-0 -z-10' ref={mountRef} style={{ pointerEvents: 'none' }}>
            {/* The 3D scene will be rendered into this div */}
        </div>
    );
}

export default Threebackground;
