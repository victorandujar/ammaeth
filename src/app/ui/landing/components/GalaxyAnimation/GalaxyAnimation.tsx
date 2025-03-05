import { Camera, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Galaxy from "../Galaxy/Galaxy";
import { RootState } from "@/app/store/store";
import { useAppSelector } from "@/app/store/hooks";
import { Group, Vector3 } from "three";

interface GalaxyAnimationProps {
  camera: Camera;
}

const GalaxyAnimation: React.FC<GalaxyAnimationProps> = ({ camera }) => {
  const galaxyRef = useRef<Group>(null);
  const scrollProgress = useAppSelector(
    (state: RootState) => state.ui.scrollProgress,
  );

  useFrame(({ camera }) => {
    const startPosition = new Vector3(0, 0, 150);
    const endPosition = new Vector3(0, 0, 1.1);

    const lerpFactor = scrollProgress > 0.5 ? 0.1 : 0.05;

    const currentPosition = startPosition
      .clone()
      .lerp(endPosition, scrollProgress);
    camera.position.lerp(currentPosition, lerpFactor);
    camera.lookAt(0, 0, 0);

    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += 0.001 * (1 + scrollProgress * 2);
    }
  });
  return (
    <group ref={galaxyRef}>
      <Galaxy />
    </group>
  );
};

export default GalaxyAnimation;
