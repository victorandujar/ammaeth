"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import HoloCyberSphere from "../SunSphere/SunSphere";

export default function SolarScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 55 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#ff4500" />

      <HoloCyberSphere />

      <OrbitControls
        enableZoom={true}
        maxDistance={15}
        minDistance={3}
        autoRotate
        autoRotateSpeed={0.5}
      />

      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />
    </Canvas>
  );
}
