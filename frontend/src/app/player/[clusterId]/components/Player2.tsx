"use client"
import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const VideoPlayer2 = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoTextureRef = useRef<THREE.VideoTexture | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [videoPlaying]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
    setVideoPlaying(!videoPlaying);
  };

  return (
    <>
      <Canvas>
        <ambientLight />
        <spotLight position={[10, 10, 10]} angle={0.15} />
        <mesh ref={meshRef}>
          <sphereGeometry args={[500, 60, 40]} />
          <meshBasicMaterial side={THREE.BackSide}>
            <primitive
              object={new THREE.VideoTexture(videoRef.current!)}
              attach="map"
            />
          </meshBasicMaterial>
        </mesh>
        <OrbitControls />
      </Canvas>
      <video
        ref={videoRef}
        style={{ display: "none" }}
        loop
        muted
        onClick={togglePlayPause}
      >
        <source
          src="/test.mp4"
          type="video/mp4"
        />
      </video>
    </>
  );
};

export default VideoPlayer2;
