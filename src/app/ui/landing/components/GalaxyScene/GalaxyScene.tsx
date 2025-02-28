import { Camera, Canvas } from "@react-three/fiber";
import { useState } from "react";
import GalaxyAnimation from "../GalaxyAnimation/GalaxyAnimation";

const GalaxyScene: React.FC = () => {
  const [camera, setCamera] = useState<Camera | null>(null);

  return (
    <div className="w-full h-full bg-transparent">
      <Canvas
        camera={{ position: [0, 0, 150], fov: 60 }}
        onCreated={({ camera }) => setCamera(camera)}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#fffec0" />
        {camera && <GalaxyAnimation camera={camera} />}
      </Canvas>
    </div>
  );
};

export default GalaxyScene;
