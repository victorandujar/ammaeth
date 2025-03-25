"use client";

import { EffectComposer, Bloom } from "@react-three/postprocessing";
import SunSphere from "../SunSphere/SunSphere";

const SunWithBg = () => {
  return (
    <group>
      <SunSphere />
      <EffectComposer>
        <Bloom
          intensity={2.0}
          kernelSize={5}
          luminanceThreshold={2}
          luminanceSmoothing={0.2}
          height={300}
        />
      </EffectComposer>
    </group>
  );
};

export default SunWithBg;
