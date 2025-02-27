"use client";

import { Canvas } from "@react-three/fiber";
import Galaxy from "../Galaxy/Galaxy";

const GalaxyScene: React.FC = () => {
  return (
    <div className="w-full h-full bg-transparent">
      <Canvas camera={{ position: [0, 0, 150], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#fffec0" />
        <Galaxy />
      </Canvas>
    </div>
  );
};

export default GalaxyScene;
