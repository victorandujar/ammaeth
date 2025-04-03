"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const UFO = () => {
  const ufoRef = useRef<THREE.Group>(null!);

  const ufoVertexShader = `
    varying vec3 vNormal;
    varying vec2 vUv;
    uniform float time;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vUv = uv;
      
      vec3 pos = position;
      float pulse = sin(time * 2.0 + pos.x * 3.0 + pos.y * 2.0) * 0.05;
      pos += normal * pulse;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const ufoFragmentShader = `
    uniform float time;
    varying vec3 vNormal;
    varying vec2 vUv;

    void main() {
      vec3 baseColor = vec3(0.1, 0.5, 0.8); // Azul cyber
      vec3 glowColor = vec3(0.2, 0.9, 1.0); // Cian brillante
      
      float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
      float rim = smoothstep(0.4, 1.0, fresnel);
      
      float noise = sin(vUv.x * 20.0 + time * 3.0) * cos(vUv.y * 20.0 + time * 2.0) * 0.2 + 0.8;
      vec3 color = mix(baseColor, glowColor, rim * noise);
      
      float alpha = 0.7 + rim * 0.3;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (ufoRef.current) {
      ufoRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
      ufoRef.current.rotation.y = Math.cos(t * 0.4) * 0.3;
      ufoRef.current.rotation.z = Math.sin(t * 0.2) * 0.15;

      ufoRef.current.position.y = Math.sin(t * 0.5) * 0.5 + 3.0;
      ufoRef.current.position.x = Math.cos(t * 0.3) * 0.2;
      ufoRef.current.position.z = Math.sin(t * 0.4) * 0.2;
    }

    ufoRef.current.children.forEach((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.ShaderMaterial
      ) {
        child.material.uniforms.time.value = t;
      }
    });
  });

  return (
    <group ref={ufoRef}>
      <mesh scale={[1.5, 0.4, 1.0]}>
        <sphereGeometry args={[3, 64, 32]} />
        <shaderMaterial
          vertexShader={ufoVertexShader}
          fragmentShader={ufoFragmentShader}
          uniforms={{ time: { value: 0 } }}
          transparent
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh scale={[1.5, 0.4, 1.0]}>
        <sphereGeometry args={[3.1, 64, 32]} />
        <shaderMaterial
          vertexShader={ufoVertexShader}
          fragmentShader={ufoFragmentShader}
          uniforms={{ time: { value: 0 } }}
          transparent
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

const UFOScene = () => {
  return (
    <Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 5, 0]} intensity={100} color={0x00ccff} />
      <UFO />
      <EffectComposer>
        <Bloom
          intensity={2.5}
          kernelSize={4}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.3}
        />
      </EffectComposer>
    </Canvas>
  );
};

export default UFOScene;
