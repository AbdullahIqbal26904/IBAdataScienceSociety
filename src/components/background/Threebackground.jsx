import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function Threebackground() {
    const mountRef = useRef(null); // To attach the 3D scene to a DOM element

    useEffect(() => {
        // Three.js works with three main parts:
        // Scene: The container for everything in your 3D world.
        // Camera: Your point of view to see the 3D objects.
        // Renderer: A tool to display the 3D scene in your browser.
        // Step 1: Create the scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera();
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        scene.background = new THREE.Color(0x000000); // Set the background color of the scene
        
        // Set size to use client width/height to avoid overflow
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
        
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
        const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
        const starCount = 10000;
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
        camera.position.z = 5; // Move the camera back so we can see the cube
        // Step 5: Create an animation loop
        // Create a variable to store animation frame ID so we can cancel it later
        let animationFrameId;
        
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            // Remove cube rotation since it's not in the scene
            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;

            stars.rotation.y += 0.001;
            stars.rotation.x += 0.001;
            renderer.render(scene, camera);
        };

        const handleMouseMove = (event) => {
            const x = event.clientX / window.innerWidth - 0.5;
            const y = event.clientY / window.innerHeight - 0.5;
            camera.position.x = x * 1;
            camera.position.y = -y * 1;
            camera.lookAt(scene.position);
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
            
            // Remove event listeners to prevent memory leaks
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            
            // Properly dispose Three.js resources
            starGeometry.dispose();
            starMaterial.dispose();
            geometry.dispose();
            material.dispose();
            
            // Only try to remove the renderer if mountRef is still valid
            if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
            
            renderer.dispose(); // Free up memory
        };

    }, []);

    return (
        <div className='fixed inset-0 -z-10' ref={mountRef} style={{ pointerEvents: 'none' }}>
            {/* The 3D scene will be rendered into this div */}
        </div>
    );
}

export default Threebackground;
