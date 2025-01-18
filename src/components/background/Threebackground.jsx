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
        const renderer = new THREE.WebGLRenderer();
        scene.background = new THREE.Color(0x000000); // Set the background color of the scene
        renderer.setSize(window.innerWidth, window.innerHeight);
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
        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

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
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }
        window.addEventListener('resize', handleResize);

        animate();
        // Step 5: Cleanup when the component unmounts
        return () => {
            mountRef.current.removeChild(renderer.domElement); // Remove the 3D canvas
            renderer.dispose(); // Free up memory
        };

    }, []);

    return (
        <div className='fixed inset-0 -z-1 w-full h-full' ref={mountRef} style={{ width: '100%', height: '100%' }}>
            {/* The 3D scene will be rendered into this div */}
        </div>
    );
}

export default Threebackground;
