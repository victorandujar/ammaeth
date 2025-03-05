"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const HoloCyberSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!); // Nueva referencia para el tercer anillo

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float time;

    void main() {
      vUv = uv;
      vPosition = position;

      // Subtle chaotic ripple + core pulse effect
      vec3 pos = position;
      float ripple = sin(time * 0.5 + dot(position, vec3(1.0, 2.0, 3.0))) * 0.015;
      float pulse = sin(time * 1.0) * 0.02; // Core pulsing
      pos += normal * (ripple + pulse);

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float time;
    varying vec2 vUv;
    varying vec3 vPosition;

    // Simple noise for chaotic patterns
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      float t = time * 0.05;

      // Purple holographic colors
      vec3 lineColor = vec3(0.7, 0.4, 1.0); // Bright purple
      vec3 shadowColor = vec3(0.2, 0.1, 0.4); // Darker purple shadow
      vec3 coreColor = vec3(0.9, 0.6, 1.0); // Core glowing purple

      // Chaotic fine lines (no grid)
      float n = noise(uv * 5.0 + t * 0.2);
      float lines1 = sin(uv.y * 100.0 + t + n * 3.0);
      lines1 = step(0.995, abs(lines1)); // Ultra thin lines
      float lines2 = sin(uv.x * 80.0 - t * 0.7 + n * 2.0);
      lines2 = step(0.995, abs(lines2)); // Ultra thin, non-uniform lines

      // Edge fade for spherical effect
      float edgeFade = 1.0 - smoothstep(0.4, 0.5, length(uv - 0.5));
      
      // Shadow effect
      float shadow = smoothstep(0.3, 0.7, n + length(vPosition) * 0.5) * 0.4;

      // Core pulse effect
      float coreDistance = length(vPosition); // Distance from center
      float corePulse = sin(time * 1.5 - coreDistance * 5.0) * 0.5 + 0.5;
      float coreGlow = smoothstep(0.8, 0.2, coreDistance) * corePulse * 0.5;

      // Combine lines and core
      float lines = max(lines1, lines2) * edgeFade;
      vec3 color = mix(lineColor * lines, shadowColor, shadow * (1.0 - lines));
      color += coreColor * coreGlow; // Add core glow

      // Transparency
      float alpha = (lines + coreGlow) * 0.9;

      gl_FragColor = vec4(color, alpha);
    }
  `;

  const ringVertexShader = `
    uniform float time;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.z += sin(time * 0.8 + uv.x * 4.0) * 0.001; // Subtle wave
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const ringFragmentShader = `
    uniform float time;
    varying vec2 vUv;

    void main() {
      float t = time * 0.6;
      vec3 ringColor = vec3(0.7, 0.4, 1.0); // Purple to match sphere

      // Continuous fine line with faint glow
      float glow = sin(t + vUv.x * 10.0) * 0.2 + 0.8;
      float line = 2.0; // Continuous thin line
      vec3 color = ringColor * line * glow;
      float alpha = 0.95 * glow;

      gl_FragColor = vec4(color, alpha);
    }
  `;

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.003;
      sphereRef.current.rotation.z += 0.002;
      (sphereRef.current.material as THREE.ShaderMaterial).uniforms.time.value =
        time;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += 0.005;
      ring1Ref.current.rotation.y = Math.sin(time * 0.3) * 0.2;
      (ring1Ref.current.material as THREE.ShaderMaterial).uniforms.time.value =
        time;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z += 0.004;
      ring2Ref.current.rotation.x = Math.cos(time * 0.2) * 0.15;
      (ring2Ref.current.material as THREE.ShaderMaterial).uniforms.time.value =
        time;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y += 0.006; // Rotación en y para el tercer anillo
      ring3Ref.current.rotation.z = Math.sin(time * 0.4) * 0.1; // Oscilación sutil en z
      (ring3Ref.current.material as THREE.ShaderMaterial).uniforms.time.value =
        time;
    }
  });

  return (
    <>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{ time: { value: 0 } }}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh ref={ring1Ref} position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.2, 0.007, 16, 100]} />
        <shaderMaterial
          vertexShader={ringVertexShader}
          fragmentShader={ringFragmentShader}
          uniforms={{ time: { value: 0 } }}
          transparent
        />
      </mesh>

      <mesh ref={ring3Ref} position={[0, 0, 0]} rotation={[Math.PI / 1, 0, 0]}>
        <torusGeometry args={[1.2, 0.001, 16, 100]} />
        <shaderMaterial
          vertexShader={ringVertexShader}
          fragmentShader={ringFragmentShader}
          uniforms={{ time: { value: 0 } }}
          transparent
        />
      </mesh>

      <mesh ref={ring2Ref} position={[0, 0, 0]} rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[1.4, 0.04, 16, 100]} />
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

export default HoloCyberSphere;
