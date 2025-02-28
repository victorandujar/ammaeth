"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";

const Sun = () => {
  const sunRef = useRef<THREE.Mesh>(null!);
  const coronaRef = useRef<THREE.Points>(null!);

  const vertexShader = `
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform float time;

    void main() {
      vUv = uv;
      vPosition = position;

      float displacement = sin(position.x * 12.0 + time * 2.0) *
                         cos(position.y * 10.0 + time * 1.5) *
                         sin(position.z * 8.0 + time * 1.8);
      displacement *= 0.08;

      vec3 newPosition = position + normal * displacement;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform float time;

    float noise(vec3 p) {
      return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
    }

    void main() {
      vec3 coreColor = mix(vec3(0.5, 0.1, 0.8), vec3(0.8, 0.3, 1.0), sin(time) * 0.5 + 0.5);

      vec3 noiseCoord = vec3(vUv * 15.0, time * 0.5);
      float n = noise(noiseCoord * 10.0);

      float loops = sin(vUv.x * 60.0 + time * 3.0) *
                   cos(vUv.y * 50.0 + time * 2.5);

      vec3 finalColor = coreColor * (n * 0.7 + 0.3);
      finalColor += vec3(1.0, 0.7, 0.3) * smoothstep(0.6, 0.9, loops) * 0.4;
      finalColor *= 1.2 - length(vUv - 0.5); 
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    sunRef.current.rotation.y += 0.002;
    (sunRef.current.material as THREE.ShaderMaterial).uniforms.time.value =
      time;
  });

  return (
    <group>
      <mesh ref={sunRef}>
        <sphereGeometry args={[1, 128, 128]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{ time: { value: 0 } }}
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
        />
      </mesh>

      <points ref={coronaRef}>
        <pointsMaterial
          size={0.1}
          sizeAttenuation
          color={new THREE.Color(1.0, 0.8, 0.4)}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          alphaTest={0.1}
          alphaMap={(() => {
            const canvas = document.createElement("canvas");
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext("2d")!;
            const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
            gradient.addColorStop(0, "rgba(255,255,255,1)");
            gradient.addColorStop(1, "rgba(255,255,255,0)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 64, 64);
            return new THREE.CanvasTexture(canvas);
          })()}
        />
      </points>

      <EffectComposer>
        <Bloom
          intensity={3.0}
          kernelSize={5}
          luminanceThreshold={0.01}
          luminanceSmoothing={5}
          height={300}
        />
        <Noise opacity={0.03} />
      </EffectComposer>
    </group>
  );
};

export default Sun;
