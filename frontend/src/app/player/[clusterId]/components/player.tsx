"use client"
// components/VideoPlayer.tsx
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface VideoPlayerProps {
  videoSrc: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true); // Track video state (playing or paused)

  useEffect(() => {
    if (!canvasRef.current || !videoRef.current) return;

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create a video element and set its source
    const video = videoRef.current;
    video.src = videoSrc;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.crossOrigin = "anonymous"; // Allow cross-origin video

    // Create a texture from the video element
    const texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;

    // Create a sphere and apply the video texture to it
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Invert sphere to view from inside
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Position the camera at the center of the sphere
    camera.position.set(0, 0, 0);

    // Set up OrbitControls to allow dragging the mouse to move the camera
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false; // Disable zoom if you want to restrict zooming
    controls.enablePan = false;  // Disable panning if you want to restrict movement
    controls.enableDamping = true; // Smooth camera movements
    controls.dampingFactor = 0.25; // Damping factor for smoother transitions
    controls.screenSpacePanning = false; // Keep camera in 3D space

    // Animation loop to render the scene
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // Update the controls on each frame
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup function to stop video and remove canvas
    return () => {
      video.pause();
      video.src = '';
      controls.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [videoSrc]);

  // Handle the play/pause toggle
  const handleClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((error) => {
          console.error('Error playing video:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <canvas ref={canvasRef} onClick={handleClick} />
      {/* Hidden video element for controlling the video */}
      <video ref={videoRef} />
    </>
  );
};

export default VideoPlayer;