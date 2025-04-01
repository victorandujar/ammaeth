"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

const HoloAtom = () => {
  const nucleusRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);

  const nucleusVertexShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float time;

    void main() {
      vNormal = normal;
      vPosition = position;

      // Subtle pulsing effect
      vec3 pos = position;
      float pulse = sin(time * 2.0) * 0.02;
      pos += normal * pulse;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const nucleusFragmentShader = `
    uniform float time;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      // Glowing cyan-ish color for nucleus
      vec3 baseColor = vec3(0.2, 0.8, 1.0); // Bright cyan
      float glow = sin(time * 3.0) * 0.3 + 0.7; // Pulsing glow
      float intensity = pow(0.8 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0); // Edge glow

      vec3 color = baseColor * (glow + intensity * 0.5);
      float alpha = clamp(glow + intensity, 0.0, 1.0);

      gl_FragColor = vec4(color, alpha);
    }
  `;

  const ringVertexShader = `
    uniform float time;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;
      // Subtle wave along the ring
      pos.z += sin(time + uv.x * 6.0) * 0.005;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const ringFragmentShader = `
    uniform float time;
    varying vec2 vUv;

    void main() {
      vec3 ringColor = vec3(0.2, 0.8, 1.0); // Matching cyan
      float t = time * 0.8;

      // Faint glowing line
      float glow = sin(t + vUv.x * 12.0) * 0.3 + 0.7;
      vec3 color = ringColor * glow;
      float alpha = glow * 0.85;

      gl_FragColor = vec4(color, alpha);
    }
  `;

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (nucleusRef.current) {
      nucleusRef.current.rotation.y += 0.01;
      (
        nucleusRef.current.material as THREE.ShaderMaterial
      ).uniforms.time.value = time;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += 0.02;
      ring1Ref.current.rotation.y = Math.sin(time * 0.5) * 0.3;
      (ring1Ref.current.material as THREE.ShaderMaterial).uniforms.time.value =
        time;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z += 0.015;
      ring2Ref.current.rotation.x = Math.cos(time * 0.4) * 0.25;
      (ring2Ref.current.material as THREE.ShaderMaterial).uniforms.time.value =
        time;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y += 0.01;
      ring3Ref.current.rotation.z = Math.sin(time * 0.3) * 0.2;
      (ring3Ref.current.material as THREE.ShaderMaterial).uniforms.time.value =
        time;
    }
  });

  return (
    <>
      <mesh ref={nucleusRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <shaderMaterial
          vertexShader={nucleusVertexShader}
          fragmentShader={nucleusFragmentShader}
          uniforms={{ time: { value: 0 } }}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh ref={ring1Ref} position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.8, 0.005, 16, 100]} />
        <shaderMaterial
          vertexShader={ringVertexShader}
          fragmentShader={ringFragmentShader}
          uniforms={{ time: { value: 0 } }}
          transparent
        />
      </mesh>

      <mesh ref={ring2Ref} position={[0, 0, 0]} rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[1.0, 0.005, 16, 100]} />
        <shaderMaterial
          vertexShader={ringVertexShader}
          fragmentShader={ringFragmentShader}
          uniforms={{ time: { value: 0 } }}
          transparent
        />
      </mesh>

      <mesh ref={ring3Ref} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.005, 16, 100]} />
        <shaderMaterial
          vertexShader={ringVertexShader}
          fragmentShader={ringFragmentShader}
          uniforms={{ time: { value: 0 } }}
          transparent
        />
      </mesh>
    </>
  );
};

const HoloAthomScene: React.FC = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <HoloAtom />
    </Canvas>
  );
};

export default HoloAthomScene;
